import FadeIn from "@/components/FadeIn";
import eventSocial from "@/assets/event-social.jpg";
import eventDance from "@/assets/event-dance.jpg";
import eventTrip from "@/assets/event-trip.jpg";
import centarLife from "@/assets/centar-life.jpg";
import teambuilding from "@/assets/gallery-teambuilding.jpg";
import heroCouple from "@/assets/hero-couple.jpg";

const images = [
  { src: centarLife, alt: "Centar Life – prijatan ambijent", span: "md:col-span-2" },
  { src: eventSocial, alt: "Večer društvenih igara", span: "" },
  { src: eventDance, alt: "Plesna večer", span: "" },
  { src: eventTrip, alt: "Grupni izlet u prirodi", span: "" },
  { src: teambuilding, alt: "Team building aktivnost", span: "" },
  { src: heroCouple, alt: "Srećan par", span: "md:col-span-2" },
];

const Gallery = () => (
  <main className="py-20 bg-background">
    <div className="container mx-auto px-4">
      <FadeIn>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground text-center mb-4">
          Galerija
        </h1>
        <p className="text-center text-muted-foreground max-w-xl mx-auto mb-14">
          Atmosfera naših susreta, događaja i prostora Centar Life
        </p>
      </FadeIn>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {images.map((img, i) => (
          <FadeIn key={i} delay={i * 0.08} className={img.span}>
            <div className="rounded-2xl overflow-hidden h-64 md:h-72">
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  </main>
);

export default Gallery;
