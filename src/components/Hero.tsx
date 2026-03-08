import logo from "@/assets/sextacy-logo.png";
import Marquee from "@/components/Marquee";

const Hero = () => {
  const scrollToCollection = () => {
    document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center text-center overflow-hidden">
      {/* Marquee as background */}
      <div className="absolute inset-0 flex items-center">
        <Marquee cardWidth="w-44 sm:w-56 md:w-64" speed={45} />
      </div>
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-background/60" />
      {/* Content on top */}
      <div className="relative z-10 flex flex-col items-center">
        <p className="mb-4 text-xs tracking-[0.4em] uppercase text-muted-foreground">
          Drop 01
        </p>
        <img
          src={logo}
          alt="Sextacy"
          className="h-8 sm:h-10 md:h-14 mb-6 w-auto"
        />
        <p className="text-sm md:text-base tracking-[0.2em] uppercase text-muted-foreground mb-10 max-w-md">
          Respect the music
        </p>
        <button
          onClick={scrollToCollection}
          className="border border-foreground px-10 py-4 text-xs tracking-[0.3em] uppercase text-foreground transition-colors duration-300 hover:bg-foreground hover:text-background"
        >
          Shop Collection
        </button>
      </div>
    </section>
  );
};

export default Hero;
