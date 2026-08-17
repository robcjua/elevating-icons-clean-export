import { useEffect, useRef, useState } from "react";
import { Mic, TrendingUp, Users } from "lucide-react";

const INTERVIEW_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663485941894/AtKQ63cWcSqj5eWYrGNVsd/interview_bg-acjFavdGFnXertowWW8UuU.webp";

const pillars = [
  {
    icon: Mic,
    title: "Raw Conversations",
    desc: "Unfiltered interviews with the real minds who move culture: label founders, producers, executives, and creative architects.",
  },
  {
    icon: TrendingUp,
    title: "The Blueprint",
    desc: "Every episode delivers game, inspiration, and real insight straight from the icons who built empires from the ground up.",
  },
  {
    icon: Users,
    title: "Community",
    desc: "A growing movement of aspiring professionals learning how to break into sports, music, and media from those who already did.",
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export default function AboutSection() {
  const { ref, inView } = useInView();

  return (
    <section id="about" className="relative bg-[#0D0D0D] py-24 md:py-32 overflow-hidden">
      <div
        className="absolute top-0 right-0 w-1/3 h-full opacity-5"
        style={{
          backgroundImage: `url(${INTERVIEW_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div ref={ref} className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateX(0)" : "translateX(-40px)",
              transition: "opacity 0.8s ease, transform 0.8s ease",
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-0.5 w-8 bg-[#FFC300]" />
              <span
                style={{ fontFamily: "'Oswald', sans-serif" }}
                className="text-xs font-medium tracking-[0.3em] uppercase text-[#FFC300]"
              >
                About the Platform
              </span>
            </div>

            <h2
              style={{ fontFamily: "'Oswald', sans-serif" }}
              className="text-4xl md:text-6xl font-bold uppercase text-white leading-tight mb-6"
            >
              Behind Every Star
              <br />
              <span className="text-[#FFC300]">Is a Visionary</span>
            </h2>

            <p
              style={{ fontFamily: "'Barlow', sans-serif" }}
              className="text-white/70 text-lg leading-relaxed mb-6"
            >
              Welcome to <strong className="text-white">Elevating Icons</strong>, the platform that celebrates
              the visionaries behind the stars. From label founders to producers, executives, and creative
              architects, we highlight the real minds who move the culture.
            </p>
            <p
              style={{ fontFamily: "'Barlow', sans-serif" }}
              className="text-white/70 text-lg leading-relaxed mb-10"
            >
              These are the untold stories, raw conversations, and powerful lessons from the people who built
              empires from the ground up. Every episode delivers game, inspiration, and real insight straight
              from the icons who shaped the music, business, and culture we know today.
            </p>


          </div>

          <div
            className="flex flex-col gap-6"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateX(0)" : "translateX(40px)",
              transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
            }}
          >
            {pillars.map((pillar, i) => (
              <div
                key={pillar.title}
                className="card-glow bg-[#111] border border-[#222] p-6 flex gap-5 items-start"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0)" : "translateY(20px)",
                  transition: `opacity 0.6s ease ${0.3 + i * 0.15}s, transform 0.6s ease ${0.3 + i * 0.15}s`,
                }}
              >
                <div
                  className="w-12 h-12 flex items-center justify-center flex-shrink-0 bg-[#FFC300]/10 border border-[#FFC300]/30"
                >
                  <pillar.icon size={22} className="text-[#FFC300]" />
                </div>
                <div>
                  <h3
                    style={{ fontFamily: "'Oswald', sans-serif" }}
                    className="text-white text-lg font-semibold uppercase tracking-wide mb-2"
                  >
                    {pillar.title}
                  </h3>
                  <p style={{ fontFamily: "'Barlow', sans-serif" }} className="text-white/60 text-sm leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
