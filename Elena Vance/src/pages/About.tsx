import { PageLayout } from "@/components/PageLayout";
import marbleDetail from "@/assets/marble-detail.jpg";
import elenaHero from "@/assets/elena-hero.jpg";

const career = [
  { year: "2019 — danas", role: "Viša korespondentkinja za kulturu", org: "The Atrium Review", desc: "Vodeći autor dugih reportaža o kulturi, identitetu i evropskim umetničkim institucijama." },
  { year: "2016 — 2022", role: "Voditeljka centralnog dnevnika „Evening Edit”", org: "Channel Six", desc: "Šest godina svakodnevnog vođenja informativnog programa, izbornih specijala i kulturnih okruglih stolova." },
  { year: "2013 — 2016", role: "Dopisnica iz inostranstva", org: "Lyon Bureau", desc: "Izveštavanje sa terena iz Francuske, Italije i Severne Afrike za međunarodne redakcije." },
  { year: "2011 — 2013", role: "Redakcijska saradnica", org: "Le Monde — kulturna rubrika", desc: "Prvi koraci u dnevnom novinarstvu, pisanje recenzija i kratkih intervjua." },
];

const shows = [
  { year: "2024", title: "U razgovoru sa Elenom", net: "Arte+", desc: "Autorska serija dugih intervjua sa misliocima, piscima i umetnicima." },
  { year: "2023", title: "Mermer i modernost", net: "Arte+ · BBC Select", desc: "Šestodelni dokumentarac o klasičnoj skulpturi u savremenoj kulturi i modi." },
  { year: "2018 — 2024", title: "Paris Fashion Week Live", net: "Channel Six", desc: "Ko-vođenje glavnih prenosa nedelje mode iz Pariza, sa terenskim segmentima iz ateljea." },
  { year: "2016 — 2022", title: "Evening Edit", net: "Channel Six", desc: "Centralni informativni program koji je obeležio šest sezona prajm tajma." },
  { year: "2014", title: "Glasovi sa juga", net: "Arte Radio", desc: "Radio-dokumentarna serija o ženama u mediteranskim novinarskim redakcijama." },
];

const education = [
  { year: "2012", deg: "M.A. Novinarstvo", org: "Sciences Po, Pariz", note: "Specijalizacija: dugačka forma i evropske institucije." },
  { year: "2010", deg: "B.A. Istorija umetnosti", org: "Univerzitet u Firenci", note: "Diplomski rad o renesansnoj skulpturi i savremenoj percepciji tela." },
  { year: "2018", deg: "Visiting Fellow", org: "Reuters institut, Oksford", note: "Istraživanje o kredibilitetu javnog servisa u doba algoritama." },
];

const awards = [
  { year: "2022", name: "Prix Albert Londres", cat: "Duga forma" },
  { year: "2021", name: "Royal Television Society", cat: "Voditeljka godine" },
  { year: "2020", name: "European Press Prize", cat: "Nominacija — Distinguished Reporting" },
  { year: "2019", name: "Prix Bayeux", cat: "Specijalno priznanje žirija" },
  { year: "2017", name: "Mediterranean Journalism Award", cat: "Mlada autorka godine" },
];

