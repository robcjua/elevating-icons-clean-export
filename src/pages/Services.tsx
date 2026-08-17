import { Link } from "react-router-dom";
import { ArrowLeft, Camera, Film, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const services = [
  {
    icon: Camera,
    title: "Media Production Services",
    desc: "Full-service media production for brands, artists, and entertainment professionals, from concept and direction to lighting, sound, and final delivery.",
  },
  {
    icon: Sparkles,
    title: "Content Creation",
    desc: "Tailored content for artists, athletes, and entertainment executives: reels, social cutdowns, branded shorts, and editorial features built to grow audiences and influence.",
  },
  {
    icon: Film,
    title: "Documentary & Video Production",
    desc: "Mini-documentaries, long-form features, and cinematic storytelling that capture culture, careers, and the moments that move the industry forward.",
  },
];

export default function Services() {
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white overflow-x-hidden">
      <Navbar />

      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6 lg:px-16 max-w-7xl">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white/60 hover:text-[#FFC300] transition-colors mb-8 text-sm tracking-widest uppercase"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            <ArrowLeft size={16} /> Back Home
          </Link>

          <div className="max-w-3xl mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-0.5 w-12 bg-[#FFC300]" />
              <span
                style={{ fontFamily: "'Oswald', sans-serif" }}
                className="text-sm font-medium tracking-[0.3em] uppercase text-[#FFC300]"
              >
                What We Do
              </span>
            </div>
            <h1
              style={{ fontFamily: "'Oswald', sans-serif" }}
              className="text-5xl md:text-7xl font-bold uppercase leading-none text-white mb-6"
            >
              Our <span className="text-[#FFC300]">Services</span>
            </h1>
            <p
              style={{ fontFamily: "'Barlow', sans-serif" }}
              className="text-lg text-white/70 leading-relaxed font-light"
            >
              Elevating Icons partners with artists, athletes, executives, and entertainment brands
              to produce media that resonates, from quick-turn social content to full documentary features.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {services.map((s) => {
              const Icon = s.icon;
              return (
                <article
                  key={s.title}
                  className="group bg-[#141414] border border-[#222] hover:border-[#FFC300]/50 p-8 transition-all duration-300 card-glow"
                >
                  <div className="w-12 h-12 flex items-center justify-center bg-[#FFC300]/10 text-[#FFC300] mb-6 group-hover:bg-[#FFC300] group-hover:text-black transition-colors">
                    <Icon size={24} />
                  </div>
                  <h2
                    style={{ fontFamily: "'Oswald', sans-serif" }}
                    className="text-xl font-bold uppercase tracking-wide text-white mb-3"
                  >
                    {s.title}
                  </h2>
                  <p
                    style={{ fontFamily: "'Barlow', sans-serif" }}
                    className="text-white/65 text-sm leading-relaxed font-light"
                  >
                    {s.desc}
                  </p>
                </article>
              );
            })}
          </div>

          <div className="mt-16 text-center">
            <a
              href="mailto:business@elevatingicons.com"
              className="btn-yellow text-sm px-8 py-3 inline-block"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Start a Project
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
