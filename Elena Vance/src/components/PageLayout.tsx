import { ReactNode } from "react";
import { Nav } from "@/components/Nav";
import { Contact } from "@/components/Contact";

type Props = {
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  children: ReactNode;
};

export const PageLayout = ({ eyebrow, title, intro, children }: Props) => {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Nav />

      {/* Page header */}
      <section className="relative pt-32 md:pt-40 pb-16 md:pb-24 marble-bg grain overflow-hidden">
        <div className="absolute top-1/2 left-0 w-1/3 h-px bg-gradient-to-r from-transparent to-rose-deep/30" />
        <div className="absolute bottom-12 right-0 w-1/4 h-px bg-gradient-to-l from-transparent to-rose-deep/30" />

        <div className="container relative">
          <p className="eyebrow mb-6 reveal">{eyebrow}</p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] text-ink reveal max-w-5xl">
            {title}
          </h1>
          {intro && (
            <>
              <div className="classical-line my-8 max-w-md" />
              <p className="text-lg md:text-xl text-foreground/70 max-w-2xl leading-relaxed font-light reveal">
                {intro}
              </p>
            </>
          )}
        </div>
      </section>

      {/* Page body */}
      {children}

      {/* Shared contact + footer */}
      <Contact />
    </main>
  );
};
