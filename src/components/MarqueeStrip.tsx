const items = [
  "Watch", "★", "Learn", "★", "Elevate", "★", "Sports", "★",
  "Music", "★", "Media", "★", "The Blueprint", "★", "Get On", "★",
  "Elevating Icons", "★", "Rob Jua", "★",
];

export default function MarqueeStrip() {
  const repeated = [...items, ...items, ...items];

  return (
    <div className="relative overflow-hidden py-3 bg-[#FFC300]">
      <div
        className="flex gap-8 whitespace-nowrap"
        style={{
          animation: "marquee 30s linear infinite",
          width: "max-content",
        }}
      >
        {repeated.map((item, i) => (
          <span
            key={i}
            style={{ fontFamily: "'Oswald', sans-serif" }}
            className="text-sm font-bold uppercase tracking-widest text-black flex-shrink-0"
          >
            {item}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
    </div>
  );
}
