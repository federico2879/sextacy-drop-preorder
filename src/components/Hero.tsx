const Hero = () => {
  const scrollToPreorder = () => {
    document.getElementById("preorder")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="flex min-h-screen flex-col items-center justify-center section-padding text-center">
      <p className="mb-6 text-xs tracking-[0.4em] uppercase text-muted-foreground">
        Drop 01
      </p>
      <h1 className="brand-title text-6xl sm:text-8xl md:text-9xl font-bold text-foreground mb-8">
        SEXTACY
      </h1>
      <p className="text-sm md:text-base tracking-[0.2em] uppercase text-muted-foreground mb-16 max-w-md">
        No phones. No distractions. Just presence.
      </p>
      <button
        onClick={scrollToPreorder}
        className="border border-foreground px-10 py-4 text-xs tracking-[0.3em] uppercase text-foreground transition-colors duration-300 hover:bg-foreground hover:text-background"
      >
        Join Preorder
      </button>
    </section>
  );
};

export default Hero;
