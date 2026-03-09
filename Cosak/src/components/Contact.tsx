import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Clock, Mail } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Poruka poslata!",
      description: "Javićemo vam se u najkraćem roku.",
    });
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="kontakt" className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl mb-4 text-foreground">
            Kontakt
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Poseti te nas ili nam pošaljite poruku
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8 animate-fade-in">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Adresa</h3>
                <p className="text-muted-foreground">
                  Вукасовићева 21N<br />
                  Београд 11090, Србија
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Telefon</h3>
                <div className="space-y-1">
                  <a href="tel:+381113583389" className="block text-muted-foreground hover:text-primary transition-colors">
                    011 3583389
                  </a>
                  <a href="tel:+381649888876" className="block text-muted-foreground hover:text-primary transition-colors">
                    064 9888876
                  </a>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Email</h3>
                <a href="mailto:info@cosakcafe.rs" className="text-muted-foreground hover:text-primary transition-colors">
                  info@cosakcafe.rs
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Radno vreme</h3>
                <p className="text-muted-foreground">
                  Ponedeljak - Nedelja<br />
                  08:00 - 24:00h
                </p>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-soft h-64">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2831.3487765739916!2d20.49448597653565!3d44.79702457106857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a7b1c6c8f5555%3A0x1234567890abcdef!2z0JLRg9C60LDRgdC-0LLQuNGb0LXQstCwIDIxTiwg0JHQtdC-0LPRgNCw0LQgMTEwOTA!5e0!3m2!1ssr!2srs!4v1710000000000!5m2!1ssr!2srs"
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy"
                title="Mapa lokacije Ćošak Cafe Restoran"
              />
            </div>
          </div>

          <div className="animate-scale-in">
            <form onSubmit={handleSubmit} className="space-y-6 bg-card p-8 rounded-2xl shadow-soft border border-border/50">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Ime i prezime
                </label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="bg-background"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email adresa
                </label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="bg-background"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Poruka
                </label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={6}
                  className="bg-background resize-none"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg shadow-soft"
              >
                Pošaljite poruku
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
