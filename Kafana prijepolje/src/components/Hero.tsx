import { Button } from "@/components/ui/button";
import heroImage from "@/assets/interior-1.jpg";

interface HeroProps {
  onReserveClick: () => void;
}

const Hero = ({ onReserveClick }: HeroProps) => {
  const scrollToMenu = () => {
    const element = document.getElementById("menu");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Kafana Prijepolje Interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/60 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-3xl animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-display font-bold text-background mb-6 leading-tight">
            Kafana Prijepolje
          </h1>
          <p className="text-xl md:text-2xl text-background/90 mb-8 font-body">
            Domaća hrana, dobra muzika i mesto gde se svi poznanici sretnu.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button onClick={onReserveClick} variant="colorful" size="lg" className="text-lg px-8 py-6">
              Rezerviši sto
            </Button>
            <Button onClick={scrollToMenu} variant="secondary" size="lg" className="text-lg px-8 py-6">
              Pogledaj meni
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative Element */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default Hero;
