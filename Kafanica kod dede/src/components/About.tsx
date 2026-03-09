import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  return (
    <section id="about" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-8">
            O nama
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Kafanica kod Dede je mesto gde se čuva duh autentične srpske kafane, 
                a tradicija se spaja sa savremenim komforom. Već decenijama negujemo 
                recepte naših predaka, pripremajući jela od najkvalitetnijih domaćih sastojaka.
              </p>
              
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Naša kafana je više od restorana - to je mesto susreta, druženja i 
                čuvanja tradicije. Ovde svaki gost postaje deo naše velike porodice.
              </p>
              
              <div className="flex items-center space-x-4 text-primary font-semibold">
                <span>✓ Domaći sastojci</span>
                <span>✓ Tradicija od 1985.</span>
                <span>✓ Porodični recepti</span>
              </div>
            </div>
            
            <Card className="bg-gradient-warm border-none shadow-soft">
              <CardContent className="p-8">
                <blockquote className="text-lg italic text-foreground mb-4">
                  "Kod nas se ne dolazi samo da se pojede, već da se oseti toplina 
                  domaćeg doma i autentičnost srpske tradicije."
                </blockquote>
                <cite className="text-primary font-semibold">- Deda Miloš, osnivač</cite>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;