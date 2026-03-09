import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Calendar, Clock, Users, Phone } from 'lucide-react';

const Reservations = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    ime: '',
    telefon: '',
    email: '',
    datum: '',
    vreme: '',
    brojOsoba: '',
    napomena: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.ime || !formData.telefon || !formData.datum || !formData.vreme || !formData.brojOsoba) {
      toast({
        title: "Greška",
        description: "Molimo popunite sva obavezna polja.",
        variant: "destructive"
      });
      return;
    }

    // Here you would typically send the data to your backend
    toast({
      title: "Rezervacija poslata",
      description: `Hvala ${formData.ime}! Kontaktiraćemo Vas u najkraćem roku za potvrdu rezervacije.`,
    });

    // Reset form
    setFormData({
      ime: '',
      telefon: '',
      email: '',
      datum: '',
      vreme: '',
      brojOsoba: '',
      napomena: ''
    });
  };

  const timeSlots = [
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'
  ];

  return (
    <section id="rezervacije" className="section-padding bg-secondary/10">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gold-gradient">Rezervacije</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Rezervišite svoj sto i pridružite nam se za nezaboravno kulinarno iskustvo. 
            Preporučujemo rezervaciju unapred, posebno za vikend.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Reservation Form */}
          <Card className="elegant-card">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">
                Rezervišite sto
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Name and Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ime">Ime i prezime *</Label>
                    <Input
                      id="ime"
                      name="ime"
                      value={formData.ime}
                      onChange={handleInputChange}
                      placeholder="Vaše ime"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telefon">Broj telefona *</Label>
                    <Input
                      id="telefon"
                      name="telefon"
                      type="tel"
                      value={formData.telefon}
                      onChange={handleInputChange}
                      placeholder="+381 XX XXX XXXX"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email adresa</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="vasa.email@example.com"
                  />
                </div>

                {/* Date and Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="datum">Datum *</Label>
                    <Input
                      id="datum"
                      name="datum"
                      type="date"
                      value={formData.datum}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vreme">Vreme *</Label>
                    <select
                      id="vreme"
                      name="vreme"
                      value={formData.vreme}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground"
                      required
                    >
                      <option value="">Odaberite vreme</option>
                      {timeSlots.map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Number of people */}
                <div className="space-y-2">
                  <Label htmlFor="brojOsoba">Broj osoba *</Label>
                  <select
                    id="brojOsoba"
                    name="brojOsoba"
                    value={formData.brojOsoba}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground"
                    required
                  >
                    <option value="">Odaberite broj osoba</option>
                    {[1,2,3,4,5,6,7,8,9,10].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'osoba' : 'osobe'}</option>
                    ))}
                    <option value="10+">Više od 10 osoba</option>
                  </select>
                </div>

                {/* Note */}
                <div className="space-y-2">
                  <Label htmlFor="napomena">Napomena</Label>
                  <Textarea
                    id="napomena"
                    name="napomena"
                    value={formData.napomena}
                    onChange={handleInputChange}
                    placeholder="Posebni zahtevi, alergije, oslava..."
                    rows={3}
                  />
                </div>

                <Button type="submit" className="btn-gold w-full">
                  Pošalji rezervaciju
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Info Card */}
          <div className="space-y-6">
            <Card className="elegant-card">
              <CardHeader>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Phone className="w-5 h-5 text-primary" />
                  Kontakt za rezervacije
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-semibold">Telefon:</p>
                  <p className="text-muted-foreground">+381 11 XXX XXXX</p>
                </div>
                <div>
                  <p className="font-semibold">Email:</p>
                  <p className="text-muted-foreground">rezervacije@restoran-vizija.rs</p>
                </div>
                <div>
                  <p className="font-semibold">Radni sati:</p>
                  <p className="text-muted-foreground">
                    Pon-Čet: 12:00 - 00:00<br />
                    Pet-Sub: 12:00 - 01:00<br />
                    Nedelja: 12:00 - 23:00
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="elegant-card">
              <CardHeader>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Važne napomene
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>• Rezervacije se potvrđuju telefonskim pozivom</p>
                <p>• Za grupe veće od 8 osoba potrebna je posebna rezervacija</p>
                <p>• Molimo vas da nas obvestite o eventualnim alergijama</p>
                <p>• U slučaju kašnjenja dužeg od 15 minuta, sto se oslobađa</p>
                <p>• Za posebne proslave možemo organizovati prilagođeni meni</p>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Reservations;