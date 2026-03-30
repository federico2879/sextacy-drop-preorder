import { useEffect, useRef } from "react";
import eventsImg from "@/assets/landing/events.jpg";
import communityImg from "@/assets/landing/community.jpg";
import merchImg from "@/assets/landing/merch.jpg";
import playlistImg from "@/assets/landing/playlist.jpg";
import labelImg from "@/assets/landing/label.jpg";

const TextSection = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <section className="min-h-screen flex flex-col items-center justify-center px-6 py-32 md:py-40">
    {children}
  </section>
);

const ImageSection = ({ src, alt }: { src: string; alt: string }) => (
  <section className="w-full">
    <img
      src={src}
      alt={alt}
      loading="lazy"
      width={1920}
      height={1080}
      className="w-full h-[70vh] md:h-[85vh] object-cover"
    />
  </section>
);

const CTA = ({ children, href = "#" }: { children: React.ReactNode; href?: string }) => (
  <a
    href={href}
    className="mt-8 inline-block text-foreground/70 text-sm md:text-base tracking-[0.2em] uppercase border-b border-foreground/30 pb-1 hover:text-foreground hover:border-foreground transition-all duration-300"
  >
    {children}
  </a>
);

const Landing = () => {
  const sectionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-8");
          }
        });
      },
      { threshold: 0.15 }
    );

    const elements = sectionsRef.current?.querySelectorAll("[data-animate]");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionsRef}
      className="min-h-screen bg-background text-foreground overflow-x-hidden"
      style={{ background: "hsl(0 0% 3%)" }}
    >
      {/* HERO */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6">
        <h1
          data-animate
          className="opacity-0 translate-y-8 transition-all duration-1000 ease-out brand-title text-5xl md:text-8xl lg:text-9xl tracking-[0.3em] text-foreground text-center"
        >
          SEXTACY
        </h1>
        <p
          data-animate
          className="opacity-0 translate-y-8 transition-all duration-1000 delay-300 ease-out mt-6 text-muted-foreground text-sm md:text-base tracking-[0.25em] uppercase"
        >
          Respect the music.
        </p>
      </section>

      {/* IMAGE — EVENTS */}
      <ImageSection src={eventsImg} alt="Techno event atmosphere" />

      {/* EVENTS */}
      <TextSection>
        <div data-animate className="opacity-0 translate-y-8 transition-all duration-1000 ease-out text-center">
          <p className="text-muted-foreground text-xs md:text-sm tracking-[0.3em] uppercase mb-4">
            Next Event
          </p>
          <h2 className="brand-title text-3xl md:text-6xl lg:text-7xl tracking-[0.2em] text-foreground">
            Thursday — Torino
          </h2>
          <CTA>Join the night</CTA>
        </div>
      </TextSection>

      {/* IMAGE — COMMUNITY */}
      <ImageSection src={communityImg} alt="Community nightlife" />

      {/* COMMUNITY */}
      <TextSection>
        <div data-animate className="opacity-0 translate-y-8 transition-all duration-1000 ease-out text-center">
          <h2 className="brand-title text-3xl md:text-6xl lg:text-7xl tracking-[0.2em] text-foreground">
            Community
          </h2>
          <p className="mt-4 text-muted-foreground text-sm md:text-lg tracking-[0.15em]">
            Join the movement.
          </p>
          <CTA>Join WhatsApp</CTA>
        </div>
      </TextSection>

      {/* IMAGE — MERCH */}
      <ImageSection src={merchImg} alt="Streetwear fashion detail" />

      {/* MERCH */}
      <TextSection>
        <div data-animate className="opacity-0 translate-y-8 transition-all duration-1000 ease-out text-center">
          <h2 className="brand-title text-3xl md:text-6xl lg:text-7xl tracking-[0.2em] text-foreground">
            Drop // 01
          </h2>
          <CTA>View collection</CTA>
        </div>
      </TextSection>

      {/* IMAGE — PLAYLIST */}
      <ImageSection src={playlistImg} alt="DJ setup and music" />

      {/* PLAYLIST */}
      <TextSection>
        <div data-animate className="opacity-0 translate-y-8 transition-all duration-1000 ease-out text-center">
          <h2 className="brand-title text-3xl md:text-6xl lg:text-7xl tracking-[0.2em] text-foreground">
            Playlist
          </h2>
          <p className="mt-4 text-muted-foreground text-sm md:text-lg tracking-[0.15em]">
            Listen to the sound.
          </p>
          <CTA>Open Spotify</CTA>
        </div>
      </TextSection>

      {/* IMAGE — LABEL */}
      <ImageSection src={labelImg} alt="Music studio and visuals" />

      {/* LABEL */}
      <TextSection>
        <div data-animate className="opacity-0 translate-y-8 transition-all duration-1000 ease-out text-center">
          <h2 className="brand-title text-3xl md:text-6xl lg:text-7xl tracking-[0.2em] text-foreground">
            Sextacy Records
          </h2>
          <p className="mt-4 text-muted-foreground text-sm md:text-lg tracking-[0.15em]">
            Explore the label.
          </p>
        </div>
      </TextSection>
    </div>
  );
};

export default Landing;
