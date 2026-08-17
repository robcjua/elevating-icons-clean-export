import { useEffect, useRef, useState } from "react";
import { Mail, Instagram, Youtube, Send } from "lucide-react";

function useInView(threshold = 0.1) {
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

export default function ContactSection() {
  const { ref, inView } = useInView();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Message from ${formData.name} via ElevatingIcons.com`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:business@elevatingicons.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="relative bg-[#0D0D0D] py-24 md:py-32 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#FFC300]" />

      <div ref={ref} className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div
          className="mb-16"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-0.5 w-8 bg-[#FFC300]" />
            <span
              style={{ fontFamily: "'Oswald', sans-serif" }}
              className="text-xs font-medium tracking-[0.3em] uppercase text-[#FFC300]"
            >
              Get In Touch
            </span>
          </div>
          <h2
            style={{ fontFamily: "'Oswald', sans-serif" }}
            className="text-4xl md:text-6xl font-bold uppercase text-white leading-tight"
          >
            Let's Connect
            <br />
            <span className="text-[#FFC300]">& Elevate</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateX(0)" : "translateX(-30px)",
              transition: "opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s",
            }}
          >

            <div className="flex flex-col gap-5">
              <a href="mailto:business@elevatingicons.com" className="flex items-center gap-4 group">
                <div className="w-12 h-12 flex items-center justify-center flex-shrink-0 border border-[#FFC300]/30 transition-colors group-hover:bg-[#FFC300] group-hover:border-[#FFC300]">
                  <Mail size={18} className="text-[#FFC300] group-hover:text-black transition-colors" />
                </div>
                <div>
                  <p style={{ fontFamily: "'Oswald', sans-serif" }} className="text-white/40 text-xs tracking-widest uppercase mb-0.5">Business Email</p>
                  <p style={{ fontFamily: "'Barlow', sans-serif" }} className="text-white group-hover:text-[#FFC300] transition-colors font-medium">
                    business@elevatingicons.com
                  </p>
                </div>
              </a>

              <a href="https://www.instagram.com/ElevatingIconsNetwork/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                <div className="w-12 h-12 flex items-center justify-center flex-shrink-0 border border-[#FFC300]/30 transition-colors group-hover:bg-[#FFC300] group-hover:border-[#FFC300]">
                  <Instagram size={18} className="text-[#FFC300]" />
                </div>
                <div>
                  <p style={{ fontFamily: "'Oswald', sans-serif" }} className="text-white/40 text-xs tracking-widest uppercase mb-0.5">Instagram</p>
                  <p style={{ fontFamily: "'Barlow', sans-serif" }} className="text-white group-hover:text-[#FFC300] transition-colors font-medium">
                    @ElevatingIconsNetwork
                  </p>
                </div>
              </a>

              <a href="https://www.youtube.com/@ElevatingIconsNetwork" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                <div className="w-12 h-12 flex items-center justify-center flex-shrink-0 border border-[#FFC300]/30 transition-colors group-hover:bg-[#FFC300] group-hover:border-[#FFC300]">
                  <Youtube size={18} className="text-[#FFC300]" />
                </div>
                <div>
                  <p style={{ fontFamily: "'Oswald', sans-serif" }} className="text-white/40 text-xs tracking-widest uppercase mb-0.5">YouTube</p>
                  <p style={{ fontFamily: "'Barlow', sans-serif" }} className="text-white group-hover:text-[#FFC300] transition-colors font-medium">
                    @ElevatingIconsNetwork
                  </p>
                </div>
              </a>
            </div>
          </div>

          <div
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateX(0)" : "translateX(30px)",
              transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
            }}
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label style={{ fontFamily: "'Oswald', sans-serif" }} className="block text-xs tracking-widest uppercase text-white/50 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your name"
                  style={{ fontFamily: "'Barlow', sans-serif" }}
                  className="w-full bg-[#111] border border-[#222] text-white px-4 py-3 text-sm focus:outline-none focus:border-[#FFC300] transition-colors placeholder-white/20"
                />
              </div>
              <div>
                <label style={{ fontFamily: "'Oswald', sans-serif" }} className="block text-xs tracking-widest uppercase text-white/50 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter your email"
                  style={{ fontFamily: "'Barlow', sans-serif" }}
                  className="w-full bg-[#111] border border-[#222] text-white px-4 py-3 text-sm focus:outline-none focus:border-[#FFC300] transition-colors placeholder-white/20"
                />
              </div>
              <div>
                <label style={{ fontFamily: "'Oswald', sans-serif" }} className="block text-xs tracking-widest uppercase text-white/50 mb-2">
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us what's on your mind..."
                  style={{ fontFamily: "'Barlow', sans-serif" }}
                  className="w-full bg-[#111] border border-[#222] text-white px-4 py-3 text-sm focus:outline-none focus:border-[#FFC300] transition-colors placeholder-white/20 resize-none"
                />
              </div>
              <button type="submit" className="btn-yellow flex items-center justify-center gap-2 text-sm px-8 py-3 w-full">
                {submitted ? "Opening Email Client..." : (<><Send size={16} />Send Message</>)}
              </button>
              <p style={{ fontFamily: "'Barlow', sans-serif" }} className="text-white/30 text-xs text-center">
                Or email us directly at{" "}
                <a href="mailto:business@elevatingicons.com" className="text-[#FFC300] hover:underline">
                  business@elevatingicons.com
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
