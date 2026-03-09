import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, Users, Phone, Mail, MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Rezervacije = () => {
  const [formData, setFormData] = useState({
    ime: '',
    telefon: '',
    email: '',
    datum: '',
    vreme: '',
    brojOsoba: '',
    napomene: ''
  });

  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.ime || !formData.telefon || !formData.datum || !formData.vreme || !formData.brojOsoba) {
      toast({
        title: "Greška",
        description: "Molimo popunite sva obavezna polja",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Rezervacija poslata!",
      description: "Kontaktiraćemo vas uskoro da potvrdimo rezervaciju.",
    });

    // Reset form
    setFormData({
      ime: '',
      telefon: '',
      email: '',
      datum: '',
      vreme: '',
      brojOsoba: '',
      napomene: ''
    });
  };

  const timeSlots = [
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'
  ];

  return (
    <div className="min-h-screen pt-20 bg-gradient-elegant">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Rezervacije</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Rezervišite svoj sto i uživajte u nezaboravnom kulinarskom iskustvu
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Reservation Form */}
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="font-serif text-2xl">Rezerviši sto</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="ime">Ime i prezime *</Label>
                      <Input
                        id="ime"
                        value={formData.ime}
                        onChange={(e) => setFormData({...formData, ime: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="telefon">Telefon *</Label>
                      <Input
                        id="telefon"
                        type="tel"
                        value={formData.telefon}
                        onChange={(e) => setFormData({...formData, telefon: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="datum">Datum *</Label>
                      <Input
                        id="datum"
                        type="date"
                        value={formData.datum}
                        onChange={(e) => setFormData({...formData, datum: e.target.value})}
                        min={new Date().toISOString().split('T')[0]}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="vreme">Vreme *</Label>
                      <Select value={formData.vreme} onValueChange={(value) => setFormData({...formData, vreme: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Izaberi vreme" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time}>{time}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="brojOsoba">Broj osoba *</Label>
                    <Select value={formData.brojOsoba} onValueChange={(value) => setFormData({...formData, brojOsoba: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Izaberi broj osoba" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1,2,3,4,5,6,7,8,9,10].map((num) => (
                          <SelectItem key={num} value={num.toString()}>{num} {num === 1 ? 'osoba' : 'osobe'}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="napomene">Dodatne napomene</Label>
                    <Textarea
                      id="napomene"
                      value={formData.napomene}
                      onChange={(e) => setFormData({...formData, napomene: e.target.value})}
                      placeholder="Specijalni zahtevi, proslave, alergije..."
                      rows={3}
                    />
                  </div>

                  <Button type="submit" variant="reserve" size="lg" className="w-full">
                    Potvrdi rezervaciju
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Info Cards */}
            <div className="space-y-6">
              {/* Contact Info */}
              <Card className="shadow-elegant">
                <CardHeader>
                  <CardTitle className="font-serif text-xl flex items-center gap-2">
                    <Phone className="w-5 h-5 text-gold" />
                    Kontakt za rezervacije
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span>011/234-5678</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span>rezervacije@duomo.rs</span>
                  </div>
                </CardContent>
              </Card>

              {/* Opening Hours */}
              <Card className="shadow-elegant">
                <CardHeader>
                  <CardTitle className="font-serif text-xl flex items-center gap-2">
                    <Clock className="w-5 h-5 text-gold" />
                    Radno vreme
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>Ponedeljak - Četvrtak:</span>
                    <span className="font-medium">12:00 - 24:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Petak - Subota:</span>
                    <span className="font-medium">12:00 - 01:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Nedelja:</span>
                    <span className="font-medium">12:00 - 23:00</span>
                  </div>
                </CardContent>
              </Card>

              {/* Special Events */}
              <Card className="shadow-elegant bg-gold/5 border-gold/20">
                <CardHeader>
                  <CardTitle className="font-serif text-xl flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-gold" />
                    Specijalni događaji
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Za proslave, rođendane ili poslovne događaje sa više od 10 osoba, molimo kontaktirajte nas direktno da organizujemo poseban tretman.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rezervacije;