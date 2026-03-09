import { Card, CardContent } from "@/components/ui/card";
import grillImage from "@/assets/food-grill.jpg";
import sarmaImage from "@/assets/food-sarma.jpg";
import qrMenuImage from "@/assets/qr-menu.jpg";

const MenuSection = () => {
  const menuCategories = [
    {
      title: "Roštilj Specialiteti",
      image: grillImage,
      items: [
        { name: "Mešano meso za dvoje", price: "2,800 RSD", desc: "Ćevapi, pljeskavica, raznjići, kobasice" },
        { name: "Pljeskavica Donji Grad", price: "1,200 RSD", desc: "Sa kajmakom, slaninom i povrćem" },
        { name: "Ćevapi (10 kom)", price: "980 RSD", desc: "Sa lepinjom, kajmakom i lukom" },
        { name: "Karadjordjeva šnicla", price: "1,450 RSD", desc: "Tradicionalno pripremljena" },
      ]
    },
    {
      title: "Domaća Jela",
      image: sarmaImage,
      items: [
        { name: "Sarma u kiseli kupusu", price: "890 RSD", desc: "Sa pavlakom i lebom" },
        { name: "Gulas sa kneflama", price: "790 RSD", desc: "Tradicionalni recept" },
        { name: "Punjene paprike", price: "850 RSD", desc: "U paradajz sosu" },
        { name: "Moussaka", price: "920 RSD", desc: "Domaća moussaka sa mlečnim sosom" },
      ]
    }
  ];

  return (
    <section id="menu" className="py-20 gradient-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary mb-4">
            Naš Meni
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Otkrijte bogat izbor tradicionalnih srpskih jela, pripremljenih od najkvalitetnijih sastojaka
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {menuCategories.map((category, index) => (
            <Card key={category.title} className="overflow-hidden bg-card/80 backdrop-blur-sm border-border animate-slide-up" style={{ animationDelay: `${index * 0.2}s` }}>
              <div className="aspect-video overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="font-serif text-2xl font-semibold text-primary mb-6">
                  {category.title}
                </h3>
                <div className="space-y-4">
                  {category.items.map((item) => (
                    <div key={item.name} className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground mb-1">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                      <span className="font-bold text-accent ml-4">{item.price}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">Želite da vidite kompletan meni?</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Card className="p-4 bg-card/80 backdrop-blur-sm">
              <p className="text-sm text-muted-foreground mb-2">Skeniraj QR kod za digitalni meni</p>
              <div className="w-32 h-32 mx-auto">
                <img 
                  src={qrMenuImage} 
                  alt="QR kod za digitalni meni" 
                  className="w-full h-full object-cover rounded-lg border border-border"
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenuSection;