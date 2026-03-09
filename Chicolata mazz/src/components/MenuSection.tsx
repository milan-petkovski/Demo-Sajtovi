import pastaImage from "@/assets/pasta-dish.jpg";
import pizzaImage from "@/assets/pizza-dish.jpg";
import meatImage from "@/assets/meat-dish.jpg";

const menuItems = [
  {
    category: "Paste",
    items: [
      {
        name: "Chicota Carbonara",
        description: "Tradicionalna carbonara sa pancetom, parmesan sirom i svežim belancetom",
        price: "1.200 din",
        image: pastaImage,
      },
      {
        name: "Penne Arrabbiata",
        description: "Ljute penne sa čeri paradajzom, belim lukom i svežim bosiljkom",
        price: "1.000 din",
        image: pastaImage,
      },
    ]
  },
  {
    category: "Pica",
    items: [
      {
        name: "Mazz Specijal",
        description: "Kućna pica sa prshutom, rukolom, parmesan sirom i cherry paradajzom",
        price: "1.400 din",
        image: pizzaImage,
      },
      {
        name: "Quattro Stagioni",
        description: "Klasična četiri godišnja doba sa šunkom, gljivama i artičokama",
        price: "1.300 din",
        image: pizzaImage,
      },
    ]
  },
  {
    category: "Meso i Riba",
    items: [
      {
        name: "Chicota Rostilj",
        description: "Miješano meso sa roštilja sa sezonskim povrćem i kačkavaljem",
        price: "1.800 din",
        image: meatImage,
      },
      {
        name: "Losos na žaru",
        description: "Svež losos sa mediterranean začinima i limunom",
        price: "2.000 din",
        image: meatImage,
      },
    ]
  },
];

const MenuSection = () => {
  return (
    <section id="menu" className="py-20 bg-gradient-warm">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-coffee mb-4">
            Naš Meni
          </h2>
          <p className="text-lg text-coffee-light max-w-2xl mx-auto">
            Otkrijte naše autentične recepte pripremljene sa najfinijim sastojcima
          </p>
        </div>

        <div className="space-y-16">
          {menuItems.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-card rounded-2xl p-8 shadow-elegant">
              <h3 className="text-3xl font-serif font-semibold text-coffee mb-8 text-center border-b border-golden/20 pb-4">
                {category.category}
              </h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                {category.items.map((item, itemIndex) => (
                  <div 
                    key={itemIndex}
                    className="group bg-warm-white rounded-xl overflow-hidden shadow-elegant hover:shadow-warm transition-all duration-300 hover:scale-102"
                  >
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="text-xl font-semibold text-coffee group-hover:text-golden transition-colors">
                          {item.name}
                        </h4>
                        <span className="text-xl font-bold text-golden bg-golden/10 px-3 py-1 rounded-lg">
                          {item.price}
                        </span>
                      </div>
                      
                      <p className="text-coffee-light leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-coffee-light mb-4">
            Sva jela su pripremana svežim sastojcima i mogu se prilagoditi vašim dijetalnim potrebama
          </p>
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-sunset text-coffee px-8 py-3 rounded-lg font-semibold
                     shadow-warm hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Pogledaj Digitalni Meni
          </button>
        </div>
      </div>
    </section>
  );
};

export default MenuSection;