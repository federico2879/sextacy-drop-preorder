const Footer = () => {
  return (
    <footer className="section-padding border-t border-border flex flex-col sm:flex-row items-center justify-between gap-6 text-xs tracking-[0.2em] uppercase text-muted-foreground">
      <p>© Sextacy</p>
      <a
        href="https://wa.me/39XXXXXXXXXX"
        target="_blank"
        rel="noopener noreferrer"
        className="transition-colors hover:text-foreground"
      >
        WhatsApp
      </a>
    </footer>
  );
};

export default Footer;
