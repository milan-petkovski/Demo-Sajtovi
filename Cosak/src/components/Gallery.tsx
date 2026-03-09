import gardenChristmas from "@/assets/garden-christmas.jpg";
import entranceNight from "@/assets/entrance-night.jpg";
import logoWall from "@/assets/logo-wall.jpg";
import catDecor from "@/assets/cat-decor.jpg";
import dessertBirthday from "@/assets/dessert-birthday.jpg";
import easterEggs from "@/assets/easter-eggs.jpg";

const galleryImages = [
  { src: gardenChristmas, alt: "Bašta sa božićnom dekoracijom" },
  { src: entranceNight, alt: "Ulaz restorana noću" },
  { src: logoWall, alt: "Logo na zidu restorana" },
  { src: catDecor, alt: "Detalj iz restorana" },
  { src: dessertBirthday, alt: "Torta za rođendan" },
  { src: easterEggs, alt: "Uskršnja dekoracija" }
];

const Gallery = () => {
  return (
    <section id="galerija" className="py-20 px-4 gradient-warm">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl mb-4 text-foreground">
            Galerija
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Zavirite u naš svet - od čarobne bašte do intimnog enterijera
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <div 
              key={index}
              className="group relative overflow-hidden rounded-2xl shadow-soft hover:shadow-glow transition-all duration-500 aspect-square animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <img 
                src={image.src} 
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <p className="text-white p-6 font-medium text-lg">
                  {image.alt}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
