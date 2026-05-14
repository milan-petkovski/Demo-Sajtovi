import event1 from "@/assets/event-1.jpg";
import event2 from "@/assets/event-2.jpg";

type Event = {
  date: string;
  city: string;
  title: string;
  role: string;
  type: "Konferencija" | "Panel" | "Modna revija";
  image?: string;
};

const events: Event[] = [
  {
    date: "Maj 2025",
    city: "Cannes",
    title: "Žene u dokumentarcu — završni panel",
    role: "Moderatorka",
    type: "Panel",
    image: event1,
  },
  {
    date: "April 2025",
    city: "Milano",
    title: "Prada SS26 — prvi red i izveštaji iza scene",
    role: "Korespondentkinja",
    type: "Modna revija",
    image: event2,
  },
  {
    date: "Mart 2025",
    city: "Lisabon",
    title: "Web Summit — Budućnost javne reči",
    role: "Keynote",
    type: "Konferencija",
  },
  {
    date: "Februar 2025",
    city: "Pariz",
    title: "Schiaparelli Couture — vođenje uživo",
    role: "Voditeljka",
    type: "Modna revija",
  },
  {
    date: "Januar 2025",
    city: "Davos",
    title: "World Economic Forum — Kulturne struje",
    role: "Panelistkinja",
    type: "Konferencija",
  },
  {
    date: "Novembar 2024",
    city: "Atina",
    title: "Onassis fondacija — Demokratija i pozorište",
    role: "Moderatorka",
    type: "Panel",
  },
];

export const Events = () => {
  return (
    <section id="events" className="py-24 md:py-32 marble-bg grain relative">
      <div className="container relative">
        <div className="grid lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-4">Pozornice & saloni</p>
            <h2 className="font-display text-4xl md:text-6xl text-ink leading-[1]">
              Gde sam
              <span className="italic text-rose-deep"> govorila i vodila</span>
            </h2>
          </div>
          <p className="lg:col-span-5 text-foreground/70 font-light leading-relaxed self-end">
            Od prvog reda u Milanu do glavnih bina u Davosu — selekcija konferencija,
            panela i nedelja mode koje sam vodila, moderirala ili izveštavala.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Glavne kartice sa slikama */}
          {events.slice(0, 2).map((e) => (
            <article
              key={e.title}
              className="lg:col-span-1 relative aspect-[3/4] overflow-hidden group shadow-soft"
            >
              <img
                src={e.image}
                alt={e.title}
                loading="lazy"
                width={1024}
                height={1024}
                className="h-full w-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
              <div className="absolute inset-0 p-7 flex flex-col justify-end text-cream">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-cream/80 mb-2">
                  {e.type} · {e.date}
                </span>
                <h3 className="font-display text-2xl md:text-3xl leading-tight">{e.title}</h3>
                <p className="font-mono text-[11px] uppercase tracking-[0.25em] mt-3 text-rose">
                  {e.city} — {e.role}
                </p>
              </div>
            </article>
          ))}

          {/* Lista */}
          <div className="lg:col-span-1 bg-card border border-border p-7 flex flex-col">
            <p className="eyebrow mb-5">U najavi & nedavno</p>
            <ul className="flex-1 divide-y divide-border">
              {events.slice(2).map((e) => (
                <li key={e.title} className="py-4 first:pt-0 last:pb-0 group cursor-default">
                  <div className="flex items-baseline justify-between gap-3 mb-1">
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                      {e.date}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-rose-deep">
                      {e.city}
                    </span>
                  </div>
                  <h4 className="font-display text-xl text-ink leading-snug group-hover:text-rose-deep transition-colors">
                    {e.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    {e.type} · {e.role}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

