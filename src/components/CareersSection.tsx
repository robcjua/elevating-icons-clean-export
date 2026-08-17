import { useEffect, useRef, useState } from "react";
import { Briefcase, ChevronRight, Trophy, Tv, Camera, Mic2, Megaphone, BarChart2, Dumbbell, Globe } from "lucide-react";

const CAREERS_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663485941894/AtKQ63cWcSqj5eWYrGNVsd/careers_bg-NJLTCqXiVTMvGzvAikXiaR.webp";

const careerCategories = [
  {
    icon: Mic2,
    category: "Music & Entertainment Industry",
    roles: [
      { title: "Music Executive / A&R", desc: "Discover and develop talent, oversee artist development at record labels." },
      { title: "Music Producer", desc: "Create beats and produce records for artists across all genres." },
      { title: "Artist Manager", desc: "Guide an artist's career, handle business affairs, and build their brand." },
      { title: "Label Founder / CEO", desc: "Build and run an independent or major record label from the ground up." },
      { title: "Music Publicist", desc: "Manage press, media relations, and public image for artists and labels." },
      { title: "Sync Licensing Specialist", desc: "Place music in TV, film, commercials, and video games." },
    ],
  },
  {
    icon: Megaphone,
    category: "PR, Marketing & Brand Strategy",
    roles: [
      { title: "Sports PR Specialist", desc: "Manage communications and media relations for athletes and sports brands." },
      { title: "Brand Strategist", desc: "Develop brand identity and positioning for athletes, teams, and media companies." },
      { title: "Influencer Marketing Manager", desc: "Build campaigns connecting brands with athletes and content creators." },
      { title: "Event Marketing Coordinator", desc: "Plan and execute sports and entertainment events and activations." },
    ],
  },
  {
    icon: Globe,
    category: "Digital Media & Journalism",
    roles: [
      { title: "Digital Content Strategist", desc: "Plan and execute content strategies for sports and entertainment brands." },
      { title: "Podcast Producer", desc: "Produce, edit, and distribute audio content for sports and media brands." },
      { title: "Freelance Sports Writer", desc: "Contribute articles, features, and analysis to sports publications." },
      { title: "YouTube Channel Manager", desc: "Grow and manage YouTube channels for sports and entertainment brands." },
    ],
  },
  {
    icon: Tv,
    category: "Sports Broadcasting & Media",
    roles: [
      { title: "Sports Broadcaster / Commentator", desc: "Provide live play-by-play or color commentary for games and events." },
      { title: "Sports Journalist / Reporter", desc: "Cover games, write stories, and break news for digital and print outlets." },
      { title: "Sports Anchor (TV/Radio)", desc: "Host sports news segments and highlight shows on television or radio." },
      { title: "Sideline Reporter", desc: "Deliver live reports from the field during games and events." },
      { title: "Sports Podcast Host", desc: "Create and host audio content covering sports news, analysis, and interviews." },
      { title: "Sports Social Media Manager", desc: "Manage social channels for teams, leagues, or sports media brands." },
    ],
  },
  {
    icon: Camera,
    category: "Sports Production & Content",
    roles: [
      { title: "Sports Videographer / Editor", desc: "Capture and edit game footage, highlight reels, and branded content." },
      { title: "Sports Photographer", desc: "Shoot action photography for teams, publications, and media outlets." },
      { title: "Content Creator / Influencer", desc: "Build a personal brand around sports content on social platforms." },
      { title: "Graphic Designer (Sports)", desc: "Design visual assets for teams, leagues, and sports media companies." },
      { title: "Sports Documentary Producer", desc: "Develop and produce long-form documentary content about athletes and teams." },
    ],
  },
  {
    icon: Trophy,
    category: "Sports Management & Operations",
    roles: [
      { title: "Sports Agent", desc: "Represent athletes in contract negotiations and endorsement deals." },
      { title: "Athletic Director", desc: "Oversee sports programs at schools, colleges, and organizations." },
      { title: "Team Operations Manager", desc: "Handle logistics, travel, and day-to-day operations for pro teams." },
      { title: "Player Personnel / Scout", desc: "Evaluate talent and build rosters for professional sports franchises." },
      { title: "Sports Marketing Manager", desc: "Drive brand partnerships, sponsorships, and fan engagement campaigns." },
      { title: "NIL Consultant", desc: "Help collegiate athletes navigate Name, Image, and Likeness opportunities." },
    ],
  },
  {
    icon: BarChart2,
    category: "Sports Analytics & Technology",
    roles: [
      { title: "Sports Data Analyst", desc: "Analyze performance data to inform coaching decisions and player development." },
      { title: "Performance Scientist", desc: "Apply sports science to optimize athlete training and recovery." },
      { title: "Sports Tech Developer", desc: "Build apps, platforms, and tools for the sports and fitness industry." },
      { title: "Fantasy Sports / Gaming Analyst", desc: "Provide analysis and content for fantasy sports and sports betting platforms." },
    ],
  },
  {
    icon: Dumbbell,
    category: "Coaching & Player Development",
    roles: [
      { title: "Professional Sports Coach", desc: "Coach athletes at the professional, collegiate, or elite amateur level." },
      { title: "Strength & Conditioning Coach", desc: "Design and implement training programs to maximize athletic performance." },
      { title: "Skills Trainer / Instructor", desc: "Provide specialized skills coaching in basketball, football, baseball, and more." },
      { title: "Youth Sports Director", desc: "Build and manage youth sports programs in communities and schools." },
    ],
  },
];

