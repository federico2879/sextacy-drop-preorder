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

    <div className="space-y-10 text-sm tracking-wide text-muted-foreground leading-relaxed">
      <p>
        We respect your privacy and are committed to protecting your personal data.
      </p>

      <div>
        <h2 className="text-xs tracking-[0.3em] uppercase text-foreground mb-4">
          1. Data We Collect
        </h2>
        <p className="mb-2">We may collect:</p>
        <ul className="list-disc list-inside space-y-1 pl-2">
          <li>Name</li>
          <li>Email address</li>
          <li>Phone / WhatsApp number</li>
          <li>Preorder details (selected products, sizes, quantities)</li>
        </ul>
      </div>

      <div>
        <h2 className="text-xs tracking-[0.3em] uppercase text-foreground mb-4">
          2. Purpose of Data Collection
        </h2>
        <p className="mb-2">We collect this data only to:</p>
        <ul className="list-disc list-inside space-y-1 pl-2">
          <li>Manage and confirm preorders</li>
          <li>Contact customers regarding their order</li>
          <li>Provide customer support related to the preorder</li>
        </ul>
      </div>

      <div>
        <h2 className="text-xs tracking-[0.3em] uppercase text-foreground mb-4">
          3. How Data Is Stored
        </h2>
        <p>
          Submitted form data may be processed and stored using third-party tools such as Google Forms and Google Sheets.
          We also use Microsoft Clarity to understand how users interact with our website. Clarity may collect anonymized usage data such as clicks, scrolls, and session recordings.
        </p>
      </div>

      <div>
        <h2 className="text-xs tracking-[0.3em] uppercase text-foreground mb-4">
          4. Data Sharing
        </h2>
        <p>
          We do not sell your personal data. We only use the submitted information for preorder management.
        </p>
      </div>

      <div>
        <h2 className="text-xs tracking-[0.3em] uppercase text-foreground mb-4">
          5. Data Retention
        </h2>
        <p>
          We keep personal data only for as long as necessary to manage preorders and related communication.
        </p>
      </div>

      <div>
        <h2 className="text-xs tracking-[0.3em] uppercase text-foreground mb-4">
          6. Your Rights
        </h2>
        <p>
          You may request access, correction, or deletion of your personal data by contacting us.
        </p>
      </div>

      <div>
        <h2 className="text-xs tracking-[0.3em] uppercase text-foreground mb-4">
          7. Contact
        </h2>
        <p>
          For any privacy-related request, contact us at:{" "}
          <a
            href="mailto:info.rtmagency@gmail.com"
            className="text-foreground underline underline-offset-4 hover:opacity-70 transition-opacity"
          >
            info.rtmagency@gmail.com
          </a>
        </p>
      </div>
    </div>
  </main>
);

export default PrivacyPolicy;
