import logo from "@/assets/sextacy-logo.png";
import Marquee from "@/components/Marquee";

const Hero = () => {
  const scrollToCollection = () => {
    document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="flex min-h-screen flex-col items-center justify-between py-16 sm:py-20 overflow-hidden">
      {/* Top: Title & Subtitle */}
      <div className="flex flex-col items-center text-center pt-8 sm:pt-12">
        <p className="mb-4 text-xs tracking-[0.4em] uppercase text-muted-foreground">
          Drop 01
        </p>
        <img
          src={logo}
          alt="Sextacy"
          className="h-8 sm:h-10 md:h-12 mb-5 w-auto"
        />
        <p className="text-sm md:text-base tracking-[0.2em] uppercase text-muted-foreground max-w-md">
          Respect the music
        </p>
      </div>

      {/* Middle: Scrolling Photos */}
      <div className="w-full my-4">
        <Marquee cardWidth="w-44 sm:w-56 md:w-64" speed={45} />
      </div>

      {/* Bottom: CTA Button */}
      <div className="pb-8 sm:pb-12">
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
