/**
 * KONFIGURACIJA ROĐENDANSKOG SAJTA (config.js)
 * -------------------------------------------------------------
 * Ovde se podešavaju svi parametri za Selenu i Luku:
 * - Aktivni profil ('selena' ili 'luka')
 * - Ime, godine, poruke, teme, boje, slike i audio
 * - Fino podešavanje detekcije duvanja u mikrofon
 * 
 * Napomena: Profil se može promeniti i dinamički preko URL parametra:
 * Primer: ?user=selena ili ?user=luka
 */

export const CONFIG = {
  // Podrazumevani aktivni profil ('selena' ili 'luka')
  activeProfile: 'luka',

  // Fino podešavanje Web Audio API detekcije duvanja
  audioSettings: {
    // Osnovni prag intenziteta duvanja (zahteva snažan i stabilan dah)
    // Manja vrednost = osetljiviji mikrofon (lakše gašenje)
    // Veća vrednost = potreban znatno jači i duži dah (teže gašenje)
    blowThreshold: 0.50,

    // Gornja granica niskih frekvencija za detekciju vetra/duvanja (Hz)
    // Duvanje u mikrofon stvara snažan vazdušni pritisak u rasponu 20-500 Hz
    lowFreqMaxHz: 500,

    // Minimalno vreme (u milisekundama) tokom kog intenzitet mora biti iznad praga
    minBlowDurationMs: 340,

    // Trajanje kalibracije šuma prostorije pri startu (ms)
    calibrationDurationMs: 1200,

    // Multiplikator osetljivosti (0.88 = traži jak, nameran dah za postizanje 100%)
    sensitivityMultiplier: 0.88,

    // Faktor ublažavanja (Exponential Moving Average, 0.1 do 0.3)
    smoothingAlpha: 0.18,

    // Pozadinska melodija: true za automatsku Web Audio sintezu melodije
    enableSynthMusic: true
  },

  // Podešavanje rasporeda svećica
  candleSettings: {
    // 'exact' = tačan broj svećica prema godinama slavljenika
    // 'compact' = najviše 12 svećica ako je broj godina veliki
    mode: 'exact',
    maxCandlesDisplay: 30
  },

  // Profili sa specifičnim podacima za Selenu i Luku
  profiles: {
    selena: {
      id: 'selena',
      name: 'Selena',
      age: 24,
      tagline: 'Za najposebniju tutzovu ženu',
      heroTitle: 'Srećan 24. rođendan, Selena!',
      heroSubtitle: 'Neka ti ova godina donese najlepše snove, bezbroj osmeha i nezaboravne avanture.',
      wishTitle: 'Zaželi najlepšu želju',
      wishInstruction: 'Zatvori oči, zamisli želju i snažno duni u mikrofon!',
      fallbackInstruction: 'Ili jednostavno dodirni svećice prstom da ih ugasiš.',

      // Topla, elegantna tema: roze, šampanjac, zlato, tamna noćna šljiva
      theme: {
        id: 'rose-gold',
        primary: '#e0a96d',        // Toplo šampanjac zlato
        primaryGlow: 'rgba(224, 169, 109, 0.45)',
        secondary: '#f7c5cc',      // Nežna puder roze
        secondaryGlow: 'rgba(247, 197, 204, 0.4)',
        accent: '#d47a88',         // Duboka ruža
        bgDark: '#120d15',         // Ponoćna tamna šljiva
        bgSurface: '#1f1524',      // Površinska tamna podloga
        bgCard: 'rgba(35, 23, 41, 0.75)',
        textMain: '#ffffff',
        textMuted: '#d9c8d5',
        cakeIcing: '#fff4f6',      // Puder bela glazura
        cakeFrosting: '#f3cad0',   // Roze preliv
        cakeBase: '#301826',       // Čokoladno-šljiva biskvit
        candleWax: '#e8b4b8',      // Pastelno roze svećice
        candleStripe: '#d4af37',   // Zlatna pruga na svećicama
        flameCore: '#ffffff',
        flameBody: '#ffcf40',
        flameHalo: 'rgba(255, 170, 60, 0.65)'
      },

      celebration: {
        title: 'Srećan 24. rođendan!',
        subtitle: 'Tvoja želja je poletela ka zvezdama...',
        messageTitle: 'Pismo slavljenici',
        personalMessage: `Draga Selena,

Danas slavimo tebe i sve ono što te čini posebnom – tvoju energiju, tvoj osmeh i tvoju toplinu koja obasjava svaku prostoriju u koju uđeš.

Neka ti ova 24. godina donese neverovatne uspehe, velika putovanja, iskrenu ljubav i trenutke koji oduzimaju dah.

Hvala ti što si uvek inspiracija svima nama!`,
        signature: 'S ljubavlju, Milan (Menadžer tutz ganga)'
      },

      photos: [
        {
          url: 'assets/selena-1.jpg',
          caption: 'Najlepši osmeh i slavljenički sjaj'
        },
        {
          url: 'assets/selena-2.jpg',
          caption: 'Trenuci koji ostaju zauvek u sećanju'
        }
      ]
    },

    luka: {
      id: 'luka',
      name: 'Luka',
      age: 25,
      // Glitch podaci (Deda 67 godina unutar-ekipna fora)
      glitch: {
        enabled: true,
        altName: 'Deda',
        altAge: 67,
        altTagline: '67 godina staračkog staža, reume i mudrosti',
        altHeroTitle: 'Srećan 67. rođendan, Deda!',
        altCelebrationTitle: 'Srećan 67. rođendan, Deda!',
        altCelebrationSubtitle: '67 godina! Svećice su ugašene, popij lekove za pritisak...',
        altMessageTitle: 'Pismo za Dedu',
        altPersonalMessage: `Deda Luka,

Čestitamo ti ulazak u 67. godinu! Penzija je ozbiljan jubilej, a starački dani tek počinju.

Želimo ti čelično zdravlje, reumu pod kontrolom, stabilan pritisak, neiscrpnu zalihu čajeva i slobodu da odmaraš u banji tačno onako kako zamisliš.

Neka svaka sledeća partija šaha u parku bude još veća od prethodne!`,
        altCounterSuffix: ' (penzija!)'
      },
      tagline: 'Četvrt veka dominacije i uspeha',
      heroTitle: 'Srećan 25. rođendan, Luka!',
      heroSubtitle: 'Nova prekretnica, novi veliki ciljevi i još moćnije pobede.',
      wishTitle: 'Fokusiraj se i zaželi želju',
      wishInstruction: 'Dubok udah, usmeri energiju i snažno duni u mikrofon!',
      fallbackInstruction: 'Ili prevuci prstom preko svećica da ih ugasiš.',

      // Tamnija, moderna, high-tech tema: električno plava, safir, grafit i neon cijan
      theme: {
        id: 'midnight-blue',
        primary: '#38bdf8',        // Električna nebesko plava
        primaryGlow: 'rgba(56, 189, 248, 0.5)',
        secondary: '#6366f1',      // Kraljevski indigo safir
        secondaryGlow: 'rgba(99, 102, 241, 0.4)',
        accent: '#00f2fe',         // Neon cijan
        bgDark: '#070b14',         // Ponoćni grafit
        bgSurface: '#0f172a',      // Duboki škriljac
        bgCard: 'rgba(15, 23, 42, 0.8)',
        textMain: '#ffffff',
        textMuted: '#94a3b8',
        cakeIcing: '#1e293b',      // Grafitno-plava glazura
        cakeFrosting: '#38bdf8',   // Neon plavi drip
        cakeBase: '#0b1120',       // Tamna baza torte
        candleWax: '#1e3a8a',      // Tamnoplave svećice
        candleStripe: '#38bdf8',   // Neon cijan pruga
        flameCore: '#ffffff',
        flameBody: '#67e8f9',
        flameHalo: 'rgba(56, 189, 248, 0.7)'
      },

      celebration: {
        title: 'Srećan 25. rođendan, majstore!',
        subtitle: 'Četvrt veka! Svećice su ugašene, planovi su pokrenuti...',
        messageTitle: 'Poruka za Luku',
        personalMessage: `Brate Luka,

Čestitamo ti ulazak u 25. godinu! Četvrt veka je ozbiljan jubilej, a najbolje stvari tek počinju.

Želimo ti čelično zdravlje, bistru glavu za najveće projekte, neiscrpnu energiju i slobodu da stvaraš tačno onako kako zamisliš.

Neka svaka sledeća pobeda bude još veća od prethodne!`,
        signature: 'S ljubavlju, Milan (Menadžer tutz ganga)'
      },

      photos: [
        {
          url: 'assets/luka-1.jpg',
          caption: 'Vizija, fokus i noćni grad'
        },
        {
          url: 'assets/luka-2.jpg',
          caption: 'Slavimo 25. rođendan u punom stilu'
        }
      ]
    }
  }
};
