import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import cevapiImage from '@/assets/cevapi.jpg';
import karadjordjevaImage from '@/assets/karadjordjeva.jpg';
import sarmaImage from '@/assets/sarma.jpg';

const Menu = () => {
  const specialties = [
    {
      name: "Ćevapi sa kajmakom",
      description: "Domaći ćevapi sa svežim kajmakom, crnim lukom i toplom lepinju",
      price: "890 RSD",
      image: cevapiImage
    },
    {
      name: "Karađorđeva šnicla",
      description: "Pohovana teleća rolnica punjena kajmakom, sa roštilja sa prilozima",
      price: "1.290 RSD", 
      image: karadjordjevaImage
    },
    {
      name: "Domaća sarma",
      description: "Tradicionalna sarma od kiselog kupusa sa mešanim mesom i pavlakom",
      price: "690 RSD",
      image: sarmaImage
    }
  ];

  return (
    <section id="menu" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
            Naši specijaliteti
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Svako jelo je pripravljeno sa ljubavlju, koristeći originalne recepte 
            i najkvalitetnije domaće sastojke.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {specialties.map((item, index) => (
            <Card key={index} className="group overflow-hidden border-none shadow-soft hover:shadow-warm transition-all duration-300">
              <div className="relative overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-serif font-semibold text-foreground">
                    {item.name}
                  </h3>
                  <span className="text-primary font-bold text-lg">
                    {item.price}
                  </span>
                </div>
                
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Želite da vidite kompletan meni?
          </p>
          <a 
            href="" 
            className="text-primary font-semibold hover:underline"
          >
            Kompletan meni
          </a>
        </div>
      </div>
    </section>
  );
};

export default Menu;