import { PageLayout } from "@/components/PageLayout";
import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";
import blog3 from "@/assets/blog-3.jpg";
import elenaHero from "@/assets/elena-hero.jpg";
import event1 from "@/assets/event-1.jpg";
import event2 from "@/assets/event-2.jpg";
import marbleDetail from "@/assets/marble-detail.jpg";
import personalProject from "@/assets/personal-project.jpg";

type Post = {
  kind: "image" | "video";
  title: string;
  excerpt: string;
  category: string;
  date: string;
  read: string;
  media: string;
};

const posts: Post[] = [
  { kind: "image", title: "O tihoj snazi sporog razgovora", excerpt: "Zašto se naši najsnažniji intervjui događaju u pauzama, a ne u poenima — godina drugačijeg slušanja.", category: "Esej", date: "Mart 2025", read: "8 min", media: blog1 },
  { kind: "video", title: "Iza scene Schiaparellija — kutijni dnevnik", excerpt: "Tri dana u atelju gde se zanat i dalje meri brzinom ruke.", category: "Moda", date: "Februar 2025", read: "Video · 12 min", media: blog2 },
  { kind: "image", title: "Novi javni trg je pozornica", excerpt: "Beleške iz sezone vođenja panela u Atini, Lisabonu i Berlinu o tome šta demokratija danas izvodi.", category: "Kultura", date: "Januar 2025", read: "10 min", media: blog3 },
  { kind: "image", title: "Mermer kao ogledalo savremenog tela", excerpt: "Šta nam Mikelanđelov David govori o tome kako danas gledamo sebe — istraživanje za novu seriju.", category: "Umetnost", date: "Decembar 2024", read: "12 min", media: marbleDetail },
  { kind: "video", title: "Razgovor sa Annie Ernaux", excerpt: "Sat vremena sa nobelovkom o sećanju, klasi i pisanju koje ne zna da laže.", category: "Intervju", date: "Novembar 2024", read: "Video · 58 min", media: elenaHero },
  { kind: "image", title: "Šest žena koje su promenile italijansku TV", excerpt: "Portret generacije voditeljki koje su postavile temelje na kojima i sama stojim.", category: "Portreti", date: "Oktobar 2024", read: "9 min", media: event1 },
  { kind: "video", title: "Backstage Cannes — koga slušamo", excerpt: "Kratki dokumentarni video sa zatvaranja festivala i intervjui sa autorkama u usponu.", category: "Film", date: "Septembar 2024", read: "Video · 22 min", media: event2 },
  { kind: "image", title: "O atelju i odgovornosti mentorstva", excerpt: "Otvoreno pismo mojim koleginicama: zašto smo dužne da otvorimo sopstvene vrata.", category: "Manifest", date: "Avgust 2024", read: "6 min", media: personalProject },
  { kind: "image", title: "Putopis: tri dana u Lisabonu", excerpt: "O svetlu, fado kafeima i razgovorima sa urednicima portugalskih dnevnika.", category: "Putopis", date: "Jul 2024", read: "11 min", media: blog1 },
];

const categories = ["Sve", "Esej", "Intervju", "Moda", "Kultura", "Umetnost", "Film", "Portreti", "Putopis", "Manifest"];

const Blog = () => {
  return (
    <PageLayout
      eyebrow="Dnevnik"
      title={<>Beleške sa terena &<span className="italic font-light text-rose-deep"> duga čitanja.</span></>}
      intro="Eseji, intervjui, putopisi i video-zapisi — sve što ne stane u TV format završi ovde, u sporom ritmu pisanja."
    >
      <section className="py-16 md:py-20 bg-background">
        <div className="container">
          {/* Filter */}
          <div className="flex flex-wrap gap-2 mb-12 pb-6 border-b border-border">
            {categories.map((c, i) => (
              <button
                key={c}
                className={`px-4 py-2 text-xs uppercase tracking-[0.25em] transition-colors ${
                  i === 0 ? "bg-ink text-cream" : "text-foreground/70 hover:text-rose-deep"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {posts.map((p) => (
              <article key={p.title} className="group cursor-pointer">
                <div className="relative aspect-[4/5] overflow-hidden mb-5 bg-muted">
                  <img
                    src={p.media}
                    alt={p.title}
                    loading="lazy"
                    width={1024}
                    height={1280}
                    className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                  />
                  {p.kind === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-card/90 backdrop-blur flex items-center justify-center shadow-soft transition-transform group-hover:scale-110">
                        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-rose-deep ml-1">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  )}
                  <div className="absolute top-4 left-4 bg-card/90 backdrop-blur px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/80">
                    {p.category}
                  </div>
                </div>
                <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground mb-3">
                  <span>{p.date}</span>
                  <span className="w-4 h-px bg-rose-deep/40" />
                  <span>{p.read}</span>
                </div>
                <h3 className="font-display text-2xl md:text-[1.7rem] text-ink leading-tight mb-3 group-hover:text-rose-deep transition-colors">
                  {p.title}
                </h3>
                <p className="text-foreground/70 leading-relaxed font-light">{p.excerpt}</p>
                <span className="inline-block mt-4 text-xs uppercase tracking-[0.25em] text-rose-deep">
                  {p.kind === "video" ? "Pogledaj video →" : "Pročitaj tekst →"}
                </span>
              </article>
            ))}
          </div>

          {/* Pagination hint */}
          <div className="mt-16 flex items-center justify-center gap-6">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">Strana 01 od 06</span>
            <button className="text-xs uppercase tracking-[0.25em] text-rose-deep hover:text-ink transition-colors">
              Sledeća →
            </button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Blog;
