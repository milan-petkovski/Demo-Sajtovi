import gallery1 from "@/assets/cosmokids.jpg";
import gallery2 from "@/assets/hillhouse.png";
import gallery3 from "@/assets/lacasita.jpg";
import gallery4 from "@/assets/lanadreamhouse.png";
import gallery5 from "@/assets/lanaplay.jpg";
import gallery6 from "@/assets/palacekids.jpg";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const galleryItems = [
  { image: gallery1, label: "Igraonica Cosmo Kids Galerija" },
  { image: gallery2, label: "Hill Luxury House" },
  { image: gallery3, label: "La Casita" },
  { image: gallery4, label: "Lana Dream House Kosmaj" },
  { image: gallery5, label: "Play Land Sava Centar" },
  { image: gallery6, label: "Palače Kids Dedinje" },
];

const GallerySection = () => {
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section id="galerija" ref={sectionRef} className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div
          className={`text-center mb-16 transition-all duration-800 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="font-body text-sm tracking-[0.3em] uppercase text-gold-light mb-4">Portfolio</p>
          <h2 className="text-3xl md:text-5xl font-display gradient-gold-text mb-6">
            Galerija sa lokacija
          </h2>
          <div className="w-16 h-[1px] gradient-gold mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {galleryItems.map((item, i) => (
            <div
              key={i}
              className={`group relative overflow-hidden aspect-[4/3] border border-border hover:border-gold/30 transition-all duration-700 ease-out ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: isVisible ? `${i * 150}ms` : "0ms" }}
            >
              <img
                src={item.image}
                alt={item.label}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-background/40 group-hover:bg-background/20 transition-colors duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="font-display text-lg text-foreground">{item.label}</p>
                <div className="w-10 h-[1px] gradient-gold mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
