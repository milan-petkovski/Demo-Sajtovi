import destSarajevo from "@/assets/dest-sarajevo.jpg";
import destGreece from "@/assets/dest-greece.jpg";
import destSwitzerland from "@/assets/dest-switzerland.jpg";
import destCruise from "@/assets/dest-cruise.jpg";
import destDubrovnik from "@/assets/dest-dubrovnik.jpg";
import destSpain from "@/assets/dest-spain.jpg";

const offers = [
  {
    month: "U FEBRUARU",
    title: "Sarajevo",
    subtitle: "Mostar – Blagaj – Vrelo Bosne",
    price: "99 EUR",
    dates: "14 / 16. Februar",
    details: "Bus + Hotel + Doručak + Vodič | 2 noći / 3 dana",
    image: destSarajevo,
  },
  {
    month: "U FEBRUARU",
    title: "Severna Grčka & Turska",
    subtitle: "Solun – Čanakkale – Edirne",
    price: "169 EUR",
    dates: "13 / 17. Februar",
    details: "Bus + Hotel + Doručak + Vodič | 5 dana / 2 noći",
    image: destGreece,
  },
  {
    month: "U APRILU",
    title: "Švajcarska",
    subtitle: "Cirih – Bern – Ženeva – Lozana",
    price: "329 EUR",
    dates: "09 / 14. April",
    details: "Bus + Hotel + Doručak + Vodič | 6 dana / 3 noći",
    image: destSwitzerland,
  },
  {
    month: "U APRILU",
    title: "Krstarenje Mediteranom",
    subtitle: "MSC World Europa",
    price: "od 1.299 EUR",
    dates: "11. April 2026",
    details: "Bus + Brod + Vodič | 10 dana / 7 noći",
    image: destCruise,
  },
  {
    month: "U APRILU",
    title: "Od Mora do Sevdaha",
    subtitle: "Dubrovnik – Neum – Split – Mostar",
    price: "169 EUR",
    dates: "09 / 13. April",
    details: "Bus + Hotel + Polupansion + Vodič | 5 dana",
    image: destDubrovnik,
  },
  {
    month: "U APRILU",
    title: "Španija – Francuska – Italija",
    subtitle: "Barselona – Montecarlo – Nica – Venecija",
    price: "490 EUR",
    dates: "10 / 19. April",
    details: "Bus + Hotel + BB + HB + Vodič | 10 dana / 5 noći",
    image: destSpain,
  },
];

const MonthlyOffers = () => {
  return (
    <section id="ponude" className="py-20 bg-secondary">
      <div className="container">
        <div className="text-center mb-14">
          <p className="text-primary font-bold uppercase tracking-widest text-sm mb-2">Aktualne ponude</p>
          <h2 className="text-3xl md:text-5xl font-black text-foreground">
            Aranžmani po mesecima
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer, i) => (
            <div
              key={i}
              className="group bg-card rounded-2xl overflow-hidden shadow-lg card-hover"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover img-zoom group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-gradient-orange text-primary-foreground px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                  {offer.month}
                </div>
                <div className="absolute bottom-4 right-4 bg-foreground/90 text-primary-foreground px-4 py-2 rounded-xl font-bold text-lg">
                  {offer.price}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-1">{offer.title}</h3>
                <p className="text-primary font-semibold text-sm mb-2">{offer.subtitle}</p>
                <p className="text-muted-foreground text-sm mb-1">{offer.dates}</p>
                <p className="text-muted-foreground text-xs mb-5">{offer.details}</p>
                <a
                  href={`https://wa.me/381631211830?text=Zdravo! Zanima me aranžman: ${offer.title} (${offer.dates})`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-gradient-orange text-primary-foreground text-center py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity"
                >
                  Pošalji upit
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MonthlyOffers;
