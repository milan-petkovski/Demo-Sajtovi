import personalProject from "@/assets/personal-project.jpg";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const PersonalProject = () => {
  return (
    <section id="project" className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Veliki dekorativni glif */}
      <div
        aria-hidden
        className="absolute -top-20 right-0 font-display italic text-[28rem] leading-none text-rose/10 select-none pointer-events-none"
      >
        V
      </div>

      <div className="container relative">
        <div className="bg-gradient-rose p-8 md:p-16 lg:p-20 shadow-elegant relative overflow-hidden">
          <div className="absolute inset-0 grain opacity-60" />
          {/* Lebdeća mermerna mrlja */}
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-cream/40 blur-3xl" />

          <div className="relative grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-7 text-cream">
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-cream/80 mb-6">
                Lični projekat · Od 2022.
              </p>
              <h2 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[0.95]">
                The Vance
                <span className="block italic font-light">Atelier.</span>
              </h2>
              <div className="h-px w-24 bg-cream/60 my-7" />
              <p className="text-cream/90 text-lg leading-relaxed font-light max-w-xl">
                Besplatan mentorski krug za novinarke u usponu iz južne Evrope.
                Dvanaest stipendistkinja godišnje dobija uredničko vođenje, mesečnu
                stipendiju i pristup mojim kontaktima — jer sledeća generacija
                zaslužuje više od noge u vratima.
              </p>

              <div className="grid grid-cols-3 gap-4 mt-10 max-w-md">
                <Stat n="48" l="Stipendistkinja od 2022." />
                <Stat n="9" l="Zemalja" />
                <Stat n="100%" l="Bez naknade" />
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <Button asChild variant="cream" size="lg">
                  <Link to="/licni-projekat">Prijavi se za 2026.</Link>
                </Button>
                <Button asChild variant="outlineCream" size="lg">
                  <Link to="/licni-projekat">Pročitaj manifest</Link>
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="aspect-[4/5] overflow-hidden shadow-elegant">
                <img
                  src={personalProject}
                  alt="Stipendistkinje atelja u zajedničkom radu"
                  loading="lazy"
                  width={1280}
                  height={960}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-cream px-5 py-4 shadow-soft max-w-[14rem]">
                <p className="font-display italic text-rose-deep text-lg leading-tight">
                  „Sačuvaj put koji bi želela da si dobila."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Stat = ({ n, l }: { n: string; l: string }) => (
  <div>
    <p className="font-display text-4xl md:text-5xl text-cream">{n}</p>
    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-cream/70 mt-1 leading-tight">
      {l}
    </p>
  </div>
);
