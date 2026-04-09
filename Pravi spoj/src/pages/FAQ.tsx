import FadeIn from "@/components/FadeIn";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Kako se štiti moja privatnost?",
    a: "Vaši podaci su strogo poverljivi. Nikada ne delimo informacije o članovima bez njihovog izričitog pristanka. Svi razgovori i susreti su diskretni.",
  },
  {
    q: "Kako se vrši verifikacija članova?",
    a: "Svaki član prolazi kroz detaljan lični intervju. Proveravamo identitet i motivaciju kako bismo osigurali bezbedan i kvalitetan prostor za sve.",
  },
  {
    q: "Gde se održavaju susreti?",
    a: "Susreti se organizuju u Centru Life na adresi Topličin venac 3, Stari grad, Beograd — u prijatnom i sigurnom okruženju.",
  },
  {
    q: "Šta ako ne osetim hemiju na prvom susretu?",
    a: "To je potpuno normalno. Naš tim nastavlja sa novim predlozima na osnovu vašeg povratnog utiska, dok ne pronađemo osobu koja zaista odgovara.",
  },
  {
    q: "Da li mogu da se prijavim ako nisam iz Beograda?",
    a: "Naravno! Klijenti van Beograda su dobrodošli — nudimo onlajn konsultacije i prilagođavamo proces vašim potrebama.",
  },
  {
    q: "Koliko dugo traje proces upoznavanja?",
    a: "Svaka osoba je drugačija. Neki klijenti pronađu partnera nakon prvog susreta, dok drugima treba više vremena. Nema pritiska — pratimo vaš ritam.",
  },
];

const FAQ = () => (
  <main className="py-20 bg-background">
    <div className="container mx-auto px-4 max-w-3xl">
      <FadeIn>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground text-center mb-4">
          Česta pitanja
        </h1>
        <p className="text-center text-muted-foreground mb-12">
          Sve što želite da znate pre nego što napravite prvi korak
        </p>
      </FadeIn>
      <FadeIn delay={0.1}>
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="bg-card border border-border rounded-xl px-6"
            >
              <AccordionTrigger className="text-left font-serif text-base font-semibold text-foreground hover:no-underline">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </FadeIn>
    </div>
  </main>
);

export default FAQ;
