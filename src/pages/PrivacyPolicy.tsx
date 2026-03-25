import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const PrivacyPolicy = () => (
  <main className="min-h-screen section-padding max-w-2xl mx-auto">
    <Link
      to="/"
      className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors mb-12"
    >
      <ArrowLeft className="w-4 h-4" />
      Back
    </Link>

    <h1 className="text-xs tracking-[0.4em] uppercase text-muted-foreground mb-12 text-center">
      Privacy Policy
    </h1>

    <div className="space-y-8 text-sm tracking-wide text-muted-foreground leading-relaxed">
      <p>
        Your personal data (name, email, phone number, Instagram handle) is collected solely for the purpose of managing your preorder and contacting you to complete your purchase.
      </p>
      <p>
        We do not share, sell, or distribute your data to third parties. Your information is stored securely and will only be used for order-related communications.
      </p>
      <p>
        By submitting the preorder form, you consent to the processing of your personal data as described above.
      </p>
      <p>
        For any questions or requests regarding your data, contact us via Instagram at{" "}
        <a
          href="https://instagram.com/sextacy.rtm"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground underline underline-offset-4 hover:opacity-70 transition-opacity"
        >
          @sextacy.rtm
        </a>
        .
      </p>
    </div>
  </main>
);

export default PrivacyPolicy;
