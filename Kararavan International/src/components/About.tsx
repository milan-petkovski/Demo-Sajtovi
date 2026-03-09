import { Shield, Clock, MapPin, Users } from "lucide-react";
import logo from "@/assets/logo.jpg";

const features = [
  { icon: Clock, title: "35 godina iskustva", desc: "Tradicija pouzdanosti od 1991. godine" },
  { icon: MapPin, title: "100+ destinacija", desc: "Evropa, Azija i daleke destinacije" },
  { icon: Users, title: "Hiljade putnika", desc: "Zadovoljni putnici širom regiona" },
  { icon: Shield, title: "Licencirana agencija", desc: "MB: 07690886 | PIB: 100769112" },
];

const About = () => {
  return (
    <section id="onama" className="py-20 bg-background">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-primary font-bold uppercase tracking-widest text-sm mb-2">O nama</p>
            <h2 className="text-3xl md:text-5xl font-black text-foreground mb-6">
              Karavan International
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Već 35 godina organizujemo nezaboravna putovanja za naše putnike. Od dnevnih ekskurzija do dalekih destinacija 
              i luksuznih krstarenja – Karavan International je vaš pouzdani partner za svako putovanje. 
              Polazak iz Novog Pazara i okolnih gradova.
            </p>
            <div className="grid grid-cols-2 gap-6">
              {features.map((f, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center shrink-0">
                    <f.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-sm">{f.title}</h4>
                    <p className="text-muted-foreground text-xs">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-72 h-72 md:w-96 md:h-96 rounded-3xl bg-secondary flex items-center justify-center">
                <img src={logo} alt="Karavan logo" className="w-48 md:w-64 rounded-full" />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-gradient-orange text-primary-foreground px-6 py-3 rounded-2xl font-bold text-lg shadow-xl">
                Od 1991.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
