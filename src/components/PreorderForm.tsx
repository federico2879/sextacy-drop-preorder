import { useState, type FormEvent } from "react";

const SIZES = ["S", "M", "L", "XL"] as const;

const PreorderForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Submit to Google Form — replace the action URL and entry IDs with your own
    const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse";

    fetch(GOOGLE_FORM_URL, {
      method: "POST",
      body: data,
      mode: "no-cors",
    });

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section id="preorder" className="section-padding flex flex-col items-center justify-center min-h-[60vh] text-center">
        <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground mb-6">
          Confirmed
        </p>
        <p className="text-lg md:text-xl tracking-wide text-foreground max-w-md leading-relaxed">
          Thank you. We will contact you on WhatsApp to complete the order.
        </p>
      </section>
    );
  }

  return (
    <section id="preorder" className="section-padding max-w-lg mx-auto">
      <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground mb-16 text-center">
        Preorder
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

        <div>
          <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
            Size
          </p>
          <div className="flex gap-3">
            {SIZES.map((size) => (
              <label key={size} className="cursor-pointer">
                <input
                  type="radio"
                  name="entry.XXXXXXX4"
                  value={size}
                  required
                  className="sr-only peer"
                  checked={selectedSize === size}
                  onChange={() => setSelectedSize(size)}
                />
                <span className="inline-flex items-center justify-center w-12 h-12 border border-border text-xs tracking-widest text-muted-foreground transition-colors peer-checked:border-foreground peer-checked:text-foreground hover:border-foreground hover:text-foreground">
                  {size}
                </span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="mt-8 border border-foreground px-10 py-4 text-xs tracking-[0.3em] uppercase text-foreground transition-colors duration-300 hover:bg-foreground hover:text-background"
        >
          Submit Preorder
        </button>
      </form>
    </section>
  );
};

export default PreorderForm;