const About = () => {
  return (
    <PageLayout
      eyebrow="O meni"
      title={<>Reči koje ostaju<span className="block italic font-light text-rose-deep">duže od slike.</span></>}
      intro="Više od deset godina razgovaram sa onima koji oblikuju savremenu kulturu — od dizajnera u Milanu do filozofa u Atini. Ovo je sažetak puta koji me je doveo do njih."
    >
      {/* Portrait + bio paragraph */}
      <section className="py-20 md:py-24 bg-background">
        <div className="container grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/5] overflow-hidden shadow-elegant">
              <img src={elenaHero} alt="Portret Elene Vance" className="h-full w-full object-cover" loading="lazy" width={1080} height={1350} />
            </div>
            <div className="absolute -bottom-6 -right-6 w-28 h-36 overflow-hidden shadow-soft hidden md:block">
              <img src={marbleDetail} alt="Detalj klasične skulpture" className="h-full w-full object-cover" loading="lazy" width={1280} height={1600} />
            </div>
          </div>
          <div className="lg:col-span-7">
            <p className="eyebrow mb-5">Biografija</p>
            <h2 className="font-display text-3xl md:text-5xl text-ink leading-tight mb-8">
              Novinarka, voditeljka i<span className="italic text-rose-deep"> tiha posmatračica.</span>
            </h2>
            <div className="space-y-5 text-foreground/75 leading-relaxed font-light text-lg">
              <p>
                Rođena u Trstu, odrasla između Italije i Francuske, Elena Vance je svoj
                profesionalni put započela u kulturnoj rubrici francuskog dnevnika, da bi
                ubrzo prešla na televiziju kao voditeljka centralnog informativnog
                programa.
              </p>
              <p>
                Njen pristup razgovoru oblikovan je studijama istorije umetnosti — uvek
                traži ono što je ispod površine, oblik koji se još nije do kraja izvajao.
                Danas potpisuje autorske dokumentarne serije, vodi panele širom Evrope i
                piše dugačke eseje za The Atrium Review.
              </p>
              <p>
                Govori italijanski, francuski, engleski i srpski. Živi između Pariza i Rima.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Career */}
      <section className="py-20 md:py-24 bg-gradient-soft">
        <div className="container">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="eyebrow mb-4">Karijera</p>
              <h2 className="font-display text-4xl md:text-5xl text-ink">Profesionalni put</h2>
            </div>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground hidden md:block">14 godina · 4 redakcije</span>
          </div>
          <ol className="relative border-l border-rose/40 ml-2">
            {career.map((c) => (
              <li key={c.year} className="pl-8 pb-10 last:pb-0 relative">
                <span className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-rose-deep" />
                <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-rose-deep mb-2">{c.year}</p>
                <h3 className="font-display text-2xl md:text-3xl text-ink leading-tight">{c.role}</h3>
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground mt-1 mb-3">{c.org}</p>
                <p className="text-foreground/75 font-light leading-relaxed max-w-2xl">{c.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Education */}
      <section className="py-20 md:py-24 bg-background">
        <div className="container">
          <p className="eyebrow mb-4">Obrazovanje</p>
          <h2 className="font-display text-4xl md:text-5xl text-ink mb-12">Akademski temelji</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {education.map((e) => (
              <article key={e.deg} className="bg-card border border-border p-7 hover:shadow-soft transition-shadow">
                <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-rose-deep mb-3">{e.year}</p>
                <h3 className="font-display text-2xl text-ink leading-tight mb-2">{e.deg}</h3>
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">{e.org}</p>
                <p className="text-foreground/75 font-light leading-relaxed text-sm">{e.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="py-20 md:py-24 marble-bg grain">
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-12 mb-12">
            <div className="lg:col-span-7">
              <p className="eyebrow mb-4">Priznanja</p>
              <h2 className="font-display text-4xl md:text-5xl text-ink">Nagrade & nominacije</h2>
            </div>
            <p className="lg:col-span-5 text-foreground/70 font-light leading-relaxed self-end">
              Najznačajnija priznanja za rad u dugoj formi, televizijskom voditeljstvu i medijskoj kulturi.
            </p>
          </div>
          <ul className="divide-y divide-border bg-card/60 backdrop-blur">
            {awards.map((a) => (
              <li key={a.name + a.year} className="grid grid-cols-12 gap-4 items-baseline px-6 py-6 hover:bg-card transition-colors">
                <span className="col-span-2 font-mono text-sm tracking-[0.2em] text-rose-deep">{a.year}</span>
                <h3 className="col-span-7 md:col-span-6 font-display text-xl md:text-2xl text-ink">{a.name}</h3>
                <p className="col-span-3 md:col-span-4 text-right md:text-left font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">{a.cat}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Shows history */}
      <section className="py-20 md:py-24 bg-background">
        <div className="container">
          <p className="eyebrow mb-4">Istorijat emisija</p>
          <h2 className="font-display text-4xl md:text-5xl text-ink mb-12">Sve što sam vodila</h2>
          <div className="grid md:grid-cols-2 gap-x-10 gap-y-8">
            {shows.map((s) => (
              <article key={s.title} className="border-l-2 border-rose/50 pl-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-rose-deep mb-2">{s.year} · {s.net}</p>
                <h3 className="font-display text-2xl text-ink leading-tight mb-2">{s.title}</h3>
                <p className="text-foreground/70 font-light leading-relaxed text-sm">{s.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default About;
