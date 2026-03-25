import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";
import { ArrowLeft, Minus, Plus, Trash2 } from "lucide-react";

const getProductImage = (productId: string) => {
  const product = products.find((p) => String(p.id) === productId);
  return product?.graphicCover || "";
};

const CartPage = () => {
  const { items, removeItem, clearCart, addItem } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; phone?: string; privacy?: string }>({});

  const validate = (form: HTMLFormElement) => {
    const data = new FormData(form);
    const newErrors: { email?: string; phone?: string; privacy?: string } = {};
    const email = (data.get("entry.774244041") as string) || "";
    if (!email || !email.includes("@")) {
      newErrors.email = "Please enter a valid email address";
    }
    const phone = (data.get("entry.1325497763") as string) || "";
    const digits = phone.replace(/\D/g, "");
    if (digits.length !== 10) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }
    if (!privacyChecked) {
      newErrors.privacy = "You must agree to the privacy policy";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Group items by productId + size for quantity display
  interface GroupedItem {
    productId: string;
    productName: string;
    size: string;
    qty: number;
    indices: number[];
  }

  const grouped: GroupedItem[] = [];
  items.forEach((item, i) => {
    const existing = grouped.find(
      (g) => g.productId === item.productId && g.size === item.size
    );
    if (existing) {
      existing.qty++;
      existing.indices.push(i);
    } else {
      grouped.push({
        productId: item.productId,
        productName: item.productName,
        size: item.size,
        qty: 1,
        indices: [i],
      });
    }
  });

  const handleIncrement = (g: GroupedItem) => {
    addItem({ productId: g.productId, productName: g.productName, size: g.size });
  };

  const handleDecrement = (g: GroupedItem) => {
    if (g.qty > 0) {
      removeItem(g.indices[g.indices.length - 1]);
    }
  };

  const handleRemoveAll = (g: GroupedItem) => {
    // Remove from last to first to avoid index shifting
    for (let i = g.indices.length - 1; i >= 0; i--) {
      removeItem(g.indices[i]);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate(e.currentTarget)) return;
    const form = e.currentTarget;
    const data = new FormData(form);

    const cartSummary = items
      .map((item, i) => `${i + 1}. ${item.productName} — Size ${item.size}`)
      .join(" | ");
    data.append("entry.2129795582", cartSummary);

    const GOOGLE_FORM_URL =
      "https://docs.google.com/forms/d/e/1FAIpQLScFdLDMTHsnywVenibUMfy6FCoc5qBz0aKmEQoLIMwn46Y65w/formResponse";

    const urlEncoded = new URLSearchParams();
    data.forEach((value, key) => urlEncoded.append(key, value as string));

    fetch(GOOGLE_FORM_URL, {
      method: "POST",
      body: urlEncoded,
      mode: "no-cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    setSubmitted(true);
    clearCart();
  };

  if (submitted) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center section-padding text-center">
        <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground mb-6">
          Confirmed
        </p>
        <p className="text-lg md:text-xl tracking-wide text-foreground max-w-md leading-relaxed mb-12">
          Thank you. We will contact you on WhatsApp to complete the order.
        </p>
        <Link
          to="/"
          className="border border-foreground px-10 py-4 text-xs tracking-[0.3em] uppercase text-foreground transition-colors duration-300 hover:bg-foreground hover:text-background"
        >
          Back to Home
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen section-padding max-w-2xl mx-auto">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors mb-12"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </Link>

      <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground mb-12 text-center">
        Your Cart
      </p>

      {items.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted-foreground text-sm tracking-wide mb-8">
            Your cart is empty.
          </p>
          <Link
            to="/"
            className="border border-foreground px-10 py-4 text-xs tracking-[0.3em] uppercase text-foreground transition-colors duration-300 hover:bg-foreground hover:text-background"
          >
            Shop Collection
          </Link>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-4 mb-12">
            {grouped.map((g, i) => {
              const image = getProductImage(g.productId);
              return (
                <div
                  key={`${g.productId}-${g.size}-${i}`}
                  className="flex items-center gap-4 border-b border-border pb-4"
                >
                  {image && (
                    <Link to={`/product/${g.productId}`} className="w-16 h-20 flex-shrink-0 overflow-hidden bg-card">
                      <img
                        src={image}
                        alt={g.productName}
                        className="w-full h-full object-cover"
                      />
                    </Link>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm tracking-[0.15em] uppercase text-foreground">
                      {g.productName}
                    </p>
                    <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mt-1">
                      Size {g.size} · €20
                    </p>
                  </div>
                  {/* Quantity controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDecrement(g)}
                      className="w-8 h-8 border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs tracking-widest text-foreground w-6 text-center">
                      {g.qty}
                    </span>
                    <button
                      onClick={() => handleIncrement(g)}
                      className="w-8 h-8 border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <button
                    onClick={() => handleRemoveAll(g)}
                    className="text-muted-foreground hover:text-destructive transition-colors p-2"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Preorder form */}
          <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground mb-8 text-center">
            Your Details
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <input
              name="entry.1727151423"
              type="text"
              placeholder="Name and Surname"
              required
              maxLength={20}
              className="bg-transparent border-b border-border px-0 py-4 text-sm tracking-wide text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
            />
            <input
              name="entry.901405781"
              type="text"
              placeholder="Instagram"
              maxLength={20}
              className="bg-transparent border-b border-border px-0 py-4 text-sm tracking-wide text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
            />
            <div>
              <input
                name="entry.774244041"
                type="email"
                placeholder="Email"
                required
                maxLength={255}
                className="bg-transparent border-b border-border px-0 py-4 text-sm tracking-wide text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors w-full"
                onChange={() => errors.email && setErrors((e) => ({ ...e, email: undefined }))}
              />
              {errors.email && <p className="text-destructive text-xs tracking-wide mt-2">{errors.email}</p>}
            </div>
            <div>
              <input
                name="entry.1325497763"
                type="tel"
                placeholder="Phone number (WhatsApp)"
                required
                maxLength={20}
                className="bg-transparent border-b border-border px-0 py-4 text-sm tracking-wide text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors w-full"
                onChange={() => errors.phone && setErrors((e) => ({ ...e, phone: undefined }))}
              />
              {errors.phone && <p className="text-destructive text-xs tracking-wide mt-2">{errors.phone}</p>}
            </div>

            <p className="text-xs tracking-wide text-muted-foreground leading-relaxed">
              Please make sure your email and WhatsApp number are correct — we'll use them to confirm your preorder.
            </p>

            <div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={privacyChecked}
                  onChange={() => {
                    setPrivacyChecked(!privacyChecked);
                    if (errors.privacy) setErrors((e) => ({ ...e, privacy: undefined }));
                  }}
                  className="mt-1 h-4 w-4 shrink-0 rounded-sm border border-border accent-foreground"
                />
                <span className="text-xs tracking-wide text-muted-foreground leading-relaxed">
                  I agree to the processing of my personal data for order management purposes.{" "}
                  <span className="text-destructive">*</span>
                  <br />
                  <Link
                    to="/privacy"
                    className="text-foreground underline underline-offset-4 hover:opacity-70 transition-opacity"
                  >
                    Privacy Policy
                  </Link>
                </span>
              </label>
              {errors.privacy && <p className="text-destructive text-xs tracking-wide mt-2">{errors.privacy}</p>}
            </div>

            <button
              type="submit"
              className="mt-8 border border-foreground px-10 py-4 text-xs tracking-[0.3em] uppercase text-foreground transition-colors duration-300 hover:bg-foreground hover:text-background"
            >
              Submit Preorder ({items.length} {items.length === 1 ? "item" : "items"})
            </button>
          </form>
        </>
      )}
    </main>
  );
};

export default CartPage;