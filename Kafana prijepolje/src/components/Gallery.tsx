import { useState } from "react";
import { X } from "lucide-react";
import interior1 from "@/assets/interior-1.jpg";
import interior2 from "@/assets/interior-2.jpg";
import food1 from "@/assets/food-1.jpg";
import food2 from "@/assets/food-2.jpg";
import food3 from "@/assets/food-3.jpg";
import terrace from "@/assets/terrace.jpg";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = [
    { src: interior1, alt: "Kafana Prijepolje Interior" },
    { src: food3, alt: "Pečenje na ražnju" },
    { src: interior2, alt: "Prostor za događaje" },
    { src: food2, alt: "Domaća jela" },
    { src: terrace, alt: "Bašta kafane" },
    { src: food1, alt: "Specijaliteti" },
  ];

  return (
    <section id="gallery" className="py-16 md:py-24 bg-gradient-warm">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
            Galerija
          </h2>
          <div className="w-24 h-1 bg-gradient-colorful mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Doživite atmosferu naše kafane kroz fotografije
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setSelectedImage(image.src)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-foreground/90 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-background hover:text-primary transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X size={32} />
          </button>
          <img
            src={selectedImage}
            alt="Gallery Image"
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
          />
        </div>
      )}
    </section>
  );
};

export default Gallery;
