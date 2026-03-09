import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import quinoaBowl from '@/assets/quinoa-bowl.jpg';
import lentilSoup from '@/assets/lentil-soup.jpg';
import avocadoToast from '@/assets/avocado-toast.jpg';

const Menu = () => {
  const menuItems = [
    {
      id: 1,
      name: "Buddha Bowl sa kinoom",
      description: "Osvežavajuća kombinacija kine, svežeg povrća, avokada, nuta i tahini dresa",
      price: "750 RSD",
      image: quinoaBowl,
      category: "Glavna jela",
      vegan: true,
      glutenFree: true
    },
    {
      id: 2,
      name: "Krem supa od sočiva",
      description: "Bogata i kremasta supa od crvenog sočiva sa kokosovim mlekom i začinima",
      price: "420 RSD",
      image: lentilSoup,
      category: "Supe",
      vegan: true,
      glutenFree: true
    },
    {
      id: 3,
      name: "Avokado toast",
      description: "Hrskavi sourdough hleb sa smashanim avokadom, cherry paradajzom i sjemenkama",
      price: "580 RSD",
      image: avocadoToast,
      category: "Doručak",
      vegan: true,
      glutenFree: false
    },
    {
      id: 4,
      name: "Mediteranski wrap",
      description: "Tortilja sa humusom, grillovanim povrćem, rukolom i feta sirom",
      price: "650 RSD",
      image: null,
      category: "Glavna jela",
      vegan: false,
      glutenFree: false
    },
    {
      id: 5,
      name: "Zeleni smoothie",
      description: "Spinat, banana, mango, kokosovo mleko i chia semenke",
      price: "380 RSD",
      image: null,
      category: "Napici",
      vegan: true,
      glutenFree: true
    },
    {
      id: 6,
      name: "Chia puding",
      description: "Vanila chia puding sa svežim voćem i bademima",
      price: "450 RSD",
      image: null,
      category: "Deserti",
      vegan: true,
      glutenFree: true
    }
  ];

  const categories = ["Sve", "Glavna jela", "Supe", "Doručak", "Napici", "Deserti"];
  const [selectedCategory, setSelectedCategory] = React.useState("Sve");

  const filteredItems = selectedCategory === "Sve" 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  return (
    <section id="meni" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-natural-green mb-6">
            Naš meni
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Otkrijte raznovrsnost ukusa naših pažljivo pripremljenih jela od najsvežijih sastojaka
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-natural-green text-white shadow-button'
                  : 'bg-warm-beige text-natural-green hover:bg-natural-green-lighter'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Menu Items */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <Card key={item.id} className="overflow-hidden bg-gradient-card shadow-card border-0 hover:shadow-lg transition-all duration-300 group">
              {item.image && (
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold text-natural-green">
                    {item.name}
                  </h3>
                  <span className="text-lg font-bold text-earth-brown">
                    {item.price}
                  </span>
                </div>
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {item.category}
                  </Badge>
                  {item.vegan && (
                    <Badge className="bg-natural-green-lighter text-natural-green text-xs">
                      Vegan
                    </Badge>
                  )}
                  {item.glutenFree && (
                    <Badge className="bg-warm-beige text-earth-brown text-xs">
                      Bez glutena
                    </Badge>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            Imate pitanja o alergijama ili sastojcima? Slobodno nas pitajte!
          </p>
        </div>
      </div>
    </section>
  );
};

export default Menu;