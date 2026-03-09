import heroImage from "@/assets/hero-restaurant.jpg";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-coffee/40" />
      
      {/* Content */}
      <div className="relative z-10 text-center text-warm-white px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 drop-shadow-lg">
          Dobrodošli u
          <span className="block text-golden-light">Chicota Mazz</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
          Autentičan ukus, topla atmosfera i nezaboravno iskustvo čeka na vas u srcu grada
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-hero text-coffee px-8 py-4 rounded-lg font-semibold text-lg 
                     shadow-warm hover:shadow-lg transform hover:scale-105 transition-all duration-300
                     border border-golden/30 hover:border-golden"
          >
            Pogledaj Meni
          </button>
          
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="border-2 border-warm-white text-warm-white px-8 py-4 rounded-lg font-semibold text-lg
                     hover:bg-warm-white hover:text-coffee transition-all duration-300
                     backdrop-blur-sm"
          >
            Rezerviši Sto
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-warm-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-warm-white/50 rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;