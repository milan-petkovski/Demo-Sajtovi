import { MapPin, CreditCard, Truck, HeadphonesIcon } from 'lucide-react';

const trustPoints = [
  {
    icon: MapPin,
    title: 'Lokacija',
    description: 'Posetite nas u Novom Sadu i uverite se lično u kvalitet naše opreme.',
  },
  {
    icon: CreditCard,
    title: 'Avansno Plaćanje',
    description: 'Sigurna i pouzdana plaćanja sa mogućnošću rezervacije putem avansa.',
  },
  {
    icon: Truck,
    title: 'Logistička Podrška',
    description: 'Organizujemo transport i dostavu na vašu adresu širom Srbije.',
  },
  {
    icon: HeadphonesIcon,
    title: 'Stručna Podrška',
    description: 'Naš tim je tu da vam pomogne pri odabiru i instalaciji opreme.',
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              O Nama
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Vaš partner za profesionalnu ugostiteljsku opremu
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Eco Coolers je vodeći dobavljač profesionalne ugostiteljske opreme u Novom Sadu. 
              Sa višegodišnjim iskustvom u industriji, pružamo vrhunsku opremu iz Nemačke i Austrije 
              uz garanciju kvaliteta i stručnu tehničku podršku.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Bilo da tražite novu ili polovnu opremu, naš tim je posvećen tome da vam pomogne 
              pronaći savršeno rešenje za vaš posao uz konkurentne cene i pouzdanu podršku.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center p-4 rounded-xl bg-muted">
                <div className="text-3xl font-bold text-primary mb-1">500+</div>
                <div className="text-sm text-muted-foreground">Zadovoljnih klijenata</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-muted">
                <div className="text-3xl font-bold text-primary mb-1">10+</div>
                <div className="text-sm text-muted-foreground">Godina iskustva</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-muted">
                <div className="text-3xl font-bold text-primary mb-1">1000+</div>
                <div className="text-sm text-muted-foreground">Isporučenih proizvoda</div>
              </div>
            </div>
          </div>

          {/* Right - Trust Points */}
          <div className="grid sm:grid-cols-2 gap-6">
            {trustPoints.map((point, index) => (
              <div
                key={point.title}
                className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/20 shadow-card hover:shadow-card-hover transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <point.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {point.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {point.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
