import { Instagram as InstagramIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const Instagram = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
            Pratite nas na Instagramu
          </h2>
          <div className="w-24 h-1 bg-gradient-colorful mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Budite u toku sa najnovijim dešavanjima, specijalitetima i događajima
          </p>
          <a
            href="https://www.instagram.com/kafana_prijepolje"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="default" size="lg" className="gap-2">
              <InstagramIcon size={20} />
              @kafana_prijepolje
            </Button>
          </a>
        </div>

        {/* Instagram Embed Placeholder */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-card rounded-lg p-8 shadow-card text-center">
            <InstagramIcon size={64} className="mx-auto mb-4 text-primary" />
            <p className="text-muted-foreground mb-4">
              Pratite naš Instagram profil za najsvežije fotografije i informacije o našim specijalitetima i događajima
            </p>
            <a
              href="https://www.instagram.com/kafana_prijepolje"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-semibold"
            >
              Poseti @kafana_prijepolje
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Instagram;
