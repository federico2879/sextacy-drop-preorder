import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProduct } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, X } from "lucide-react";

const SIZE_GUIDE = [
  { size: "S",  chest: "48–51", length: "68–70" },
  { size: "M",  chest: "52–55", length: "71–73" },
  { size: "L",  chest: "56–59", length: "74–76" },
  { size: "XL", chest: "60–63", length: "77–79" },
];

const SIZES = ["S", "M", "L", "XL"] as const;

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const product = getProduct(id || "");
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState("");
  const [activeImage, setActiveImage] = useState(0);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Product not found.
      </div>
    );
  }

  const handleAdd = () => {
    if (!selectedSize) {
      toast({ title: "Please select a size" });
      return;
    }
    addItem({
      productId: product.id,
      productName: product.name,
      size: selectedSize,
    });
    toast({ title: `${product.name} (${selectedSize}) added to cart` });
    setSelectedSize("");
  };

  return (
    <main className="min-h-screen section-padding">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors mb-12"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Images */}
        <div className="flex flex-col gap-4">
          <div className="overflow-hidden bg-card">
            <img
              src={product.images[activeImage]}
              alt={product.name}
              className="w-full aspect-[4/5] object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-3">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`overflow-hidden bg-card border transition-colors ${
                  activeImage === i
                    ? "border-foreground"
                    : "border-border hover:border-muted-foreground"
                }`}
              >
                <img
                  src={img}
                  alt={`${product.name} view ${i + 1}`}
                  className="w-full aspect-square object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center">
          <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground mb-4">
            Drop 01
          </p>
          <h1 className="text-2xl md:text-3xl tracking-[0.15em] uppercase text-foreground mb-4 font-medium">
            {product.name}
          </h1>
          <p className="text-lg tracking-wide text-foreground mb-8">
            {product.price}
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground mb-12 max-w-md">
            {product.description}
          </p>

          {/* Size selector */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
                Size
              </p>
              <button
                onClick={() => setShowSizeGuide(true)}
                className="text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
              >
                Size Guide
              </button>
            </div>
            <div className="flex gap-3">
              {SIZES.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 border text-xs tracking-widest transition-colors ${
                    selectedSize === size
                      ? "border-foreground text-foreground"
                      : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleAdd}
            className="border border-foreground px-10 py-4 text-xs tracking-[0.3em] uppercase text-foreground transition-colors duration-300 hover:bg-foreground hover:text-background w-fit"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Size Guide Modal */}
      {showSizeGuide && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
          onClick={() => setShowSizeGuide(false)}
        >
          <div
            className="relative bg-card border border-border w-full max-w-sm p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowSizeGuide(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close size guide"
            >
              <X className="w-4 h-4" />
            </button>

            <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground mb-6">
              Size Guide
            </p>
            <p className="text-xs text-muted-foreground mb-6 leading-relaxed">
              Measurements in cm. All garments are unisex with a relaxed fit.
            </p>

            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left pb-3 tracking-[0.15em] uppercase text-muted-foreground font-normal">Size</th>
                  <th className="text-left pb-3 tracking-[0.15em] uppercase text-muted-foreground font-normal">Chest (cm)</th>
                  <th className="text-left pb-3 tracking-[0.15em] uppercase text-muted-foreground font-normal">Length (cm)</th>
                </tr>
              </thead>
              <tbody>
                {SIZE_GUIDE.map((row) => (
                  <tr key={row.size} className="border-b border-border/50 last:border-0">
                    <td className="py-3 tracking-widest text-foreground">{row.size}</td>
                    <td className="py-3 text-muted-foreground">{row.chest}</td>
                    <td className="py-3 text-muted-foreground">{row.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </main>
  );
};

export default ProductPage;
