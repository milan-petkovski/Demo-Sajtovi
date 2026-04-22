type Show = {
  id: string;
  title: string;
  network: string;
  year: string;
  summary: string;
  videoId: string;
};

const shows: Show[] = [
  {
    id: "1",
    title: "U razgovoru sa Elenom",
    network: "Arte+",
    year: "2024",
    summary:
      "Intimna serija dugih intervjua u kojoj umetnici, pisci i mislioci govore bez sata. Svaka epizoda je jedan neprekinut razgovor, montiran sa uzdržanošću portreta.",
    videoId: "ZXsQAXx_ao0",
  },
  {
    id: "2",
    title: "Mermer i modernost",
    network: "Arte+ · BBC Select",
    year: "2023",
    summary:
      "Šestodelni dokumentarac koji prati klasičnu skulpturu kroz savremenu modu, dizajn i identitet — od mermernih kamenoloma Toskane do tokijskih pista.",
    videoId: "LXb3EKWsInQ",
  },
  {
    id: "3",
    title: "Evening Edit",
    network: "Channel Six",
    year: "2016 — 2022",
    summary:
      "Šest godina vođenja centralnog informativnog programa, uključujući okrugli sto za izbore 2020. i otvaranje Venecijanskog bijenala uživo.",
    videoId: "aqz-KE-bpKQ",
  },
];

export const Shows = () => {
  return (
    <section id="shows" className="py-24 md:py-32 bg-background">
      <div className="container">
        <div className="max-w-3xl mb-20">
          <p className="eyebrow mb-4">Na ekranu</p>
          <h2 className="font-display text-4xl md:text-6xl text-ink leading-[1]">
            Emisije &<span className="italic text-rose-deep"> dokumentarci</span>
          </h2>
          <div className="classical-line mt-8 max-w-xs" />
        </div>

        <div className="space-y-20 md:space-y-28">
          {shows.map((s, i) => (
            <div
              key={s.id}
              className={`grid lg:grid-cols-12 gap-8 lg:gap-14 items-center ${
                i % 2 === 1 ? "lg:[direction:rtl]" : ""
              }`}
            >
              <div className="lg:col-span-7 [direction:ltr]">
                <div className="relative aspect-video overflow-hidden bg-muted shadow-elegant group">
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
                <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground mb-4">
                  <span>{s.network}</span>
                  <span className="w-6 h-px bg-rose-deep/40" />
                  <span>{s.year}</span>
                </div>
                <h3 className="font-display text-3xl md:text-5xl text-ink leading-[1.05] mb-5">
                  {s.title}
                </h3>
                <p className="text-foreground/75 leading-relaxed font-light text-lg">
                  {s.summary}
                </p>
                <a
                  href={`https://www.youtube.com/watch?v=${s.videoId}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block mt-6 text-xs uppercase tracking-[0.25em] text-rose-deep hover:text-ink transition-colors"
                >
                  Pogledaj celu epizodu →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
