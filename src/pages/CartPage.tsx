import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { ArrowLeft, X } from "lucide-react";

const CartPage = () => {
  const { items, removeItem, clearCart } = useCart();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Append cart summary as a single field
    const cartSummary = items
      .map((item, i) => `${i + 1}. ${item.productName} — Size ${item.size}`)
      .join(" | ");
    data.append("entry.XXXXXXX4", cartSummary);

    const GOOGLE_FORM_URL =
      "https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse";

    fetch(GOOGLE_FORM_URL, {
      method: "POST",
      body: data,
      mode: "no-cors",
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
          {/* Cart items */}
          <div className="flex flex-col gap-4 mb-12">
            {items.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between border-b border-border pb-4"
              >
                <div>
                  <p className="text-sm tracking-[0.15em] uppercase text-foreground">
                    {item.productName}
                  </p>
                  <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mt-1">
                    Size {item.size}
                  </p>
                </div>
                <button
                  onClick={() => removeItem(i)}
                  className="text-muted-foreground hover:text-foreground transition-colors p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Preorder form */}
          <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground mb-8 text-center">
            Your Details
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <input
              name="entry.XXXXXXX1"
              type="text"
              placeholder="Name"
              required
              maxLength={100}
              className="bg-transparent border-b border-border px-0 py-4 text-sm tracking-wide text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
            />
            <input
              name="entry.XXXXXXX2"
              type="email"
              placeholder="Email"
              required
              maxLength={255}
              className="bg-transparent border-b border-border px-0 py-4 text-sm tracking-wide text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
            />
            <input
              name="entry.XXXXXXX3"
              type="tel"
              placeholder="Phone / WhatsApp"
              required
              maxLength={20}
              className="bg-transparent border-b border-border px-0 py-4 text-sm tracking-wide text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
            />

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
