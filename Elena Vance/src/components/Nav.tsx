import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const links = [
  { to: "/o-meni", label: "O meni" },
  { to: "/blog", label: "Blog" },
  { to: "/emisije", label: "Emisije" },
  { to: "/dogadjaji", label: "Događaji" },
  { to: "/licni-projekat", label: "Atelje" },
];

export const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const solid = scrolled || pathname !== "/";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid ? "bg-background/85 backdrop-blur-xl border-b border-border/60" : "bg-transparent"
      }`}
    >
      <nav className="container flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="font-display text-xl md:text-2xl tracking-tight">
          Elena <span className="italic text-rose-deep">Vance</span>
        </Link>

        <ul className="hidden lg:flex items-center gap-8">
          {links.map((l) => {
            const active = pathname === l.to;
            return (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className={`text-sm tracking-wide transition-colors relative group ${
                    active ? "text-rose-deep" : "text-foreground/70 hover:text-rose-deep"
                  }`}
                >
                  {l.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-rose-deep transition-all duration-300 ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        <Link
          to="/#contact"
          className="hidden lg:inline-flex items-center text-xs uppercase tracking-[0.25em] text-foreground/80 hover:text-rose-deep transition-colors"
        >
          Kontakt
          <span className="ml-2">→</span>
        </Link>

        <button
          onClick={() => setOpen((o) => !o)}
          className="lg:hidden flex flex-col gap-1.5 p-2"
          aria-label="Meni"
        >
          <span className={`block w-6 h-px bg-ink transition-transform ${open ? "translate-y-[6px] rotate-45" : ""}`} />
          <span className={`block w-6 h-px bg-ink transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-px bg-ink transition-transform ${open ? "-translate-y-[6px] -rotate-45" : ""}`} />
        </button>
      </nav>

      <div
        className={`lg:hidden overflow-hidden transition-[max-height] duration-500 bg-background/95 backdrop-blur-xl ${
          open ? "max-h-96 border-t border-border/60" : "max-h-0"
        }`}
      >
        <ul className="container py-6 space-y-4">
          {links.map((l) => (
            <li key={l.to}>
              <Link to={l.to} className="block font-display text-2xl text-ink hover:text-rose-deep transition-colors">
                {l.label}
              </Link>
            </li>
          ))}
          <li className="pt-2">
            <Link to="/#contact" className="text-xs uppercase tracking-[0.25em] text-rose-deep">
              Kontakt →
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};
