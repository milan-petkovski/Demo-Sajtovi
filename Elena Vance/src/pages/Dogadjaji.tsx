import { PageLayout } from "@/components/PageLayout";
import event1 from "@/assets/event-1.jpg";
import event2 from "@/assets/event-2.jpg";
import blog2 from "@/assets/blog-2.jpg";
import blog3 from "@/assets/blog-3.jpg";

type Event = {
  date: string;
  city: string;
  title: string;
  role: string;
  type: "Konferencija" | "Panel" | "Modna revija";
  desc: string;
  image?: string;
};

const featured: Event[] = [
  { date: "Maj 2025", city: "Cannes", title: "Žene u dokumentarcu — završni panel", role: "Moderatorka", type: "Panel", image: event1, desc: "Trosatna diskusija sa rediteljkama o ekonomiji nezavisnog dokumentarca i evropskim koprodukcijama." },
  { date: "April 2025", city: "Milano", title: "Prada SS26 — prvi red i izveštaji iza scene", role: "Korespondentkinja", type: "Modna revija", image: blog2, desc: "Tri dana izveštavanja sa najvažnije revije Milanske nedelje mode, sa intervjuima u atelju." },
  { date: "Mart 2025", city: "Lisabon", title: "Web Summit — Budućnost javne reči", role: "Keynote", type: "Konferencija", image: blog3, desc: "Centralni govor o ulozi javnog servisa u doba algoritamskog kuriranja informacija." },
  { date: "Februar 2025", city: "Pariz", title: "Schiaparelli Couture — vođenje uživo", role: "Voditeljka", type: "Modna revija", image: event2, desc: "Vođenje televizijskog prenosa kutijne revije i razgovor sa Daniel Roseberryjem nakon šoua." },
];

const list: Event[] = [
  { date: "Januar 2025", city: "Davos", title: "World Economic Forum — Kulturne struje", role: "Panelistkinja", type: "Konferencija", desc: "Diskusija o mekoj moći i evropskim kulturnim institucijama." },
  { date: "Novembar 2024", city: "Atina", title: "Onassis fondacija — Demokratija i pozorište", role: "Moderatorka", type: "Panel", desc: "Razgovor sa rediteljima i filozofima o pozornici kao javnom prostoru." },
  { date: "Oktobar 2024", city: "Rim", title: "Festival du Film — okrugli sto autorki", role: "Moderatorka", type: "Panel", desc: "Rediteljke u usponu o evropskoj filmskoj distribuciji." },
  { date: "Septembar 2024", city: "Njujork", title: "UN Women — Equal Voices Forum", role: "Keynote", type: "Konferencija", desc: "Govor o medijskoj reprezentaciji i ekonomiji pažnje." },
  { date: "Septembar 2024", city: "Milano", title: "Bottega Veneta SS25", role: "Voditeljka uživo", type: "Modna revija", desc: "Vođenje terenskog izveštaja i intervjui sa kupcima." },
  { date: "Jun 2024", city: "Berlin", title: "re:publica — Verovati u medije", role: "Panelistkinja", type: "Konferencija", desc: "Diskusija o kredibilitetu i transparentnosti u redakcijama." },
  { date: "Maj 2024", city: "Pariz", title: "Festival International de Journalisme", role: "Moderatorka", type: "Panel", desc: "Razgovor o budućnosti dugog formata na televiziji." },
  { date: "April 2024", city: "Firenca", title: "Pitti Donna — Heritage & Future", role: "Voditeljka", type: "Modna revija", desc: "Vođenje glavnog programa povodom 100 godina italijanske mode." },
];

const upcoming = [
  { date: "Jun 2025", city: "Beograd", title: "Mediterranean Media Forum", role: "Keynote" },
  { date: "Jul 2025", city: "Sarajevo", title: "Sarajevo Film Festival — Talents Panel", role: "Moderatorka" },
  { date: "Septembar 2025", city: "Pariz", title: "Paris Fashion Week SS26 — vođenje", role: "Voditeljka" },
];

const Dogadjaji = () => {
  return (
    <PageLayout
      eyebrow="Pozornice & saloni"
      title={<>Gde sam<span className="italic font-light text-rose-deep"> govorila i vodila.</span></>}
      intro="Selekcija konferencija, panela i modnih revija koje sam vodila, moderirala ili izveštavala u poslednjih dvanaest meseci."
    >
      {/* Featured grid */}
      <section className="py-20 md:py-24 bg-background">
        <div className="container">
          <p className="eyebrow mb-4">Izdvojeno</p>
          <h2 className="font-display text-4xl md:text-5xl text-ink mb-12">Glavna pojavljivanja</h2>
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {featured.map((e) => (
              <article key={e.title} className="relative aspect-[4/5] md:aspect-[5/6] overflow-hidden group shadow-soft">
                <img
                  src={e.image}
                  alt={e.title}
                  loading="lazy"
                  width={1024}
                  height={1280}
                  className="h-full w-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent" />
                <div className="absolute inset-0 p-7 md:p-10 flex flex-col justify-end text-cream">
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-cream/80 mb-3">
                    {e.type} · {e.date} · {e.city}
                  </span>
                  <h3 className="font-display text-2xl md:text-4xl leading-tight mb-3">{e.title}</h3>
                  <p className="text-cream/85 font-light leading-relaxed max-w-md text-sm md:text-base">{e.desc}</p>
                  <p className="font-mono text-[11px] uppercase tracking-[0.25em] mt-4 text-rose">
                    Uloga — {e.role}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* All events list */}
      <section className="py-20 md:py-24 bg-gradient-soft">
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-12 mb-12">
            <div className="lg:col-span-7">
              <p className="eyebrow mb-4">Arhiva</p>
              <h2 className="font-display text-4xl md:text-5xl text-ink">Sva pojavljivanja</h2>
            </div>
            <p className="lg:col-span-5 text-foreground/70 font-light leading-relaxed self-end">
              Pun spisak konferencija, panela i modnih događaja u proteklih dvanaest meseci.
            </p>
          </div>
          <ul className="bg-card border border-border divide-y divide-border">
            {list.map((e) => (
              <li key={e.title} className="grid grid-cols-12 gap-3 md:gap-6 items-baseline px-5 md:px-8 py-6 hover:bg-muted/40 transition-colors">
                <span className="col-span-4 md:col-span-2 font-mono text-[10px] md:text-xs uppercase tracking-[0.25em] text-rose-deep">
                  {e.date}
                </span>
                <span className="col-span-4 md:col-span-2 font-mono text-[10px] md:text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  {e.city}
                </span>
                <div className="col-span-12 md:col-span-6 order-3 md:order-none">
                  <h3 className="font-display text-xl md:text-2xl text-ink leading-snug">{e.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{e.desc}</p>
                </div>
                <span className="col-span-4 md:col-span-2 text-right font-mono text-[10px] md:text-xs uppercase tracking-[0.25em] text-foreground/70">
                  {e.type}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Upcoming */}
      <section className="py-20 md:py-24 bg-background">
        <div className="container">
          <p className="eyebrow mb-4">U najavi</p>
          <h2 className="font-display text-4xl md:text-5xl text-ink mb-12">Predstojeći datumi</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {upcoming.map((u) => (
              <article key={u.title} className="border border-border p-7 hover:border-rose-deep transition-colors">
                <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-rose-deep mb-3">{u.date}</p>
                <h3 className="font-display text-2xl text-ink leading-tight mb-2">{u.title}</h3>
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  {u.city} · {u.role}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Dogadjaji;
