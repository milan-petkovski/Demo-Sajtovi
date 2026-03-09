import Header from '@/components/layout/Header';
import HeroSection from '@/components/sections/HeroSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import CategoriesSection from '@/components/sections/CategoriesSection';
import ProductsSection from '@/components/sections/ProductsSection';
import AboutSection from '@/components/sections/AboutSection';
import Footer from '@/components/sections/Footer';
import FloatingContact from '@/components/FloatingContact';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <CategoriesSection />
        <ProductsSection />
        <AboutSection />
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
};

export default Index;
