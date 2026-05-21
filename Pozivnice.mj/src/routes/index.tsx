import { useEffect, useMemo, useRef, useState } from "react";
import logo from "@/assets/logo-mj.jpg";
import hero from "@/assets/hero-invitations.jpg";
import catVencanje from "@/assets/cat-vencanje.jpg";
import catCestitke from "@/assets/cat-cestitke.jpg";
import catDekoracija from "@/assets/cat-dekoracija.jpg";
import catFutrola from "@/assets/cat-futrola.jpg";
import catVizit from "@/assets/cat-vizit.jpg";

const NAV = [
  { href: "#showcase", label: "Showcase" },
  { href: "#kategorije", label: "Kategorije" },
  { href: "#preview", label: "Live Preview" },
  { href: "#utisci", label: "Utisci" },
  { href: "#kontakt", label: "Kontakt" },
];

const CATEGORIES = [
  { id: "vencanje", title: "Venčanje", desc: "Elegantni florali i minimalistički dizajn za Vaš najvažniji dan.", img: catVencanje, tag: "Wedding" },
  { id: "cestitke", title: "Čestitke", desc: "Personalizovane čestitke sa zlatnim akcentima.", img: catCestitke, tag: "Greetings" },
  { id: "dekoracija", title: "Dekoracija", desc: "Detalji koji upotpunjuju Vaše slavlje.", img: catDekoracija, tag: "Decor" },
  { id: "futrola", title: "Futrola + Čestitka", desc: "Luksuzne futrole sa voštanim pečatom.", img: catFutrola, tag: "Envelopes" },
  { id: "vizit", title: "Vizit Karte", desc: "Premium poslovne kartice sa zlatofolijom.", img: catVizit, tag: "Business" },
];

const FILTERS = [
  { id: "all", label: "Sve" },
  { id: "vencanje", label: "Venčanje" },
  { id: "cestitke", label: "Čestitke" },
  { id: "dekoracija", label: "Dekoracija" },
  { id: "futrola", label: "Futrola" },
  { id: "vizit", label: "Vizit Karte" },
];

