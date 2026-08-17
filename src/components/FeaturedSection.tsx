import { useEffect, useRef, useState, useCallback } from "react";
import { Play, ChevronLeft, ChevronRight, Instagram, Youtube } from "lucide-react";

interface Clip {
  label: string;
  src: string;
  thumb: string;
}

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

export default function FeaturedSection() {
  const { ref, inView } = useInView();
  const [clips, setClips] = useState<Clip[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [playingIdx, setPlayingIdx] = useState<number | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    fetch("/data/clips.csv")
      .then((r) => r.text())
      .then((text) => {
        const lines = text.trim().split("\n").slice(1);
        const parsed = lines.map((line) => {
          const [label, src, thumb] = line.split(",");
          return { label, src, thumb };
        });
        setClips(parsed);
      });
  }, []);

  const total = clips.length;

  const rotate = useCallback(
    (dir: "left" | "right") => {
      if (playingIdx !== null) {
        videoRefs.current[playingIdx]?.pause();
        setPlayingIdx(null);
      }
      setActiveIdx((prev) =>
        dir === "right" ? (prev + 1) % total : (prev - 1 + total) % total
      );
    },
    [playingIdx, total]
  );

  const handlePlay = (idx: number) => {
    if (playingIdx !== null && playingIdx !== idx) {
      videoRefs.current[playingIdx]?.pause();
    }
    const video = videoRefs.current[idx];
    if (!video) return;
    if (playingIdx === idx) {
      video.pause();
      setPlayingIdx(null);
    } else {
      video.play();
      setPlayingIdx(idx);
    }
  };

  const getOffset = (idx: number) => {
    let diff = idx - activeIdx;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  if (!clips.length) return null;

  return (
    <section id="featured" className="relative bg-[#111] py-24 md:py-32 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#FFC300]" />

      <div ref={ref} className="container mx-auto px-4 lg:px-8 max-w-7xl">
        {/* Header */}
        <div
          className="mb-8"
          style={{
            opacity: 1,
            transform: "translateY(0)",
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-0.5 w-8 bg-[#FFC300]" />
            <span
              style={{ fontFamily: "'Oswald', sans-serif" }}
              className="text-xs font-medium tracking-[0.3em] uppercase text-[#FFC300]"
            >
              Featured Content
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2
              style={{ fontFamily: "'Oswald', sans-serif" }}
              className="text-4xl md:text-6xl font-bold uppercase text-white leading-tight"
            >
              The Conversations
              <br />
              <span className="text-[#FFC300]">That Matter</span>
            </h2>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/ElevatingIconsNetwork/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/60 hover:text-[#FFC300] transition-colors text-sm"
                style={{ fontFamily: "'Barlow', sans-serif" }}
              >
                <Instagram size={18} />
                <span>@ElevatingIconsNetwork</span>
              </a>
              <a
                href="https://www.youtube.com/@ElevatingIconsNetwork"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/60 hover:text-[#FFC300] transition-colors text-sm"
                style={{ fontFamily: "'Barlow', sans-serif" }}
              >
                <Youtube size={18} />
                <span>YouTube</span>
              </a>
            </div>
          </div>
        </div>

        {/* Circular Carousel */}
        <div className="relative flex items-center justify-center" style={{ height: "480px" }}>
          <button
            onClick={() => rotate("left")}
            className="absolute left-2 md:left-8 z-20 w-12 h-12 border border-[#333] rounded-full flex items-center justify-center text-white/60 hover:text-[#FFC300] hover:border-[#FFC300] transition-colors bg-black/40 backdrop-blur-sm"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={() => rotate("right")}
            className="absolute right-2 md:right-8 z-20 w-12 h-12 border border-[#333] rounded-full flex items-center justify-center text-white/60 hover:text-[#FFC300] hover:border-[#FFC300] transition-colors bg-black/40 backdrop-blur-sm"
          >
            <ChevronRight size={22} />
          </button>

          {clips.map((clip, idx) => {
            const offset = getOffset(idx);
            const isCenter = offset === 0;
            const absOffset = Math.abs(offset);
            if (absOffset > 2) return null;

            const translateX = offset * 200;
            const scale = isCenter ? 1 : absOffset === 1 ? 0.78 : 0.6;
            const zIndex = isCenter ? 10 : absOffset === 1 ? 5 : 1;
            const opacity = isCenter ? 1 : absOffset === 1 ? 0.6 : 0.3;
            const rotateY = offset * -15;

            return (
              <div
                key={idx}
                className="absolute transition-all duration-500 ease-out"
                style={{
                  transform: `translateX(${translateX}px) scale(${scale}) perspective(800px) rotateY(${rotateY}deg)`,
                  zIndex,
                  opacity,
                  filter: isCenter ? "none" : `brightness(${0.5 + (1 - absOffset * 0.2)})`,
                }}
              >
                <div
                  className="w-[200px] md:w-[240px] cursor-pointer"
                  onClick={() => isCenter && handlePlay(idx)}
                >
                  <div
                    className={`relative rounded-2xl overflow-hidden bg-black aspect-[9/16] border-2 transition-colors duration-300 ${
                      isCenter
                        ? "border-[#FFC300]/60 shadow-lg shadow-[#FFC300]/10"
                        : "border-[#222]"
                    }`}
                  >
                    <video
                      ref={(el) => { videoRefs.current[idx] = el; }}
                      src={clip.src}
                      poster={clip.thumb}
                      playsInline
                      preload={isCenter ? "auto" : "metadata"}
                      onEnded={() => setPlayingIdx(null)}
                      className="w-full h-full object-cover"
                    />
                    {isCenter && (
                      <div
                        className={`absolute inset-0 flex items-center justify-center transition-colors ${
                          playingIdx === idx ? "bg-transparent" : "bg-black/30"
                        }`}
                      >
                        {playingIdx !== idx && (
                          <div className="w-14 h-14 rounded-full bg-[#FFC300] flex items-center justify-center shadow-lg shadow-[#FFC300]/30 hover:scale-110 transition-transform">
                            <Play size={24} fill="#0D0D0D" className="text-[#0D0D0D] ml-1" />
                          </div>
                        )}
                      </div>
                    )}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-1.5 rounded-full bg-[#333]" />
                  </div>
                  <p
                    style={{ fontFamily: "'Barlow', sans-serif" }}
                    className={`text-sm mt-3 text-center line-clamp-2 transition-colors duration-300 ${
                      isCenter ? "text-white" : "text-white/40"
                    }`}
                  >
                    {clip.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {clips.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (playingIdx !== null) {
                  videoRefs.current[playingIdx]?.pause();
                  setPlayingIdx(null);
                }
                setActiveIdx(idx);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                idx === activeIdx
                  ? "bg-[#FFC300] w-6"
                  : "bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>

        {/* Follow CTA */}
        <div
          className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 border border-[#222] p-6 md:p-8"
          style={{
            opacity: inView ? 1 : 0,
            transition: "opacity 0.7s ease 0.7s",
          }}
        >
          <div>
            <h3
              style={{ fontFamily: "'Oswald', sans-serif" }}
              className="text-xl font-bold uppercase text-white"
            >
              Follow the Movement
            </h3>
            <p style={{ fontFamily: "'Barlow', sans-serif" }} className="text-white/50 text-sm mt-1">
              New episodes dropping on Instagram & YouTube. Don't miss the blueprint.
            </p>
          </div>
          <div className="flex gap-4 flex-shrink-0">
            <a
              href="https://www.instagram.com/ElevatingIconsNetwork/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-yellow text-xs px-6 py-3 flex items-center gap-2"
            >
              <Instagram size={16} />
              Instagram
            </a>
            <a
              href="https://www.youtube.com/@ElevatingIconsNetwork"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-yellow text-xs px-6 py-3 flex items-center gap-2"
            >
              <Youtube size={16} />
              YouTube
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