function useInView(threshold = 0.05) {
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

export default function CareersSection() {
  const { ref, inView } = useInView();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const toggleCategory = (cat: string) => {
    setActiveCategory(activeCategory === cat ? null : cat);
  };

  return (
    <section id="careers" className="relative py-24 md:py-32 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${CAREERS_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-[#0D0D0D]/80" />

      <div ref={ref} className="relative z-10 container mx-auto px-4 lg:px-8 max-w-7xl">
        <div
          className="mb-16 text-center"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-0.5 w-8 bg-[#FFC300]" />
            <span
              style={{ fontFamily: "'Oswald', sans-serif" }}
              className="text-xs font-medium tracking-[0.3em] uppercase text-[#FFC300]"
            >
              Career Paths
            </span>
            <div className="h-0.5 w-8 bg-[#FFC300]" />
          </div>
          <h2
            style={{ fontFamily: "'Oswald', sans-serif" }}
            className="text-4xl md:text-6xl font-bold uppercase text-white leading-tight mb-4"
          >
            Your Path Into
            <br />
            <span className="text-[#FFC300]">Music, Media, and Sports</span>
          </h2>
          <p
            style={{ fontFamily: "'Barlow', sans-serif" }}
            className="text-white/60 text-lg max-w-2xl mx-auto"
          >
            Every icon started somewhere. Here are the career paths in sports and media that you can break into,
            and Elevating Icons is here to show you how.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {careerCategories.map((cat, i) => {
            const isOpen = activeCategory === cat.category;
            return (
              <div
                key={cat.category}
                className={`border transition-all duration-300 ${
                  isOpen ? "border-[#FFC300]/50 bg-[#FFC300]/5" : "border-[#222] bg-[#0D0D0D]/80"
                }`}
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0)" : "translateY(20px)",
                  transition: `opacity 0.6s ease ${0.1 + i * 0.07}s, transform 0.6s ease ${0.1 + i * 0.07}s, border-color 0.3s, background-color 0.3s`,
                }}
              >
                <button
                  onClick={() => toggleCategory(cat.category)}
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left group"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-10 h-10 flex items-center justify-center flex-shrink-0 transition-colors"
                      style={{
                        backgroundColor: isOpen ? "#FFC300" : "rgba(255,195,0,0.1)",
                      }}
                    >
                      <cat.icon
                        size={18}
                        style={{ color: isOpen ? "#0D0D0D" : "#FFC300" }}
                      />
                    </div>
                    <h3
                      style={{ fontFamily: "'Oswald', sans-serif" }}
                      className={`text-base md:text-lg font-semibold uppercase tracking-wide transition-colors ${
                        isOpen ? "text-white" : "text-white/80 group-hover:text-white"
                      }`}
                    >
                      {cat.category}
                    </h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      style={{ fontFamily: "'Oswald', sans-serif" }}
                      className="text-sm font-bold text-[#FFC300]"
                    >
                      {cat.roles.length} Roles
                    </span>
                    <ChevronRight
                      size={18}
                      className="text-white/40 transition-transform duration-300"
                      style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}
                    />
                  </div>
                </button>

                {isOpen && (
                  <div className="border-t border-[#FFC300]/20 px-5 md:px-6 pb-5 md:pb-6 pt-4">
                    <div className="grid grid-cols-1 gap-3">
                      {cat.roles.map((role) => (
                        <div
                          key={role.title}
                          className="flex items-start gap-3 p-3 bg-[#111] border border-[#1a1a1a] hover:border-[#FFC300]/30 transition-colors"
                        >
                          <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 bg-[#FFC300]" />
                          <div>
                            <p
                              style={{ fontFamily: "'Oswald', sans-serif" }}
                              className="text-white text-sm font-semibold uppercase tracking-wide"
                            >
                              {role.title}
                            </p>
                            <p style={{ fontFamily: "'Barlow', sans-serif" }} className="text-white/50 text-xs mt-0.5 leading-relaxed">
                              {role.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div
          className="mt-16 text-center"
          style={{
            opacity: inView ? 1 : 0,
            transition: "opacity 0.7s ease 0.8s",
          }}
        >
          <p style={{ fontFamily: "'Barlow', sans-serif" }} className="text-white/50 text-sm mb-4">
            Want to learn how to break into these fields? Follow us for the blueprint.
          </p>
          <a
            href="https://www.instagram.com/ElevatingIconsNetwork/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-yellow inline-flex items-center gap-2 text-sm px-8 py-3"
          >
            <Briefcase size={16} />
            Get the Blueprint
          </a>
        </div>
      </div>
    </section>
  );
}
