import { Heart, Shield, Target } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import centarLife from "@/assets/centar-life.jpg";

const About = () => (
  <main>
    {/* Hero */}
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <FadeIn>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground text-center mb-6">
            O nama
          </h1>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Iza svakog uspešnog spoja stoji priča o ljudima koji veruju u moć pravih susreta.
          </p>
        </FadeIn>
      </div>
    </section>

    {/* Story */}
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        <FadeIn direction="left">
          <img
            src={centarLife}
            alt="Centar Life prostor"
            loading="lazy"
            width={800}
            height={600}
            className="rounded-2xl shadow-lg w-full object-cover h-80"
          />
        </FadeIn>
        <FadeIn direction="right">
          <h2 className="text-3xl font-serif font-bold text-foreground mb-4">Tamara i Dejan</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Pravi spoj je nastao iz spoja dva različita sveta — Tamarinog iskustva u velnesu, empatiji i
            razumevanju ljudi, i Dejanovog pristupa kroz biznis logiku, strukturu i organizaciju.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Zajedno su stvorili prostor gde se nauka i emocija susreću — gde svaki klijent dobija
            pažljivo osmišljen put do osobe koja mu zaista odgovara.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Njihova vizija je jednostavna: manje besmislenog skrolovanja, više pravih razgovora i
            iskrenih susreta.
          </p>
        </FadeIn>
      </div>
    </section>

    {/* Values */}
    <section className="py-16 bg-card">
      <div className="container mx-auto px-4">
        <FadeIn>
          <h2 className="text-3xl font-serif font-bold text-center text-foreground mb-12">
            Naše vrednosti
          </h2>
        </FadeIn>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Shield,
              title: "Siguran prostor",
              desc: "Centar Life je mesto gde maske padaju i pravi razgovori počinju. Svaki susret je organizovan sa pažnjom i poštovanjem.",
            },
            {
              icon: Heart,
              title: "Empatija i razumevanje",
              desc: "Svaki klijent je jedinstven. Slušamo, razumemo i biramo sa srcem i stručnošću.",
            },
            {
              icon: Target,
              title: "Rezultat koji traje",
              desc: "Ne tražimo brze spojeve — tražimo prave. Kvalitet iznad kvantiteta, uvek.",
            },
          ].map((v, i) => (
            <FadeIn key={v.title} delay={i * 0.15}>
              <div className="text-center p-8 rounded-2xl bg-background border border-border">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gold-light flex items-center justify-center">
                  <v.icon size={24} className="text-accent" />
                </div>
                <h3 className="font-serif text-xl font-semibold mb-3 text-foreground">{v.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>

    {/* Mission */}
    <section className="py-20 bg-gradient-to-br from-primary via-deep-blue-light to-primary">
      <div className="container mx-auto px-4 text-center">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-foreground mb-6">
            Naša misija
          </h2>
          <p className="text-primary-foreground/85 text-xl max-w-2xl mx-auto leading-relaxed italic font-serif">
            "Naša misija je da vaše vreme investirate u ljude koji su vredni vašeg srca."
          </p>
        </FadeIn>
      </div>
    </section>
  </main>
);

export default About;
