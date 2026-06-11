import { useEffect } from "react";
import { Link } from "react-router-dom";

const clashFont = "'Clash Display', 'Inter', sans-serif";

const IK_BASE = "https://ik.imagekit.io/sextacy/landing/";
const img = (file: string, tr = "w-1200,q-70,f-auto") => `${IK_BASE}${file}?tr=${tr}`;

type EventItem = {
  title: string;
  description: string;
  date?: string;
  location?: string;
  image: string;
  link: string;
};

const events: EventItem[] = [
  {
    title: "GIANCA BACK HOME 2.0",
    description:
      "back home to Gianca Murazzi. Friday 12th June, from 23.30 to 5.00. Free entry women till 1.00, early birds 10€ with drink, 1st release 15€ with drink. More info here.",
    image: "/events/gianca-back-home-2.jpg",
    link: "https://xceed.me/it/torino/event/sextacy-back-home-1/233442/channel/gianca-murazzi-1",
  },
  {
    title: "CHEAP MARKET W/ HANNIBAL",
    description:
      "First collaboration with Hannibal Store. The event will take place on Sunday, June 14, inside Hannibal Factory, located at Via Leoncavallo 9i, Turin. From 3:00 PM to 6:00 PM, you'll find a curated selection of streetwear pieces, sneakers, and premium vintage items at discounted prices, all accompanied by our DJ set. Free entry for everyone. More info here.",
    image: "/events/cheap-market-hannibal.jpg",
    link: "https://www.instagram.com/p/DZUu1PejWq2/?igsh=cWFvZHY4am92Y2Q3",
  },
];

const Events = () => {
  useEffect(() => {
    document.title = "Events // Sextacy";
  }, []);

  return (
    <div
      className="min-h-screen bg-black text-white overflow-x-hidden selection:bg-white/20"
      style={{ fontFamily: clashFont }}
    >
      {/* Header */}
      <header className="px-6 md:px-16 lg:px-24 pt-12 pb-8 flex items-center justify-between">
        <Link
          to="/"
          className="text-xs tracking-[0.3em] uppercase text-white/50 hover:text-white transition-colors duration-500"
        >
          ← Back
        </Link>
        <span className="text-xs tracking-[0.4em] uppercase text-white/40">Sextacy</span>
      </header>

      {/* Title */}
      <section className="px-6 md:px-16 lg:px-24 pt-8 pb-16 md:pb-24">
        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-semibold uppercase tracking-[0.18em] leading-[0.9]"
          style={{ fontFamily: clashFont }}
        >
          Events
        </h1>
        <p className="mt-6 text-sm md:text-base tracking-[0.2em] text-white/40 max-w-md">
          Upcoming nights. Respect the music.
        </p>
      </section>

      {/* Event cards */}
      <section className="px-6 md:px-16 lg:px-24 pb-24 space-y-8 md:space-y-10">
        {events.map((ev, i) => (
          <article
            key={i}
            className="group flex flex-col md:flex-row border border-white/10 rounded-lg overflow-hidden bg-white/[0.02] hover:border-white/30 transition-colors duration-500"
          >
            <div className="w-full md:w-1/2 lg:w-2/5 overflow-hidden bg-black flex md:items-center md:justify-center">
              <img
                src={ev.image}
                alt={ev.title}
                className="block w-full h-auto md:h-[420px] object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
              />
            </div>
            <div className="w-full md:w-1/2 lg:w-3/5 p-8 md:p-12 flex flex-col justify-center">
              <h2
                className="text-2xl md:text-4xl font-semibold uppercase tracking-[0.15em] leading-[1] mb-4"
                style={{ fontFamily: clashFont }}
              >
                {ev.title}
              </h2>
              <p className="text-sm md:text-base tracking-[0.15em] text-white/50 mb-6 max-w-md">
                {ev.description}
              </p>
              {(ev.date || ev.location) && (
                <div className="flex flex-wrap gap-x-6 gap-y-2 mb-8 text-xs tracking-[0.3em] uppercase text-white/40">
                  {ev.date && <span>{ev.date}</span>}
                  {ev.location && <span>{ev.location}</span>}
                </div>
              )}
              <div>
                <a
                  href={ev.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={ev.link === "#" ? (e) => e.preventDefault() : undefined}
                  className={`inline-block text-xs tracking-[0.3em] uppercase border px-8 py-3 transition-all duration-500 font-medium ${
                    ev.link === "#"
                      ? "border-white/10 text-white/30 cursor-not-allowed"
                      : "border-white/20 text-white/60 hover:text-white hover:border-white/60"
                  }`}
                  style={{ fontFamily: clashFont }}
                >
                  {ev.link === "#" ? "Coming soon" : "View event"}
                </a>
              </div>
            </div>
          </article>
        ))}
      </section>

      <div className="h-[10vh]" />
    </div>
  );
};

export default Events;
