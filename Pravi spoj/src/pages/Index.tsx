import { Heart, Users, Calendar, Check, Sparkles, MessageCircle } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import heroImage from "@/assets/hero-couple.jpg";
import eventSocial from "@/assets/event-social.jpg";
import eventDance from "@/assets/event-dance.jpg";
import eventTrip from "@/assets/event-trip.jpg";

const steps = [
  { icon: MessageCircle, title: "Lični intervju", desc: "Upoznajemo vas kroz detaljan razgovor kako bismo razumeli vaše vrednosti i želje." },
  { icon: Sparkles, title: "Stručno spajanje", desc: "Na osnovu intervjua, biramo kompatibilne osobe koje odgovaraju vašem profilu." },
  { icon: Heart, title: "Prvi susret", desc: "Organizujemo ugodan i siguran prvi susret u opuštenom okruženju Centra Life." },
];

const events = [
  { img: eventSocial, title: "Večeri društvenih igara", desc: "Opuštena atmosfera gde se upoznajete kroz igru i smeh." },
  { img: eventDance, title: "Plesne večeri", desc: "Elegantne večeri u kojima ritam spaja ljude." },
  { img: eventTrip, title: "Izleti", desc: "Grupni izleti u prirodi gde prijateljstva nastaju spontano." },
];

const plans = [
  {
    name: "Pravi spoj",
    price: "6.000",
    features: ["Lični intervju", "Do 3 predloga mesečno", "Organizacija prvog susreta", "Podrška konsultanta"],
    highlighted: false,
  },
  {
    name: "Premium Life",
    price: "10.000",
    features: ["Sve iz paketa Pravi spoj", "Neograničen broj predloga", "Prioritetno spajanje", "Pristup ekskluzivnim događajima", "Lični coach za upoznavanje"],
    highlighted: true,
  },
];

const Index = () => (
  <main>
    {/* Hero */}
    <section className="relative min-h-[85vh] flex items-center">
      <div className="absolute inset-0">
        <img src={heroImage} alt="Srećan par u parku" className="w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/50 to-transparent" />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <FadeIn className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary-foreground leading-tight mb-6">
            Vreme je za drugačije upoznavanje
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 leading-relaxed">
            Pronađite pravu osobu, ne samo profil. Upoznajte partnere uživo u sigurnom okruženju.
          </p>
          <a
            href="#pricing"
            className="inline-block bg-accent text-accent-foreground px-8 py-3 rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity"
          >
            Započnite danas
          </a>
        </FadeIn>
      </div>
    </section>

    {/* How it works */}
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center text-foreground mb-4">
            Kako funkcioniše?
          </h2>
          <p className="text-center text-muted-foreground max-w-xl mx-auto mb-14">
            Tri jednostavna koraka do vašeg pravog spoja
          </p>
        </FadeIn>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <FadeIn key={step.title} delay={i * 0.15}>
              <div className="text-center p-8 rounded-2xl bg-background border border-border hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-gold-light flex items-center justify-center">
                  <step.icon size={28} className="text-accent" />
                </div>
                <h3 className="font-serif text-xl font-semibold mb-3 text-foreground">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>

    {/* Events */}
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center text-foreground mb-4">
            Naši događaji
          </h2>
          <p className="text-center text-muted-foreground max-w-xl mx-auto mb-14">
            Upoznajte ljude u opuštenoj i prirodnoj atmosferi
          </p>
        </FadeIn>
        <div className="grid md:grid-cols-3 gap-8">
          {events.map((event, i) => (
            <FadeIn key={event.title} delay={i * 0.15}>
              <div className="rounded-2xl overflow-hidden bg-card border border-border hover:shadow-lg transition-shadow group">
                <div className="overflow-hidden h-56">
                  <img
                    src={event.img}
                    alt={event.title}
                    loading="lazy"
                    width={800}
                    height={600}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-lg font-semibold mb-2 text-foreground">{event.title}</h3>
                  <p className="text-muted-foreground text-sm">{event.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>

    {/* Pricing */}
    <section id="pricing" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center text-foreground mb-4">
            Izaberite svoj paket
          </h2>
          <p className="text-center text-muted-foreground max-w-xl mx-auto mb-14">
            Investirajte u sebe i u prave susrete
          </p>
        </FadeIn>
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {plans.map((plan, i) => (
            <FadeIn key={plan.name} delay={i * 0.15}>
              <div
                className={`rounded-2xl p-8 border ${
                  plan.highlighted
                    ? "bg-primary text-primary-foreground border-primary shadow-xl scale-[1.02]"
                    : "bg-background border-border"
                }`}
              >
                <h3 className="font-serif text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-sm opacity-80 ml-1">RSD/mesečno</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <Check size={16} className={plan.highlighted ? "text-accent" : "text-accent"} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#cta"
                  className={`block text-center py-3 rounded-lg font-semibold transition-opacity hover:opacity-90 ${
                    plan.highlighted
                      ? "bg-accent text-accent-foreground"
                      : "bg-primary text-primary-foreground"
                  }`}
                >
                  Prijavi se
                </a>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section id="cta" className="py-20 bg-gradient-to-br from-primary via-deep-blue-light to-primary">
      <div className="container mx-auto px-4 text-center">
        <FadeIn>
          <Users size={48} className="mx-auto mb-6 text-accent" />
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-foreground mb-4">
            Da li ste spremni za svoj Pravi spoj?
          </h2>
          <p className="text-primary-foreground/80 max-w-lg mx-auto mb-8 text-lg">
            Prijavite se danas i napravite prvi korak ka osobi koja vas zaista razume.
          </p>
          <a
            href="mailto:info@pravispoj.rs"
            className="inline-block bg-accent text-accent-foreground px-10 py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity"
          >
            Prijavi se
          </a>
        </FadeIn>
      </div>
    </section>
  </main>
);

export default Index;
