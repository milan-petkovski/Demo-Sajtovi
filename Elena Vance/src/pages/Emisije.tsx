import { PageLayout } from "@/components/PageLayout";

type Show = {
  id: string;
  title: string;
  network: string;
  year: string;
  episodes: string;
  summary: string;
  resume: string;
  videoId: string;
};

const shows: Show[] = [
  {
    id: "1",
    title: "U razgovoru sa Elenom",
    network: "Arte+",
    year: "2024",
    episodes: "Sezona 2 · 12 epizoda",
    summary:
      "Intimna serija dugih intervjua u kojoj umetnici, pisci i mislioci govore bez sata. Svaka epizoda je jedan neprekinut razgovor, montiran sa uzdržanošću portreta.",
    resume:
      "Format koji je vratio sporost u prajm tajm: bez umetaka, bez muzike, bez prekida. Među gostima druge sezone: Annie Ernaux, Pierpaolo Piccioli, Olafur Eliasson i Édouard Louis.",
    videoId: "ZXsQAXx_ao0",
  },
  {
    id: "2",
    title: "Mermer i modernost",
    network: "Arte+ · BBC Select",
    year: "2023",
    episodes: "Mini-serija · 6 epizoda",
    summary:
      "Šestodelni dokumentarac koji prati klasičnu skulpturu kroz savremenu modu, dizajn i identitet — od mermernih kamenoloma Toskane do tokijskih pista.",
    resume:
      "Autorski projekat koji sam razvijala tri godine, snimano na pet lokacija u tri zemlje. Nominovan za Grimme-Preis i prikazan na festivalima u Veneciji i Sheffieldu.",
    videoId: "LXb3EKWsInQ",
  },
  {
    id: "3",
    title: "Evening Edit",
    network: "Channel Six",
    year: "2016 — 2022",
    episodes: "6 sezona · prajm tajm",
    summary:
      "Šest godina vođenja centralnog informativnog programa, uključujući okrugli sto za izbore 2020. i otvaranje Venecijanskog bijenala uživo.",
    resume:
      "Najgledaniji večernji program u svojoj kategoriji tri sezone zaredom. Obeležen specijalima sa terena iz Bejruta, Atine i Lampeduze, kao i razgovorima sa svetskim liderima.",
    videoId: "aqz-KE-bpKQ",
  },
  {
    id: "4",
    title: "Paris Fashion Week Live",
    network: "Channel Six",
    year: "2018 — 2024",
    episodes: "14 sezona · uživo",
    summary:
      "Ko-vođenje glavnih televizijskih prenosa Pariske nedelje mode, sa terenskim segmentima iz ateljea i razgovorima sa kreatorima.",
    resume:
      "Više od 200 sati programa uživo, uključujući ekskluzivne razgovore sa Maria Grazia Chiuri, Pierpaolom Piccioliem i Daniel Roseberryjem. Dve sezone snimljene i u 4K formatu za streaming.",
    videoId: "oUFJJNQGwhk",
  },
  {
    id: "5",
    title: "Glasovi sa juga",
    network: "Arte Radio",
    year: "2014",
    episodes: "Radio · 8 epizoda",
    summary:
      "Radio-dokumentarna serija o ženama u mediteranskim novinarskim redakcijama — od Atine i Palerma do Tunisa.",
    resume:
      "Prva produkcija pod mojim autorskim potpisom. Osvojila Prix Italia za najbolju radio-dokumentarnu seriju i postavila temelje za kasniji rad u dugoj formi.",
    videoId: "1ZYbU82GVz4",
  },
];

const Emisije = () => {
  return (
    <PageLayout
      eyebrow="Na ekranu"
      title={<>Emisije &<span className="italic font-light text-rose-deep"> dokumentarci.</span></>}
      intro="Pet projekata koji su obeležili poslednjih deset godina mog rada — od večernjih dnevnika do autorskih dokumentarnih serija."
    >
      <section className="py-20 md:py-28 bg-background">
        <div className="container space-y-20 md:space-y-28">
          {shows.map((s, i) => (
            <article
              key={s.id}
              className={`grid lg:grid-cols-12 gap-8 lg:gap-14 items-center ${
                i % 2 === 1 ? "lg:[direction:rtl]" : ""
              }`}
            >
              <div className="lg:col-span-7 [direction:ltr]">
                <div className="relative aspect-video overflow-hidden bg-muted shadow-elegant">
                  <div className="absolute -inset-3 bg-gradient-rose opacity-20 blur-2xl -z-10" />
                  <iframe
                    src={`https://www.youtube.com/embed/${s.videoId}?rel=0`}
                    title={s.title}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                  />
                </div>
              </div>

              <div className="lg:col-span-5 [direction:ltr]">
                <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground mb-4">
                  <span>{s.network}</span>
                  <span className="w-6 h-px bg-rose-deep/40" />
                  <span>{s.year}</span>
                  <span className="w-6 h-px bg-rose-deep/40" />
                  <span className="text-rose-deep">{s.episodes}</span>
                </div>
                <h2 className="font-display text-3xl md:text-5xl text-ink leading-[1.05] mb-5">
                  {s.title}
                </h2>
                <p className="text-foreground/80 leading-relaxed font-light text-lg mb-5">
                  {s.summary}
                </p>
                <div className="border-l-2 border-rose/50 pl-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-rose-deep mb-2">
                    Rezime
                  </p>
                  <p className="text-foreground/70 font-light leading-relaxed text-sm">
                    {s.resume}
                  </p>
                </div>
                <a
                  href={`https://www.youtube.com/watch?v=${s.videoId}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block mt-6 text-xs uppercase tracking-[0.25em] text-rose-deep hover:text-ink transition-colors"
                >
                  Pogledaj celu epizodu →
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </PageLayout>
  );
};

export default Emisije;
