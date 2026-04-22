import { PageLayout } from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import personalProject from "@/assets/personal-project.jpg";
import marbleDetail from "@/assets/marble-detail.jpg";

const pillars = [
  { n: "01", title: "Mentorstvo", desc: "Dvanaest stipendistkinja godišnje dobija godinu dana mog vremena — mesečne sesije jedan-na-jedan, povratne informacije o radovima i pristup mojim kontaktima." },
  { n: "02", title: "Stipendija", desc: "Mesečna naknada koja pokriva osnovne troškove kako bi se stipendistkinje mogle posvetiti dugačkoj formi, bez pritiska honorara." },
  { n: "03", title: "Redakcija", desc: "Pristup uredničkom timu — lektura, pravne konsultacije, fact-checking i podrška pri plasmanu radova kod evropskih medija." },
];

const fellows = [
  { name: "Léa Bonfanti", country: "Francuska", year: "2024", topic: "Reportaža o radnim uslovima u modnoj industriji" },
  { name: "Sofia Moretti", country: "Italija", year: "2024", topic: "Dokumentarna serija o ženskim manastirima" },
  { name: "Marta Nogueira", country: "Portugal", year: "2023", topic: "Duga forma o stambenoj krizi u Lisabonu" },
  { name: "Eleni Pappas", country: "Grčka", year: "2023", topic: "Audio-dokumentarac o izbeglicama na Lezbosu" },
  { name: "Ivana Petković", country: "Srbija", year: "2024", topic: "Eseji o postjugoslovenskom medijskom pejzažu" },
  { name: "Nour El Hadidi", country: "Tunis", year: "2024", topic: "Investigacija o cenzuri u sredozemnim redakcijama" },
];

const milestones = [
  { y: "2022", t: "Prva sezona", d: "Pokretanje sa osam stipendistkinja u Parizu i Rimu." },
  { y: "2023", t: "Proširenje na jug", d: "Otvaranje prijava za Grčku, Portugal i Bivšu Jugoslaviju." },
  { y: "2024", t: "Prvi koprodukcijski projekat", d: "Tri stipendistkinje zajednički potpisuju dokumentarac za Arte+." },
  { y: "2025", t: "Atelje rezidencija", d: "Stalan prostor u Rimu za rad, snimanje i susrete sa urednicima." },
];

