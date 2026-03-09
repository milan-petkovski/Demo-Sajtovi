import heroImage from "@/assets/4.jpg";

const Hero = () => {
  return (
    <section id="hero" className="relative">
      <div className="relative h-[500px] overflow-hidden">
        <img 
          src={heroImage} 
          alt="Delicious food" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/40"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Dobrodošli u naš restoran</h1>
            <p className="text-lg md:text-xl max-w-2xl">
              Uživajte u autentičnoj kuhinji pripremljenoj od najsvežijih sastojaka. 
              Svaki obrok je sa ljubavlju pripremljen kako bi vam pružio nezaboravno iskustvo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
