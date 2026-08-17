import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.2) {
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

export default function MissionBanner() {
  const { ref, inView } = useInView();

  return (
    <section className="py-16 md:py-20 relative overflow-hidden bg-[#FFC300]">
      <div
        className="absolute top-0 left-0 w-32 h-full opacity-10 bg-[#0D0D0D]"
        style={{ clipPath: "polygon(0 0, 60% 0, 100% 100%, 0 100%)" }}
      />

      <div ref={ref} className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div
          className="text-center"
          style={{
            opacity: inView ? 1 : 0,
            transition: "opacity 0.7s ease 0.5s",
          }}
        >
          <p
            style={{ fontFamily: "'Oswald', sans-serif" }}
            className="text-2xl md:text-3xl font-bold uppercase text-black leading-tight max-w-3xl mx-auto"
          >
            "From label founders to producers, executives, and creative architects,
            we highlight the real minds who move the culture."
          </p>
          <p
            style={{ fontFamily: "'Barlow', sans-serif" }}
            className="text-black/60 text-sm mt-4 tracking-widest uppercase"
          >
            Elevating Icons
          </p>
        </div>
      </div>
    </section>
  );
}
