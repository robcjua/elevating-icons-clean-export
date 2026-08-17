import { Instagram, Youtube, Mail } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-[#080808] border-t border-[#1a1a1a] py-12" role="contentinfo">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="mb-4">
              <span
                style={{ fontFamily: "'Oswald', sans-serif" }}
                className="text-2xl font-bold tracking-widest text-white uppercase block"
              >
                Elevating
              </span>
              <span
                style={{ fontFamily: "'Oswald', sans-serif" }}
                className="text-2xl font-bold tracking-widest uppercase block text-[#FFC300]"
              >
                Icons
              </span>
            </div>
            <p style={{ fontFamily: "'Barlow', sans-serif" }} className="text-white/40 text-sm leading-relaxed max-w-xs">
              A platform that celebrates the visionaries behind the stars, sharing the blueprint on how to get on.
            </p>
          </div>

          <div>
            <h4
              style={{ fontFamily: "'Oswald', sans-serif" }}
              className="text-white text-sm font-semibold tracking-widest uppercase mb-5"
            >
              Navigate
            </h4>
            <ul className="flex flex-col gap-3">
              {[
                { label: "About", id: "#about" },
                { label: "Featured Episodes", id: "#featured" },
                { label: "Career Paths", id: "#careers" },
                { label: "Contact", id: "#contact" },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    style={{ fontFamily: "'Barlow', sans-serif" }}
                    className="text-white/40 hover:text-[#FFC300] transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4
              style={{ fontFamily: "'Oswald', sans-serif" }}
              className="text-white text-sm font-semibold tracking-widest uppercase mb-5"
            >
              Connect
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:business@elevatingicons.com"
                style={{ fontFamily: "'Barlow', sans-serif" }}
                className="flex items-center gap-2 text-white/40 hover:text-[#FFC300] transition-colors text-sm"
              >
                <Mail size={14} />
                business@elevatingicons.com
              </a>
              <a
                href="https://www.instagram.com/ElevatingIconsNetwork/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontFamily: "'Barlow', sans-serif" }}
                className="flex items-center gap-2 text-white/40 hover:text-[#FFC300] transition-colors text-sm"
              >
                <Instagram size={14} />
                @ElevatingIconsNetwork
              </a>
              <a
                href="https://www.youtube.com/@ElevatingIconsNetwork"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontFamily: "'Barlow', sans-serif" }}
                className="flex items-center gap-2 text-white/40 hover:text-[#FFC300] transition-colors text-sm"
              >
                <Youtube size={14} />
                @ElevatingIconsNetwork
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[#1a1a1a] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p style={{ fontFamily: "'Barlow', sans-serif" }} className="text-white/25 text-xs">
            © {year} Elevating Icons. All rights reserved.
          </p>
          <p style={{ fontFamily: "'Barlow', sans-serif" }} className="text-white/25 text-xs">
            Powered by{" "}
            <a
              href="https://synapse.adovadigital.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-[#FFC300] transition-colors"
            >
              Adova Synapse
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
