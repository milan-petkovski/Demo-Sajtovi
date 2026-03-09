import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-restaurant.jpg';
import pizzaImage from '@/assets/pizza-hero.jpg';

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Duomo Restaurant Interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-warm-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-cream max-w-4xl mx-auto px-4">
        <div className="animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gold/20 backdrop-blur-sm border border-gold/30 rounded-full px-4 py-2 mb-6">
            <Star className="w-4 h-4 fill-gold text-gold" />
            <span className="text-sm font-medium">Autentična italijanska kuhinja</span>
          </div>

          {/* Main Heading */}
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Dobrodošli u{' '}
            <span className="text-gradient">Duomo</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl mb-8 text-cream/90 max-w-2xl mx-auto leading-relaxed">
            Otkrijte pravi ukus Italije u srcu Beograda. Svježi sastojci, tradicionalni recepti, nezaboravan ambijent.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button variant="reserve" size="xl" asChild>
              <Link to="/rezervacije">Rezerviši sto</Link>
            </Button>
            <Button variant="hero" size="xl" asChild>
              <Link to="/meni">Pogledaj meni</Link>
            </Button>
          </div>

          {/* Scroll Indicator */}
          <div className="animate-elegant-bounce">
            <ArrowDown className="w-6 h-6 mx-auto text-gold" />
          </div>
        </div>
      </div>

      {/* Floating Pizza Image */}
      <div className="hidden lg:block absolute right-10 top-1/2 -translate-y-1/2 animate-slide-up">
        <div className="relative">
          <img
            src={pizzaImage}
            alt="Autentična italijanska pizza"
            className="w-80 h-60 object-cover rounded-2xl shadow-gold"
          />
          <div className="absolute -top-4 -left-4 bg-gold text-warm-black px-3 py-1 rounded-full text-sm font-semibold">
            Specijalitet kuće
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;