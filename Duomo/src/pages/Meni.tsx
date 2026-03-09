import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { QrCode } from 'lucide-react';

const menuCategories = [
  {
    name: 'Predjela',
    items: [
      { name: 'Bruschetta Italiana', description: 'Pržen hleb sa svežim paradajzom, bosiljkom i mozzarellom', price: 850 },
      { name: 'Antipasti Duomo', description: 'Mešavina italijanskih sireva, prosciutto, masline', price: 1450 },
      { name: 'Carpaccio di Manzo', description: 'Tanko sečena govedina sa rukolom i parmezan', price: 1650 },
    ]
  },
  {
    name: 'Pizza',
    items: [
      { name: 'Margherita', description: 'Pelati, mozzarella di bufala, svež bosiljak', price: 990 },
      { name: 'Quattro Stagioni', description: 'Pelati, mozzarella, šunka, gljive, artikoke, masline', price: 1350 },
      { name: 'Tartufo', description: 'Krema od tartufa, mozzarella, pršuta, rukola', price: 1850 },
      { name: 'Duomo Speciale', description: 'Pelati, burrata, prosciutto crudo, rukola, cherry paradajz', price: 1650 },
    ]
  },
  {
    name: 'Pasta',
    items: [
      { name: 'Spaghetti Carbonara', description: 'Tradicionalni rimski recept sa guanciale i pecorino', price: 1250 },
      { name: 'Penne Arrabbiata', description: 'Ljuta paradajz salsa sa čili papričicama', price: 1150 },
      { name: 'Risotto ai Funghi', description: 'Kremasti rižoto sa divljim gljivama', price: 1450 },
      { name: 'Lasagne della Casa', description: 'Domaća lazanja sa Bolognese sosom', price: 1350 },
    ]
  },
  {
    name: 'Dezert',
    items: [
      { name: 'Tiramisu', description: 'Klassični italijanski dezert', price: 650 },
      { name: 'Panna Cotta', description: 'Kremasta panna cotta sa bobicama', price: 580 },
      { name: 'Cannoli Siciliani', description: 'Tradicionalni sicilijski cannoli', price: 750 },
    ]
  },
];

const Meni = () => {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="bg-gradient-elegant py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Naš Meni</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            Otkrijte autentične ukuse Italije kroz naš pažljivo odabran meni
          </p>
          <Button variant="gold" size="lg" className="gap-2">
            <QrCode className="w-5 h-5" />
            Skeniraj QR kod
          </Button>
        </div>
      </section>

      {/* Menu Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Category Tabs */}
          <div className="flex justify-center mb-12">
            <div className="bg-card rounded-xl p-2 shadow-elegant">
              {menuCategories.map((category, index) => (
                <button
                  key={category.name}
                  onClick={() => setActiveCategory(index)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all ${
                    activeCategory === index
                      ? 'bg-gold text-warm-black shadow-gold'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Menu Items */}
          <div className="max-w-4xl mx-auto">
            <div className="grid gap-6">
              {menuCategories[activeCategory].items.map((item, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-elegant transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-serif text-xl font-semibold mb-2">{item.name}</h3>
                        <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                      </div>
                      <div className="text-right ml-6">
                        <span className="font-bold text-lg text-gold">{item.price} RSD</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <h3 className="font-serif text-2xl font-semibold mb-4">Spremni za nezaboravno iskustvo?</h3>
            <Button variant="reserve" size="xl">
              Rezerviši svoj sto
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Meni;