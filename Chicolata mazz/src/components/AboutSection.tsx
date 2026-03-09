const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-cream">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-coffee mb-4">
              Naša Priča
            </h2>
            <div className="w-24 h-1 bg-gradient-hero mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-serif font-semibold text-coffee mb-4">
                Dobrodošli u Chicota Mazz
              </h3>
              
              <p className="text-coffee-light leading-relaxed text-lg">
                Od osnutka 2020. godine, Chicota Mazz je postao simbol autentične kuhinje 
                i toplog gostoprimstva u srcu našeg grada. Naša priča počinje sa strašću 
                prema tradicionalnim receptima i željom da stvorimo prostor gde se porodice 
                okupljaju oko ukusne hrane.
              </p>
              
              <p className="text-coffee-light leading-relaxed text-lg">
                Svako jelo pripremamo sa ljubavlju, koristeći samo najkvalitetnije sastojke 
                od lokalnih dobavljača. Naš tim kuhinjih umetnika svakodnevno radi na tome 
                da vam pruži nezaboravno kulinarska iskustvo.
              </p>

              <div className="bg-gradient-warm p-6 rounded-xl border-l-4 border-golden">
                <h4 className="font-semibold text-coffee mb-2 text-lg">Naša Filozofija</h4>
                <p className="text-coffee-light italic">
                  "Verujemo da je hrana jezik ljubavi. Svaki obrok je prilika da podelimo 
                  našu strast i stvorimo trenutke koje ćete pamtiti zauvek."
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-card p-6 rounded-xl shadow-elegant">
                <h4 className="font-semibold text-coffee mb-2 flex items-center">
                  <span className="w-2 h-2 bg-golden rounded-full mr-3"></span>
                  Svež Pristup
                </h4>
                <p className="text-coffee-light">
                  Dnevno biramo najsvežije sastojke od proverenih lokalnih dobavljača
                </p>
              </div>

              <div className="bg-card p-6 rounded-xl shadow-elegant">
                <h4 className="font-semibold text-coffee mb-2 flex items-center">
                  <span className="w-2 h-2 bg-golden rounded-full mr-3"></span>
                  Tradicionalni Recepti
                </h4>
                <p className="text-coffee-light">
                  Ponosimo se čuvanjem porodičnih recepta prenošenih kroz generacije
                </p>
              </div>

              <div className="bg-card p-6 rounded-xl shadow-elegant">
                <h4 className="font-semibold text-coffee mb-2 flex items-center">
                  <span className="w-2 h-2 bg-golden rounded-full mr-3"></span>
                  Topla Atmosfera
                </h4>
                <p className="text-coffee-light">
                  Naš prostor je dizajniran da se osećate kao kod kuće sa porodicom
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <div className="bg-gradient-hero p-8 rounded-2xl shadow-warm text-coffee">
              <h3 className="text-2xl font-serif font-semibold mb-4">
                Zahvalni smo vam što ste deo naše priče
              </h3>
              <p className="text-lg mb-6">
                Svaki gost je poseban, a svaki ovisit je prilika da pokažemo koliko cenimo vaše poverenje
              </p>
              <div className="flex justify-center space-x-8 text-sm">
                <div className="text-center">
                  <div className="font-bold text-2xl">500+</div>
                  <div>Zadovoljnih gostiju</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-2xl">1000+</div>
                  <div>Priprema jela</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-2xl">3+</div>
                  <div>Godine iskustva</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;