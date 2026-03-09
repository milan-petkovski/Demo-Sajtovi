const About = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-warm">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
            O nama
          </h2>
          <div className="w-24 h-1 bg-gradient-colorful mx-auto mb-8 rounded-full"></div>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
            Kafana Prijepolje je mesto gde tradicija i prijateljska atmosfera idu ruku pod ruku. 
            Svakog dana nudimo pažljivo pripremljena jela i toplu dobrodošlicu — dođite da se uverite sami.
          </p>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Naša strast je stvaranje nezaboravnih trenutaka kroz ukusnu hranu, dobro piće i prijatno 
            okruženje koje prosto poziva na opuštanje i druženje.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
