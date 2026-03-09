import React from 'react';
import restaurantInterior from '@/assets/restaurant-interior.jpg';

const About = () => {
  return (
    <section id="o-nama" className="section-padding bg-background">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Content */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold">
              O <span className="gold-gradient">nama</span>
            </h2>
            
            <div className="space-y-4 text-lg text-muted-foreground">
              <p>
                Restoran Vizija je više od mesta za ručanje - to je destinacija gde se susreću izuzetan ukus, elegantna atmosfera i nezaboravno iskustvo.
              </p>
              
              <p>
                Naša kuhinjo vođena je strašću prema kvalitetu i kreativnosti. Svako jelo je pažljivo pripremljeno koristeći najsvežije sastojke i tradicionalne tehnike pripreme koje smo obogatili modernim pristupom.
              </p>
              
              <p>
                Ambijent našeg restorana dizajniran je da stvori toplu i sofisticiranu atmosferu, idealnu za romantične večere, poslovne susrete ili posebne proslave sa porodicom i prijateljima.
              </p>
              
              <p>
                Naš tim posvećenih profesionalaca truditi se da svaku vašu posetu učini posebnim, pružajući uslugu koja prevazilazi očekivanja.
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">15+</div>
                <div className="text-sm text-muted-foreground">Godine iskustva</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">500+</div>
                <div className="text-sm text-muted-foreground">Zadovoljnih gostiju</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">50+</div>
                <div className="text-sm text-muted-foreground">Specijaliteta</div>
              </div>
            </div>
          </div>
          
          {/* Image */}
          <div className="relative">
            <div className="elegant-card overflow-hidden">
              <img 
                src={restaurantInterior} 
                alt="Enterijer Restorana Vizija" 
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-primary rounded-full opacity-20"></div>
            <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-primary/20 rounded-full"></div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default About;