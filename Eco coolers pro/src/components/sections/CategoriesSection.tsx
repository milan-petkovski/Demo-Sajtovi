import { Snowflake, ChefHat, Table2, Croissant, ArrowRight } from 'lucide-react';

const categories = [
  {
    icon: Snowflake,
    title: 'Rashladne Vitrine',
    description: 'Profesionalne rashladne vitrine za pekare, restorane i supermarkete.',
    count: 45,
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80',
  },
  {
    icon: ChefHat,
    title: 'Konvektomati',
    description: 'Visokokvalitetni konvektomati za profesionalne kuhinje.',
    count: 28,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80',
  },
  {
    icon: Table2,
    title: 'Inox Radni Stolovi',
    description: 'Izdržljivi inox stolovi za sve vrste ugostiteljskih objekata.',
    count: 36,
    image: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=600&q=80',
  },
  {
    icon: Croissant,
    title: 'Pekarska Oprema',
    description: 'Kompletna oprema za pekare - od testa do gotovog proizvoda.',
    count: 52,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=80',
  },
];

const CategoriesSection = () => {
  return (
    <section id="categories" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Naše Kategorije
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Pronađite opremu po kategoriji
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Širok asortiman profesionalne ugostiteljske opreme za svaku namenu
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <a
              key={category.title}
              href="#"
              className="group relative overflow-hidden rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
                
                {/* Count Badge */}
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-card/90 backdrop-blur-sm text-sm font-medium text-foreground">
                  {category.count} proizvoda
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <category.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {category.title}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  {category.description}
                </p>
                <div className="flex items-center text-primary font-medium text-sm">
                  <span>Pogledaj sve</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
