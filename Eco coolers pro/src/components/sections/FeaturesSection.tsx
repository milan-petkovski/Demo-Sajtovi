import { Truck, Shield, Globe } from 'lucide-react';

const features = [
  {
    icon: Globe,
    title: 'Uvoz iz Nemačke/Austrije',
    description: 'Premium oprema direktno od pouzdanih evropskih dobavljača sa kompletnom dokumentacijom.',
  },
  {
    icon: Shield,
    title: 'Garancija & Servis',
    description: 'Puna garancija na svu opremu uz stručnu tehničku podršku i brz servis.',
  },
  {
    icon: Truck,
    title: 'Dostava po celoj Srbiji',
    description: 'Sigurna i brza dostava na vašu adresu uz profesionalno rukovanje opremom.',
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative bg-card rounded-xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300 border border-border hover:border-primary/20 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>

              {/* Decorative line */}
              <div className="absolute bottom-0 left-8 right-8 h-1 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
