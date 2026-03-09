import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Music } from "lucide-react";
import eventPromo from "@/assets/event-promo.jpg";

const Events = () => {
  const events = [
    {
      date: "Subotom",
      title: "Muzika uživo",
      description: "Svake subote uživajte u muzici uživo sa našim izvođačima",
      time: "20:00h",
    },
    {
      date: "Specijalne prilike",
      title: "Privatne proslave",
      description: "Organizujemo rođendane, svadbe i druga slavlja",
      time: "Po dogovoru",
    },
  ];

  return (
    <section id="events" className="py-16 md:py-24 bg-gradient-warm">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
            Događaji i muzika uživo
          </h2>
          <div className="w-24 h-1 bg-gradient-colorful mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Pratite naš kalendar događaja i uživajte u živoj muzici
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
          {events.map((event, index) => (
            <Card
              key={index}
              className="overflow-hidden hover:shadow-orange transition-all hover:-translate-y-2 animate-scale-in border-2 border-transparent hover:border-orange"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-gradient-cyan p-3 rounded-lg">
                    {index === 0 ? (
                      <Music size={32} className="text-white" />
                    ) : (
                      <Calendar size={32} className="text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground mb-1">{event.date}</p>
                    <h3 className="text-2xl font-display font-semibold text-foreground mb-2">
                      {event.title}
                    </h3>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">{event.description}</p>
                <p className="text-primary font-semibold">{event.time}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured Event */}
        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden shadow-warm">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="aspect-square md:aspect-auto">
                <img
                  src={eventPromo}
                  alt="Večeras uživo"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-8 flex flex-col justify-center">
                <h3 className="text-3xl font-display font-bold text-foreground mb-4">
                  Subota - Muzika uživo
                </h3>
                <p className="text-lg text-muted-foreground mb-6">
                  Ne propustite naše subotnje večeri sa izvođačima uživo. Odlična muzika, sjajno 
                  društvo i nezaboravna atmosfera.
                </p>
                <div className="space-y-2 text-foreground">
                  <p className="flex items-center gap-2">
                    <Music size={20} className="text-primary" />
                    <span className="font-semibold">Početak u 20:00h</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Calendar size={20} className="text-primary" />
                    <span className="font-semibold">Svake subote</span>
                  </p>
                </div>
              </CardContent>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Events;
