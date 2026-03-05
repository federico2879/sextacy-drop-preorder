import Hero from "@/components/Hero";
import MerchPreview from "@/components/MerchPreview";
import PreorderForm from "@/components/PreorderForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <MerchPreview />
      <PreorderForm />
      <Footer />
    </main>
  );
};

export default Index;
