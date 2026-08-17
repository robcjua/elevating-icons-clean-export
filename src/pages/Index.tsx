import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MarqueeStrip from "@/components/MarqueeStrip";
import AboutSection from "@/components/AboutSection";
import MissionBanner from "@/components/MissionBanner";
import FeaturedSection from "@/components/FeaturedSection";
import CareersSection from "@/components/CareersSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import SectionDivider from "@/components/SectionDivider";

export default function Index() {
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <MarqueeStrip />
      <FeaturedSection />
      <SectionDivider />
      <AboutSection />
      <MissionBanner />
      <CareersSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
