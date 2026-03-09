import { Card, CardContent } from "@/components/ui/card";
import { Coffee, Utensils, Wine, Cake } from "lucide-react";

const menuCategories = [
  {
    icon: Coffee,
    title: "Topli napici",
    description: "Sveže kuvana kafa, čajevi i specijalni napici",
    color: "bg-amber-500/10 text-amber-700"
  },
  {
    icon: Utensils,
    title: "Jela",
    description: "Domaća kuhinja i internacionalni specijaliteti",
    color: "bg-emerald-500/10 text-emerald-700"
  },
  {
    icon: Wine,
    title: "Pića",
    description: "Vina, kokteli i osvežavajući sokovi",
    color: "bg-rose-500/10 text-rose-700"
  },
  {
    icon: Cake,
    title: "Deserti",
    description: "Domaće torte i slatkiši",
    color: "bg-purple-500/10 text-purple-700"
  }
];

const Menu = () => {
  return (
    <section id="meni" className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl mb-4 text-foreground">
            Naša ponuda
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Od jutarnje kafe do večernje poslastice - otkrijte raznovrsnost naše kuhinje
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {menuCategories.map((category, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-glow transition-all duration-300 hover:-translate-y-2 border-border/50 animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-8 text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <category.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  {category.title}
                </h3>
                <p className="text-muted-foreground">
                  {category.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Menu;