const TESTIMONIALS = [
  { name: "Ivana & Sebastian", text: "Pozivnice su nadmašile sva naša očekivanja. Gosti su bili oduševljeni elegancijom i detaljima.", role: "Venčanje, septembar 2025" },
  { name: "Marija J.", text: "Brza komunikacija, izrada za 24h i savršen dizajn po našoj želji. Najlepše preporuke!", role: "Krštenje, novembar 2025" },
  { name: "Ana & Vladimir", text: "Elektronske pozivnice su bile pravi pogodak — moderno, ekološki i izuzetno lepo dizajnirano.", role: "Venčanje, april 2026" },
  { name: "Nikola S.", text: "Vizit karte sa zlatnom folijom — prestiž koji se oseti čim ih izvadiš iz džepa.", role: "Poslovni klijent" },
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Monogram({ size = 44 }: { size?: number }) {
  return (
    <div
      className="rounded-full overflow-hidden ring-1 ring-[color:var(--gold)]/40 shadow-luxe"
      style={{ width: size, height: size, background: "var(--cocoa)" }}
    >
      <img src={logo} alt="pozivnice.mj monogram" width={size} height={size} className="w-full h-full object-cover" />
    </div>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "py-2" : "py-4"}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className={`glass rounded-full px-4 sm:px-6 py-2.5 flex items-center justify-between transition-all ${scrolled ? "shadow-luxe" : ""}`}>
          <a href="#top" className="flex items-center gap-3">
            <Monogram size={36} />
            <span className="font-display text-lg tracking-wide">
              pozivnice<span className="text-[color:var(--gold)]">.</span>mj
            </span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="text-[color:var(--foreground)]/80 hover:text-[color:var(--foreground)] transition-colors">
                {n.label}
              </a>
            ))}
          </nav>
          <a href="#kontakt" className="hidden md:inline-flex items-center rounded-full bg-[color:var(--cocoa)] text-[color:var(--cream)] px-5 py-2 text-sm hover:bg-[color:var(--cocoa)]/90 transition">
            Naruči
          </a>
          <button aria-label="Menu" onClick={() => setOpen((o) => !o)} className="md:hidden p-2 rounded-full hover:bg-[color:var(--beige)]">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        {open && (
          <div className="md:hidden glass mt-2 rounded-3xl p-4 space-y-2">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="block px-3 py-2 rounded-xl hover:bg-[color:var(--beige)]">
                {n.label}
              </a>
            ))}
            <a href="#kontakt" onClick={() => setOpen(false)} className="block px-3 py-2 rounded-xl bg-[color:var(--cocoa)] text-[color:var(--cream)] text-center">
              Naruči
            </a>
          </div>
        )}
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 80% 10%, rgba(201,162,76,0.12), transparent 60%), radial-gradient(50% 40% at 0% 100%, rgba(43,30,19,0.10), transparent 60%), linear-gradient(180deg, #FFFDFB 0%, #F4EFEA 100%)",
        }}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <div className="lg:col-span-7 reveal">
          <div className="inline-flex items-center gap-2 glass rounded-full px-3 py-1.5 text-xs tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--gold)]" />
            Elite Invitation Studio
          </div>
          <h1 className="mt-6 font-display text-4xl sm:text-6xl lg:text-7xl leading-[1.02] tracking-tight">
            Pozivnice za <em className="italic font-serif text-gold-gradient">SVE</em> Vaše
            <br className="hidden sm:block" /> bitne trenutke <span className="text-[color:var(--gold)]">✦</span>
          </h1>
          <p className="mt-6 max-w-xl text-base sm:text-lg text-[color:var(--muted-foreground)] leading-relaxed">
            Elektronske, animirane i štampane pozivnice kreirane po Vašem izboru — za manje od 24 sata.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#kategorije"
              className="group inline-flex items-center gap-2 rounded-full bg-[color:var(--cocoa)] text-[color:var(--cream)] px-6 py-3.5 text-sm font-medium hover:bg-[color:var(--cocoa)]/90 transition shadow-luxe"
            >
              Pogledaj Katalog
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="group-hover:translate-x-1 transition-transform">
                <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href="#kontakt"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium border border-[color:var(--cocoa)]/20 hover:border-[color:var(--cocoa)] transition"
            >
              Naruči Odmah
            </a>
          </div>
          <div className="mt-10 flex items-center gap-6 text-xs text-[color:var(--muted-foreground)]">
            <div className="flex items-center gap-1.5">
              <Stars />
              <span>5.0 · 200+ zadovoljnih klijenata</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-[color:var(--gold)]" />
              Izrada za 24h
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 relative reveal">
          <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-luxe ring-gold">
            <img src={hero} alt="Luksuzne pozivnice sa voštanim pečatom" className="w-full h-full object-cover" width={1536} height={1536} />
            <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--cocoa)]/30 via-transparent to-transparent" />
          </div>
          {/* floating phone card */}
          <div className="absolute -left-6 sm:-left-10 bottom-8 w-40 sm:w-52 rotate-[-6deg]">
            <div className="glass rounded-2xl p-3 shadow-luxe">
              <div className="aspect-[9/16] rounded-xl overflow-hidden bg-[color:var(--cocoa)] flex items-center justify-center">
                <img src={logo} alt="" className="w-16 h-16 rounded-full object-cover" />
              </div>
              <p className="text-[10px] mt-2 text-center uppercase tracking-widest text-[color:var(--muted-foreground)]">Elektronska</p>
            </div>
          </div>
          {/* floating badge */}
          <div className="absolute -right-3 top-8 glass rounded-2xl px-4 py-3 shadow-luxe">
            <p className="text-xs uppercase tracking-widest text-[color:var(--muted-foreground)]">Izrada</p>
            <p className="font-display text-2xl">&lt; 24h</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stars({ n = 5 }: { n?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: n }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-[color:var(--gold)]">
          <path d="M12 2l2.95 6.99L22 10.27l-5.5 4.78L18.18 22 12 18.27 5.82 22l1.68-6.95L2 10.27l7.05-1.28L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function SectionHeader({ kicker, title, sub }: { kicker: string; title: React.ReactNode; sub?: string }) {
  return (
    <div className="max-w-2xl reveal">
      <p className="text-xs uppercase tracking-[0.25em] text-[color:var(--gold)]">{kicker}</p>
      <h2 className="mt-3 font-display text-3xl sm:text-5xl tracking-tight">{title}</h2>
      {sub && <p className="mt-4 text-[color:var(--muted-foreground)]">{sub}</p>}
    </div>
  );
}

