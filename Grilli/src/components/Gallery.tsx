import gallery1 from "@/assets/1.jpg";
import gallery2 from "@/assets/2.jpg";
import gallery3 from "@/assets/3.jpg";
import gallery4 from "@/assets/5.jpg";

const Gallery = () => {
  const images = [
    { src: gallery1, alt: "Pasta dish" },
    { src: gallery2, alt: "Grilled steak" },
    { src: gallery3, alt: "Fresh salad" },
    { src: gallery4, alt: "Chocolate dessert" },
  ];

  return (
    <section id="gallery" className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">Galerija</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {images.map((image, idx) => (
            <div key={idx} className="overflow-hidden rounded-lg aspect-square">
              <img 
                src={image.src} 
                alt={image.alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
