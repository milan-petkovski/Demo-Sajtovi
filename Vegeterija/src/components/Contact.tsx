import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Clock, MapPin, Mail, Instagram } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const workingHours = [
    { day: "Ponedeljak - Petak", hours: "08:30 - 17:00" },
    { day: "Subota", hours: "10:00 - 17:00" },
    { day: "Nedelja", hours: "Zatvoreno" }
  ];

  const contactInfo = [
    {
      icon: <Phone className="h-5 w-5" />,
      title: "Telefon",
      content: "+381 11 234 5678",
      action: () => window.open('tel:+381112345678')
    },
    {
      icon: <Mail className="h-5 w-5" />,
      title: "Email",
      content: "info@vegeterija.rs",
      action: () => window.open('mailto:info@vegeterija.rs')
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      title: "Adresa",
      content: "Sinđelićeva 8, Belgrade, Serbia",
      action: () => window.open('https://maps.google.com/?q=Sinđelićeva+8+Belgrade+Serbia')
    },
    {
      icon: <Instagram className="h-5 w-5" />,
      title: "Instagram",
      content: "@vegeterija",
      action: () => window.open('https://www.instagram.com/vegeterija/')
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    toast({
      title: "Poruka poslata!",
      description: "Hvala vam na poruci. Javićemo vam se uskoro.",
    });
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
  };

  return (
    <section id="kontakt" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-natural-green mb-6">
            Kontakt i radno vreme
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Kontaktirajte nas za rezervacije, pitanja ili jednostavno da podelite svoja iskustva
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Info and Hours */}
          <div className="space-y-8">
            {/* Working Hours */}
            <Card className="p-6 bg-gradient-card shadow-card border-0">
              <div className="flex items-center mb-4">
                <Clock className="h-6 w-6 text-natural-green mr-3" />
                <h3 className="text-xl font-semibold text-natural-green">Radno vreme</h3>
              </div>
              <div className="space-y-3">
                {workingHours.map((schedule, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-muted-foreground">{schedule.day}</span>
                    <span className="font-medium text-foreground">{schedule.hours}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Contact Information */}
            <div className="grid sm:grid-cols-2 gap-4">
              {contactInfo.map((info, index) => (
                <Card 
                  key={index} 
                  className="p-4 bg-gradient-card shadow-card border-0 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                  onClick={info.action}
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-natural-green group-hover:scale-110 transition-transform duration-200">
                      {info.icon}
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">{info.title}</div>
                      <div className="font-medium text-foreground group-hover:text-natural-green transition-colors">
                        {info.content}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <Button 
                size="lg"
                onClick={() => window.open('tel:+381112345678')}
                className="bg-natural-green hover:bg-natural-green-light text-white px-8 py-3 shadow-button"
              >
                <Phone className="h-5 w-5 mr-2" />
                Pozovi za rezervaciju
              </Button>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="p-8 bg-gradient-card shadow-card border-0">
            <h3 className="text-2xl font-semibold text-natural-green mb-6">Pošaljite nam poruku</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="text-sm font-medium text-foreground mb-2 block">
                    Ime i prezime *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="border-warm-beige-dark focus:border-natural-green"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="text-sm font-medium text-foreground mb-2 block">
                    Telefon
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="border-warm-beige-dark focus:border-natural-green"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-medium text-foreground mb-2 block">
                  Email *
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="border-warm-beige-dark focus:border-natural-green"
                />
              </div>
              <div>
                <label htmlFor="message" className="text-sm font-medium text-foreground mb-2 block">
                  Poruka *
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="border-warm-beige-dark focus:border-natural-green resize-none"
                  placeholder="Ovde upišite vašu poruku..."
                />
              </div>
              <Button 
                type="submit" 
                size="lg"
                className="w-full bg-natural-green hover:bg-natural-green-light text-white shadow-button"
              >
                Pošalji poruku
              </Button>
            </form>
          </Card>
        </div>

        {/* Map Placeholder */}
        <Card className="p-8 bg-gradient-card shadow-card border-0 text-center">
          <h3 className="text-2xl font-semibold text-natural-green mb-4">Naša lokacija</h3>
          <div className="bg-warm-beige rounded-lg p-12 mb-4">
            <MapPin className="h-12 w-12 text-natural-green mx-auto mb-4" />
            <p className="text-lg font-medium text-foreground">Sinđelićeva 8, Belgrade, Serbia</p>
            <p className="text-muted-foreground mt-2">
              U centru grada
            </p>
          </div>
          <Button 
            variant="outline"
            onClick={() => window.open('https://maps.google.com/?q=Sinđelićeva+8+Belgrade+Serbia')}
            className="border-natural-green text-natural-green hover:bg-natural-green hover:text-white"
          >
            Otvori na mapi
          </Button>
        </Card>
      </div>
    </section>
  );
};

export default Contact;