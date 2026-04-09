import { useEffect, useRef } from "react";
import logo from "@/assets/sextacy-logo.png";

// Load Clash Display font (scoped to landing only)
const clashLink = document.createElement("link");
clashLink.rel = "stylesheet";
clashLink.href = "https://api.fontshare.com/v2/css?f[]=clash-display@200,300,400,500,600,700&display=swap";
if (!document.querySelector(`link[href="${clashLink.href}"]`)) {
  document.head.appendChild(clashLink);
}

const clashFont = "'Clash Display', 'Inter', sans-serif";

const LANDING_IMAGEKIT_BASE = "https://ik.imagekit.io/sextacy/landing/";

const getLandingImage = (filename: string, transform = "w-1200,q-70,f-auto") =>
  `${LANDING_IMAGEKIT_BASE}${filename}?tr=${transform}`;

const events2 = getLandingImage("events2.jpg", "w-1800,q-70,f-auto");
const events1 = getLandingImage("events1.jpg", "w-1200,q-70,f-auto");
const community1 = getLandingImage("community1.jpg", "w-1200,q-70,f-auto");
const merch1 = getLandingImage("merch1.jpg", "w-1200,q-70,f-auto");
const playlist1 = getLandingImage("playlist1.jpg", "w-1200,q-70,f-auto");
const label2 = getLandingImage("label2.jpg", "w-800,q-70,f-auto");

const Section = ({
  title,
  description,
  image,
  cta,
  link,
  reverse = false,
  imageClass = "",
}: {
  title: string;
  description: string;
  image: string;
  cta: string;
  link?: string;
  reverse?: boolean;
  imageClass?: string;
}) => (
  <section
    data-a
    className={`opacity-0 translate-y-8 transition-all duration-[1s] ease-out min-h-screen flex flex-col ${
      reverse ? "md:flex-row-reverse" : "md:flex-row"
    } items-center gap-8 md:gap-16 px-6 md:px-16 lg:px-24 py-24 md:py-0`}
  >
    <div className="w-full md:w-1/2 flex flex-col justify-center">
      <h2 className="text-4xl md:text-6xl lg:text-7xl font-semibold uppercase tracking-[0.18em] leading-[0.9] mb-5" style={{ fontFamily: clashFont }}>
        {title}
      </h2>
      <p className="text-sm md:text-base tracking-[0.2em] text-white/40 mb-8 max-w-sm">
        {description}
      </p>
      <div>
        <a
          href={link || "#"}
          onClick={link ? undefined : (e) => e.preventDefault()}
          target={link?.startsWith("http") ? "_blank" : undefined}
          rel={link?.startsWith("http") ? "noopener noreferrer" : undefined}
          className="inline-block text-xs tracking-[0.3em] uppercase border border-white/20 px-8 py-3 text-white/60 hover:text-white hover:border-white/60 transition-all duration-500 font-medium"
          style={{ fontFamily: clashFont }}
        >
          {cta}
        </a>
      </div>
    </div>
    <div className="w-full md:w-1/2">
      <img
        src={image}
        alt={title}
        className={`w-full h-[50vh] md:h-[70vh] object-cover rounded-sm opacity-80 ${imageClass}`}
      />
    </div>
  </section>
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

  const scrollToContent = () => {
    document.getElementById("landing-sections")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      ref={ref}
      className="min-h-screen bg-black text-white overflow-x-hidden selection:bg-white/20"
      style={{ fontFamily: "'Clash Display', 'Inter', sans-serif" }}
    >
      {/* ─── HERO ─── */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <img
          src={events2}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black" />

        <div className="relative z-10 flex flex-col items-center text-center px-6 md:translate-y-14 -translate-y-[16vh]">
          <div data-a className="opacity-0 translate-y-8 transition-all duration-[1.2s] ease-out mb-4 md:mb-10">
            <img
              src={logo}
              alt="SEXTACY"
              className="w-[65vw] md:w-[40vw] lg:w-[30vw] brightness-0 invert"
            />
          </div>
          <p
            data-a
            className="opacity-0 translate-y-8 transition-all duration-1000 ease-out delay-300 text-white/40 text-xs md:text-sm tracking-[0.4em] uppercase mb-[32vh] md:mb-[13.5rem] font-medium"
            style={{ fontFamily: clashFont }}
          >
            Respect the music.
          </p>
          <button
            data-a
            onClick={scrollToContent}
            className="opacity-0 translate-y-8 transition-all duration-1000 ease-out delay-500 border border-white/30 px-10 py-4 text-xs tracking-[0.3em] uppercase text-white/70 hover:text-white hover:border-white hover:bg-white/5 transition-colors duration-500 font-medium"
            style={{ fontFamily: clashFont }}
          >
            Explore now
          </button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
      </section>

      {/* ─── SECTIONS ─── */}
      <div id="landing-sections" className="space-y-8">
        <Section
          title="Events"
          description="The night is not for everyone."
          image={events1}
          cta="Join the night"
          link="https://xceed.me/events/channel/sextacy-3"
        />
        <Section
          title="Community"
          description="Join the movement."
          image={community1}
          cta="Join WhatsApp"
          link="https://chat.whatsapp.com/LZc7UYX11WCH8GGeEa6pYS"
          reverse
        />
        <Section
          title="Drop // 01"
          description="The collection."
          image={merch1}
          cta="View collection"
          link="/merch"
        />
        <Section
          title="Playlist"
          description="Listen to the sound."
          image={playlist1}
          cta="Open Spotify"
          link="https://open.spotify.com/playlist/3OEVaCS4RF6VJmto6PD64l?si=7f872c580c4a48a2"
          reverse
        />
        <Section
          title="Sextacy Records"
          description="Explore the label."
          image={label2}
          cta="Explore"
          link="https://www.instagram.com/sextacyrecords?igsh=MXB0ZGJ1eGxvOXdvMw=="
          imageClass="object-contain bg-black"
        />
      </div>

      {/* Bottom spacing */}
      <div className="h-[10vh]" />
    </div>
  );
};

export default Landing;
