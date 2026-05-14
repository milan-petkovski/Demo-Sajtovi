import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const Contact = () => {
  return (
    <section id="contact" className="relative bg-gradient-contact text-cream overflow-hidden">
      <div className="absolute inset-0 grain opacity-60" />
      {/* Dekorativni klasični lukovi */}
      <svg
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 opacity-20 text-cream"
        width="800"
        height="200"
        viewBox="0 0 800 200"
        fill="none"
      >
        <path d="M50 200 Q 50 50 200 50 T 350 200" stroke="currentColor" strokeWidth="0.5" />
        <path d="M250 200 Q 250 50 400 50 T 550 200" stroke="currentColor" strokeWidth="0.5" />
        <path d="M450 200 Q 450 50 600 50 T 750 200" stroke="currentColor" strokeWidth="0.5" />
      </svg>

      <div className="container relative pt-28 md:pt-40 pb-12">
        <div className="grid lg:grid-cols-12 gap-14 lg:gap-20 items-start">
          {/* Levo: veliki naslov */}
          <div className="lg:col-span-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-cream/70 mb-6">
              Pišimo se — direktno
            </p>
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.9]">
              Donesi mi svoju
              <span className="block italic">priču.</span>
            </h2>
            <div className="h-px w-32 bg-cream/60 my-10" />
            <p className="text-cream/85 text-lg md:text-xl leading-relaxed font-light max-w-xl">
              Za intervjue, vođenja, pozive na panele, prijave za atelje ili
              naprosto promišljenu poruku — pišite mi direktno. Sve čitam,
              i odgovaram.
            </p>

            <div className="mt-12 grid sm:grid-cols-2 gap-6 max-w-lg">
              <Detail label="Press & bukinzi" value="press@elenavance.com" />
              <Detail label="Studio" value="+33 1 84 88 22 17" />
              <Detail label="Atelje" value="atelje@elenavance.com" />
              <Detail label="Locirana" value="Pariz · Rim" />
            </div>
          </div>

          {/* Desno: kontakt forma */}
          <div className="lg:col-span-5">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="bg-card p-4 md:p-8"
            >
              <p className="eyebrow">Pošalji poruku</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Ime">
                  <Input placeholder="Vaše ime" className="bg-transparent border-ink/20" />
                </Field>
                <Field label="Email">
                  <Input type="email" placeholder="vi@studio.com" className="bg-transparent border-ink/20" />
                </Field>
              </div>
              <Field label="Tema">
                <Input placeholder="Intervju, vođenje, atelje…" className="bg-transparent border-ink/20" />
              </Field>
              <Field label="Poruka">
                <Textarea
                  rows={4}
                  placeholder="Pričajte mi o vašem projektu…"
                  className="bg-transparent border-ink/20 resize-none"
                />
              </Field>
              <Button variant="hero" size="lg" className="w-full">
                Pošalji poruku →
              </Button>
            </form>
          </div>
        </div>

        {/* Društvene mreže */}
        <div className="mt-20 pt-10 border-t border-cream/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="font-display text-3xl md:text-4xl italic">Prati razgovor</p>
          </div>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            {[
              { l: "Instagram", h: "https://instagram.com" },
              { l: "YouTube", h: "https://youtube.com" },
              { l: "LinkedIn", h: "https://linkedin.com" },
              { l: "Substack", h: "https://substack.com" },
              { l: "X / Twitter", h: "https://x.com" },
            ].map((s) => (
              <a
                key={s.l}
                href={s.h}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 text-cream/90 hover:text-cream transition-colors"
              >
                <span className="text-sm uppercase tracking-[0.25em]">{s.l}</span>
                <span className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                  ↗
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 text-cream/60 text-xs">
          <p className="font-mono uppercase tracking-[0.25em]">
            © {new Date().getFullYear()} Elena Vance · Sva prava zadržana
          </p>
          <p className="font-display italic">Vajano sa namerom.</p>
        </div>
      </div>
    </section>
  );
};

const Detail = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-cream/60 mb-1">
      {label}
    </p>
    <p className="font-display text-xl">{value}</p>
  </div>
);

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <label className="block">
    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/60 block mb-1.5">
      {label}
    </span>
    {children}
  </label>
);


