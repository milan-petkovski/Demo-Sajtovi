import React from 'react';
import heroDish from '@/assets/hero-dish.jpg';
import restaurantInterior from '@/assets/restaurant-interior.jpg';
import appetizerImg from '@/assets/appetizer.jpg';
import mainCourseImg from '@/assets/main-course.jpg';
import dessertImg from '@/assets/dessert.jpg';

const galleryImages = [
  {
    src: heroDish,
    alt: "Gourmet jelo u elegantnoj prezentaciji",
    category: "food"
  },
  {
    src: restaurantInterior,
    alt: "Elegantni enterijer restorana",
    category: "interior"
  },
  {
    src: appetizerImg,
    alt: "Umetnička preentacija predjela",
    category: "food"
  },
  {
    src: mainCourseImg,
    alt: "Glavno jelo sa savršenom prezentacijom",
    category: "food"
  },
  {
    src: dessertImg,
    alt: "Delikatan desert sa zlatnim akcentima",
    category: "food"
  },
  {
    src: restaurantInterior,
    alt: "Atmosfera restorana",
    category: "interior"
  }
];

const Gallery = () => {
  return (
    <section id="galerija" className="section-padding bg-background">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gold-gradient">Galerija</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Zaronite u atmosferu našeg restorana kroz fotografije koje prikazuju 
            našu culinarnu umetnost i elegantan ambijent.
          </p>
        </div>

        {/* Image grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <div 
              key={index}
              className={`group relative overflow-hidden rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 ${
                index === 0 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
            >
              <div className="elegant-card p-0 overflow-hidden h-full">
                <img
                  src={image.src}
                  alt={image.alt}
                  className={`w-full object-cover transition-transform duration-300 group-hover:scale-110 ${
                    index === 0 ? 'h-96 md:h-[500px]' : 'h-64 md:h-80'
                  }`}
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white text-sm font-medium">
                      {image.alt}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Instagram link */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Pratite nas na Instagramu za najnovije fotografije i događaje
          </p>
          <a 
            href="https://www.instagram.com/restoran_vizija" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-outline-gold inline-flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            @restoran_vizija
          </a>
        </div>
      </div>
    </section>
  );
};

export default Gallery;