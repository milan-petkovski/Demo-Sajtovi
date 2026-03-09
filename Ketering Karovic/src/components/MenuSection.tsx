import { useState } from "react";
import { ChevronLeft, ChevronRight, Phone, Instagram } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useScrollReveal } from "@/hooks/useScrollReveal";

import flyerStandard from "@/assets/flyer-standard-2.jpg";
import flyerPremium from "@/assets/flyer-premium-2.png";
import flyerIgraoniceStandard from "@/assets/flyer-igraonice-standard-2.png";
import flyerIgraonicePremium from "@/assets/flyer-igraonice-premium-2.png";
import flyerDorucak from "@/assets/flyer-dorucak-2.png";
import flyerFingerStandard from "@/assets/flyer-finger-standard-2.png";
import flyerFingerPremium from "@/assets/flyer-finger-premium-2.png";
import flyerDocekSvatova from "@/assets/flyer-docek-svatova-2.png";
import flyerSlavskiMeni from "@/assets/flyer-slavski-meni-2.png";

// Standard Paket
import standard1 from "@/assets/standard1.jpg";
import standard2 from "@/assets/standard2.jpg";
import standard3 from "@/assets/standard3.jpg";

// Premium Paket
import premium1 from "@/assets/premium1.jpg";
import premium2 from "@/assets/premium2.jpg";
import premium3 from "@/assets/premium3.jpg";

// Dečije Igraonice Standard
import igraoniceStandard1 from "@/assets/standarddeciji1.jpg";
import igraoniceStandard2 from "@/assets/standarddeciji2.jpg";
import igraoniceStandard3 from "@/assets/standarddeciji3.jpg";
import igraoniceStandard4 from "@/assets/standarddeciji4.jpg";

// Dečije Igraonice Premium
import igraonicePremium1 from "@/assets/premiumdeciji1.jpg";
import igraonicePremium2 from "@/assets/premiumdeciji2.jpg";
import igraonicePremium3 from "@/assets/premiumdeciji3.jpg";

// Doručak
import dorucak1 from "@/assets/dorucak1.jpg";
import dorucak2 from "@/assets/dorucak2.jpg";
import dorucak3 from "@/assets/dorucak3.jpg";
import dorucak4 from "@/assets/dorucak4.jpg";

// Finger Food Standard
import fingerStandard1 from "@/assets/standardfinger1.jpg";
import fingerStandard2 from "@/assets/standardfinger2.jpg";
import fingerStandard3 from "@/assets/standardfinger3.jpg";

// Finger Food Premium
import fingerPremium1 from "@/assets/premiumfinger1.jpg";
import fingerPremium2 from "@/assets/premiumfinger2.jpg";
import fingerPremium3 from "@/assets/premiumfinger3.jpg";

// Doček Svatova
import svatovi1 from "@/assets/doceksvatova1.jpg";
import svatovi2 from "@/assets/doceksvatova2.jpg";

// Slavski Meni
import slava1 from "@/assets/slavski1.jpg";
import slava2 from "@/assets/slavski2.jpg";

interface MenuItem {
  title: string;
  flyer: string;
  gallery: string[];
  description: string;
}

const menus: MenuItem[] = [
  {
    title: "Standard Paket",
    flyer: flyerStandard,
    gallery: [standard1, standard2, standard3],
    description: "Kompletna ketering ponuda sa proverenim receptima. Idealna za porodična slavlja i proslave.",
  },
  {
    title: "Premium Paket",
    flyer: flyerPremium,
    gallery: [premium1, premium2, premium3],
    description: "Naš najekskluzivniji paket sa premium jelima, profesionalnim serviranjem i dekorativnim postavkama na lokaciji.",
  },
  {
    title: "Standard paket za dečije rođendane",
    flyer: flyerIgraoniceStandard,
    gallery: [igraoniceStandard1, igraoniceStandard2, igraoniceStandard3, igraoniceStandard4],
    description: "Ketering paket za dečije rođendane u igraonicama sa ukusnim zalogajima za decu i odrasle.",
  },
  {
    title: "Premium paket za dečije rođendane",
    flyer: flyerIgraonicePremium,
    gallery: [igraonicePremium1, igraonicePremium2, igraonicePremium3],
    description: "Premium ketering paket za nezaboravne dečije rođendane sa bogatom ponudom i dečijim menijem.",
  },
  {
    title: "Doručak meni",
    flyer: flyerDorucak,
    gallery: [dorucak1, dorucak2, dorucak3, dorucak4],
    description: "Bogat doručak meni sa omletima, palačinkama, kroasanima i raznovrsnim dodacima za savršen početak dana.",
  },
  {
    title: "Standard Finger Food",
    flyer: flyerFingerStandard,
    gallery: [fingerStandard1, fingerStandard2, fingerStandard3],
    description: "Ukusni zalogaji za svaku priliku. Raznovrsna ponuda finger food-a po pristupačnim cenama.",
  },
  {
    title: "Premium Finger Food",
    flyer: flyerFingerPremium,
    gallery: [fingerPremium1, fingerPremium2, fingerPremium3],
    description: "Vrhunski finger food sa premium sastojcima. Idealan za koktele, poslovne eventi i ekskluzivna okupljanja.",
  },
  {
    title: "Meni za doček svatova",
    flyer: flyerDocekSvatova,
    gallery: [svatovi1, svatovi2],
    description: "Svečani meni za doček svatova sa tradicionalnim srpskim specijalitetima.",
  },
  {
    title: "Slavski meni",
    flyer: flyerSlavskiMeni,
    gallery: [slava1, slava2],
    description: "Tradicionalni slavski meni sa bogatom ponudom predjela, glavnih jela i roštilja.",
  },
];

