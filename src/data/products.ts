// Auto-derive products from asset filenames using import.meta.glob
// Naming convention: <order>-<product_name>-<image_index>[-_][FB]?.(jpg|jpeg|png)

const compressedModules = import.meta.glob<string>(
  "../assets/compressed/*.{jpg,jpeg,png}",
  { eager: true, import: "default" }
);

const graphicsModules = import.meta.glob<string>(
  "../assets/graphics/*.{jpg,jpeg,png}",
  { eager: true, import: "default" }
);

// Regex: order separator(- or _) productName separator(- or _) imageIndex [optional _F/_B] . extension
const FILE_REGEX = /(\d+)[-_](.+?)[-_](\d+)(?:[-_][FB])?\.(jpg|jpeg|png)$/i;

interface RawEntry {
  order: number;
  name: string;
  imageIndex: number;
  url: string;
  source: "compressed" | "graphics";
}

const entries: RawEntry[] = [];

function parseModules(modules: Record<string, string>, source: "compressed" | "graphics") {
  for (const [path, url] of Object.entries(modules)) {
    const filename = path.split("/").pop() || "";
    const match = filename.match(FILE_REGEX);
    if (!match) continue;
    entries.push({
      order: parseInt(match[1], 10),
      name: match[2].replace(/_/g, " "),
      imageIndex: parseInt(match[3], 10),
      url,
      source,
    });
  }
}

parseModules(compressedModules, "compressed");
parseModules(graphicsModules, "graphics");

// Group by order
const grouped = new Map<number, {
  name: string;
  graphics: Map<number, string>;
  compressed: Map<number, string>;
}>();

for (const entry of entries) {
  if (!grouped.has(entry.order)) {
    grouped.set(entry.order, { name: entry.name, graphics: new Map(), compressed: new Map() });
  }
  const group = grouped.get(entry.order)!;
  if (entry.source === "graphics") {
    group.graphics.set(entry.imageIndex, entry.url);
  } else {
    group.compressed.set(entry.imageIndex, entry.url);
  }
}

export interface Product {
  id: number;
  name: string;
  /** Graphic cover image (index 0 from graphics folder) */
  graphicCover: string;
  /** Lifestyle/on-body images (indices 1, 100, 101 from compressed) for hero */
  lifestyleImages: string[];
  /** All compressed images sorted: 1, 100, 101, 2, 3, ... for product page */
  productPageImages: string[];
}

// Custom sort order for product page: 1, 100, 101, then 2, 3, 4...
const PRIORITY_INDICES = [1, 100, 101];

function sortProductPageImages(compressed: Map<number, string>): string[] {
  const priority: string[] = [];
  for (const idx of PRIORITY_INDICES) {
    const url = compressed.get(idx);
    if (url) priority.push(url);
  }
  const rest = Array.from(compressed.entries())
    .filter(([idx]) => !PRIORITY_INDICES.includes(idx) && idx !== 0)
    .sort(([a], [b]) => a - b)
    .map(([, url]) => url);
  return [...priority, ...rest];
}

export const products: Product[] = Array.from(grouped.entries())
  .sort(([a], [b]) => a - b)
  .map(([order, data]) => {
    const graphicCover = data.graphics.get(0) || "";
    const lifestyleImages = PRIORITY_INDICES
      .map((idx) => data.compressed.get(idx))
      .filter((url): url is string => !!url);
    const productPageImages = sortProductPageImages(data.compressed);

    return {
      id: order,
      name: data.name,
      graphicCover,
      lifestyleImages,
      productPageImages,
    };
  })
  .filter((p) => p.graphicCover || p.productPageImages.length > 0);

export const getProduct = (id: string) =>
  products.find((p) => String(p.id) === id);
