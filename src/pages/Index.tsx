import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import MerchPreview from "@/components/MerchPreview";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <Marquee />
      <MerchPreview />
      <Footer />
    </main>
  );
};

export default Index;
