import Hero from "@/components/Hero";
import MerchPreview from "@/components/MerchPreview";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <MerchPreview />
      <HowItWorks />
      <Footer />
    </main>
  );
};

export default Index;
