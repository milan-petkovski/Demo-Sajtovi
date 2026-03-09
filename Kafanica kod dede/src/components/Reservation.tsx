import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

const Reservation = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    guests: '',
    date: '',
    time: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.name || !formData.phone || !formData.guests || !formData.date || !formData.time) {
      toast({
        title: "Greška",
        description: "Molimo popunite sva polja.",
        variant: "destructive"
      });
      return;
    }
    
    // Success message
    toast({
      title: "Rezervacija poslata!",
      description: "Kontaktiraćemo vas u najkraćem roku za potvrdu.",
    });
    
    // Reset form
    setFormData({
      name: '',
      phone: '',
      guests: '',
      date: '',
      time: ''
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <section id="reservation" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
              Rezervišite svoj sto
            </h2>
            <p className="text-lg text-muted-foreground">
              Obezbedite sebi mesto u našoj toploj atmosferi. Rezervacije su preporučene, 
              posebno za vikende i praznike.
            </p>
          </div>
          
          <Card className="shadow-warm border-border/50">
            <CardHeader>
              <CardTitle className="font-serif text-2xl text-center">Online rezervacija</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Ime i prezime *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Vaše ime i prezime"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefon *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="060/123-4567"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Broj osoba *</Label>
                    <Select value={formData.guests} onValueChange={(value) => handleInputChange('guests', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Odaberite" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 osoba</SelectItem>
                        <SelectItem value="2">2 osobe</SelectItem>
                        <SelectItem value="3">3 osobe</SelectItem>
                        <SelectItem value="4">4 osobe</SelectItem>
                        <SelectItem value="5">5 osoba</SelectItem>
                        <SelectItem value="6">6 osoba</SelectItem>
                        <SelectItem value="7+">7+ osoba</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="date">Datum *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Vreme *</Label>
                    <Select value={formData.time} onValueChange={(value) => handleInputChange('time', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Odaberite" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="12:00">12:00</SelectItem>
                        <SelectItem value="13:00">13:00</SelectItem>
                        <SelectItem value="14:00">14:00</SelectItem>
                        <SelectItem value="15:00">15:00</SelectItem>
                        <SelectItem value="16:00">16:00</SelectItem>
                        <SelectItem value="17:00">17:00</SelectItem>
                        <SelectItem value="18:00">18:00</SelectItem>
                        <SelectItem value="19:00">19:00</SelectItem>
                        <SelectItem value="20:00">20:00</SelectItem>
                        <SelectItem value="21:00">21:00</SelectItem>
                        <SelectItem value="22:00">22:00</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-warm"
                >
                  Pošalji rezervaciju
                </Button>
                
                <p className="text-sm text-muted-foreground text-center">
                  * Obavezna polja. Za velika društva (10+ osoba) molimo pozovite direktno.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Reservation;