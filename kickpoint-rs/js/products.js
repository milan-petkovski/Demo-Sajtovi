/**
 * Kickpoint.rs - Podaci o proizvodima
 * Napomena: Cene, dostava, rokovi, uslovi zamene i utisci su placeholder podaci.
 * <!-- POTVRDITI SA KLIJENTOM -->
 */

// Konstante za dostavu
// <!-- POTVRDITI SA KLIJENTOM -->
const FREE_SHIPPING_THRESHOLD = 7000; // Iznad 7.000 RSD besplatna dostava
const STANDARD_SHIPPING_FEE = 390;    // Fiksna poštarina za narudžbine ispod praga

const PRODUCTS = [
  {
    id: "model-tn-cyan",
    name: "Model TN Sky Cyan",
    category: "Tuned / Air",
    categorySlug: "air",
    price: 8990,
    oldPrice: 13490, // <!-- POTVRDITI SA KLIJENTOM --> (popust -33%, prati Instagram "30-50% manje cene")
    badge: "Bestseller",
    featured: true,
    rating: 4.9,
    reviewsCount: 42,
    images: [
      "assets/products/model-tn-cyan.svg",
      "assets/products/model-tn-cyan-angle.svg"
    ],
    colors: [
      { id: "sky-cyan", name: "Sky Cyan / Black", hex: "#0284C7" },
      { id: "stealth-black", name: "Stealth Black", hex: "#0F172A" }
    ],
    sizes: [40, 41, 42, 43, 44, 45, 46],
    description: "Inspirisan kultnim siluetama ulične kulture, Model TN Sky Cyan spaja prepoznatljiv talasasti TPU egzoskelet sa energetskim prelivom cijan i ponoćno crne boje. Višekomorni vazdušni đon pruža laganu i dinamičnu amortizaciju pri svakom koraku, dok prozračno mrežasto gornjište obezbeđuje optimalnu ventilaciju tokom celog dana.",
    features: [
      "Elastično i prozračno mrežasto gornjište sa TPU ojačanjima",
      "Višekomorni vazdušni jastuci u peti i prednjem delu đona",
      "Torzioni most na sredini đona za vrhunsku stabilnost",
      "Gumeni đon sa profilom protiv proklizavanja",
      "Udoban penasti uložak koji se prilagođava stopalu"
    ],
    reviews: [
      {
        author: "Stefan M.",
        city: "Beograd",
        rating: 5,
        date: "Pre 2 dana",
        comment: "Patike su uživo još bolje nego na slikama! Stigle za 48h, platio pouzećem. Veličina 43 tačna u milimetar."
      },
      {
        author: "Nikola D.",
        city: "Novi Sad",
        rating: 5,
        date: "Pre 5 dana",
        comment: "Ovo mi je druga narudžbina preko Kickpointa. Za ove pare brutalna udobnost i izgled. Sve preporuke!"
      },
      {
        author: "Miloš K.",
        city: "Niš",
        rating: 5,
        date: "Pre 1 nedelju",
        comment: "Brza isporuka kurirskom službom, sve čisto i uredno spakovano. Prezadovoljan sam."
      }
    ]
  },
  {
    id: "model-tl-black",
    name: "Model TL Stealth Black",
    category: "Tuned / Air",
    categorySlug: "air",
    price: 8490,
    oldPrice: 12990,
    badge: "Popularno",
    featured: true,
    rating: 4.8,
    reviewsCount: 38,
    images: [
      "assets/products/model-tl-black.svg"
    ],
    colors: [
      { id: "stealth-black", name: "All Black", hex: "#0F172A" }
    ],
    sizes: [41, 42, 43, 44, 45, 46],
    description: "Total blackout estetika sa reflektujućim bočnim talasima pune dužine. Model TL Stealth Black dizajniran je za sve koji vole diskretan, ali moćan futuristički izgled. Opremljen je vazdušnim jastukom koji se prostire celom dužinom đona za besprekornu amortizaciju i celodnevnu udobnost.",
    features: [
      "Mat crno sintetičko gornjište sa reflektujućim akcentima",
      "Vazdušni jastuk punog raspona za vrhunsku mekoću koračanja",
      "Ojačana kapica na prstima za dugotrajnost",
      "Plišana unutrašnja postava oko zgloba",
      "Pouzdan grip na svim gradskim podlogama"
    ],
    reviews: [
      {
        author: "Vukasin T.",
        city: "Kragujevac",
        rating: 5,
        date: "Pre 3 dana",
        comment: "Crna boja ide uz apsolutno sve. Odličan đon, ne bole noge ni posle 10km pešačenja."
      },
      {
        author: "Luka B.",
        city: "Subotica",
        rating: 5,
        date: "Pre 1 nedelju",
        comment: "Svaka čast momcima, poručio u sredu popodne, paket bio kod mene u petak ujutru."
      }
    ]
  },
  {
    id: "model-force-white",
    name: "Model Court Classic All-White",
    category: "Lifestyle / Court",
    categorySlug: "court",
    price: 6990,
    oldPrice: 9990,
    badge: "Klasik",
    featured: true,
    rating: 5.0,
    reviewsCount: 64,
    images: [
      "assets/products/model-force-white.svg",
      "assets/products/model-force-white-angle.svg"
    ],
    colors: [
      { id: "triple-white", name: "Triple White", hex: "#FFFFFF" }
    ],
    sizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46],
    description: "Bezvremenski beli klasik koji nikada ne izlazi iz mode. Čiste, oštre linije od kvalitetne glatke eko-kože sa prošivenim čvrstim gumenim đonom. Model koji se podjednako lako kombinuje uz trenerku, farmerke ili urbani streetwear autfit.",
    features: [
      "Glatko gornjište od izdržljive i lako održive eko-kože",
      "Perforirana prednja zona za prirodnu ventilaciju",
      "Prošiven masivni cupsole đon sa unutrašnjim Air mehanizmom",
      "Metalna pločica na pertlama za autentičan detalj",
      "Ulošci koji se mogu vaditi i provetravati"
    ],
    reviews: [
      {
        author: "Jelena P.",
        city: "Beograd",
        rating: 5,
        date: "Pre 1 dan",
        comment: "Naručila broj 38 i savršeno mi odgovara! Prelepe, čisto bele patike, stigle u kutiji bez oštećenja."
      },
      {
        author: "Aleksa M.",
        city: "Pančevo",
        rating: 5,
        date: "Pre 4 dana",
        comment: "Osnovni model koji svako mora da ima. Cena za ovaj nivo izrade je bez premca."
      }
    ]
  },
  {
    id: "model-tl-white-orange",
    name: "Model TL White Solar Orange",
    category: "Tuned / Air",
    categorySlug: "air",
    price: 8490,
    oldPrice: 12990,
    badge: "Novo",
    featured: true,
    rating: 4.8,
    reviewsCount: 29,
    images: [
      "assets/products/model-tl-white-orange.svg"
    ],
    colors: [
      { id: "white-orange", name: "White / Solar Orange", hex: "#FF6B00" }
    ],
    sizes: [41, 42, 43, 44, 45, 46],
    description: "Kontrastna kombinacija snežno bele baze sa vatrenim narandžastim i crnim talasastim prelivima. Idealan model za one koji žele da unesu energiju i dinamiku u svoj stil, bez kompromisa po pitanju udobnosti.",
    features: [
      "Kombinacija prozračne mrežice i sintetičkih preklopa",
      "Upečatljive narandžaste akcentne linije i brending",
      "Proziran vazdušni đon sa unutrašnjim narandžastim komorama",
      "Fleksibilni žlebovi na gazištu za prirodan pokret stopala",
      "Meka antibakterijska unutrašnja postava"
    ],
    reviews: [
      {
        author: "Filip S.",
        city: "Čačak",
        rating: 5,
        date: "Pre 6 dana",
        comment: "Uživo izgledaju brutalno. Narandžasti detalji sijaju, a đon je jako udoban za duge šetnje."
      }
    ]
  },
  {
    id: "model-scorpion-black",
    name: "Model Scorpion Phantom Black",
    category: "Trčanje / Air",
    categorySlug: "running",
    price: 9490,
    oldPrice: 14490,
    badge: "Limitirano",
    featured: true,
    rating: 4.9,
    reviewsCount: 31,
    images: [
      "assets/products/model-scorpion-black.svg"
    ],
    colors: [
      { id: "phantom-black", name: "Phantom Black", hex: "#020617" }
    ],
    sizes: [41, 42, 43, 44, 45, 46],
    description: "Revolucionarni inženjering udobnosti sa masivnim nezavisnim vazdušnim kapsulama. Pleteno Flyknit gornjište obavija stopalo poput udobne čarape, dok modularni 'Scorpion' đon pruža osećaj hodanja po oblacima.",
    features: [
      "Elastično pleteno gornjište koje savršeno prianja uz stopalo",
      "Masivne segmentirane vazdušne komore sa maksimalnim povratom energije",
      "Ultra-lagani materijali za celodnevno nošenje bez zamora",
      "Futuristički dizajn koji privlači poglede",
      "Ojačana podrška za petu i ris stopala"
    ],
    reviews: [
      {
        author: "David R.",
        city: "Zrenjanin",
        rating: 5,
        date: "Pre 4 dana",
        comment: "Osećaj na nozi je neverovatan, bukvalno lebdiš. Nisam verovao dok ih nisam obuo. Svaka čast!"
      }
    ]
  },
  {
    id: "model-01-panda",
    name: "Model 01 Retro Low Panda",
    category: "Lifestyle / Court",
    categorySlug: "court",
    price: 7990,
    oldPrice: 11990,
    badge: "Bestseller",
    featured: true,
    rating: 4.9,
    reviewsCount: 57,
    images: [
      "assets/products/model-01.svg",
      "assets/products/model-01-angle.svg"
    ],
    colors: [
      { id: "black-white", name: "Crno-bela (Panda)", hex: "#111111" }
    ],
    sizes: [38, 39, 40, 41, 42, 43, 44, 45, 46],
    description: "Najtraženiji dvobojni retro model decenije. Čist kontrast crnih kožnih panela preko bele osnove čini ovaj model apsolutnim favoritom ulične mode. Nizak profil omogućava punu slobodu pokreta zgloba.",
    features: [
      "Premium teksturirana eko-koža otporna na habanje",
      "Kontrastni crno-beli paneli sa duplim prošivenim ivicama",
      "Perforacije na toebox delu za disanje stopala",
      "Vintidž krem/beli đon sa gaznim slojem od prirodne gume",
      "Klasične pamučne bele pertle sa rezervnim setom"
    ],
    reviews: [
      {
        author: "Marko J.",
        city: "Beograd",
        rating: 5,
        date: "Pre 3 dana",
        comment: "Klasik bez greške. Nosim ih svakodnevno već 2 nedelje, ne prave se nikakvi nabori, preudobne."
      },
      {
        author: "Tijana V.",
        city: "Kraljevo",
        rating: 5,
        date: "Pre 1 nedelju",
        comment: "Uzela dečku za rođendan, oduševio se. Zamena veličine je bila gotova za dan jer sam promašila broj!"
      }
    ]
  },
  {
    id: "model-02-slate",
    name: "Model 02 Slate Minimal",
    category: "Lifestyle / Court",
    categorySlug: "court",
    price: 7490,
    oldPrice: 10990,
    badge: "Novo",
    featured: true,
    rating: 4.7,
    reviewsCount: 22,
    images: [
      "assets/products/model-02.svg"
    ],
    colors: [
      { id: "slate-gray", name: "Slate Gray / Off-White", hex: "#6B7280" }
    ],
    sizes: [39, 40, 41, 42, 43, 44, 45],
    description: "Suptilni sivi tonovi škriljca u kombinaciji sa blago kremastim off-white detaljima. Model 02 Slate donosi skandinavski minimalistički ton koji unosi eleganciju u svakodnevni sportski izgled.",
    features: [
      "Kombinacija brušene i glatke veganske kože",
      "Prigušeni neutralni tonovi koji se slažu sa svim bojama odeće",
      "Meki penasti uložak sa podrškom za svod stopala",
      "Izdržljiv gumeni đon u boji škriljca",
      "Nizak rez za maksimalnu udobnost i slobodu pokreta"
    ],
    reviews: [
      {
        author: "Ognjen D.",
        city: "Leskovac",
        rating: 5,
        date: "Pre 5 dana",
        comment: "Uživo siva boja izgleda još lepše. Odličan kvalitet materijala i izrade."
      }
    ]
  },
  {
    id: "model-retro-mocha",
    name: "Model High Retro Mocha",
    category: "Retro / Duboke",
    categorySlug: "retro",
    price: 8990,
    oldPrice: 13990,
    badge: "Popularno",
    featured: true,
    rating: 4.9,
    reviewsCount: 45,
    images: [
      "assets/products/model-retro-mocha.svg"
    ],
    colors: [
      { id: "mocha-sail", name: "Mocha Brown / Sail", hex: "#6B4F3A" }
    ],
    sizes: [40, 41, 42, 43, 44, 45, 46],
    description: "Duboka silueta sa bogatim braon nubuk panelima i 'Sail' vintidž krem osnovom. Duboki kroj štiti i stabilizuje skočni zglob, dok retro košarkaški dizajn predstavlja statusni simbol ulične mode.",
    features: [
      "Duboki profil sa dodatnim tapacirungom oko zgloba",
      "Visokokvalitetni nubuk paneli u boji tople moke",
      "Vintidž 'Sail' krem đon sa skrivenom vazdušnom jedinicom",
      "Reljefni kružni retro amblem na bočnoj strani kragne",
      "Komplet crnih i bež pamučnih pertli u pakovanju"
    ],
    reviews: [
      {
        author: "Nemanja K.",
        city: "Valjevo",
        rating: 5,
        date: "Pre 2 dana",
        comment: "Duboke patike koje stoje perfektno uz široke pantalone. Koža je meka, nema žuljanja."
      },
      {
        author: "Bojan M.",
        city: "Beograd",
        rating: 5,
        date: "Pre 1 nedelju",
        comment: "Plaćanje pouzećem prošlo bez problema, stiglo u roku. Definitivno naručujem opet."
      }
    ]
  },
  {
    id: "model-03-cream",
    name: "Model 03 Triple Sail Minimalist",
    category: "Lifestyle / Court",
    categorySlug: "court",
    price: 7490,
    oldPrice: 10490,
    badge: "Preporuka",
    featured: false,
    rating: 4.8,
    reviewsCount: 19,
    images: [
      "assets/products/model-03.svg"
    ],
    colors: [
      { id: "triple-sail", name: "Triple Sail / Krem", hex: "#EFE8DC" }
    ],
    sizes: [38, 39, 40, 41, 42, 43, 44, 45],
    description: "Monomatska estetika u nežnim krem i vanila tonovima. Idealan model za one koji žele čistoću bele patike, ali sa toplijim, luksuznijim prizvukom prirodnih nijansi.",
    features: [
      "Usklađena krem kožna konstrukcija sa suptilnim šavovima",
      "Đon od mešavine prirodne gume u blago karamel nijansi",
      "Podstavljen jezik koji sprečava pritisak pertli na ris",
      "Lagan i fleksibilan đon za celodnevno kretanje",
      "Vodootporni premaz za lakše brisanje vlažnom krpom"
    ],
    reviews: [
      {
        author: "Milica L.",
        city: "Šabac",
        rating: 5,
        date: "Pre 4 dana",
        comment: "Patike su prelepe! Boja je baš onako topla krem, idu uz svaku kombinaciju."
      }
    ]
  }
];

// Pomoćne funkcije za rad sa proizvodima
function getProductById(id) {
  if (!id) return null;
  return PRODUCTS.find(p => p.id === id) || null;
}

function getFeaturedProducts() {
  return PRODUCTS.filter(p => p.featured);
}

function formatRSD(amount) {
  if (typeof amount !== 'number') return '0 RSD';
  return amount.toLocaleString('sr-RS') + ' RSD';
}
