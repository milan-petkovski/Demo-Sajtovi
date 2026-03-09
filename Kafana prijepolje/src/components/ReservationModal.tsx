import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReservationModal = ({ isOpen, onClose }: ReservationModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    guests: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.phone || !formData.date || !formData.time) {
      toast({
        title: "Greška",
        description: "Molimo popunite sva obavezna polja",
        variant: "destructive",
      });
      return;
    }

    // Success message
    toast({
      title: "Rezervacija poslata!",
      description: "Kontaktiraćemo vas u najkraćem roku za potvrdu rezervacije.",
    });

    // Reset form and close
    setFormData({
      name: "",
      phone: "",
      date: "",
      time: "",
      guests: "",
      message: "",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display">Rezervišite sto</DialogTitle>
          <DialogDescription>
            Popunite formu i mi ćemo vas kontaktirati za potvrdu rezervacije
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <Label htmlFor="name">Ime i prezime *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Vaše ime"
              required
            />
          </div>

          <div>
            <Label htmlFor="phone">Telefon *</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+381..."
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date">Datum *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="time">Vreme *</Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="guests">Broj osoba</Label>
            <Input
              id="guests"
              type="number"
              min="1"
              value={formData.guests}
              onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
              placeholder="Koliko vas dolazi?"
            />
          </div>

          <div>
            <Label htmlFor="message">Dodatna napomena</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Posebni zahtevi ili napomene..."
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" variant="colorful" className="flex-1">
              Pošalji rezervaciju
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Otkaži
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReservationModal;
