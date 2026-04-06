import { useEffect, useRef } from "react";
import events1 from "@/assets/landing/events1.jpg";
import events2 from "@/assets/landing/events2.jpg";
import events3 from "@/assets/landing/events3.jpg";
import community1 from "@/assets/landing/community1.jpg";
import community2 from "@/assets/landing/community2.jpg";
import community3 from "@/assets/landing/community3.jpg";
import community4 from "@/assets/landing/community4.jpg";
import merch1 from "@/assets/landing/merch1.jpg";
import merch2 from "@/assets/landing/merch2.jpg";
import merch3 from "@/assets/landing/merch3.jpg";
import merch4 from "@/assets/landing/merch4.jpg";
import playlist1 from "@/assets/landing/playlist1.jpg";
import label1 from "@/assets/landing/label1.png";
import label2 from "@/assets/landing/label2.jpg";

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
      {/* ─── HERO ─── */}
      <section className="relative h-screen">
        {/* Image — bleeds from left, overlapped BY title */}
        <img
          src={events1}
          alt=""
          className="absolute top-[10%] -left-[5%] w-[55vw] md:w-[38vw] h-[70vh] object-cover -rotate-2 opacity-60"
        />
        {/* Image — top right, smaller, higher */}
        <img
          src={community1}
          alt=""
          className="absolute top-[5%] right-[3%] w-[28vw] md:w-[18vw] h-[35vh] object-cover rotate-3 opacity-50"
        />
        {/* Image — bottom right, overlaps with title */}
        <img
          src={merch1}
          alt=""
          className="absolute bottom-[8%] right-[10%] w-[35vw] md:w-[22vw] h-[40vh] object-cover -rotate-1 opacity-40 z-[5]"
        />

        {/* TITLE — massive, overlaps images */}
        <div className="absolute inset-0 flex items-center justify-center z-[3]">
          <div data-a className="opacity-0 translate-y-6 transition-all duration-1000 ease-out">
            <h1
              className="brand-title text-[22vw] md:text-[16vw] leading-[0.8] tracking-[0.18em] text-white mix-blend-difference text-center"
              style={{ marginLeft: "-3vw" }}
            >
              SEXTACY
            </h1>
          </div>
        </div>

        {/* Small caption — off-center right */}
        <p
          data-a
          className="opacity-0 translate-y-6 transition-all duration-1000 ease-out absolute bottom-[18%] left-[58%] md:left-[62%] text-white/30 text-[9px] md:text-[11px] tracking-[0.4em] uppercase z-[6]"
        >
          Respect the music.
        </p>

        <Cross className="absolute top-[22%] left-[48%] z-[8]" />
        <Cross className="absolute bottom-[30%] right-[25%] z-[8]" />

        {/* Bleed line */}
        <div className="absolute left-[42%] bottom-0 w-px h-28 bg-gradient-to-b from-transparent to-white/8" />
      </section>

      {/* ─── EDITORIAL COMPOSITION ─── */}
      <div className="relative" style={{ height: "380vh" }}>

        {/* ── EVENTS — text overlaps image ── */}
        <img
          src={events2}
          alt=""
          data-a
          className="opacity-0 translate-y-6 transition-all duration-1000 ease-out absolute top-[2%] left-[-3%] w-[60vw] md:w-[42vw] h-[60vh] object-cover -rotate-1"
        />
        <div
          data-a
          className="opacity-0 translate-y-6 transition-all duration-1000 ease-out absolute top-[6%] left-[30%] md:left-[28%] z-10"
        >
          <p className="text-white/25 text-[8px] md:text-[10px] tracking-[0.4em] uppercase mb-1">Next Event</p>
          <h2 className="brand-title text-[8vw] md:text-[5.5vw] tracking-[0.12em] leading-[0.85]">
            Thursday<br />— Torino
          </h2>
          <div className="mt-4">
            <CTA>Join the night</CTA>
          </div>
        </div>

        {/* Rotated editorial phrase — overlaps event image */}
        <p
          data-a
          className="opacity-0 translate-y-6 transition-all duration-1000 ease-out absolute top-[14%] right-[8%] text-white/12 text-[10px] tracking-[0.5em] uppercase -rotate-90 origin-bottom-right whitespace-nowrap"
        >
          The night is not for everyone.
        </p>

        {/* thin line */}
        <div className="absolute top-[20%] left-[15%] w-[35vw] h-px bg-white/6" />
        <Cross className="absolute top-[20%] left-[51%]" />

        {/* ── COMMUNITY — image overlaps text ── */}
        <div
          data-a
          className="opacity-0 translate-y-6 transition-all duration-1000 ease-out absolute top-[24%] right-[5%] md:right-[12%] text-right z-[2]"
        >
          <h2 className="brand-title text-[10vw] md:text-[7vw] tracking-[0.2em] leading-[0.85]">
            Comm<br className="md:hidden" />unity
          </h2>
          <div className="mt-3">
            <CTA>Join WhatsApp</CTA>
          </div>
        </div>
        {/* Image ON TOP of community text, partially covering */}
        <img
          src={community2}
          alt=""
          data-a
          className="opacity-0 translate-y-6 transition-all duration-1000 ease-out absolute top-[22%] right-[18%] md:right-[22%] w-[40vw] md:w-[28vw] h-[45vh] object-cover rotate-2 opacity-70 z-[3]"
        />
        {/* Small image floating left, tension */}
        <img
          src={events3}
          alt=""
          className="absolute top-[28%] left-[3%] w-[20vw] md:w-[12vw] h-[18vh] object-cover -rotate-3 opacity-30"
        />

        {/* ── MERCH — dense cluster ── */}
        <img
          src={merchImg}
          alt=""
          data-a
          className="opacity-0 translate-y-6 transition-all duration-1000 ease-out absolute top-[42%] left-[8%] md:left-[15%] w-[50vw] md:w-[32vw] h-[55vh] object-cover rotate-1 z-[2]"
        />
        <div
          data-a
          className="opacity-0 translate-y-6 transition-all duration-1000 ease-out absolute top-[46%] left-[35%] md:left-[32%] z-[5]"
        >
          <h2 className="brand-title text-[9vw] md:text-[6vw] tracking-[0.15em] text-white mix-blend-difference">
            Drop // 01
          </h2>
          <div className="mt-3">
            <CTA>View collection</CTA>
          </div>
        </div>

        {/* Vertical line */}
        <div className="absolute top-[52%] right-[20%] w-px h-32 bg-white/5" />
        <Cross className="absolute top-[55%] right-[35%]" />

        {/* Small floating image — right side, merch area */}
        <img
          src={communityImg}
          alt=""
          className="absolute top-[50%] right-[4%] w-[18vw] md:w-[11vw] h-[20vh] object-cover -rotate-2 opacity-35 z-[1]"
        />

        {/* ── PLAYLIST — text massive, image underneath ── */}
        <div
          data-a
          className="opacity-0 translate-y-6 transition-all duration-1000 ease-out absolute top-[66%] right-[3%] md:right-[8%] text-right z-[4]"
        >
          <h2 className="brand-title text-[12vw] md:text-[8vw] tracking-[0.2em] leading-[0.8] text-white mix-blend-difference">
            Playlist
          </h2>
          <p className="mt-2 text-white/20 text-[9px] md:text-[11px] tracking-[0.3em] uppercase">
            Listen to the sound.
          </p>
          <div className="mt-3">
            <CTA>Open Spotify</CTA>
          </div>
        </div>
        {/* Image under playlist text */}
        <img
          src={playlistImg}
          alt=""
          data-a
          className="opacity-0 translate-y-6 transition-all duration-1000 ease-out absolute top-[64%] right-[15%] md:right-[18%] w-[45vw] md:w-[30vw] h-[50vh] object-cover -rotate-1 opacity-60 z-[1]"
        />
        {/* Counterweight image — left, small */}
        <img
          src={labelImg}
          alt=""
          className="absolute top-[70%] left-[2%] w-[22vw] md:w-[13vw] h-[22vh] object-cover rotate-3 opacity-25"
        />

        <div className="absolute top-[78%] left-[10%] w-[30vw] h-px bg-white/5" />

        {/* ── LABEL — final, centered but off ── */}
        <div
          data-a
          className="opacity-0 translate-y-6 transition-all duration-1000 ease-out absolute top-[85%] left-[8%] md:left-[15%] z-[6]"
        >
          <h2 className="brand-title text-[11vw] md:text-[8vw] tracking-[0.18em] leading-[0.85]">
            Sextacy<br />Records
          </h2>
          <p className="mt-3 text-white/18 text-[9px] md:text-[10px] tracking-[0.35em] uppercase">
            Explore the label.
          </p>
        </div>
        {/* Image overlapping label text from right */}
        <img
          src={eventsImg}
          alt=""
          className="absolute top-[84%] right-[5%] md:right-[12%] w-[38vw] md:w-[25vw] h-[35vh] object-cover -rotate-2 opacity-45 z-[4]"
        />
        <img
          src={communityImg}
          alt=""
          className="absolute top-[90%] left-[45%] w-[15vw] md:w-[9vw] h-[14vh] object-cover rotate-1 opacity-20 z-[2]"
        />

        <Cross className="absolute top-[92%] right-[30%]" />
        <Cross className="absolute top-[88%] left-[40%]" />
      </div>

      {/* Bottom breathing */}
      <div className="h-[15vh]" />
    </div>
  );
};

export default Landing;
