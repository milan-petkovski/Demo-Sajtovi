import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, QrCode } from "lucide-react";
import food1 from "@/assets/food-1.jpg";
import food2 from "@/assets/food-2.jpg";
import food3 from "@/assets/food-3.jpg";

const Menu = () => {
  const menuItems = [
    {
      image: food3,
      title: "Specijalitet kuće",
      description: "Pečenje na ražnju, pripremljeno tradicionalnim receptom",
    },
    {
      image: food2,
      title: "Domaća hrana",
      description: "Raznovrsna jela od najkvalitetnijih sastojaka",
    },
    {
      image: food1,
      title: "Tradicionalni specijaliteti",
      description: "Ukusi koji podsjećaju na tradicionalnu kuhinju",
    },
  ];

  return (
    <section id="menu" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
            Naš meni
          </h2>
          <div className="w-24 h-1 bg-gradient-colorful mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Naša kuhinja kombinuje tradicionalne recepte i savremeni pristup — pogledajte najtraženija 
            jela i specijalitete kuće.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {menuItems.map((item, index) => (
            <Card
              key={index}
              className="overflow-hidden hover:shadow-cyan transition-all hover:-translate-y-2 animate-scale-in border-2 border-transparent hover:border-cyan"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button variant="default" size="lg" className="gap-2">
            <Download size={20} />
            Preuzmi PDF meni
          </Button>
          <Button variant="outline" size="lg" className="gap-2">
            <QrCode size={20} />
            QR kod menija
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Menu;
