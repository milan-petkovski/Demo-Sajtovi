import { Link } from "react-router-dom";
import elenaHero from "@/assets/elena-hero.jpg";
import marbleDetail from "@/assets/marble-detail.jpg";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <section id="about" className="relative pt-28 md:pt-32 pb-24 overflow-hidden marble-bg grain">
      {/* Dekorativne klasične linije */}
      <div className="absolute top-1/3 left-0 w-1/3 h-px bg-gradient-to-r from-transparent to-rose-deep/30" />
      <div className="absolute bottom-12 right-0 w-1/4 h-px bg-gradient-to-l from-transparent to-rose-deep/30" />

      <div className="container relative">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Tekst */}
          <div className="lg:col-span-7 reveal">
            <p className="eyebrow mb-6">Novinarka · Voditeljka · Pripovedačica</p>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] text-ink">
              Priče vajane
              <span className="block italic font-light text-rose-deep">sa namerom.</span>
            </h1>
            <div className="classical-line my-8 max-w-md" />
            <p className="text-lg md:text-xl text-foreground/70 max-w-xl leading-relaxed font-light">
              Ja sam <span className="text-foreground">Elena Vance</span> — novinarka i televizijska
              voditeljka sa decenijom razgovora o kulturi, modi i tihim
              revolucijama koje oblikuju naše vreme.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-5">
              <Button asChild variant="hero" size="lg" className="group">
                <Link to="/o-meni">
                  Pročitaj više
                  <span className="ml-2 inline-block transition-transform duration-500 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </Button>
              <Link
                to="/emisije"
                className="text-sm uppercase tracking-[0.25em] text-foreground/70 hover:text-rose-deep transition-colors"
              >
                Pogledaj emisije
              </Link>
            </div>
          </div>

          {/* Portret */}
          <div className="lg:col-span-5 relative reveal">
            <div className="relative aspect-[4/5] max-w-md mx-auto">
              <div className="absolute -inset-6 bg-gradient-rose opacity-20 blur-3xl rounded-full" />
              <div className="relative h-full w-full overflow-hidden shadow-elegant">
                <img
                  src={elenaHero}
                  alt="Portret Elene Vance, novinarke i televizijske voditeljke"
                  className="h-full w-full object-cover"
                  width={1080}
                  height={1350}
                />
              </div>
              {/* Akcentni mermerni detalj */}
              <div className="absolute -bottom-8 -left-8 w-32 h-40 overflow-hidden shadow-soft hidden md:block float-slow">
                <img
                  src={marbleDetail}
                  alt="Detalj klasične skulpture"
                  className="h-full w-full object-cover"
                  loading="lazy"
                  width={1280}
                  height={1600}
                />
              </div>
              {/* Natpis */}
              <div className="absolute -top-4 -right-4 bg-card px-4 py-3 shadow-soft hidden md:block">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  Od 2013.
                </p>
                <p className="font-display italic text-rose-deep text-lg leading-none mt-1">
                  Pariz · Rim
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
