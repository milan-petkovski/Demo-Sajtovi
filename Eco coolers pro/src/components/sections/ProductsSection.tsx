import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Phone } from 'lucide-react';

// Import product images
import convothermImg from '@/assets/products/convotherm-konvektomati.jpg';
import toplaHladnaImg from '@/assets/products/topla-hladna-linija.jpg';
import smegRedbullImg from '@/assets/products/smeg-redbull-frizider.jpg';
import inoxStoImg from '@/assets/products/inox-radni-sto.jpg';
import prohromskaPolicaImg from '@/assets/products/prohromska-polica.jpg';
import duvaljkaPecImg from '@/assets/products/duvaljka-pec-konvektomat.jpg';
import salataraImg from '@/assets/products/salatara-hladni-sto.jpg';
import inoxViseciImg from '@/assets/products/inox-viseci-element.jpg';

const products = [
  {
    id: 1,
    name: 'Convotherm Konvektomati - Germany',
    category: 'Konvektomati',
    price: 600,
    specs: '6 plehova, Monofazni 3.2kW',
    status: 'Na stanju',
    condition: 'Polovno',
    image: convothermImg,
    isOnSale: true,
  },
  {
    id: 2,
    name: 'Topla-Hladna Linija 7m',
    category: 'Oprema za Menze',
    price: null,
    specs: 'Za Hotele, Menze, Kuhinje',
    status: 'Na stanju',
    condition: 'Polovno',
    image: toplaHladnaImg,
    isOnSale: false,
  },
  {
    id: 3,
    name: 'SMEG Red Bull Frižider',
    category: 'Rashladne Vitrine',
    price: null,
    specs: 'Retro dizajn, Originalni SMEG',
    status: 'Na stanju',
    condition: 'Polovno',
    image: smegRedbullImg,
    isOnSale: false,
  },
  {
    id: 4,
    name: 'Inox Radni Sto 180x70cm',
    category: 'Inox Stolovi',
    price: null,
    specs: 'Sa donjom policom',
    status: 'Na stanju',
    condition: 'Polovno',
    image: inoxStoImg,
    isOnSale: false,
  },
  {
    id: 5,
    name: 'Prohromska Polica 157x34cm',
    category: 'Inox Oprema',
    price: 100,
    specs: 'Masivna izrada',
    status: 'Na stanju',
    condition: 'Polovno',
    image: prohromskaPolicaImg,
    isOnSale: true,
  },
  {
    id: 6,
    name: 'Convotherm Duvaljka Peć',
    category: 'Konvektomati',
    price: 600,
    specs: 'Profesionalna peć',
    status: 'Na stanju',
    condition: 'Polovno',
    image: duvaljkaPecImg,
    isOnSale: true,
  },
  {
    id: 7,
    name: 'Salatara Hladni Sto 90x70cm',
    category: 'Rashladne Vitrine',
    price: null,
    specs: 'Sa GN posudama',
    status: 'Na stanju',
    condition: 'Polovno',
    image: salataraImg,
    isOnSale: false,
  },
  {
    id: 8,
    name: 'Inox Viseći Element 80x60x40cm',
    category: 'Inox Oprema',
    price: null,
    specs: 'Klizna vrata',
    status: 'Na stanju',
    condition: 'Polovno',
    image: inoxViseciImg,
    isOnSale: false,
  },
];

const ProductsSection = () => {
  return (
    <section id="products" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Najnovije
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Poslednji pristigli proizvodi
            </h2>
            <p className="text-muted-foreground">
              Pogledajte najnoviju opremu u našoj ponudi
            </p>
          </div>
          <Button variant="outline" className="mt-4 md:mt-0">
            Pogledaj sve proizvode
          </Button>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 shadow-card hover:shadow-card-hover transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Image Container */}
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {product.isOnSale && (
                    <Badge className="bg-sale text-sale-foreground border-0 shadow-lg">
                      Akcija
                    </Badge>
                  )}
                  <Badge variant="secondary" className="backdrop-blur-sm bg-card/90">
                    {product.condition}
                  </Badge>
                </div>

                {/* Status Badge */}
                <div className="absolute top-3 right-3">
                  <Badge 
                    className={`border-0 shadow-lg ${
                      product.status === 'Na stanju' 
                        ? 'bg-success text-success-foreground' 
                        : 'bg-secondary text-secondary-foreground'
                    }`}
                  >
                    {product.status}
                  </Badge>
                </div>

                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <Button size="icon" variant="secondary" className="rounded-full">
                    <Eye className="w-5 h-5" />
                  </Button>
                  <Button size="icon" className="rounded-full" asChild>
                    <a href="tel:062447147">
                      <Phone className="w-5 h-5" />
                    </a>
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">
                  {product.category}
                </p>
                <h3 className="text-base font-semibold text-foreground mb-1 group-hover:text-primary transition-colors line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-xs text-muted-foreground mb-3">
                  {product.specs}
                </p>
                
                {/* Price */}
                <div className="flex items-baseline gap-2">
                  {product.price ? (
                    <span className="text-xl font-bold text-primary">
                      €{product.price}
                    </span>
                  ) : (
                    <span className="text-sm font-medium text-muted-foreground">
                      Pozovite za cenu
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Za više informacija o proizvodima pozovite nas
          </p>
          <Button variant="default" size="lg" asChild>
            <a href="tel:062447147" className="flex items-center gap-2">
              <Phone className="w-5 h-5" />
              062 447 147
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
