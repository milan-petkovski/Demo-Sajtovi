import catering1 from "@/assets/about.png";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const AboutSection = () => {
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section
      id="o-nama"
      ref={sectionRef}
      className="py-24 px-4"
    >
      <div
        className={`max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center transition-all duration-1000 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div>
          <p className="font-body text-sm tracking-[0.3em] uppercase text-gold-light mb-4">O nama</p>
          <h2 className="text-3xl md:text-5xl font-display gradient-gold-text mb-8">
            Tradicija ukusa i elegancije
          </h2>
          <div className="w-16 h-[1px] gradient-gold mb-8" />
          <p className="font-body text-muted-foreground leading-relaxed mb-6">
            Ketering Karović je premium ketering servis sa sedištem u Beogradu, posvećen stvaranju nezaboravnih kulinarskih iskustava za vaše najvažnije trenutke.
          </p>
          <p className="font-body text-muted-foreground leading-relaxed mb-6">
            Naš tim profesionalnih kuvara koristi samo najkvalitetnije, sveže namirnice kako bi pripremio jela koja oduševljavaju i ukusom i prezentacijom. Od intimnih proslava do velikih svečanosti — svaki događaj tretiramo sa jednakom posvećenošću i pažnjom.
          </p>
          <p className="font-body text-muted-foreground leading-relaxed">
            Sa dugogodišnjim iskustvom u ketering industriji, ponosni smo na reputaciju pouzdanosti, kvaliteta i besprekorne usluge.
          </p>
        </div>
        <div className="relative">
          <div className="absolute -inset-4 border border-gold/20 -z-10" />
          <img
            src={catering1}
            alt="Ketering Karović - bogat izbor hrane na postavci"
            className="w-full h-[500px] object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
