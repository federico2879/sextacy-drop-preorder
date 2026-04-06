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
import logo from "@/assets/sextacy-logo.png";

const CTA = ({ children, href = "#" }: { children: React.ReactNode; href?: string }) => (
  <a
    href={href}
    className="inline-block text-white/50 text-[10px] md:text-xs tracking-[0.3em] uppercase border-b border-white/15 pb-0.5 hover:text-white hover:border-white/60 transition-all duration-500"
  >
    {children}
  </a>
);

const Cross = ({ className = "" }: { className?: string }) => (
  <span className={`text-white/10 text-[10px] select-none ${className}`}>✦</span>
);

const Landing = () => {
  const ref = useRef<HTMLDivElement>(null);

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
      { threshold: 0.08 }
    );
    ref.current?.querySelectorAll("[data-a]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="min-h-screen bg-black text-white overflow-x-hidden selection:bg-white/20"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* ─── HERO ─── */}
      <section className="relative h-screen">
        {/* Hero event image — large, bleeds left */}
        <img
          src={events1}
          alt=""
          className="absolute top-[8%] -left-[4%] w-[58vw] md:w-[42vw] h-[75vh] object-cover -rotate-2 opacity-50 rounded-sm"
        />
        {/* Community — top right accent */}
        <img
          src={community1}
          alt=""
          className="absolute top-[4%] right-[2%] w-[30vw] md:w-[20vw] h-[38vh] object-cover rotate-[2.5deg] opacity-40 rounded-sm"
        />
        {/* Merch — bottom right, overlaps logo */}
        <img
          src={merch1}
          alt=""
          className="absolute bottom-[6%] right-[8%] w-[38vw] md:w-[24vw] h-[44vh] object-cover -rotate-1 opacity-35 z-[5] rounded-sm"
        />

        {/* LOGO — white, massive, centered */}
        <div className="absolute inset-0 flex items-center justify-center z-[6]">
          <div data-a className="opacity-0 translate-y-8 transition-all duration-[1.2s] ease-out">
            <img
              src={logo}
              alt="SEXTACY"
              className="w-[75vw] md:w-[52vw] brightness-0 invert drop-shadow-[0_0_80px_rgba(255,255,255,0.06)]"
            />
          </div>
        </div>

        {/* Tagline — offset right */}
        <p
          data-a
          className="opacity-0 translate-y-8 transition-all duration-1000 ease-out delay-300 absolute bottom-[16%] left-[56%] md:left-[60%] text-white/25 text-[9px] md:text-[11px] tracking-[0.45em] uppercase z-[7]"
        >
          Respect the music.
        </p>

        <Cross className="absolute top-[20%] left-[46%] z-[8]" />
        <Cross className="absolute bottom-[28%] right-[22%] z-[8]" />

        {/* Bleed line */}
        <div className="absolute left-[40%] bottom-0 w-px h-32 bg-gradient-to-b from-transparent to-white/6" />
      </section>

      {/* ─── EDITORIAL COMPOSITION ─── */}
      <div className="relative" style={{ height: "420vh" }}>

        {/* ══════ EVENTS ══════ */}
        {/* Large event image — dominant, bleeds left */}
        <img
          src={events2}
          alt=""
          data-a
          className="opacity-0 translate-y-8 transition-all duration-[1.2s] ease-out absolute top-[1%] left-[-4%] w-[65vw] md:w-[46vw] h-[65vh] object-cover -rotate-1 rounded-sm opacity-70"
        />
        {/* Smaller event accent — right side */}
        <img
          src={events3}
          alt=""
          data-a
          className="opacity-0 translate-y-8 transition-all duration-1000 ease-out absolute top-[8%] right-[3%] w-[28vw] md:w-[18vw] h-[30vh] object-cover rotate-[2deg] opacity-30 rounded-sm z-[1]"
        />
        {/* Event text — overlaps large image */}
        <div
          data-a
          className="opacity-0 translate-y-8 transition-all duration-1000 ease-out absolute top-[5%] left-[32%] md:left-[30%] z-[10]"
        >
          <p className="text-white/20 text-[8px] md:text-[10px] tracking-[0.5em] uppercase mb-2">Next Event</p>
          <h2 className="font-extralight uppercase text-[9vw] md:text-[6vw] tracking-[0.14em] leading-[0.82]">
            Thursday<br />— Torino
          </h2>
          <div className="mt-5">
            <CTA>Join the night</CTA>
          </div>
        </div>

        {/* Rotated editorial whisper */}
        <p
          data-a
          className="opacity-0 translate-y-8 transition-all duration-1000 ease-out absolute top-[13%] right-[6%] text-white/8 text-[9px] tracking-[0.6em] uppercase -rotate-90 origin-bottom-right whitespace-nowrap z-[2]"
        >
          The night is not for everyone.
        </p>

        {/* Divider */}
        <div className="absolute top-[19%] left-[12%] w-[40vw] h-px bg-white/5" />
        <Cross className="absolute top-[19%] left-[53%]" />

        {/* ══════ COMMUNITY ══════ */}
        {/* Large community image — right, dominant */}
        <img
          src={community2}
          alt=""
          data-a
          className="opacity-0 translate-y-8 transition-all duration-[1.2s] ease-out absolute top-[22%] right-[-3%] w-[55vw] md:w-[38vw] h-[60vh] object-cover rotate-[1.5deg] opacity-60 rounded-sm z-[3]"
        />
        {/* Small community accent — left counterweight */}
        <img
          src={community3}
          alt=""
          className="absolute top-[28%] left-[2%] w-[22vw] md:w-[14vw] h-[22vh] object-cover -rotate-3 opacity-25 rounded-sm z-[1]"
        />
        {/* Community text — overlaps image from left */}
        <div
          data-a
          className="opacity-0 translate-y-8 transition-all duration-1000 ease-out absolute top-[24%] left-[5%] md:left-[10%] z-[5]"
        >
          <h2 className="font-extralight uppercase text-[11vw] md:text-[7.5vw] tracking-[0.2em] leading-[0.82]">
            Comm<br className="md:hidden" />unity
          </h2>
          <p className="mt-2 text-white/15 text-[8px] md:text-[10px] tracking-[0.4em] uppercase">
            Find your people.
          </p>
          <div className="mt-4">
            <CTA>Join WhatsApp</CTA>
          </div>
        </div>

        {/* Community4 — floating overlap between community & merch */}
        <img
          src={community4}
          alt=""
          data-a
          className="opacity-0 translate-y-8 transition-all duration-1000 ease-out absolute top-[34%] left-[38%] md:left-[35%] w-[24vw] md:w-[16vw] h-[24vh] object-cover -rotate-[1.5deg] opacity-35 rounded-sm z-[4]"
        />

        <Cross className="absolute top-[38%] right-[28%]" />

        {/* ══════ MERCH ══════ */}
        {/* Large merch image — left, dominant */}
        <img
          src={merch2}
          alt=""
          data-a
          className="opacity-0 translate-y-8 transition-all duration-[1.2s] ease-out absolute top-[41%] left-[5%] md:left-[10%] w-[55vw] md:w-[36vw] h-[62vh] object-cover rotate-[0.8deg] rounded-sm z-[2]"
        />
        {/* Medium merch — overlapping right */}
        <img
          src={merch3}
          alt=""
          data-a
          className="opacity-0 translate-y-8 transition-all duration-1000 ease-out absolute top-[46%] right-[4%] md:right-[8%] w-[32vw] md:w-[20vw] h-[35vh] object-cover -rotate-[2deg] opacity-50 rounded-sm z-[3]"
        />
        {/* Small merch accent */}
        <img
          src={merch4}
          alt=""
          className="absolute top-[54%] right-[30%] md:right-[32%] w-[16vw] md:w-[10vw] h-[16vh] object-cover rotate-[3deg] opacity-25 rounded-sm z-[1]"
        />
        {/* Merch text — overlaps images */}
        <div
          data-a
          className="opacity-0 translate-y-8 transition-all duration-1000 ease-out absolute top-[44%] left-[32%] md:left-[30%] z-[6]"
        >
          <h2 className="font-extralight uppercase text-[10vw] md:text-[7vw] tracking-[0.15em] leading-[0.8] text-white mix-blend-difference">
            Drop // 01
          </h2>
          <div className="mt-4">
            <CTA>View collection</CTA>
          </div>
        </div>

        {/* Vertical accent */}
        <div className="absolute top-[56%] right-[18%] w-px h-36 bg-white/4" />
        <Cross className="absolute top-[58%] left-[8%]" />

        {/* ══════ PLAYLIST ══════ */}
        {/* Playlist image — large, right side */}
        <img
          src={playlist1}
          alt=""
          data-a
          className="opacity-0 translate-y-8 transition-all duration-[1.2s] ease-out absolute top-[63%] right-[5%] md:right-[10%] w-[50vw] md:w-[34vw] h-[55vh] object-cover -rotate-[1deg] opacity-55 rounded-sm z-[1]"
        />
        {/* Label1 — small counterweight left */}
        <img
          src={label1}
          alt=""
          className="absolute top-[70%] left-[1%] w-[20vw] md:w-[12vw] h-[20vh] object-cover rotate-[2.5deg] opacity-20 rounded-sm z-[1]"
        />
        {/* Playlist text — massive, overlaps image */}
        <div
          data-a
          className="opacity-0 translate-y-8 transition-all duration-1000 ease-out absolute top-[65%] left-[5%] md:left-[8%] z-[5]"
        >
          <h2 className="font-extralight uppercase text-[14vw] md:text-[9vw] tracking-[0.22em] leading-[0.78] text-white mix-blend-difference">
            Playlist
          </h2>
          <p className="mt-3 text-white/15 text-[9px] md:text-[11px] tracking-[0.35em] uppercase">
            Listen to the sound.
          </p>
          <div className="mt-4">
            <CTA>Open Spotify</CTA>
          </div>
        </div>

        <div className="absolute top-[76%] left-[8%] w-[35vw] h-px bg-white/4" />
        <Cross className="absolute top-[76%] left-[44%]" />

        {/* ══════ LABEL ══════ */}
        {/* Label image — large, right overlapping */}
        <img
          src={label2}
          alt=""
          data-a
          className="opacity-0 translate-y-8 transition-all duration-[1.2s] ease-out absolute top-[82%] right-[3%] md:right-[8%] w-[45vw] md:w-[30vw] h-[42vh] object-cover -rotate-[1.5deg] opacity-45 rounded-sm z-[3]"
        />
        {/* Small community image — floating accent */}
        <img
          src={events3}
          alt=""
          className="absolute top-[88%] left-[42%] md:left-[38%] w-[14vw] md:w-[9vw] h-[12vh] object-cover rotate-[1.5deg] opacity-15 rounded-sm z-[2]"
        />
        {/* Label text */}
        <div
          data-a
          className="opacity-0 translate-y-8 transition-all duration-1000 ease-out absolute top-[83%] left-[6%] md:left-[12%] z-[6]"
        >
          <h2 className="font-extralight uppercase text-[12vw] md:text-[8.5vw] tracking-[0.18em] leading-[0.82]">
            Sextacy<br />Records
          </h2>
          <p className="mt-3 text-white/12 text-[9px] md:text-[10px] tracking-[0.4em] uppercase">
            Explore the label.
          </p>
        </div>

        <Cross className="absolute top-[91%] right-[28%]" />
        <Cross className="absolute top-[86%] left-[38%]" />
      </div>

      {/* Bottom breathing */}
      <div className="h-[18vh]" />
    </div>
  );
};

export default Landing;
