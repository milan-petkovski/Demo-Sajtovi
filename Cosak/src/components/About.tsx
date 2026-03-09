import aboutImage from "@/assets/lotus-fountain.jpg";

const About = () => {
  return (
    <section id="o-nama" className="py-20 px-4 gradient-warm">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h2 className="text-4xl md:text-5xl mb-6 text-foreground">
              O nama
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                Dobrodošli u Ćošak Cafe Restoran - mesto gde se tradicija susreće sa modernim duhom, 
                a svaki trenutak postaje poseban.
              </p>
              <p>
                Naša čarobna bašta pruža savršenu oazu mira u užurbanoj gradskoj vrevi. 
                Sa pažljivo uređenim ambijentom, bujnom zelenilom i intimnom atmosferom, 
                Ćošak je idealno mesto za opuštanje uz dobru hranu i piće.
              </p>
              <p>
                Bilo da dolazite na jutarnju kafu, ručak sa prijateljima ili večernju proslavu, 
                naš tim se trudi da svaki vaš posetu učini nezaboravnom.
              </p>
            </div>
          </div>
          
          <div className="relative animate-scale-in">
            <div className="absolute inset-0 bg-primary/20 rounded-2xl transform rotate-3" />
            <img 
              src={aboutImage} 
              alt="Ćošak bašta sa fontanom i cvetovima" 
              className="relative rounded-2xl shadow-soft w-full h-[500px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
