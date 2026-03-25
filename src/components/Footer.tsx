import { Instagram } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="section-padding border-t border-border">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-xs tracking-[0.2em] uppercase text-muted-foreground">
        <p>© Sextacy — Turin, Italy</p>
        <div className="flex items-center gap-6">
          <a
            href="https://instagram.com/sextacy.rtm"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 hover:text-foreground transition-colors"
          >
            <Instagram className="w-4 h-4" />
            Instagram
          </a>
          <span className="hidden sm:inline">·</span>
          <a
            href="mailto:info@sextacy.world"
            className="hover:text-foreground transition-colors"
          >
            Contact
          </a>
          <span className="hidden sm:inline">·</span>
          <Link
            to="/privacy"
            className="hover:text-foreground transition-colors"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;