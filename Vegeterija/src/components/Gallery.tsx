import React from 'react';
import quinoaBowl from '@/assets/quinoa-bowl.jpg';
import lentilSoup from '@/assets/lentil-soup.jpg';
import avocadoToast from '@/assets/avocado-toast.jpg';
import restaurantInterior from '@/assets/restaurant-interior.jpg';
import heroFood from '@/assets/hero-food.jpg';

const Gallery = () => {
  const images = [
    {
      src: heroFood,
      alt: "Raznovrsna veganska jela",
      category: "Hrana"
    },
    {
      src: restaurantInterior,
      alt: "Unutrašnjost restorana Vegeterija",
      category: "Ambijent"
    },
    {
      src: quinoaBowl,
      alt: "Buddha bowl sa kinoom",
      category: "Hrana"
    }
  ];

  return (
    <section id="galerija" className="py-20 bg-gradient-section">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-natural-green mb-6">
            Galerija
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Pogled na naša jela i prijatan ambijent restorana
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <div 
              key={index} 
              className="group relative overflow-hidden rounded-lg shadow-card bg-white hover:shadow-lg transition-all duration-300"
            >
              <div className="aspect-square overflow-hidden">
                <img 
                  src={image.src} 
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 text-white">
                  <span className="text-sm font-medium bg-natural-green px-2 py-1 rounded">
                    {image.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            Pratite nas na{' '}
            <a 
              href="https://www.instagram.com/vegeterija/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-natural-green hover:underline font-medium"
            >
              Instagramu
            </a>
            {' '}za najnovije fotografije naših kreacija!
          </p>
        </div>
      </div>
    </section>
  );
};

export default Gallery;