import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

const SIZES = ["S", "M", "L", "XL"] as const;

const PreorderForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>("");
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate(e.currentTarget)) return;
    const form = e.currentTarget;
    const data = new FormData(form);

    // Submit to Google Form — replace the action URL and entry IDs with your own
    const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLScFdLDMTHsnywVenibUMfy6FCoc5qBz0aKmEQoLIMwn46Y65w/formResponse";

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
  };

  if (submitted) {
    return (
      <section id="preorder" className="section-padding flex flex-col items-center justify-center min-h-[60vh] text-center">
        <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground mb-6">
          Request Received
        </p>
        <p className="text-lg md:text-xl tracking-wide text-foreground max-w-md leading-relaxed mb-4">
          Your preorder request has been received.
        </p>
        <p className="text-sm tracking-wide text-muted-foreground max-w-md leading-relaxed">
          We'll contact you soon with the next steps.
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

        <div>
          <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
            Size
          </p>
          <div className="flex gap-3">
            {SIZES.map((size) => (
              <label key={size} className="cursor-pointer">
                <input
                  type="radio"
                  name="entry.2129795582"
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
          Submit Preorder
        </button>
      </form>
    </section>
  );
};

export default PreorderForm;
