import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Menu from "@/components/Menu";
import Gallery from "@/components/Gallery";
import Instagram from "@/components/Instagram";
import Events from "@/components/Events";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ReservationModal from "@/components/ReservationModal";

const Index = () => {
  const [isReservationOpen, setIsReservationOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Header onReserveClick={() => setIsReservationOpen(true)} />
      <main>
        <Hero onReserveClick={() => setIsReservationOpen(true)} />
        <About />
        <Menu />
        <Gallery />
        <Instagram />
        <Events />
        <Contact />
      </main>
      <Footer />
      <ReservationModal 
        isOpen={isReservationOpen} 
        onClose={() => setIsReservationOpen(false)} 
      />

      {/* Schema.org structured data for SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Restaurant",
          "name": "Kafana Prijepolje",
          "description": "Tradicionalna kafana sa domaćom kuhinjom i prijatnom atmosferom",
          "image": "https://lovable.dev/opengraph-image-p98pqg.png",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Prijepolje",
            "addressCountry": "RS"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "43.373963",
            "longitude": "19.653312"
          },
          "url": "https://lovable.dev/projects/5193fbe6-bfd9-4be9-9dd4-9232e774e49d",
          "telephone": "[broj telefona]",
          "servesCuisine": "Serbian",
          "priceRange": "$$",
          "openingHoursSpecification": [
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              "opens": "10:00",
              "closes": "00:00"
            },
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Saturday", "Sunday"],
              "opens": "10:00",
              "closes": "01:00"
            }
          ],
          "sameAs": [
            "https://www.instagram.com/kafana_prijepolje"
          ]
        })}
      </script>
    </div>
  );
};

export default Index;
