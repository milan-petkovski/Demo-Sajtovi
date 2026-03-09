import { Phone, Mail, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <section id="kontakt" className="py-20 bg-foreground text-primary-foreground">
      <div className="container">
        <div className="text-center mb-14">
          <p className="text-primary font-bold uppercase tracking-widest text-sm mb-2">Kontakt</p>
          <h2 className="text-3xl md:text-5xl font-black">Javite nam se</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">Adresa</h4>
                <p className="text-primary-foreground/70">Rifata Burdževića 1, Novi Pazar</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">Telefon</h4>
                <p className="text-primary-foreground/70">020 / 331-991</p>
                <p className="text-primary-foreground/70">063 211 830</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">Email</h4>
                <p className="text-primary-foreground/70">karavaninternational@gmail.com</p>
              </div>
            </div>

            <a
              href="https://wa.me/381631211830"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gradient-orange text-primary-foreground px-8 py-4 rounded-full font-bold text-lg hover:opacity-90 transition-opacity"
            >
              WhatsApp upit
            </a>
          </div>

          <div className="rounded-2xl overflow-hidden h-80 md:h-full min-h-[320px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2920.397!2d20.5127!3d43.1367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4756063ed50d53ef%3A0x6db5b1bd3a8b0e58!2sRifata%20Burd%C5%BEevi%C4%87a%201%2C%20Novi%20Pazar!5e0!3m2!1ssr!2srs!4v1700000000000!5m2!1ssr!2srs"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Karavan International lokacija"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-primary-foreground/10 text-center">
          <p className="text-primary-foreground/50 text-sm">
            © 2026 Karavan International. Sva prava zadržana. | MB: 07690886 | PIB: 100769112
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
