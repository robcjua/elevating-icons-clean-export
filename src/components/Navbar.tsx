import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

type NavItem = { label: string; href: string; type: "anchor" | "route" };

const navLinks: NavItem[] = [
  { label: "About", href: "#about", type: "anchor" },
  { label: "Featured", href: "#featured", type: "anchor" },
  { label: "Services", href: "/services", type: "route" },
  { label: "Careers", href: "#careers", type: "anchor" },
  { label: "Contact", href: "#contact", type: "anchor" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (item: NavItem) => {
    setMenuOpen(false);
    if (item.type === "route") {
      navigate(item.href);
      window.scrollTo({ top: 0 });
      return;
    }
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
      return;
    }
    document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      aria-label="Main navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0D0D0D]/95 backdrop-blur-md border-b border-[#222]"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="flex items-center gap-2 group"
          >
            <div className="flex flex-col leading-none">
              <span
                style={{ fontFamily: "'Oswald', sans-serif" }}
                className="text-xl md:text-2xl font-bold tracking-widest text-white uppercase"
              >
                Elevating
              </span>
              <span
                style={{ color: "#FFC300", fontFamily: "'Oswald', sans-serif" }}
                className="text-xl md:text-2xl font-bold tracking-widest uppercase"
              >
                Icons
              </span>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link)}
                style={{ fontFamily: "'Oswald', sans-serif" }}
                className="text-sm font-medium tracking-widest uppercase text-white/70 hover:text-[#FFC300] transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FFC300] group-hover:w-full transition-all duration-300" />
              </button>
            ))}
            <a
              href="mailto:business@elevatingicons.com"
              style={{ fontFamily: "'Oswald', sans-serif" }}
              className="btn-yellow text-sm px-5 py-2 font-semibold tracking-widest uppercase"
            >
              Get In Touch
            </a>
          </div>

          <button
            className="md:hidden text-white p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[#0D0D0D] border-t border-[#222] px-4 pb-6 pt-4">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link)}
                style={{ fontFamily: "'Oswald', sans-serif" }}
                className="text-left text-base font-medium tracking-widest uppercase text-white/80 hover:text-[#FFC300] transition-colors py-2 border-b border-[#1a1a1a]"
              >
                {link.label}
              </button>
            ))}
            <a
              href="mailto:business@elevatingicons.com"
              style={{ fontFamily: "'Oswald', sans-serif" }}
              className="btn-yellow text-sm text-center mt-2 font-semibold tracking-widest uppercase"
            >
              Get In Touch
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
