import { useEffect, useRef } from "react";
import eventsImg from "@/assets/landing/events.jpg";
import communityImg from "@/assets/landing/community.jpg";
import merchImg from "@/assets/landing/merch.jpg";
import playlistImg from "@/assets/landing/playlist.jpg";
import labelImg from "@/assets/landing/label.jpg";

const CTA = ({ children, href = "#" }: { children: React.ReactNode; href?: string }) => (
  <a
    href={href}
    className="inline-block text-white/60 text-[10px] md:text-xs tracking-[0.25em] uppercase border-b border-white/20 pb-0.5 hover:text-white hover:border-white transition-all duration-300"
  >
    {children}
  </a>
);

const Cross = ({ className = "" }: { className?: string }) => (
  <span className={`text-white/15 text-xs select-none ${className}`}>+</span>
);

const Landing = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-6");
          }
        });
      },
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll("[data-a]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="min-h-screen bg-black text-white overflow-x-hidden selection:bg-white/20"
    >
      {/* ─── HERO COLLAGE ─── */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        {/* Floating image — top left */}
        <img
          src={eventsImg}
          alt=""
          className="absolute top-[8%] left-[4%] w-[28vw] md:w-[18vw] h-[35vh] md:h-[40vh] object-cover -rotate-3 opacity-70"
        />
        {/* Floating image — right */}
        <img
          src={communityImg}
          alt=""
          className="absolute top-[15%] right-[6%] w-[22vw] md:w-[14vw] h-[28vh] md:h-[32vh] object-cover rotate-2 opacity-60"
        />
        {/* Floating image — bottom center-left */}
        <img
          src={merchImg}
          alt=""
          className="absolute bottom-[10%] left-[15%] w-[30vw] md:w-[16vw] h-[22vh] md:h-[26vh] object-cover rotate-1 opacity-50"
        />

        {/* Main title */}
        <div data-a className="opacity-0 translate-y-6 transition-all duration-1000 ease-out relative z-10 text-center">
          <h1 className="brand-title text-[15vw] md:text-[12vw] lg:text-[10vw] leading-[0.85] tracking-[0.2em] text-white mix-blend-difference">
            SEXTACY
          </h1>
          <p className="mt-4 text-white/40 text-[10px] md:text-xs tracking-[0.35em] uppercase">
            Respect the music.
          </p>
        </div>

        {/* Decorative crosses */}
        <Cross className="absolute top-[20%] left-[42%]" />
        <Cross className="absolute bottom-[25%] right-[30%]" />

        {/* Thin vertical line */}
        <div className="absolute left-1/2 bottom-0 w-px h-16 bg-gradient-to-b from-transparent to-white/10" />
      </section>

      {/* ─── EDITORIAL COMPOSITION ─── */}
      <div className="relative px-4 md:px-0" style={{ minHeight: "300vh" }}>

        {/* ── Events block — top right ── */}
        <div
          data-a
          className="opacity-0 translate-y-6 transition-all duration-1000 ease-out absolute top-[4%] right-[8%] md:right-[12%] text-right z-10"
        >
          <p className="text-white/30 text-[9px] md:text-[10px] tracking-[0.35em] uppercase mb-2">Next Event</p>
          <h2 className="brand-title text-2xl md:text-5xl lg:text-6xl tracking-[0.15em]">
            Thursday<br />— Torino
          </h2>
          <div className="mt-4">
            <CTA>Join the night</CTA>
          </div>
        </div>

        {/* Image — large, left side */}
        <img
          src={playlistImg}
          alt=""
          data-a
          className="opacity-0 translate-y-6 transition-all duration-1000 ease-out absolute top-[2%] left-[4%] md:left-[8%] w-[45vw] md:w-[30vw] h-[50vh] md:h-[55vh] object-cover -rotate-1"
        />

        {/* Thin horizontal line */}
        <div className="absolute top-[28%] left-[10%] w-[25vw] h-px bg-white/8" />
        <Cross className="absolute top-[28%] left-[36%]" />

        {/* Editorial phrase — floating */}
        <p
          data-a
          className="opacity-0 translate-y-6 transition-all duration-1000 ease-out absolute top-[32%] left-[6%] md:left-[10%] text-white/20 text-[10px] md:text-xs tracking-[0.4em] uppercase -rotate-90 origin-bottom-left"
        >
          The night is not for everyone.
        </p>

        {/* ── Community block — center left ── */}
        <div
          data-a
          className="opacity-0 translate-y-6 transition-all duration-1000 ease-out absolute top-[35%] left-[8%] md:left-[15%] z-10"
        >
          <h2 className="brand-title text-3xl md:text-6xl tracking-[0.2em]">Community</h2>
          <div className="mt-3">
            <CTA>Join WhatsApp</CTA>
          </div>
        </div>

        {/* Image — medium, right offset */}
        <img
          src={labelImg}
          alt=""
          data-a
          className="opacity-0 translate-y-6 transition-all duration-1000 ease-out absolute top-[30%] right-[4%] md:right-[10%] w-[35vw] md:w-[22vw] h-[35vh] md:h-[40vh] object-cover rotate-2"
        />

        {/* ── Merch block — right side ── */}
        <div
          data-a
          className="opacity-0 translate-y-6 transition-all duration-1000 ease-out absolute top-[52%] right-[10%] md:right-[18%] text-right z-10"
        >
          <h2 className="brand-title text-3xl md:text-5xl tracking-[0.2em]">Drop // 01</h2>
          <div className="mt-3">
            <CTA>View collection</CTA>
          </div>
        </div>

        {/* Image — small, center */}
        <img
          src={eventsImg}
          alt=""
          data-a
          className="opacity-0 translate-y-6 transition-all duration-1000 ease-out absolute top-[50%] left-[20%] md:left-[30%] w-[25vw] md:w-[15vw] h-[25vh] md:h-[30vh] object-cover -rotate-2 opacity-60"
        />

        {/* Decorative elements */}
        <div className="absolute top-[58%] left-[12%] w-px h-24 bg-white/6" />
        <Cross className="absolute top-[62%] left-[50%]" />

        {/* ── Playlist block — left side ── */}
        <div
          data-a
          className="opacity-0 translate-y-6 transition-all duration-1000 ease-out absolute top-[68%] left-[6%] md:left-[12%] z-10"
        >
          <h2 className="brand-title text-3xl md:text-5xl tracking-[0.2em]">Playlist</h2>
          <p className="mt-2 text-white/30 text-[10px] md:text-xs tracking-[0.2em]">Listen to the sound.</p>
          <div className="mt-3">
            <CTA>Open Spotify</CTA>
          </div>
        </div>

        {/* Image — right, large */}
        <img
          src={communityImg}
          alt=""
          data-a
          className="opacity-0 translate-y-6 transition-all duration-1000 ease-out absolute top-[65%] right-[6%] md:right-[8%] w-[40vw] md:w-[25vw] h-[40vh] md:h-[45vh] object-cover rotate-1 opacity-70"
        />

        {/* Thin line */}
        <div className="absolute top-[78%] right-[15%] w-[20vw] h-px bg-white/8" />

        {/* ── Label block — center bottom ── */}
        <div
          data-a
          className="opacity-0 translate-y-6 transition-all duration-1000 ease-out absolute top-[85%] left-1/2 -translate-x-1/2 text-center z-10"
        >
          <h2 className="brand-title text-4xl md:text-7xl tracking-[0.2em]">Sextacy Records</h2>
          <p className="mt-3 text-white/25 text-[10px] md:text-xs tracking-[0.3em] uppercase">
            Explore the label.
          </p>
        </div>

        {/* Small floating image near label */}
        <img
          src={playlistImg}
          alt=""
          className="absolute top-[88%] left-[8%] w-[18vw] md:w-[10vw] h-[15vh] md:h-[18vh] object-cover -rotate-3 opacity-40"
        />

        <Cross className="absolute top-[92%] right-[20%]" />
      </div>

      {/* Bottom breathing space */}
      <div className="h-[20vh]" />
    </div>
  );
};

export default Landing;
