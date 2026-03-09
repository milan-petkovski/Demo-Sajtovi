import React from 'react';
import heroDish from '@/assets/hero-dish.jpg';
import logo from '@/assets/logo.jpg';

const Hero = () => {
  const scrollToReservations = () => {
    const element = document.getElementById('rezervacije');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="pocetna" className="hero-section">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroDish})`,
        }}
      />
      
      {/* Overlay */}
      <div className="hero-overlay" />
      
      {/* Content */}
      <div className="hero-content max-w-4xl mx-auto">
        <div className="mb-8">
          <img src={logo} alt="Restoran Vizija" className="h-24 w-auto mx-auto mb-6" />
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
          Restoran <span className="gold-gradient">Vizija</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto animate-fade-in">
          Uživaj u ukusu i ambijentu
        </p>
        
        <p className="text-lg mb-12 text-gray-300 max-w-3xl mx-auto animate-fade-in">
          Dobrodošli u svet izuzetnih okusa i elegantne atmosfere. Naš restoran spaja tradiciju sa modernim pristupom kulinarskoj umetnosti.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
          <button 
            onClick={scrollToReservations}
            className="btn-gold"
          >
            Rezervišite sto
          </button>
          <button 
            onClick={() => document.getElementById('meni')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-outline-gold"
          >
            Pogledajte meni
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;