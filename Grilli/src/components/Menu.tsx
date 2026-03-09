const Menu = () => {
  const menuItems = [
    {
      category: "Predjela",
      items: [
        { name: "Bruschetta", description: "Hrskav hleb sa paradajzom i bosiljkom", price: "450 RSD" },
        { name: "Carpaccio", description: "Tanko isečena govedina sa rukolom", price: "650 RSD" },
        { name: "Gibanica", description: "Tradicionalna srpska gibanica", price: "350 RSD" },
      ]
    },
    {
      category: "Glavna jela",
      items: [
        { name: "Biftek sa roštilja", description: "Sočan biftek sa povrćem", price: "1200 RSD" },
        { name: "Pasta Carbonara", description: "Kremasta pasta sa slaninom", price: "850 RSD" },
        { name: "Piletina u sosu od pečuraka", description: "Nežna piletina sa domaćim krompirom", price: "950 RSD" },
        { name: "Pečena pastrmka", description: "Sveža riba sa mediteranskim povrćem", price: "1100 RSD" },
      ]
    },
    {
      category: "Deserti",
      items: [
        { name: "Tiramisu", description: "Klasični italijanski desert", price: "400 RSD" },
        { name: "Čokoladna torta", description: "Bogata čokoladna torta", price: "450 RSD" },
        { name: "Palačinke", description: "Tradicionalne palačinke sa džemom", price: "350 RSD" },
      ]
    }
  ];

  return (
    <section id="menu" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">Naš jelovnik</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {menuItems.map((category, idx) => (
            <div key={idx} className="bg-card p-6 rounded-lg border border-border">
              <h3 className="text-2xl font-semibold mb-6 text-primary">{category.category}</h3>
              <div className="space-y-4">
                {category.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="border-b border-border pb-4 last:border-0">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-foreground">{item.name}</h4>
                      <span className="text-primary font-semibold">{item.price}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Menu;
