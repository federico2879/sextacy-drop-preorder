// Auto-derive products from asset filenames using import.meta.glob
// Naming convention: <order>-<product_name>-<image_index>.(jpg|jpeg|png)

const assetModules = import.meta.glob<string>(
  "/src/assets/*.{jpg,jpeg,png}",
  { eager: true, import: "default" }
);

// Regex: order separator(- or _) productName separator(- or _) imageIndex . extension
const FILE_REGEX = /\/(\d+)[-_](.+?)[-_](\d+)\.(jpg|jpeg|png)$/i;

interface RawEntry {
  order: number;
  name: string;
  imageIndex: number;
  url: string;
}

const entries: RawEntry[] = [];

for (const [path, url] of Object.entries(assetModules)) {
  const filename = path.split("/").pop() || "";
  const match = filename.match(FILE_REGEX);
  if (!match) continue;

  const order = parseInt(match[1], 10);
  const rawName = match[2]; // e.g. "Zebra_Sextacy_Tee"
  const imageIndex = parseInt(match[3], 10);

  entries.push({
    order,
    name: rawName.replace(/_/g, " "),
    imageIndex,
    url,
  });
}

// Group by order + name
const grouped = new Map<number, { name: string; images: Map<number, string> }>();

for (const entry of entries) {
  if (!grouped.has(entry.order)) {
    grouped.set(entry.order, { name: entry.name, images: new Map() });
  }
  grouped.get(entry.order)!.images.set(entry.imageIndex, entry.url);
}

export interface Product {
  id: number;
  name: string;
  images: string[];
  cover: string;
  heroImage: string | null;
}

export const products: Product[] = Array.from(grouped.entries())
  .sort(([a], [b]) => a - b)
  .map(([order, data]) => {
    const sortedEntries = Array.from(data.images.entries()).sort(
      ([a], [b]) => a - b
    );

    const cover = data.images.get(0) || sortedEntries[0]?.[1] || "";
    const heroImage = data.images.get(1) || null;

    // All images sorted by index (for product page gallery)
    const images = sortedEntries.map(([, url]) => url);

    return {
      id: order,
      name: data.name,
      images,
      cover,
      heroImage,
    };
  })
  .filter((p) => p.images.length > 0);

export const getProduct = (id: string) =>
  products.find((p) => String(p.id) === id);
