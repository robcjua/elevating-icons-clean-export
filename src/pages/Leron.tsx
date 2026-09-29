import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, CalendarCheck, Clapperboard, Instagram, Play, RotateCcw, Volume2, VolumeX } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// Episode: "Leron On The Go" with Leron Rogers.
// TRAILER_URL / EPISODE_URL: YouTube or Vimeo links (preferred), or an mp4 path in /public.
const TRAILER_URL = "/media/leron/trailer.mp4"; // 67s, 1080x1920, transcoded from Rob's 4K master
// Full episode is hosted on this site as HLS chunks (public/leron/episode/), transcoded from Rob's 4K master.
const EPISODE_URL = "/media/leron/episode/index.m3u8";
// Legal representation inquiries go straight to Leron's Instagram DMs.
const LEGAL_DM_URL = "https://ig.me/m/leronrogers";
const THUMBNAIL = "/media/leron/thumbnail.jpg";
// INTAKE_URL: the Google Apps Script web app URL that writes to the bookings sheet.
const INTAKE_URL = "https://script.google.com/macros/s/AKfycbygBpyt3iUuFs_My3pcYLi9arUpXflieozXaJZiKw5BscJEj9hcVlPfaGJ17RbqyLS8/exec";

const oswald = { fontFamily: "'Oswald', sans-serif" };
const barlow = { fontFamily: "'Barlow', sans-serif" };

function embedUrl(url: string): string | null {
  const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{6,})/);
  if (yt) return `https://www.youtube.com/embed/${yt[1]}?rel=0`;
  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;
  return null;
}

function Player({ url, title, emptyLabel, vertical }: { url: string; title: string; emptyLabel: string; vertical?: boolean }) {
  const box = vertical ? "aspect-[9/16] max-h-[75vh] mx-auto" : "aspect-video w-full";
  if (!url) {
    return (
      <div className={`${box} bg-[#141414] border border-[#222] flex flex-col items-center justify-center gap-3 text-white/50`}>
        <Play size={40} className="text-[#FFC300]" />
        <span style={oswald} className="uppercase tracking-widest text-sm">{emptyLabel}</span>
      </div>
    );
  }
  const embed = embedUrl(url);
  return (
    <div className={`${box} bg-black border border-[#222] overflow-hidden`}>
      {embed ? (
        <iframe
          src={embed}
          title={title}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <video src={url} controls playsInline className="w-full h-full object-cover" />
      )}
    </div>
  );
}

// Full-episode player. Safari plays HLS natively; everywhere else hls.js is
// loaded on demand, so it never weighs down the page until someone hits play.
function EpisodePlayer({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    let hls: { destroy: () => void } | null = null;
    let cancelled = false;
    const start = () => video.play().catch(() => undefined);
    if (!src.endsWith(".m3u8") || video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
      start();
    } else {
      import("hls.js").then(({ default: Hls }) => {
        if (cancelled) return;
        if (Hls.isSupported()) {
          const h = new Hls({ capLevelToPlayerSize: true });
          h.loadSource(src);
          h.attachMedia(video);
          h.on(Hls.Events.MANIFEST_PARSED, start);
          hls = h;
        } else {
          video.src = src;
        }
      });
    }
    return () => { cancelled = true; hls?.destroy(); };
  }, [src]);
  return (
    <div className="aspect-[9/16] max-h-[75vh] mx-auto bg-black border border-[#222] overflow-hidden">
      <video ref={ref} poster={THUMBNAIL} controls playsInline className="w-full h-full object-contain" aria-label="Leron On The Go full episode" />
    </div>
  );
}

