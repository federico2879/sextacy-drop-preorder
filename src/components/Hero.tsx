import logo from "@/assets/sextacy-logo.png";
import Marquee from "@/components/Marquee";

const Hero = () => {
  const scrollToCollection = () => {
    document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="flex min-h-screen flex-col items-center justify-center text-center">
      <p className="mb-6 text-xs tracking-[0.4em] uppercase text-muted-foreground">
        Drop 01
      </p>
      <img
        src={logo}
        alt="Sextacy"
        className="h-12 sm:h-16 md:h-20 mb-8 w-auto"
      />
      <p className="text-sm md:text-base tracking-[0.2em] uppercase text-muted-foreground mb-10 max-w-md">
        Respect the music
      </p>
      <Marquee />
      <div className="mt-10">
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
