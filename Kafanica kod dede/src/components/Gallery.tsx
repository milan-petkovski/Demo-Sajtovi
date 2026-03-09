import React from 'react';
import ambiance1 from '@/assets/ambiance-1.jpg';
import musicEvening from '@/assets/music-evening.jpg';

const Gallery = () => {
  return (
    <section id="gallery" className="py-20 bg-gradient-warm">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
            Atmosfera kafane
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Uronite u toplu atmosferu naše kafane gde se tradicija oseća u svakom kutku.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="group relative overflow-hidden rounded-lg shadow-soft">
            <img 
              src={ambiance1} 
              alt="Enterijer kafane" 
              className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-2xl font-serif font-semibold mb-2">Topao ambijent</h3>
              <p className="text-white/90">Udobna atmosfera za nezaboravne večeri</p>
            </div>
          </div>
          
          <div className="group relative overflow-hidden rounded-lg shadow-soft">
            <img 
              src={musicEvening} 
              alt="Muzičke večeri" 
              className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-2xl font-serif font-semibold mb-2">Muzičke večeri</h3>
              <p className="text-white/90">Uživo nastup svakog vikenda</p>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 mt-8 max-w-6xl mx-auto">
          <div className="bg-card/80 backdrop-blur-sm rounded-lg p-6 text-center shadow-soft">
            <div className="text-3xl mb-3">🎵</div>
            <h4 className="font-serif font-semibold text-foreground mb-2">Živa muzika</h4>
            <p className="text-sm text-muted-foreground">Petak i subota od 20h</p>
          </div>
          
          <div className="bg-card/80 backdrop-blur-sm rounded-lg p-6 text-center shadow-soft">
            <div className="text-3xl mb-3">🍷</div>
            <h4 className="font-serif font-semibold text-foreground mb-2">Domaća rakija</h4>
            <p className="text-sm text-muted-foreground">Iz vlastitih berba</p>
          </div>
          
          <div className="bg-card/80 backdrop-blur-sm rounded-lg p-6 text-center shadow-soft">
            <div className="text-3xl mb-3">👥</div>
            <h4 className="font-serif font-semibold text-foreground mb-2">Privatni eventi</h4>
            <p className="text-sm text-muted-foreground">Za posebne prilike</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;