const LicniProjekat = () => {
  return (
    <PageLayout
      eyebrow="Atelje · Lični projekat"
      title={<>The Vance<span className="italic font-light text-rose-deep"> Atelier.</span></>}
      intro="Besplatan mentorski krug za novinarke u usponu iz južne Evrope. Dvanaest stipendistkinja godišnje, jedan razgovor mesečno, jedna ambicija: vratiti vreme dugoj formi."
    >
      {/* Hero block */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container">
          <div className="bg-gradient-rose p-8 md:p-16 lg:p-20 shadow-elegant relative overflow-hidden">
            <div className="absolute inset-0 grain opacity-60" />
            <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-cream/40 blur-3xl" />
            <div className="relative grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              <div className="lg:col-span-7 text-cream">
                <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-cream/80 mb-6">
                  Manifest
                </p>
                <h2 className="font-display text-3xl md:text-5xl leading-tight">
                  Sačuvaj put<span className="italic"> koji bi želela da si dobila.</span>
                </h2>
                <div className="h-px w-24 bg-cream/60 my-7" />
                <p className="text-cream/90 text-lg leading-relaxed font-light max-w-xl">
                  Atelje je nastao iz jednostavnog uvida: najveću razliku u mojoj karijeri
                  napravile su žene koje su pristale da mi posvete sat vremena. Ovo je
                  pokušaj da taj dug vratim sledećoj generaciji — sistematično, bez
                  uslova i besplatno.
                </p>
                <div className="grid grid-cols-3 gap-4 mt-10 max-w-md">
                  <Stat n="48" l="Stipendistkinja od 2022." />
                  <Stat n="9" l="Zemalja" />
                  <Stat n="100%" l="Bez naknade" />
                </div>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Button variant="cream" size="lg">Prijavi se za 2026.</Button>
                  <Button variant="outlineCream" size="lg">Preuzmi manifest</Button>
                </div>
              </div>
              <div className="lg:col-span-5 relative">
                <div className="aspect-[4/5] overflow-hidden shadow-elegant">
                  <img src={personalProject} alt="Stipendistkinje atelja u zajedničkom radu" loading="lazy" width={1280} height={960} className="h-full w-full object-cover" />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-cream px-5 py-4 shadow-soft max-w-[14rem]">
                  <p className="font-display italic text-rose-deep text-lg leading-tight">
                    „Vrati lift za onu koja dolazi posle tebe."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three pillars */}
      <section className="py-20 md:py-24 bg-background">
        <div className="container">
          <p className="eyebrow mb-4">Kako funkcioniše</p>
          <h2 className="font-display text-4xl md:text-5xl text-ink mb-12">Tri stuba programa</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {pillars.map((p) => (
              <article key={p.n} className="relative">
                <span className="font-display italic text-7xl text-rose/40 absolute -top-6 -left-2">{p.n}</span>
                <div className="relative pt-10">
                  <h3 className="font-display text-3xl text-ink mb-4">{p.title}</h3>
                  <p className="text-foreground/75 font-light leading-relaxed">{p.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-20 md:py-24 marble-bg grain">
        <div className="container">
          <p className="eyebrow mb-4">Hronologija</p>
          <h2 className="font-display text-4xl md:text-5xl text-ink mb-12">Četiri godine ateljea</h2>
          <ol className="grid md:grid-cols-4 gap-6">
            {milestones.map((m, i) => (
              <li key={m.y} className="bg-card/70 backdrop-blur p-6 border-t-2 border-rose-deep relative">
                <span className="absolute top-3 right-4 font-display italic text-muted-foreground/60 text-sm">0{i + 1}</span>
                <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-rose-deep mb-3">{m.y}</p>
                <h3 className="font-display text-xl text-ink leading-tight mb-2">{m.t}</h3>
                <p className="text-sm text-foreground/70 font-light leading-relaxed">{m.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Fellows */}
      <section className="py-20 md:py-24 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-10 mb-12">
            <div className="lg:col-span-7">
              <p className="eyebrow mb-4">Stipendistkinje</p>
              <h2 className="font-display text-4xl md:text-5xl text-ink">Generacije 2023 — 2024</h2>
            </div>
            <p className="lg:col-span-5 self-end text-foreground/70 font-light leading-relaxed">
              Šest od četrdeset osam stipendistkinja koje su prošle kroz atelje. Njihovi radovi su objavljeni u Le Monde, Internazionale, Público i El País.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fellows.map((f) => (
              <article key={f.name} className="border border-border p-6 hover:border-rose-deep transition-colors group">
                <div className="flex items-baseline justify-between mb-3">
                  <h3 className="font-display text-xl text-ink group-hover:text-rose-deep transition-colors">{f.name}</h3>
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-rose-deep">{f.year}</span>
                </div>
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-3">{f.country}</p>
                <p className="text-sm text-foreground/75 font-light leading-relaxed">{f.topic}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Apply CTA */}
      <section className="py-20 md:py-24 bg-gradient-soft">
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-4 relative">
              <div className="aspect-[3/4] overflow-hidden shadow-soft">
                <img src={marbleDetail} alt="Detalj klasične skulpture" loading="lazy" className="h-full w-full object-cover" width={1280} height={1600} />
              </div>
            </div>
            <div className="lg:col-span-8">
              <p className="eyebrow mb-4">Prijave 2026.</p>
              <h2 className="font-display text-4xl md:text-6xl text-ink leading-[1.05] mb-6">
                Otvorene od 1. oktobra<span className="italic text-rose-deep"> do 15. novembra.</span>
              </h2>
              <p className="text-foreground/75 font-light leading-relaxed text-lg max-w-2xl mb-8">
                Tražimo dvanaest novinarki ispod 35 godina iz Francuske, Italije, Španije,
                Portugala, Grčke, zemalja Bivše Jugoslavije i Severne Afrike. Bez naknade.
                Bez uslova. Samo predana ideja i jedan dovršeni rad.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="hero" size="lg">Pošalji prijavu</Button>
                <Button variant="outline" size="lg">Pravila programa</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

const Stat = ({ n, l }: { n: string; l: string }) => (
  <div>
    <p className="font-display text-4xl md:text-5xl text-cream">{n}</p>
    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-cream/70 mt-1 leading-tight">{l}</p>
  </div>
);

export default LicniProjekat;
