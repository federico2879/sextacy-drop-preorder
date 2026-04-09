// Auto-derive products from asset filenames using import.meta.glob
// Compressed images are now served from ImageKit; graphics remain local.

const MERCH_IMAGEKIT_BASE = "https://ik.imagekit.io/sextacy/merch/";

/**
 * Build an ImageKit merch URL with optional transform.
 * @param filename  e.g. "1-Zebra_Sextacy_Tee-1.jpg"
 * @param transform ImageKit transform string
 */
export const getMerchImage = (
  filename: string,
  transform = "w-1200,q-70,f-auto"
) => `${MERCH_IMAGEKIT_BASE}${filename}?tr=${transform}`;

/**
 * Re-apply a different transform to an existing merch ImageKit URL.
 */
export const reMerchTransform = (url: string, transform: string): string => {
  if (!url.startsWith(MERCH_IMAGEKIT_BASE)) return url; // not a merch ImageKit URL
  const filename = url.split("?")[0].replace(MERCH_IMAGEKIT_BASE, "");
  return getMerchImage(filename, transform);
};

// --- Graphics: still local ---
const graphicsModules = import.meta.glob<string>(
  "../assets/graphics/*.{jpg,jpeg,png}",
  { eager: true, import: "default" }
);

// --- Compressed: discover filenames via glob, but serve from ImageKit ---
const compressedModules = import.meta.glob<string>(
  "../assets/compressed/*.{jpg,jpeg,png}",
  { eager: true, import: "default" }
);

// Regex: order separator(- or _) productName separator(- or _) imageIndex [optional _F/_B] . extension
const FILE_REGEX = /(\d+)[-_](.+?)[-_](\d+)(?:[-_]([FB]))?\.(jpg|jpeg|png)$/i;

interface RawEntry {
  order: number;
  name: string;
  imageIndex: number;
  variant: string; // "F", "B", or ""
  url: string;
  source: "compressed" | "graphics";
}

const entries: RawEntry[] = [];

// Parse graphics (keep local URLs)
for (const [path, url] of Object.entries(graphicsModules)) {
  const filename = path.split("/").pop() || "";
  const match = filename.match(FILE_REGEX);
  if (!match) continue;
  entries.push({
    order: parseInt(match[1], 10),
    name: match[2].replace(/_/g, " "),
    imageIndex: parseInt(match[3], 10),
    variant: (match[4] || "").toUpperCase(),
    url,
    source: "graphics",
  });
}

// Parse compressed → ImageKit URLs (default transform)
for (const path of Object.keys(compressedModules)) {
  const filename = path.split("/").pop() || "";
  const match = filename.match(FILE_REGEX);
  if (!match) continue;
  entries.push({
    order: parseInt(match[1], 10),
    name: match[2].replace(/_/g, " "),
    imageIndex: parseInt(match[3], 10),
    variant: (match[4] || "").toUpperCase(),
    url: getMerchImage(filename), // ImageKit URL with default transform
    source: "compressed",
  });
}

// Use string keys like "0", "0_F", "0_B" to keep all variants
function entryKey(imageIndex: number, variant: string): string {
  return variant ? `${imageIndex}_${variant}` : `${imageIndex}`;
}

// Group by order
const grouped = new Map<number, {
  name: string;
  graphics: Map<string, string>;
  compressed: Map<string, string>;
}>();

for (const entry of entries) {
  if (!grouped.has(entry.order)) {
    grouped.set(entry.order, { name: entry.name, graphics: new Map(), compressed: new Map() });
  }
  const group = grouped.get(entry.order)!;
  const key = entryKey(entry.imageIndex, entry.variant);
  if (entry.source === "graphics") {
    group.graphics.set(key, entry.url);
  } else {
    group.compressed.set(key, entry.url);
  }
}

export interface Product {
  id: number;
  name: string;
  /** Graphic cover image (index 0 from graphics folder) */
  graphicCover: string;
  /** All graphic images for product page gallery */
  graphicImages: string[];
  /** Lifestyle/on-body images (indices 1, 100, 101 from compressed) for hero */
  lifestyleImages: string[];
  /** All compressed images sorted: 1, 100, 101, 2, 3, ... for product page */
  productPageImages: string[];
}

// Desired product page order: 0_F, 0_B, 0, 1, 100, 101, 2, 3, 4, ...
const PAGE_ORDER_KEYS = ["0_F", "0_B", "0", "1", "100", "101"];

function sortKeyWeight(key: string): number {
  const idx = PAGE_ORDER_KEYS.indexOf(key);
  if (idx !== -1) return idx;
  const num = parseInt(key);
  return PAGE_ORDER_KEYS.length + (isNaN(num) ? 9999 : num);
}

function buildProductPageImages(
  graphics: Map<string, string>,
  compressed: Map<string, string>
): string[] {
  const all: [string, string][] = [];
  for (const [key, url] of graphics.entries()) {
    all.push([key, url]);
  }
  for (const [key, url] of compressed.entries()) {
    all.push([key, url]);
  }
  return all
    .sort(([a], [b]) => sortKeyWeight(a) - sortKeyWeight(b))
    .map(([, url]) => url);
}

export const products: Product[] = Array.from(grouped.entries())
  .sort(([a], [b]) => a - b)
  .map(([order, data]) => {
    const compressed = data.compressed;
    const graphicCover = data.graphics.get("0_F") || data.graphics.get("0") || "";
    const graphicImages = Array.from(data.graphics.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([, url]) => url);
    const lifestyleImages = [1, 100, 101]
      .flatMap((idx) => [
        compressed.get(`${idx}`),
        compressed.get(`${idx}_F`),
        compressed.get(`${idx}_B`),
      ])
      .filter((url): url is string => !!url);
    const productPageImages = buildProductPageImages(data.graphics, compressed);

    return {
      id: order,
      name: data.name,
      graphicCover,
      graphicImages,
      lifestyleImages,
      productPageImages,
    };
  })
  .filter((p) => p.graphicCover || p.productPageImages.length > 0);

export const getProduct = (id: string) =>
  products.find((p) => String(p.id) === id);
