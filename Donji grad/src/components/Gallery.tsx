import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-restaurant.jpg";
import grillImage from "@/assets/food-grill.jpg";
import sarmaImage from "@/assets/food-sarma.jpg";

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", name: "Sve" },
    { id: "interior", name: "Ambijent" },
    { id: "food", name: "Hrana" },
    { id: "events", name: "Događaji" }
  ];

  const galleryItems = [
    {
      id: 1,
      image: heroImage,
      title: "Glavni restoranski salon",
      category: "interior",
      description: "Topla atmosfera našeg glavnog salona"
    },
    {
      id: 2,
      image: grillImage,
      title: "Roštilj specialiteti",
      category: "food",
      description: "Naši najpoznatiji roštilj specijaliteti"
    },
    {
      id: 3,
      image: sarmaImage,
      title: "Tradicionalna sarma",
      category: "food",
      description: "Domaća sarma po strom receptu"
    },
    {
      id: 4,
      image: heroImage,
      title: "Intimni ugožaj",
      category: "interior",
      description: "Savršeno mesto za romantičnu večeru"
    },
    {
      id: 5,
      image: grillImage,
      title: "Slavlje u restoranu",
      category: "events",
      description: "Proslave i događaji u Donjem Gradu"
    },
    {
      id: 6,
      image: sarmaImage,
      title: "Sezonski specijali",
      category: "food",
      description: "Jela pripremljena prema sezoni"
    }
  ];

  const filteredItems = activeCategory === "all" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <section id="gallery" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary mb-4">
            Galerija
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Pogledajte našu atmosferu, jela i nezaboravne trenutke u Restoranu Donji Grad
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              onClick={() => setActiveCategory(category.id)}
              className="transition-all duration-200"
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <Card 
              key={item.id} 
              className="group overflow-hidden bg-card border-border hover:shadow-lg transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-primary mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12 animate-fade-in">
          <Card className="bg-restaurant-warm-beige border-restaurant-gold/20 max-w-2xl mx-auto">
            <div className="p-8">
              <h3 className="font-serif text-2xl font-bold text-primary mb-4">
                Posetite Nas
              </h3>
              <p className="text-foreground mb-6">
                Doživite atmosferu koja vas čeka u Restoranu Donji Grad. 
                Svaki trenutak je poseban kada se deli sa porodicom i prijateljima.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-accent hover:bg-accent/90">
                  Rezerviši Sto
                </Button>
                <Button variant="outline" size="lg">
                  Pogledaj Meni
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Gallery;