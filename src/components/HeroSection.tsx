import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663485941894/AtKQ63cWcSqj5eWYrGNVsd/hero_bg-3XzBr4U6oYhrWJVt5mGpQU.webp";

export default function HeroSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToAbout = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      role="banner"
      className="relative min-h-screen flex items-center justify-start overflow-hidden"
      style={{
        backgroundImage: `url(${HERO_BG})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/30" />
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#FFC300]" />

      <div className="relative z-10 container mx-auto px-6 lg:px-16 max-w-7xl py-32">
        <div
          className="max-w-3xl"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 0.9s ease, transform 0.9s ease",
          }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-0.5 w-12 bg-[#FFC300]" />
            <span
              style={{ fontFamily: "'Oswald', sans-serif" }}
              className="text-sm font-medium tracking-[0.3em] uppercase text-[#FFC300]"
            >
              Watch. Learn. Elevate.
            </span>
          </div>

          <h1
            style={{ fontFamily: "'Oswald', sans-serif" }}
            className="text-6xl md:text-8xl lg:text-9xl font-bold uppercase leading-none text-white mb-4"
          >
            <span className="sr-only">The Blueprint for Careers in Music, Sports, and Media. </span>
            Elevating
            <br />
            <span className="text-[#FFC300]">Icons</span>
          </h1>

          <p
            style={{
              fontFamily: "'Barlow', sans-serif",
              opacity: visible ? 1 : 0,
              transition: "opacity 1.2s ease 0.4s",
            }}
            className="text-lg md:text-xl text-white/80 max-w-xl mt-6 leading-relaxed font-light"
          >
            <span className="text-white font-semibold">Media production and documentary content platform</span>{" "}
            celebrating the stars and the power players behind them, sharing the real blueprint
            on how to get on in music, sports, and media.
          </p>

          <div
            className="flex flex-wrap gap-4 mt-10"
            style={{
              opacity: visible ? 1 : 0,
              transition: "opacity 1.2s ease 0.7s",
            }}
          >
            <button
              onClick={() => document.querySelector("#featured")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-yellow text-sm px-8 py-3"
            >
              Watch Episodes
            </button>
            <button
              onClick={() => document.querySelector("#careers")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-outline-yellow text-sm px-8 py-3"
            >
              Explore Careers
            </button>
          </div>

        </div>
      </div>

      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/40 hover:text-[#FFC300] transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown size={32} />
      </button>

      <div
        className="absolute bottom-0 left-0 right-0 h-20 bg-[#0D0D0D]"
        style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%)" }}
      />
    </header>
  );
}
