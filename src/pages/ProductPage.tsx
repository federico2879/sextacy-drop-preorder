import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProduct } from "@/data/products";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";

const PRODUCT_DESCRIPTIONS: Record<number, string> = {
  1: "Horizontal black and white.\nPure pattern.",
  2: "A car in flames.\nNo control.",
  3: "The S on your back.\nNothing else matters.",
  4: "Red and white lines.\nTension.",
  5: "Sweet, but not innocent.",
  6: "Built from kisses.\nRespect the music.",
  7: "Raw writing.\nNo rules.",
};

const ProductPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const product = getProduct(id || "");
  const [activeImage, setActiveImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [imageLoaded, setImageLoaded] = useState<Record<number, boolean>>({});

  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    setImageLoaded({});
    setActiveImage(0);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Product not found.
      </div>
    );
  }

  const images = product.productPageImages;

  const goNext = () => {
    setImageLoaded({});
    setActiveImage((prev) => (prev + 1) % images.length);
  };
  const goPrev = () => {
    setImageLoaded({});
    setActiveImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? goNext() : goPrev();
    }
    touchStartX.current = null;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  return (
    <main className="min-h-screen section-padding">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors mb-12"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Images */}
        <div className="flex flex-col gap-4">
          <div
            className="relative overflow-hidden bg-card group cursor-zoom-in"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onClick={() => setIsZoomed(!isZoomed)}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setIsZoomed(false)}
          >
            {!imageLoaded[activeImage] && (
              <div className="absolute inset-0 bg-muted animate-pulse" />
            )}
            <img
              src={images[activeImage]}
              alt={product.name}
              className={`w-full aspect-[4/5] object-cover transition-all duration-500 ${
                imageLoaded[activeImage] ? "opacity-100" : "opacity-0"
              } ${isZoomed ? "scale-[2] cursor-zoom-out" : ""}`}
              style={isZoomed ? { transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` } : undefined}
              onLoad={() => setImageLoaded((prev) => ({ ...prev, [activeImage]: true }))}
            />
            {images.length > 1 && !isZoomed && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); goPrev(); }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-background/70 backdrop-blur-sm border border-border text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-background"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); goNext(); }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-background/70 backdrop-blur-sm border border-border text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-background"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      onClick={(e) => { e.stopPropagation(); setActiveImage(i); }}
                      className={`w-1.5 h-1.5 rounded-full transition-colors ${
                        activeImage === i ? "bg-foreground" : "bg-foreground/30"
                      }`}
                      aria-label={`View image ${i + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {images.map((img, i) => (
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
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details — editorial, no transactional UI */}
        <div className="flex flex-col justify-center">
          <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground mb-4">
            Drop // 01
          </p>
          <h1 className="text-2xl md:text-3xl tracking-[0.15em] uppercase text-foreground mb-4 font-medium">
            {product.name}
          </h1>
          <p className="text-sm leading-relaxed text-muted-foreground mb-12 max-w-md whitespace-pre-line">
            {PRODUCT_DESCRIPTIONS[product.id] ?? "Heavyweight 240gsm cotton. Oversized boxy fit. Screen-printed front\ngraphic. Cut and sewn in Italy."}
          </p>
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground/60">
            Collection piece.
          </p>
        </div>
      </div>
    </main>
  );
};

export default ProductPage;
