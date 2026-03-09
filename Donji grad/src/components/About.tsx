import { Card, CardContent } from "@/components/ui/card";
import { Heart, Award, Users, Clock } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Heart,
      title: "Tradicija",
      description: "Više od 30 godina čuvamo autentične recepte srpske kuhinje"
    },
    {
      icon: Award,
      title: "Kvalitet",
      description: "Koristimo samo najkvalitetniji sastojke od proverenih dobavljača"
    },
    {
      icon: Users,
      title: "Atmosfera",
      description: "Topla i prijatna atmosfera za sve prilike i događaje"
    },
    {
      icon: Clock,
      title: "Iskustvo",
      description: "Naš iskusni tim kuvaraka donosi vam nezaboravan ukus"
    }
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary mb-6">
              O Restoranu Donji Grad
            </h2>
            <div className="space-y-4 text-lg text-foreground leading-relaxed">
              <p>
                Restoran <strong className="text-accent">Donji Grad</strong> predstavlja savršen spoj 
                tradicije i modernosti. Smešten u srcu Beograda, naš restoran je već decenijama 
                omiljeno mesto svih ljubitelja autentične srpske kuhinje.
              </p>
              <p>
                Naša priča počinje sa strašću prema tradicionalnim receptima koji se prenose 
                iz generacije u generaciju. Svako jelo priprema se sa posebnom pažnjom i ljubavlju, 
                koristeći samo najkvalitetniji sastojke.
              </p>
              <p>
                Bilo da slavite poseban trenutak ili jednostavno želite da uživate u odličnoj 
                hrani sa porodicom i prijateljima, Restoran Donji Grad je pravo mesto za vas.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <Card key={feature.title} className="bg-card/80 backdrop-blur-sm border-border animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
                    <feature.icon className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-primary mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-16 bg-restaurant-warm-beige rounded-2xl p-8 animate-fade-in">
          <div className="text-center">
            <h3 className="font-serif text-2xl font-bold text-primary mb-4">
              Naši Specijalni Događaji
            </h3>
            <p className="text-foreground mb-6 max-w-3xl mx-auto">
              Organizujemo rođendane, proslave, poslovne ručkove i sve vrste proslava. 
              Naš tim će se pobrinuti da vaš događaj bude nezaboravan.
            </p>
            <div className="grid sm:grid-cols-3 gap-6 text-center">
              <div>
                <h4 className="font-semibold text-accent mb-2">Privatne Proslave</h4>
                <p className="text-sm text-muted-foreground">Do 50 osoba</p>
              </div>
              <div>
                <h4 className="font-semibold text-accent mb-2">Poslovni Ručkovi</h4>
                <p className="text-sm text-muted-foreground">Prilagođeni meniji</p>
              </div>
              <div>
                <h4 className="font-semibold text-accent mb-2">Catering Usluge</h4>
                <p className="text-sm text-muted-foreground">Za sve prilike</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;