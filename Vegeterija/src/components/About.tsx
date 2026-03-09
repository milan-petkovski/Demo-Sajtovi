import React from 'react';
import { Card } from '@/components/ui/card';
import { Leaf, Heart, Users } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: <Leaf className="h-8 w-8 text-natural-green" />,
      title: "Prirodno & Organsko",
      description: "Koristimo samo najsvežije, lokalne sastojke iz organske proizvodnje."
    },
    {
      icon: <Heart className="h-8 w-8 text-natural-green" />,
      title: "Sa ljubavlju pripremljeno",
      description: "Svako jelo pripremamo s pažnjom i ljubavlju prema zdravoj ishrani."
    },
    {
      icon: <Users className="h-8 w-8 text-natural-green" />,
      title: "Zajednica",
      description: "Okupljamo ljude koji dele ljubav prema zdravoj i ukusnoj hrani."
    }
  ];

  return (
    <section id="o-nama" className="py-20 bg-gradient-section">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-natural-green mb-6">
            O nama
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Vegeterija je nastala iz želje da pokažemo koliko može biti ukusna i raznovrsna 
            biljna ishrana. Naša misija je da svim ljubiteljima zdrave hrane pružimo 
            nezaboravne gastronomske doživljaje, koristeći samo najkvalitetnije prirodne sastojke.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {values.map((value, index) => (
            <Card key={index} className="p-8 text-center bg-gradient-card shadow-card border-0 hover:shadow-lg transition-all duration-300">
              <div className="flex justify-center mb-4">
                {value.icon}
              </div>
              <h3 className="text-xl font-semibold text-natural-green mb-4">
                {value.title}
              </h3>
              <p className="text-muted-foreground">
                {value.description}
              </p>
            </Card>
          ))}
        </div>

        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg text-muted-foreground leading-relaxed">
            Pridružite nam se u ovom ukusnom putovanju kroz svet veganske i vegetarijanske 
            kuhinje. Svaki dan kreiramo nova jela koja će vas oduševiti svojom svežinom, 
            ukusom i nutritivnom vrednošću.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;