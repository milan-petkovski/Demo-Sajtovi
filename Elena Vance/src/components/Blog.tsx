import { Link } from "react-router-dom";
import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";
import blog3 from "@/assets/blog-3.jpg";

type Article = {
  kind: "image" | "video";
  title: string;
  excerpt: string;
  category: string;
  date: string;
  media: string;
};

const articles: Article[] = [
  {
    kind: "image",
    title: "O tihoj snazi sporog razgovora",
    excerpt:
      "Zašto se naši najsnažniji intervjui događaju u pauzama, a ne u poenima — godina drugačijeg slušanja.",
    category: "Esej",
    date: "Mart 2025",
    media: blog1,
  },
  {
    kind: "video",
    title: "Iza scene Schiaparellija — kutijni dnevnik",
    excerpt:
      "Tri dana u atelju gde se zanat i dalje meri brzinom ruke.",
    category: "Moda",
    date: "Februar 2025",
    media: blog2,
  },
  {
    kind: "image",
    title: "Novi javni trg je pozornica",
    excerpt:
      "Beleške iz sezone vođenja panela u Atini, Lisabonu i Berlinu o tome šta demokratija danas izvodi.",
    category: "Kultura",
    date: "Januar 2025",
    media: blog3,
  },
];

export const Blog = () => {
  return (
    <section id="blog" className="py-24 md:py-32 bg-gradient-soft">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="eyebrow mb-4">Dnevnik</p>
            <h2 className="font-display text-4xl md:text-6xl text-ink leading-[1]">
              Beleške i<span className="italic text-rose-deep"> duga čitanja</span>
            </h2>
          </div>
          <Link
            to="/blog"
            className="text-sm uppercase tracking-[0.25em] text-foreground/70 hover:text-rose-deep transition-colors self-start md:self-end"
          >
            Pogledaj arhivu →
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {articles.map((a, i) => (
            <article
              key={a.title}
              className="group cursor-pointer"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <div className="relative aspect-[4/5] overflow-hidden mb-6 bg-muted">
                <img
                  src={a.media}
                  alt={a.title}
                  loading="lazy"
                  width={1024}
                  height={1280}
                  className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                />
                {a.kind === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-card/90 backdrop-blur flex items-center justify-center shadow-soft transition-transform group-hover:scale-110">
                      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-rose-deep ml-1">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                )}
                <div className="absolute top-4 left-4 bg-card/90 backdrop-blur px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/80">
                  {a.category}
                </div>
              </div>
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground mb-3">
                {a.date}
              </p>
              <h3 className="font-display text-2xl md:text-3xl text-ink leading-tight mb-3 group-hover:text-rose-deep transition-colors">
                {a.title}
              </h3>
              <p className="text-foreground/70 leading-relaxed font-light">{a.excerpt}</p>
              <span className="inline-block mt-4 text-xs uppercase tracking-[0.25em] text-rose-deep">
                {a.kind === "video" ? "Pogledaj video →" : "Pročitaj tekst →"}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