const MenuSection = () => {
  const [selectedMenu, setSelectedMenu] = useState<MenuItem | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>();

  const openMenu = (menu: MenuItem) => {
    setSelectedMenu(menu);
    setGalleryIndex(0);
  };

  const nextImage = () => {
    if (selectedMenu) setGalleryIndex((prev) => (prev + 1) % selectedMenu.gallery.length);
  };

  const prevImage = () => {
    if (selectedMenu) setGalleryIndex((prev) => (prev - 1 + selectedMenu.gallery.length) % selectedMenu.gallery.length);
  };

  const scrollToContact = () => {
    setSelectedMenu(null);
    setTimeout(() => {
      document.getElementById("kontakt")?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <section id="meniji" ref={sectionRef} className="py-24 px-4 bg-secondary/50">
      <div className="max-w-6xl mx-auto">
        <div
          className={`text-center mb-16 transition-all duration-800 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="font-body text-sm tracking-[0.3em] uppercase text-gold-light mb-4">Ponuda</p>
          <h2 className="text-3xl md:text-5xl font-display gradient-gold-text mb-6">
            Meniji
          </h2>
          <div className="w-16 h-[1px] gradient-gold mx-auto" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {menus.map((menu, i) => (
            <div
              key={menu.title}
              onClick={() => openMenu(menu)}
              className={`group relative overflow-hidden bg-card border border-border hover:border-gold/40 transition-all duration-700 cursor-pointer ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: isVisible ? `${i * 100}ms` : "0ms" }}
            >
              <div className="overflow-hidden">
                <img
                  src={menu.flyer}
                  alt={menu.title}
                  className="w-full h-auto group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="font-display text-lg text-foreground mb-1">{menu.title}</h3>
                <p className="font-body text-xs text-gold-light tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  Kliknite za detalje →
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <Dialog open={!!selectedMenu} onOpenChange={(open) => !open && setSelectedMenu(null)}>
        <DialogContent className="max-w-5xl bg-card border-border p-0 gap-0 max-h-[95vh] overflow-y-auto">
          <DialogTitle className="sr-only">{selectedMenu?.title}</DialogTitle>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Left: Flyer */}
            <div className="bg-secondary/30 flex items-start justify-center p-4 md:p-6">
              {selectedMenu && (
                <img
                  src={selectedMenu.flyer}
                  alt={selectedMenu.title}
                  className="w-full max-w-md rounded-sm border border-border"
                />
              )}
            </div>

            {/* Right: Gallery + Description + CTA */}
            <div className="p-6 flex flex-col">
              <h3 className="font-display text-2xl gradient-gold-text mb-2">
                {selectedMenu?.title}
              </h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed mb-5">
                {selectedMenu?.description}
              </p>

              <h4 className="font-body text-sm tracking-[0.15em] uppercase text-gold-light mb-3">
                Postavke sa lokacija
              </h4>

              {selectedMenu && (
                <div className="relative aspect-video overflow-hidden border border-border mb-3">
                  <img
                    src={selectedMenu.gallery[galleryIndex]}
                    alt={`Postavka ${galleryIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {selectedMenu.gallery.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-background/70 border border-border hover:border-gold/40 transition-colors"
                        aria-label="Prethodna"
                      >
                        <ChevronLeft className="w-4 h-4 text-foreground" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-background/70 border border-border hover:border-gold/40 transition-colors"
                        aria-label="Sledeća"
                      >
                        <ChevronRight className="w-4 h-4 text-foreground" />
                      </button>
                    </>
                  )}
                </div>
              )}

              {selectedMenu && selectedMenu.gallery.length > 1 && (
                <div className="flex justify-center gap-1.5 mb-6">
                  {selectedMenu.gallery.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setGalleryIndex(i)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        i === galleryIndex ? "bg-gold" : "bg-muted-foreground/30"
                      }`}
                      aria-label={`Slika ${i + 1}`}
                    />
                  ))}
                </div>
              )}

              <button
                onClick={scrollToContact}
                className="mt-auto w-full py-3 font-body text-sm tracking-[0.15em] uppercase gradient-gold text-primary-foreground hover:opacity-90 transition-opacity"
              >
                Zatražite ponudu
              </button>

              <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground font-body">
                <a href="tel:066073007" className="flex items-center gap-1.5 hover:text-gold transition-colors">
                  <Phone className="w-3.5 h-3.5" /> 066 073 007
                </a>
                <a
                  href="https://instagram.com/ketering_karovic"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-gold transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5" /> @ketering_karovic
                </a>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default MenuSection;
