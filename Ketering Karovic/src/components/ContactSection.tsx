import { useState } from "react";
import { Phone, Mail, MapPin, Instagram } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Upit od ${form.name}`);
    const body = encodeURIComponent(`Ime: ${form.name}\nEmail: ${form.email}\nTelefon: ${form.phone}\n\n${form.message}`);
    window.location.href = `mailto:keteringkarovic@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="kontakt" ref={sectionRef} className="py-24 px-4 bg-secondary/50">
      <div className="max-w-6xl mx-auto">
        <div
          className={`text-center mb-16 transition-all duration-800 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="font-body text-sm tracking-[0.3em] uppercase text-gold-light mb-4">Kontakt</p>
          <h2 className="text-3xl md:text-5xl font-display gradient-gold-text mb-6">
            Javite nam se
          </h2>
          <div className="w-16 h-[1px] gradient-gold mx-auto" />
        </div>

        <div
          className={`grid md:grid-cols-2 gap-16 transition-all duration-1000 ease-out delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <Phone className="w-5 h-5 text-gold-light shrink-0" />
              <div>
                <p className="font-body text-sm text-muted-foreground uppercase tracking-wider mb-1">Telefon</p>
                <a href="tel:066073007" className="font-body text-foreground hover:text-gold-light transition-colors">
                  066 073 007
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Mail className="w-5 h-5 text-gold-light shrink-0" />
              <div>
                <p className="font-body text-sm text-muted-foreground uppercase tracking-wider mb-1">Email</p>
                <a href="mailto:keteringkarovic@gmail.com" className="font-body text-foreground hover:text-gold-light transition-colors">
                  keteringkarovic@gmail.com
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <MapPin className="w-5 h-5 text-gold-light shrink-0" />
              <div>
                <p className="font-body text-sm text-muted-foreground uppercase tracking-wider mb-1">Lokacija</p>
                <p className="font-body text-foreground">Beograd, Srbija</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Instagram className="w-5 h-5 text-gold-light shrink-0" />
              <div>
                <p className="font-body text-sm text-muted-foreground uppercase tracking-wider mb-1">Instagram</p>
                <a
                  href="https://instagram.com/ketering_karovic"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-foreground hover:text-gold-light transition-colors"
                >
                  @ketering_karovic
                </a>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              placeholder="Vaše ime"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-input border border-border px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:border-gold/60 focus:outline-none transition-colors"
            />
            <input
              type="email"
              placeholder="Email adresa"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-input border border-border px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:border-gold/60 focus:outline-none transition-colors"
            />
            <input
              type="tel"
              placeholder="Broj telefona"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full bg-input border border-border px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:border-gold/60 focus:outline-none transition-colors"
            />
            <textarea
              placeholder="Vaša poruka..."
              rows={4}
              required
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full bg-input border border-border px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:border-gold/60 focus:outline-none transition-colors resize-none"
            />
            <div className="space-y-4">
  <button
    type="submit"
    className="w-full gradient-gold text-primary-foreground font-body font-semibold text-sm tracking-widest uppercase py-4 hover:opacity-90 transition-opacity"
  >
    Pošaljite upit putem Email-a
  </button>
  
  <div className="relative flex items-center py-2">
    <div className="flex-grow border-t border-border"></div>
    <span className="flex-shrink mx-4 text-xs text-muted-foreground uppercase">ili</span>
    <div className="flex-grow border-t border-border"></div>
  </div>

  <a
    href="https://ig.me/m/ketering_karovic"
    target="_blank"
    rel="noopener noreferrer"
    className="w-full flex items-center justify-center gap-2 border border-gold/50 text-gold-light font-body font-semibold text-sm tracking-widest uppercase py-4 hover:bg-gold/10 transition-colors"
  >
    <Instagram className="w-4 h-4" />
    Pišite nam na Instagramu
  </a>
</div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
