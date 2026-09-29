import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, CalendarCheck, Instagram, Play } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// Episode: "Leron On The Go" with Leron Rogers.
// TRAILER_URL / EPISODE_URL: YouTube or Vimeo links (preferred), or an mp4 path in /public.
const TRAILER_URL = "";
const EPISODE_URL = ""; // full episode; the section hides while this is empty
// Legal representation inquiries go straight to Leron's Instagram DMs.
const LEGAL_DM_URL = "https://ig.me/m/leronrogers";
// INTAKE_URL: the Google Apps Script web app URL that writes to the bookings sheet.
const INTAKE_URL = "";

const oswald = { fontFamily: "'Oswald', sans-serif" };
const barlow = { fontFamily: "'Barlow', sans-serif" };

function embedUrl(url: string): string | null {
  const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{6,})/);
  if (yt) return `https://www.youtube.com/embed/${yt[1]}?rel=0`;
  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;
  return null;
}

function Player({ url, title, emptyLabel }: { url: string; title: string; emptyLabel: string }) {
  if (!url) {
    return (
      <div className="aspect-video w-full bg-[#141414] border border-[#222] flex flex-col items-center justify-center gap-3 text-white/50">
        <Play size={40} className="text-[#FFC300]" />
        <span style={oswald} className="uppercase tracking-widest text-sm">{emptyLabel}</span>
      </div>
    );
  }
  const embed = embedUrl(url);
  return (
    <div className="aspect-video w-full bg-black border border-[#222] overflow-hidden">
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

const inputCls =
  "w-full bg-[#0D0D0D] border border-[#2a2a2a] focus:border-[#FFC300] outline-none px-4 py-3 text-white placeholder:text-white/30 transition-colors";

function BookingForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("website")) return; // honeypot: bots fill hidden fields
    if (!INTAKE_URL) {
      setState("error");
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
        <p style={barlow} className="text-white/70">Thanks. Leron's team will reach out to confirm the details.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-2" style={barlow}>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
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
        <span className="text-sm text-white/70">Booking type *</span>
        <select name="booking_type" required className={inputCls} defaultValue="">
          <option value="" disabled>Choose one</option>
          <option>Show or event appearance</option>
          <option>Interview or podcast</option>
          <option>Speaking engagement</option>
          <option>Panel or workshop</option>
          <option>Brand partnership</option>
          <option>Other</option>
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
        <span className="text-sm text-white/70">Tell us about the booking *</span>
        <textarea name="message" required rows={5} className={inputCls} />
      </label>
      <div className="md:col-span-2 flex flex-col sm:flex-row sm:items-center gap-4">
        <button type="submit" disabled={state === "sending"} className="btn-yellow text-sm px-8 py-3 disabled:opacity-60" style={oswald}>
          {state === "sending" ? "Sending..." : "Book with Leron"}
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
  const [bookOpen, setBookOpen] = useState(() => typeof window !== "undefined" && window.location.hash === "#book");
  const [episodeOpen, setEpisodeOpen] = useState(false);
  const outline =
    "text-sm px-6 py-3.5 inline-flex items-center justify-center gap-2 border border-[#FFC300] text-[#FFC300] hover:bg-[#FFC300] hover:text-black transition-colors uppercase tracking-wider";

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

          <Player url={TRAILER_URL} title="Leron On The Go trailer" emptyLabel="Trailer coming soon" />

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <button
              type="button"
              onClick={() => setBookOpen(true)}
              className="btn-yellow text-sm px-6 py-3.5 inline-flex items-center justify-center gap-2"
              style={oswald}
            >
              <CalendarCheck size={18} /> Do you want to book with Leron?
            </button>
            <a href={LEGAL_DM_URL} target="_blank" rel="noopener noreferrer" className={outline} style={oswald}>
              <Instagram size={16} /> Legal representation: DM Leron
            </a>
            <button type="button" onClick={() => setEpisodeOpen(true)} className={outline} style={oswald}>
              <Play size={16} /> Watch the full episode
            </button>
          </div>
        </div>
      </main>

      <Dialog open={bookOpen} onOpenChange={setBookOpen}>
        <DialogContent className="max-w-3xl w-[calc(100%-2rem)] max-h-[90vh] overflow-y-auto bg-[#0D0D0D] border-[#222] rounded-none p-6 md:p-8 text-white">
          <DialogHeader className="text-left space-y-2">
            <DialogTitle style={oswald} className="text-3xl md:text-4xl font-bold uppercase text-white">
              Book with <span className="text-[#FFC300]">Leron</span>
            </DialogTitle>
            <DialogDescription style={barlow} className="text-white/60 text-base">
              Shows, events, interviews and speaking. For legal representation,{" "}
              <a href={LEGAL_DM_URL} target="_blank" rel="noopener noreferrer" className="text-[#FFC300] underline">
                DM Leron on Instagram
              </a>
              .
            </DialogDescription>
          </DialogHeader>
          <BookingForm />
        </DialogContent>
      </Dialog>

      <Dialog open={episodeOpen} onOpenChange={setEpisodeOpen}>
        <DialogContent className="max-w-5xl w-[calc(100%-2rem)] bg-[#0D0D0D] border-[#222] rounded-none p-4 md:p-6 text-white">
          <DialogHeader className="text-left">
            <DialogTitle style={oswald} className="text-2xl md:text-3xl font-bold uppercase text-white">
              Leron <span className="text-[#FFC300]">On The Go</span>
            </DialogTitle>
            <DialogDescription className="sr-only">Full episode</DialogDescription>
          </DialogHeader>
          {episodeOpen && <Player url={EPISODE_URL} title="Leron On The Go full episode" emptyLabel="Full episode coming soon" />}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