function Showcase() {
  return (
    <section id="showcase" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          kicker="Showcase"
          title={<>Atelje detalja koji <em className="italic">ostavljaju utisak</em></>}
          sub="Od prvog tona papira do voštanog pečata — svaki element kreiramo sa pažnjom dostojnom Vaših najvažnijih trenutaka."
        />
        <div className="mt-12 grid grid-cols-12 gap-4 sm:gap-6">
          <div className="col-span-12 md:col-span-7 reveal">
            <div className="relative rounded-[1.5rem] overflow-hidden aspect-[16/11] shadow-luxe">
              <img src={catVencanje} alt="Pozivnica za venčanje" className="w-full h-full object-cover transition-transform duration-[1.2s] hover:scale-105" loading="lazy" />
              <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-[color:var(--cocoa)]/70 to-transparent">
                <p className="text-[color:var(--cream)] font-display text-2xl">Venčanja</p>
              </div>
            </div>
          </div>
          <div className="col-span-12 md:col-span-5 grid grid-rows-2 gap-4 sm:gap-6">
            <div className="reveal relative rounded-[1.5rem] overflow-hidden shadow-luxe">
              <img src={catFutrola} alt="Futrola sa pečatom" className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-[color:var(--cocoa)]/70 to-transparent">
                <p className="text-[color:var(--cream)] font-display text-xl">Futrole &amp; Pečati</p>
              </div>
            </div>
            <div className="reveal relative rounded-[1.5rem] overflow-hidden shadow-luxe">
              <img src={catVizit} alt="Vizit karte" className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-[color:var(--cocoa)]/70 to-transparent">
                <p className="text-[color:var(--cream)] font-display text-xl">Vizit Karte</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Categories() {
  const [active, setActive] = useState("all");
  const items = useMemo(
    () => (active === "all" ? CATEGORIES : CATEGORIES.filter((c) => c.id === active)),
    [active],
  );
  return (
    <section id="kategorije" className="py-20 sm:py-28 bg-[color:var(--beige)]/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <SectionHeader
            kicker="Kategorije"
            title={<>Naša <em className="italic">kolekcija</em></>}
            sub="Odaberite kategoriju i istražite kreacije po meri."
          />
          <div className="flex flex-wrap gap-2 reveal">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setActive(f.id)}
                className={`px-4 py-2 rounded-full text-sm transition border ${active === f.id
                  ? "bg-[color:var(--cocoa)] text-[color:var(--cream)] border-[color:var(--cocoa)]"
                  : "bg-[color:var(--cream)] border-[color:var(--cocoa)]/15 hover:border-[color:var(--cocoa)]/40"
                  }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((c) => (
            <article
              key={c.id}
              className="reveal group relative rounded-[1.5rem] overflow-hidden bg-[color:var(--cream)] shadow-luxe transition-all duration-500 hover:-translate-y-2"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={c.img}
                  alt={c.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="absolute top-4 left-4 glass rounded-full px-3 py-1 text-[10px] uppercase tracking-widest">
                {c.tag}
              </div>
              <div className="p-6">
                <h3 className="font-display text-2xl">{c.title}</h3>
                <p className="mt-2 text-sm text-[color:var(--muted-foreground)]">{c.desc}</p>
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-[color:var(--cocoa)]/90 to-transparent">
                <button className="rounded-full bg-[color:var(--cream)] text-[color:var(--cocoa)] px-4 py-2 text-sm font-medium">
                  Brzi pregled →
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

type Template = "classic" | "modern";

function LivePreview() {
  const [bride, setBride] = useState("Marija");
  const [groom, setGroom] = useState("Nikola");
  const [date, setDate] = useState("16. 05. 2026.");
  const [location, setLocation] = useState("Restoran Milenijum, Požarevac");
  const [tpl, setTpl] = useState<Template>("classic");

  return (
    <section id="preview" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          kicker="Interactive Preview"
          title={<>Isprobajte <em className="italic">živi prikaz</em> Vaše pozivnice</>}
          sub="Unesite Vaše podatke i posmatrajte kako se pozivnica oblikuje u realnom vremenu."
        />

        <div className="mt-12 grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Form */}
          <div className="reveal glass rounded-[1.5rem] p-6 sm:p-8 shadow-luxe">
            <div className="flex items-center gap-2 mb-6">
              <button
                onClick={() => setTpl("classic")}
                className={`flex-1 px-4 py-2.5 rounded-full text-sm transition ${tpl === "classic" ? "bg-[color:var(--cocoa)] text-[color:var(--cream)]" : "bg-[color:var(--beige)]"
                  }`}
              >
                Minimalist Classic
              </button>
              <button
                onClick={() => setTpl("modern")}
                className={`flex-1 px-4 py-2.5 rounded-full text-sm transition ${tpl === "modern" ? "bg-[color:var(--cocoa)] text-[color:var(--cream)]" : "bg-[color:var(--beige)]"
                  }`}
              >
                Modern Elegant
              </button>
            </div>

            <div className="space-y-5">
              <Field label="Ime Mlade" value={bride} onChange={setBride} />
              <Field label="Ime Mladoženje" value={groom} onChange={setGroom} />
              <Field label="Datum venčanja" value={date} onChange={setDate} />
              <Field label="Lokacija" value={location} onChange={setLocation} />
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#kontakt" className="rounded-full bg-[color:var(--cocoa)] text-[color:var(--cream)] px-5 py-3 text-sm">
                Naruči ovaj dizajn
              </a>
              <button
                onClick={() => {
                  setBride("Marija"); setGroom("Nikola"); setDate("16. 05. 2026."); setLocation("Restoran Milenijum, Požarevac");
                }}
                className="rounded-full border border-[color:var(--cocoa)]/20 px-5 py-3 text-sm hover:border-[color:var(--cocoa)]"
              >
                Resetuj
              </button>
            </div>
          </div>

          {/* Card preview */}
          <div className="reveal sticky top-28">
            <div className="mx-auto max-w-sm aspect-[9/16] rounded-[2rem] overflow-hidden shadow-luxe relative" style={{ background: tpl === "classic" ? "var(--cream)" : "var(--cocoa)" }}>
              {tpl === "classic" ? <ClassicCard bride={bride} groom={groom} date={date} location={location} /> : <ModernCard bride={bride} groom={groom} date={date} location={location} />}
            </div>
            <p className="mt-4 text-center text-xs text-[color:var(--muted-foreground)]">
              Pregled u realnom vremenu · {tpl === "classic" ? "Minimalist Classic" : "Modern Elegant"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-widest text-[color:var(--muted-foreground)]">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full bg-transparent border-b border-[color:var(--cocoa)]/20 focus:border-[color:var(--gold)] outline-none py-2 text-lg font-display"
      />
    </label>
  );
}

function ClassicCard({ bride, groom, date, location }: { bride: string; groom: string; date: string; location: string }) {
  return (
    <div className="absolute inset-0 p-8 flex flex-col items-center justify-center text-center text-[color:var(--cocoa)]">
      <div className="absolute inset-3 border border-[color:var(--cocoa)]/15 rounded-[1.7rem] pointer-events-none" />
      <p className="uppercase tracking-[0.4em] text-[10px]">Save the date</p>
      <div className="mt-6 font-display text-3xl italic">{bride}</div>
      <div className="my-3 text-[color:var(--gold)] font-display italic text-xl">&amp;</div>
      <div className="font-display text-3xl italic">{groom}</div>
      <div className="mt-8 h-px w-20 bg-[color:var(--cocoa)]/20" />
      <p className="mt-6 font-display text-xl">{date}</p>
      <p className="mt-2 text-sm text-[color:var(--muted-foreground)] max-w-[18ch]">{location}</p>
      <p className="mt-8 text-[10px] uppercase tracking-[0.3em] text-[color:var(--gold)]">pozivnice.mj</p>
    </div>
  );
}

function ModernCard({ bride, groom, date, location }: { bride: string; groom: string; date: string; location: string }) {
  return (
    <div className="absolute inset-0 p-8 flex flex-col text-[color:var(--cream)]">
      <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-[color:var(--gold)]/20 blur-3xl" />
      <div className="absolute -bottom-20 -left-10 w-60 h-60 rounded-full bg-[color:var(--gold)]/10 blur-3xl" />
      <p className="uppercase tracking-[0.4em] text-[10px] text-[color:var(--gold)]">The Wedding of</p>
      <div className="mt-auto">
        <div className="font-display text-5xl leading-[0.95]">{bride}</div>
        <div className="font-display italic text-2xl text-[color:var(--gold)] my-2">&amp;</div>
        <div className="font-display text-5xl leading-[0.95]">{groom}</div>
        <div className="mt-8 grid grid-cols-2 gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-[color:var(--gold)]">Datum</p>
            <p className="font-display text-lg mt-1">{date}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-[color:var(--gold)]">Mesto</p>
            <p className="font-display text-sm mt-1">{location}</p>
          </div>
        </div>
        <div className="mt-6 h-px w-full bg-[color:var(--gold)]/30" />
        <p className="mt-4 text-[10px] uppercase tracking-[0.3em] text-[color:var(--gold)]">pozivnice.mj</p>
      </div>
    </div>
  );
}

function Features() {
  const items = [
    {
      title: "Dizajn po Vašem izboru",
      desc: "Svaki detalj — boja, font, ilustracija — krojimo prema Vašoj viziji.",
      icon: (
        <path d="M4 20l4-1 10-10-3-3L5 16l-1 4zM14 7l3 3" strokeLinecap="round" strokeLinejoin="round" />
      ),
    },
    {
      title: "Izrada za manje od 24h",
      desc: "Ekspresna izrada bez kompromisa po pitanju kvaliteta.",
      icon: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" strokeLinecap="round" /></>,
    },
    {
      title: "Šaljite neograničeno",
      desc: "Elektronske pozivnice šaljete koliko god gostiju imate — bez dodatnih troškova.",
      icon: <path d="M3 11l18-8-8 18-2-8-8-2z" strokeLinejoin="round" />,
    },
  ];
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((it, i) => (
            <div key={i} className="reveal glass rounded-[1.5rem] p-8 hover:shadow-luxe transition">
              <div className="w-12 h-12 rounded-full bg-[color:var(--cocoa)] text-[color:var(--gold)] flex items-center justify-center">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  {it.icon}
                </svg>
              </div>
              <h3 className="mt-6 font-display text-2xl">{it.title}</h3>
              <p className="mt-2 text-sm text-[color:var(--muted-foreground)]">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const [i, setI] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % TESTIMONIALS.length), 5500);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    const child = container.children[i] as HTMLElement | undefined;
    if (!child) return;
    const left = child.offsetLeft - (container.clientWidth - child.clientWidth) / 2;
    container.scrollTo({ left, behavior: "smooth" });
  }, [i]);
  return (
    <section id="utisci" className="py-20 sm:py-28 bg-[color:var(--cocoa)] text-[color:var(--cream)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div className="reveal max-w-2xl">
            <p className="text-xs uppercase tracking-[0.25em] text-[color:var(--gold)]">Vaši utisci</p>
            <h2 className="mt-3 font-display text-3xl sm:text-5xl">
              Reči onih koji su nam <em className="italic">poverili svoj dan</em>
            </h2>
          </div>
          <div className="flex gap-2">
            {TESTIMONIALS.map((_, k) => (
              <button
                key={k}
                onClick={() => setI(k)}
                aria-label={`Utisak ${k + 1}`}
                className={`h-1.5 rounded-full transition-all ${k === i ? "w-8 bg-[color:var(--gold)]" : "w-3 bg-[color:var(--cream)]/30"}`}
              />
            ))}
          </div>
        </div>

        <div ref={ref} className="mt-12 flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {TESTIMONIALS.map((t, k) => (
            <figure
              key={k}
              className="snap-center min-w-[85%] sm:min-w-[60%] lg:min-w-[40%] glass-dark rounded-[1.5rem] p-8"
            >
              <Stars />
              <blockquote className="mt-6 font-display text-xl sm:text-2xl leading-snug">
                "{t.text}"
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[color:var(--gold)]/20 flex items-center justify-center text-[color:var(--gold)] font-display">
                  {t.name[0]}
                </div>
                <div>
                  <div className="text-sm">{t.name}</div>
                  <div className="text-xs text-[color:var(--cream)]/60">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [service, setService] = useState("elektronska");
  const [sent, setSent] = useState(false);
  return (
    <section id="kontakt" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 grid lg:grid-cols-2 gap-12">
        <div className="reveal">
          <SectionHeader
            kicker="Kontakt"
            title={<>Hajde da kreiramo <em className="italic">nešto nezaboravno</em></>}
            sub="Pošaljite nam poruku — odgovaramo u roku od nekoliko sati."
          />
          <div className="mt-10 space-y-5 text-sm">
            <InfoRow label="Email" value="elektronskepozivnicemj@gmail.com" href="mailto:elektronskepozivnicemj@gmail.com" />
            <InfoRow label="Instagram" value="@pozivnice.mj" href="https://instagram.com/pozivnice.mj" />
            <InfoRow label="Radno vreme" value="Pon — Sub · 09–20h" />
          </div>
          <div className="mt-10 glass rounded-[1.5rem] p-6 flex items-center gap-4">
            <Monogram size={56} />
            <div>
              <p className="font-display text-lg">pozivnice.mj</p>
              <p className="text-xs text-[color:var(--muted-foreground)]">Elite Invitation Studio</p>
            </div>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="reveal glass rounded-[1.5rem] p-6 sm:p-8 shadow-luxe space-y-5"
        >
          <div>
            <span className="text-xs uppercase tracking-widest text-[color:var(--muted-foreground)]">Vrsta usluge</span>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {[
                { id: "elektronska", label: "Elektronska" },
                { id: "stampana", label: "Štampana" },
                { id: "animirana", label: "Animirana" },
              ].map((o) => (
                <button
                  type="button"
                  key={o.id}
                  onClick={() => setService(o.id)}
                  className={`rounded-full px-3 py-2.5 text-sm border transition ${service === o.id ? "bg-[color:var(--cocoa)] text-[color:var(--cream)] border-[color:var(--cocoa)]" : "border-[color:var(--cocoa)]/15"
                    }`}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <Field2 label="Ime i prezime" placeholder="Vaše ime" />
            <Field2 label="Email" placeholder="vas@email.com" type="email" />
          </div>
          <Field2 label="Datum događaja" placeholder="dd. mm. gggg." />
          <label className="block">
            <span className="text-xs uppercase tracking-widest text-[color:var(--muted-foreground)]">Poruka</span>
            <textarea
              rows={4}
              required
              placeholder="Recite nam više o Vašem događaju…"
              className="mt-2 w-full bg-transparent border border-[color:var(--cocoa)]/15 rounded-2xl p-4 outline-none focus:border-[color:var(--gold)] transition"
            />
          </label>
          <button
            type="submit"
            className="w-full rounded-full bg-[color:var(--cocoa)] text-[color:var(--cream)] py-3.5 text-sm hover:bg-[color:var(--cocoa)]/90 transition shadow-luxe"
          >
            {sent ? "Hvala! Javljamo se uskoro ✦" : "Pošalji upit"}
          </button>
        </form>
      </div>
    </section>
  );
}

function InfoRow({ label, value, href }: { label: string; value: string; href?: string }) {
  const C: any = href ? "a" : "div";
  return (
    <C href={href} className="flex items-center justify-between gap-4 py-3 border-b border-[color:var(--cocoa)]/10 hover:border-[color:var(--gold)] transition group">
      <span className="text-xs uppercase tracking-widest text-[color:var(--muted-foreground)]">{label}</span>
      <span className="font-display text-base sm:text-lg group-hover:text-[color:var(--gold)] transition">{value}</span>
    </C>
  );
}

function Field2({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-widest text-[color:var(--muted-foreground)]">{label}</span>
      <input
        {...rest}
        className="mt-2 w-full bg-transparent border border-[color:var(--cocoa)]/15 rounded-full px-4 py-3 outline-none focus:border-[color:var(--gold)] transition"
      />
    </label>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[color:var(--cocoa)]/10 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Monogram size={32} />
          <p className="text-sm">© {new Date().getFullYear()} pozivnice.mj · Elite Invitation Studio</p>
        </div>
        <div className="flex gap-5 text-xs text-[color:var(--muted-foreground)]">
          <a href="#kategorije" className="hover:text-[color:var(--cocoa)]">Kategorije</a>
          <a href="#preview" className="hover:text-[color:var(--cocoa)]">Preview</a>
          <a href="#kontakt" className="hover:text-[color:var(--cocoa)]">Kontakt</a>
        </div>
      </div>
    </footer>
  );
}

export function Index() {
  useReveal();
  return (
    <div className="min-h-screen bg-[color:var(--cream)] text-[color:var(--cocoa)]">
      <Nav />
      <main>
        <Hero />
        <Showcase />
        <Categories />
        <LivePreview />
        <Features />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
