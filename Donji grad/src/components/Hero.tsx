import { Button } from "@/components/ui/button";
import { ArrowDown, Clock, MapPin } from "lucide-react";
import heroImage from "@/assets/hero-restaurant.jpg";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 gradient-overlay"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="animate-fade-in">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Dobrodošli u <br />
            <span className="text-restaurant-gold">Restoran Donji Grad</span>
          </h1>
          
          <p className="text-lg sm:text-xl mb-8 text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Otkrijte autentičnu srpsku kuhinju u tradicionalnom ambijentu. 
            Svako jelo je pripravljeno sa ljubavlju i poštovanjem prema tradiciji.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-white px-8 py-3">
              Pogledaj Meni
            </Button>
            <Button variant="outline" size="lg" className="border-white text-black hover:bg-white hover:text-primary px-8 py-3">
              Rezerviši Sto
            </Button>
          </div>

          {/* Quick Info */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-300">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span>Radno vreme: 08:00 - 23:00</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              <span>Visokog Stevana 54, Beograd</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="h-6 w-6 text-white" />
      </div>
    </section>
  );
};

export default Hero;