// Hero: the vertical trailer framed in a wide box, with a blurred copy of the
// thumbnail filling the sides so there are no dead bars. The trailer starts
// muted about two seconds after load (browsers only allow muted autoplay),
// with a sound toggle. When it ends, it points people at the full episode.
function Hero({ onPlayEpisode, hold }: { onPlayEpisode: () => void; hold: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [ended, setEnded] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    // Try to start WITH sound. Browsers block that for most first-time visitors,
    // so fall back to muted playback and unmute on the visitor's first tap,
    // click or key press anywhere on the page.
    const t = window.setTimeout(() => {
      const v = ref.current;
      if (!v) return;
      v.muted = false;
      v.play()
        .then(() => setMuted(false))
        .catch(() => {
          v.muted = true;
          setMuted(true);
          v.play().catch(() => undefined);
        });
    }, 2000);
    const unmuteOnFirstGesture = (e: Event) => {
      const v = ref.current;
      if (!v || !v.muted) return;
      // the sound button handles its own clicks
      if (e.target instanceof Element && e.target.closest("[data-sound-toggle]")) return;
      v.muted = false;
      setMuted(false);
      if (v.paused && !v.ended) v.play().catch(() => undefined);
    };
    const events = ["pointerdown", "keydown", "touchstart"] as const;
    events.forEach((ev) => window.addEventListener(ev, unmuteOnFirstGesture, { once: true, passive: true }));
    return () => {
      window.clearTimeout(t);
      events.forEach((ev) => window.removeEventListener(ev, unmuteOnFirstGesture));
    };
  }, []);

  // pause the trailer whenever a popup (episode or intake form) is open
  useEffect(() => {
    if (hold) ref.current?.pause();
  }, [hold]);

  function toggleSound() {
    const v = ref.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (v.paused) v.play().catch(() => undefined);
  }

  function replay() {
    const v = ref.current;
    if (!v) return;
    setEnded(false);
    v.currentTime = 0;
    v.play().catch(() => undefined);
  }

  return (
    <div className="relative w-full aspect-[9/16] sm:aspect-video overflow-hidden border border-[#222] bg-black">
      <img src={THUMBNAIL} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover scale-110 blur-2xl opacity-50" />
      <div className="relative h-full flex justify-center">
        <div className="relative h-full aspect-[9/16] max-w-full isolate">
          <video
            ref={ref}
            src={TRAILER_URL}
            poster={THUMBNAIL}
            muted
            playsInline
            preload="metadata"
            onEnded={() => setEnded(true)}
            onClick={toggleSound}
            className="h-full w-full object-cover cursor-pointer"
            aria-label="Leron On The Go trailer"
          />
          {!ended && (
            <button
              type="button"
              data-sound-toggle
              onClick={toggleSound}
              className={`absolute top-3 right-3 h-10 rounded-full text-white flex items-center justify-center gap-2 transition-all ${muted ? "px-4 bg-[#FFC300] text-black animate-pulse" : "w-10 bg-black/60 hover:bg-black/80"}`}
              aria-label={muted ? "Turn sound on" : "Turn sound off"}
            >
              {muted ? <><VolumeX size={18} /><span style={oswald} className="text-xs font-bold uppercase tracking-wider">Tap for sound</span></> : <Volume2 size={18} />}
            </button>
          )}
          {ended && (
            <div className="absolute inset-0 z-10 isolate flex flex-col items-center justify-center gap-4 p-6 text-center">
              <img src={THUMBNAIL} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover -z-10" />
              <span className="absolute inset-0 bg-black/55 -z-10" />
              <span style={oswald} className="uppercase tracking-widest text-white text-lg">Want the whole story?</span>
              <button type="button" onClick={onPlayEpisode} className="btn-yellow cta-episode text-sm px-6 py-3 inline-flex items-center gap-2" style={oswald}>
                <Play size={16} fill="currentColor" /> Watch the full episode
              </button>
              <button type="button" onClick={replay} className="text-white/70 hover:text-white text-sm inline-flex items-center gap-1.5" style={barlow}>
                <RotateCcw size={14} /> Replay trailer
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Two intake flows share one form and one Google Sheet. The hidden "interest"
// field records which button the visitor came from, so Rob can sort leads.
type Intake = "leron" | "ei";
const INTAKES: Record<Intake, { interest: string; title: [string, string]; blurb: string; typeLabel: string; types: string[]; submit: string; thanks: string }> = {
  leron: {
    interest: "Book Leron (speaking and more)",
    title: ["Book", "Leron"],
    blurb: "Speaking engagements, shows, events and interviews.",
    typeLabel: "Booking type",
    types: ["Speaking engagement", "Show or event appearance", "Interview or podcast", "Panel or workshop", "Brand partnership", "Other"],
    submit: "Book Leron",
    thanks: "Thanks! Our team will reach out to you.",
  },
  ei: {
    interest: "Hire Elevating Icons",
    title: ["Hire", "Elevating Icons"],
    blurb: "Media production, content creation, and documentary work for artists, athletes, executives and brands.",
    typeLabel: "Service needed",
    types: ["Media Production Services", "Content Creation", "Documentary & Video Production", "Not sure yet"],
    submit: "Send request",
    thanks: "Thanks! Our team will reach out to you.",
  },
};

const inputCls =
  "w-full bg-[#0D0D0D] border border-[#2a2a2a] focus:border-[#FFC300] outline-none px-4 py-3 text-white placeholder:text-white/30 transition-colors";

function IntakeForm({ kind }: { kind: Intake }) {
  const cfg = INTAKES[kind];
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("website")) return; // honeypot: bots fill hidden fields
    if (!INTAKE_URL) {
      // Sheet endpoint not connected yet: hand the lead to email instead of
      // dropping it (same pattern as the homepage contact form).
      const lines = ["name", "email", "phone", "organization", "request_type", "preferred_date", "location", "budget", "message"]
        .map((k) => `${k.replace(/_/g, " ")}: ${String(data.get(k) || "")}`)
        .join("\n");
      const subject = encodeURIComponent(`${cfg.interest}: ${String(data.get("name") || "")}`);
      window.location.href = `mailto:business@elevatingicons.com?subject=${subject}&body=${encodeURIComponent(lines)}`;
      setState("sent");
      form.reset();
      return;
    }
    setState("sending");
    const body = new URLSearchParams();
    data.forEach((v, k) => body.append(k, String(v)));
    body.append("source", window.location.href);
    try {
      // no-cors: Apps Script web apps do not send CORS headers; the row still lands.
      await fetch(INTAKE_URL, { method: "POST", mode: "no-cors", body });
      setState("sent");
      form.reset();
    } catch {
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <div className="bg-[#141414] border border-[#FFC300]/40 p-8 text-center">
        <CalendarCheck size={36} className="text-[#FFC300] mx-auto mb-4" />
        <h3 style={oswald} className="text-2xl font-bold uppercase text-white mb-2">Request received</h3>
        <p style={barlow} className="text-white/70">{cfg.thanks}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-2" style={barlow}>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <input type="hidden" name="interest" value={cfg.interest} />
      <label className="grid gap-1.5">
        <span className="text-sm text-white/70">Name *</span>
        <input name="name" required className={inputCls} placeholder="Your full name" />
      </label>
      <label className="grid gap-1.5">
        <span className="text-sm text-white/70">Email *</span>
        <input name="email" type="email" required className={inputCls} placeholder="you@company.com" />
      </label>
      <label className="grid gap-1.5">
        <span className="text-sm text-white/70">Phone</span>
        <input name="phone" type="tel" className={inputCls} placeholder="(555) 555-5555" />
      </label>
      <label className="grid gap-1.5">
        <span className="text-sm text-white/70">Organization or brand</span>
        <input name="organization" className={inputCls} />
      </label>
      <label className="grid gap-1.5">
        <span className="text-sm text-white/70">{cfg.typeLabel} *</span>
        <select name="request_type" required className={inputCls} defaultValue="">
          <option value="" disabled>Choose one</option>
          {cfg.types.map((t) => <option key={t}>{t}</option>)}
        </select>
      </label>
      <label className="grid gap-1.5">
        <span className="text-sm text-white/70">Preferred date</span>
        <input name="preferred_date" type="date" className={inputCls} />
      </label>
      <label className="grid gap-1.5">
        <span className="text-sm text-white/70">Location</span>
        <input name="location" className={inputCls} placeholder="City, state or virtual" />
      </label>
      <label className="grid gap-1.5">
        <span className="text-sm text-white/70">Budget</span>
        <input name="budget" className={inputCls} placeholder="Optional" />
      </label>
      <label className="grid gap-1.5 md:col-span-2">
        <span className="text-sm text-white/70">{kind === "leron" ? "Tell us about the booking" : "Tell us about the project"} *</span>
        <textarea name="message" required rows={5} className={inputCls} />
      </label>
      <div className="md:col-span-2 flex flex-col sm:flex-row sm:items-center gap-4">
        <button type="submit" disabled={state === "sending"} className="btn-yellow text-sm px-8 py-3 disabled:opacity-60" style={oswald}>
          {state === "sending" ? "Sending..." : cfg.submit}
        </button>
        {state === "error" && (
          <span className="text-sm text-red-400">
            That didn't go through. Email{" "}
            <a className="underline" href="mailto:business@elevatingicons.com">business@elevatingicons.com</a> instead.
          </span>
        )}
      </div>
    </form>
  );
}

export default function Leron() {
  const [intake, setIntake] = useState<Intake | null>(() => {
    if (typeof window === "undefined") return null;
    return window.location.hash === "#book" ? "leron" : window.location.hash === "#hire" ? "ei" : null;
  });
  const [episodeOpen, setEpisodeOpen] = useState(false);
  const outline =
    "text-sm px-5 py-4 min-h-[96px] flex flex-col items-center justify-center gap-2 text-center leading-snug border border-[#FFC300] text-[#FFC300] hover:bg-[#FFC300] hover:text-black transition-colors uppercase tracking-wider";

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white overflow-x-hidden">
      <Navbar />

      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6 lg:px-16 max-w-6xl">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white/60 hover:text-[#FFC300] transition-colors mb-8 text-sm tracking-widest uppercase"
            style={oswald}
          >
            <ArrowLeft size={16} /> Back Home
          </Link>

          <div className="max-w-3xl mb-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-0.5 w-12 bg-[#FFC300]" />
              <span style={oswald} className="text-sm font-medium tracking-[0.3em] uppercase text-[#FFC300]">
                Elevating Icons Presents
              </span>
            </div>
            <h1 style={oswald} className="text-5xl md:text-7xl font-bold uppercase leading-none text-white mb-4">
              Leron <span className="text-[#FFC300]">On The Go</span>
            </h1>
            <p style={barlow} className="text-lg text-white/70 font-light">Featuring Leron Rogers</p>
          </div>

          <Hero onPlayEpisode={() => setEpisodeOpen(true)} hold={episodeOpen || intake !== null} />

          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <button
              type="button"
              onClick={() => setIntake("leron")}
              className="btn-yellow text-sm px-5 py-4 min-h-[96px] flex flex-col items-center justify-center gap-2 text-center leading-snug"
              style={oswald}
            >
              <CalendarCheck size={20} className="shrink-0" />
              <span>Book Leron for speaking engagements and more</span>
            </button>
            <a href={LEGAL_DM_URL} target="_blank" rel="noopener noreferrer" className={outline} style={oswald}>
              <Instagram size={20} className="shrink-0" />
              <span>Need an entertainment lawyer? DM Leron</span>
            </a>
            <button type="button" onClick={() => setIntake("ei")} className={outline} style={oswald}>
              <Clapperboard size={20} className="shrink-0" />
              <span>Hire Elevating Icons</span>
            </button>
            <button type="button" onClick={() => setEpisodeOpen(true)} className={`${outline} cta-episode`} style={oswald}>
              <Play size={20} fill="currentColor" className="shrink-0" />
              <span className="inline-flex items-center gap-2">
                Watch the full episode
                <span className="bg-[#FFC300] text-black text-[10px] font-bold px-1.5 py-0.5 tracking-wider">12 MIN</span>
              </span>
            </button>
          </div>
        </div>
      </main>

      <Dialog open={intake !== null} onOpenChange={(o) => { if (!o) setIntake(null); }}>
        <DialogContent className="max-w-3xl w-[calc(100%-2rem)] max-h-[90vh] overflow-y-auto bg-[#0D0D0D] border-[#222] rounded-none p-6 md:p-8 text-white">
          {intake && (
            <>
              <DialogHeader className="text-left space-y-2">
                <DialogTitle style={oswald} className="text-3xl md:text-4xl font-bold uppercase text-white">
                  {INTAKES[intake].title[0]} <span className="text-[#FFC300]">{INTAKES[intake].title[1]}</span>
                </DialogTitle>
                <DialogDescription style={barlow} className="text-white/60 text-base">
                  {INTAKES[intake].blurb}
                </DialogDescription>
              </DialogHeader>
              <IntakeForm key={intake} kind={intake} />
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={episodeOpen} onOpenChange={setEpisodeOpen}>
        <DialogContent className="max-w-md w-[calc(100%-2rem)] bg-[#0D0D0D] border-[#222] rounded-none p-4 md:p-6 text-white">
          <DialogHeader className="text-left">
            <DialogTitle style={oswald} className="text-2xl md:text-3xl font-bold uppercase text-white">
              Leron <span className="text-[#FFC300]">On The Go</span>
            </DialogTitle>
            <DialogDescription className="sr-only">Full episode</DialogDescription>
          </DialogHeader>
          {episodeOpen && <EpisodePlayer src={EPISODE_URL} />}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
