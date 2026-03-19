const fallbackImage = null

export const guidePagesConfig = {
  terme: {
    slug: "terme",
    label: "SafeStep Terme",
    sectionName: "terme",
    backLabel: "Torna alle terme",
    backPath: "/terme",

    theme: {
      pageBg: "#f3f9fa",
      heroBg: "linear-gradient(180deg, #e9f7f8 0%, #f3f9fa 100%)",
      badgeBg: "rgba(55, 194, 191, 0.12)",
      badgeText: "#27a7b1",
      title: "#243853",
      text: "#657991",
      primaryGradient: "linear-gradient(90deg, #2ab5d0 0%, #31c98b 100%)",
      secondaryBg: "#ffffff",
      secondaryText: "#4d627c",
      secondaryBorder: "#d8e7ec",
      iconBg: "linear-gradient(135deg, #dff5f7, #eafaf2)",
      iconColor: "#28b4be",
      highlightBg: "linear-gradient(135deg, #e7f8f5, #edf8ff)",
      checkIcon: "#2cc59a",
      cardBgSoft: "#f6fbfc",
      noteBg: "linear-gradient(135deg, #eaf8f6, #edf8ff)",
      questionBg: "linear-gradient(135deg, #eefaf8, #f1f8fd)",
      questionIcon: "#29b8c2",
    },

    guida: {
      heroTitle: "Guida all'accessibilità nelle terme",
      heroText:
        "Una panoramica chiara delle caratteristiche più importanti da controllare prima di prenotare o visitare una struttura termale.",
      introTitle: "Perché questa guida è utile",
      introParagraphs: [
        "Non tutte le terme accessibili lo sono allo stesso modo. In alcuni casi è facile entrare ma difficile usare spogliatoi o piscine. In altri casi il bagno è presente ma il percorso interno è scomodo.",
        "Questa guida serve proprio a capire cosa chiedere, cosa osservare e quali dettagli non sottovalutare prima della visita.",
      ],
      imageAlt: "Area termale accessibile",
      image: fallbackImage,
      checklistTitle: "Cosa controllare prima di scegliere una struttura",
      checklistText:
        "Questi sono gli elementi più importanti da verificare in anticipo.",
      checklist: [
        "Ingresso a livello strada oppure con rampa stabile",
        "Parcheggio riservato o area di sosta vicina all’ingresso",
        "Spogliatoi accessibili con spazio di manovra",
        "Bagni accessibili realmente utilizzabili",
        "Piscine o aree termali con accesso facilitato",
        "Ascensore se la struttura ha più piani",
        "Personale disponibile ad assistere in caso di necessità",
        "Camminamenti ampi e senza ostacoli",
      ],
      tipsTitle: "Consigli pratici",
      tipsText: "Piccole verifiche che possono fare una grande differenza.",
      tips: [
        {
          title: "Chiama prima della visita",
          text: "Una telefonata può evitarti brutte sorprese. Chiedi se l’ingresso è davvero senza gradini, se i bagni accessibili sono disponibili e se esistono sollevatori o sedie da piscina.",
          icon: "bi-telephone-fill",
        },
        {
          title: "Controlla il parcheggio",
          text: "Verifica se ci sono posti auto riservati, quanto sono vicini all’ingresso e se il percorso dal parcheggio alla reception è semplice e senza dislivelli.",
          icon: "bi-p-square-fill",
        },
        {
          title: "Chiedi foto reali",
          text: "Quando possibile, chiedi foto di ingresso, spogliatoi, piscina e bagni. Le foto aiutano molto più di una descrizione generica.",
          icon: "bi-image-fill",
        },
        {
          title: "Valuta gli spazi interni",
          text: "Corsie strette, porte pesanti o pavimenti scivolosi possono rendere difficile la visita anche in una struttura dichiarata accessibile.",
          icon: "bi-sign-turn-right-fill",
        },
      ],
      highlightTitle: "Un buon segnale da cercare",
      highlightText:
        "Le strutture più attente all’accessibilità di solito forniscono informazioni concrete: misure, foto, percorsi, presenza di rampe, bagno accessibile, ascensore, personale di supporto e modalità di accesso alle vasche.",
    },

    consigli: {
      heroLabel: "Pianifica meglio la visita",
      heroTitle: "Consigli per organizzare una visita alle terme",
      heroText:
        "Una guida pratica per preparare la giornata, ridurre gli imprevisti e sapere quali domande fare prima di arrivare in struttura.",
      firstCardTitle: "Prima di partire",
      firstCardItems: [
        "Controlla gli orari e i giorni meno affollati",
        "Verifica se serve prenotazione per aree benessere o trattamenti",
        "Chiedi se ci sono spazi di attesa accessibili",
        "Informati su eventuali accompagnatori ammessi",
      ],
      secondCardTitle: "Durante la visita",
      secondCardItems: [
        "Segnala subito eventuali ostacoli al personale",
        "Valuta la sicurezza dei pavimenti bagnati",
        "Controlla se gli spogliatoi hanno panche comode e spazio sufficiente",
        "Preferisci percorsi semplici e vicini ai servizi essenziali",
      ],
      questionsTitle: "Domande utili da fare prima di prenotare",
      questionsText:
        "Molte strutture usano descrizioni generiche come “accessibile” o “adatta a tutti”, ma senza dettagli concreti. Fare alcune domande precise ti aiuta a capire la situazione reale.",
      questions: [
        "L’ingresso principale è senza gradini?",
        "I bagni accessibili sono aperti e utilizzabili?",
        "C’è un ascensore per raggiungere tutte le aree?",
        "Esistono ausili per l’accesso alle vasche?",
        "Il personale è disponibile per assistenza?",
        "Ci sono camere o spazi relax accessibili?",
      ],
      noteTitle: "Nota importante",
      noteText:
        "Anche una struttura ben organizzata può avere differenze tra una zona e l’altra. Per questo conviene sempre chiedere informazioni su reception, spogliatoi, bagni, percorsi interni, ascensore e accesso alle vasche, non solo sull’ingresso principale.",
    },
  },

  hotel: {
    slug: "hotel",
    label: "SafeStep Hotel",
    sectionName: "hotel",
    backLabel: "Torna agli hotel",
    backPath: "/hotel",

    theme: {
      pageBg: "#f4f8fc",
      heroBg: "linear-gradient(180deg, #eaf2fb 0%, #f4f8fc 100%)",
      badgeBg: "rgba(78, 142, 216, 0.12)",
      badgeText: "#4e8ed8",
      title: "#223b58",
      text: "#68809a",
      primaryGradient: "linear-gradient(90deg, #5a94de 0%, #3779cf 100%)",
      secondaryBg: "#ffffff",
      secondaryText: "#4d627c",
      secondaryBorder: "#d9e6f3",
      iconBg: "linear-gradient(135deg, #e7f0fc, #eef5ff)",
      iconColor: "#4e8ed8",
      highlightBg: "linear-gradient(135deg, #edf4fd, #e8f1ff)",
      checkIcon: "#4e8ed8",
      cardBgSoft: "#f5f9ff",
      noteBg: "linear-gradient(135deg, #edf4fd, #f4f8ff)",
      questionBg: "linear-gradient(135deg, #eef4ff, #f7faff)",
      questionIcon: "#4e8ed8",
    },

    guida: {
      heroTitle: "Guida all'accessibilità negli hotel",
      heroText:
        "Scopri quali servizi e dettagli controllare prima di prenotare un soggiorno davvero comodo e accessibile.",
      introTitle: "Perché questa guida è utile",
      introParagraphs: [
        "Un hotel può sembrare accessibile sulla carta, ma avere camere strette, bagni scomodi o percorsi difficili tra reception, ascensore e sala colazione.",
        "Questa guida ti aiuta a capire quali servizi contano davvero e quali domande fare prima di confermare la prenotazione.",
      ],
      imageAlt: "Hotel accessibile",
      image: fallbackImage,
      checklistTitle: "Cosa controllare prima di prenotare",
      checklistText:
        "Meglio verificare tutto in anticipo, soprattutto se il soggiorno dura più di una notte.",
      checklist: [
        "Ingresso senza gradini oppure con rampa stabile",
        "Ascensore abbastanza grande per carrozzina o ausili",
        "Camera accessibile con spazio di manovra",
        "Bagno con doccia accessibile e maniglioni",
        "Letto raggiungibile facilmente da entrambi i lati",
        "Parcheggio vicino o posto riservato",
        "Sala colazione e spazi comuni accessibili",
        "Personale disponibile in caso di necessità",
      ],
      tipsTitle: "Consigli pratici",
      tipsText: "Piccoli controlli utili prima di scegliere dove dormire.",
      tips: [
        {
          title: "Chiedi misure reali",
          text: "Non fermarti alla dicitura “camera accessibile”. Chiedi larghezza porta, spazio accanto al letto e tipo di bagno presente.",
          icon: "bi-rulers",
        },
        {
          title: "Verifica bagno e doccia",
          text: "Capisci se la doccia è a filo pavimento, se ci sono maniglioni e se il wc è raggiungibile comodamente.",
          icon: "bi-droplet-half",
        },
        {
          title: "Controlla gli spazi comuni",
          text: "Anche reception, ascensore, corridoi e sala colazione devono essere davvero facili da usare, non solo la camera.",
          icon: "bi-building-check",
        },
        {
          title: "Chiedi foto aggiornate",
          text: "Le immagini di camera, bagno e ingresso aiutano molto più delle descrizioni generiche del sito.",
          icon: "bi-image-fill",
        },
      ],
      highlightTitle: "Un buon segnale da cercare",
      highlightText:
        "Gli hotel più attenti spiegano chiaramente tipo di camera accessibile, bagno, percorsi interni, ascensore, parcheggio e assistenza disponibile.",
    },

    consigli: {
      heroLabel: "Organizza meglio il soggiorno",
      heroTitle: "Consigli per prenotare un hotel accessibile",
      heroText:
        "Una checklist semplice per evitare sorprese e scegliere un soggiorno più comodo, sicuro e adatto alle tue esigenze.",
      firstCardTitle: "Prima di prenotare",
      firstCardItems: [
        "Controlla posizione, parcheggio e distanza dall’ingresso",
        "Verifica che la camera accessibile sia davvero disponibile",
        "Chiedi dettagli precisi sul bagno e sulla doccia",
        "Informati sugli ascensori e sugli spazi comuni",
      ],
      secondCardTitle: "Durante il soggiorno",
      secondCardItems: [
        "Segnala subito eventuali problemi alla reception",
        "Verifica percorsi verso sala colazione e aree comuni",
        "Controlla manovrabilità in camera e bagno",
        "Chiedi supporto se servono soluzioni alternative",
      ],
      questionsTitle: "Domande utili da fare prima di confermare",
      questionsText:
        "Molti hotel indicano una camera come accessibile, ma spesso mancano dettagli importanti. Fare domande precise è il modo migliore per evitare problemi.",
      questions: [
        "La camera accessibile ha spazio sufficiente per muoversi?",
        "La doccia è a filo pavimento?",
        "Il bagno ha maniglioni e wc comodo da raggiungere?",
        "L’ascensore arriva a tutti i piani utili?",
        "La sala colazione è facilmente accessibile?",
        "Ci sono parcheggi vicini o riservati?",
      ],
      noteTitle: "Nota importante",
      noteText:
        "In un hotel non conta solo la camera: ingresso, reception, ascensore, corridoi, bagno, sala colazione e spazi comuni devono essere tutti valutati insieme.",
    },
  },

  ristoranti: {
    slug: "ristoranti",
    label: "SafeStep Ristoranti",
    sectionName: "ristoranti",
    backLabel: "Torna ai ristoranti",
    backPath: "/ristoranti",

    theme: {
      pageBg: "#fbf4ef",
      heroBg: "linear-gradient(180deg, #f8eee7 0%, #fbf4ef 100%)",
      badgeBg: "rgba(226, 112, 67, 0.12)",
      badgeText: "#d66f47",
      title: "#4a2d20",
      text: "#7a6258",
      primaryGradient: "linear-gradient(90deg, #ee8a5f 0%, #df6c3e 100%)",
      secondaryBg: "#ffffff",
      secondaryText: "#7a6258",
      secondaryBorder: "#eed9cf",
      iconBg: "linear-gradient(135deg, #fff1e8, #fdf5ef)",
      iconColor: "#df6c3e",
      highlightBg: "linear-gradient(135deg, #fff3ea, #fbefe8)",
      checkIcon: "#df6c3e",
      cardBgSoft: "#fff8f3",
      noteBg: "linear-gradient(135deg, #fff3ea, #fbefe8)",
      questionBg: "linear-gradient(135deg, #fff4ec, #fdf6f1)",
      questionIcon: "#df6c3e",
    },

    guida: {
      heroTitle: "Guida all'accessibilità nei ristoranti",
      heroText:
        "Scopri cosa controllare prima di prenotare e come trovare locali più comodi, inclusivi e facili da raggiungere.",
      introTitle: "Perché questa guida è utile",
      introParagraphs: [
        "Un ristorante può essere piacevole ma scomodo da raggiungere o difficile da usare una volta dentro, soprattutto se ingresso, tavoli e bagno non sono ben organizzati.",
        "Questa guida ti aiuta a valutare meglio il locale prima della prenotazione e a capire quali dettagli fanno davvero la differenza.",
      ],
      imageAlt: "Ristorante accessibile",
      image: fallbackImage,
      checklistTitle: "Cosa controllare prima di scegliere un locale",
      checklistText:
        "Alcuni dettagli sembrano piccoli, ma possono cambiare del tutto l’esperienza.",
      checklist: [
        "Ingresso senza gradini o con rampa sicura",
        "Spazio sufficiente tra i tavoli",
        "Tavoli comodi da raggiungere e utilizzare",
        "Bagno accessibile realmente fruibile",
        "Parcheggio vicino o percorso semplice dall’esterno",
        "Porta d’ingresso facile da aprire",
        "Assenza di ostacoli nei passaggi principali",
        "Personale disponibile a gestire esigenze specifiche",
      ],
      tipsTitle: "Consigli pratici",
      tipsText:
        "Qualche verifica semplice può evitarti una prenotazione sbagliata.",
      tips: [
        {
          title: "Prenota spiegando le esigenze",
          text: "Meglio avvisare prima il locale, così potrà riservarti un tavolo più comodo e vicino all’ingresso o al bagno.",
          icon: "bi-telephone-fill",
        },
        {
          title: "Chiedi del bagno",
          text: "La presenza del bagno accessibile va confermata: non basta che esista, deve essere aperto e davvero utilizzabile.",
          icon: "bi-door-open-fill",
        },
        {
          title: "Valuta l’ingresso",
          text: "Un solo gradino o una porta molto pesante possono già diventare un problema concreto.",
          icon: "bi-signpost-split-fill",
        },
        {
          title: "Controlla tavoli e spazi",
          text: "Sala stretta, tavoli troppo vicini o passaggi occupati possono rendere il locale scomodo anche se ben recensito.",
          icon: "bi-grid-3x3-gap-fill",
        },
      ],
      highlightTitle: "Un buon segnale da cercare",
      highlightText:
        "I locali più attenti descrivono chiaramente ingresso, bagno, spazi tra i tavoli, parcheggio e disponibilità del personale.",
    },

    consigli: {
      heroLabel: "Scegli meglio dove mangiare",
      heroTitle: "Consigli per prenotare un ristorante accessibile",
      heroText:
        "Una mini guida pratica per controllare i dettagli giusti prima di prenotare e vivere il locale con più tranquillità.",
      firstCardTitle: "Prima di prenotare",
      firstCardItems: [
        "Controlla ingresso, rampa e presenza di gradini",
        "Chiedi se il bagno accessibile è disponibile",
        "Verifica spazio tra i tavoli e facilità di movimento",
        "Informati su parcheggio e percorso dall’esterno",
      ],
      secondCardTitle: "Durante la visita",
      secondCardItems: [
        "Chiedi subito un tavolo più comodo se necessario",
        "Controlla che i passaggi restino liberi",
        "Segnala eventuali ostacoli al personale",
        "Valuta comfort di tavolo, bagno e uscita",
      ],
      questionsTitle: "Domande utili da fare prima di prenotare",
      questionsText:
        "Le descrizioni online spesso non bastano. Una telefonata di due minuti può dirti molto di più della scheda del locale.",
      questions: [
        "L’ingresso è senza gradini?",
        "C’è spazio comodo tra i tavoli?",
        "Il bagno accessibile è davvero utilizzabile?",
        "Il parcheggio è vicino al locale?",
        "La porta d’ingresso è facile da aprire?",
        "Potete riservare un tavolo più accessibile?",
      ],
      noteTitle: "Nota importante",
      noteText:
        "Anche in un buon ristorante possono esserci criticità diverse tra ingresso, sala, bagno e spazi esterni. Meglio verificare tutto insieme e non solo un singolo aspetto.",
    },
  },

  parchi: {
    slug: "parchi",
    label: "SafeStep Parchi",
    sectionName: "parchi",
    backLabel: "Torna ai parchi",
    backPath: "/parchi",

    theme: {
      pageBg: "#f4faf5",
      heroBg: "linear-gradient(180deg, #edf7ee 0%, #f4faf5 100%)",
      badgeBg: "rgba(93, 187, 99, 0.14)",
      badgeText: "#43a857",
      title: "#264b31",
      text: "#68806d",
      primaryGradient: "linear-gradient(90deg, #63bf69 0%, #40ad5e 100%)",
      secondaryBg: "#ffffff",
      secondaryText: "#5d7362",
      secondaryBorder: "#dceedd",
      iconBg: "linear-gradient(135deg, #edf8ef, #f5fbf6)",
      iconColor: "#43a857",
      highlightBg: "linear-gradient(135deg, #eef8ef, #dbf0df)",
      checkIcon: "#39a85d",
      cardBgSoft: "#f6fbf7",
      noteBg: "linear-gradient(135deg, #eef8ef, #edf7f0)",
      questionBg: "linear-gradient(135deg, #eef8ef, #f4fbf5)",
      questionIcon: "#43a857",
    },

    guida: {
      heroTitle: "Guida all'accessibilità nei parchi",
      heroText:
        "Scopri i percorsi, gli ingressi e i servizi più utili per vivere una giornata all'aperto senza ostacoli.",
      introTitle: "Perché questa guida è utile",
      introParagraphs: [
        "Nei parchi l’accessibilità non dipende solo dall’ingresso, ma anche dalla qualità dei percorsi, dalla presenza di aree di sosta e dalla facilità di raggiungere i servizi principali.",
        "Questa guida ti aiuta a capire cosa controllare per organizzare una visita più serena e adatta alle tue esigenze.",
      ],
      imageAlt: "Parco accessibile",
      image: fallbackImage,
      checklistTitle: "Cosa controllare prima di andare",
      checklistText:
        "Nei parchi conviene valutare soprattutto percorsi, distanze e servizi disponibili.",
      checklist: [
        "Ingresso facile da raggiungere e senza ostacoli",
        "Percorsi larghi, regolari e ben mantenuti",
        "Panchine o aree di sosta lungo il tragitto",
        "Bagni accessibili disponibili",
        "Parcheggio vicino all’ingresso",
        "Cartelli chiari e orientamento semplice",
        "Zone ombreggiate o riparate",
        "Aree principali raggiungibili senza dislivelli difficili",
      ],
      tipsTitle: "Consigli pratici",
      tipsText:
        "Prima di partire, meglio raccogliere qualche informazione utile.",
      tips: [
        {
          title: "Controlla i percorsi",
          text: "Non basta sapere che il parco è accessibile: è importante capire se i sentieri sono regolari, larghi e ben tenuti.",
          icon: "bi-sign-turn-right-fill",
        },
        {
          title: "Valuta le distanze",
          text: "Un parco può essere accessibile ma molto esteso. Meglio sapere in anticipo dove si trovano bagni, panchine e punti principali.",
          icon: "bi-geo-alt-fill",
        },
        {
          title: "Chiedi del bagno",
          text: "Verifica se il bagno accessibile esiste davvero, se è aperto e in quale zona si trova.",
          icon: "bi-door-open-fill",
        },
        {
          title: "Controlla il fondo",
          text: "Ghiaiato, sterrato sconnesso o pendenze importanti possono rendere la visita più faticosa del previsto.",
          icon: "bi-tree-fill",
        },
      ],
      highlightTitle: "Un buon segnale da cercare",
      highlightText:
        "I parchi più attenti spiegano bene ingresso, percorsi, bagni, punti di sosta, eventuali pendenze e servizi disponibili lungo il tragitto.",
    },

    consigli: {
      heroLabel: "Prepara meglio la giornata",
      heroTitle: "Consigli per visitare un parco accessibile",
      heroText:
        "Una guida semplice per capire cosa controllare prima di partire e goderti la visita con più tranquillità.",
      firstCardTitle: "Prima di uscire",
      firstCardItems: [
        "Controlla distanza dal parcheggio all’ingresso",
        "Verifica il tipo di percorso e il fondo",
        "Informati sulla presenza di bagni accessibili",
        "Controlla se ci sono panchine o aree di sosta",
      ],
      secondCardTitle: "Durante la visita",
      secondCardItems: [
        "Preferisci i percorsi più semplici e regolari",
        "Fermati nelle aree di sosta quando serve",
        "Segnala ostacoli o passaggi critici",
        "Valuta in anticipo dove si trovano i servizi utili",
      ],
      questionsTitle: "Domande utili da fare prima di partire",
      questionsText:
        "Nei parchi le informazioni online sono spesso molto generiche. Chiedere dettagli precisi aiuta davvero a organizzarsi meglio.",
      questions: [
        "L’ingresso principale è facile da raggiungere?",
        "I percorsi sono regolari e senza ostacoli?",
        "Ci sono panchine o punti di sosta?",
        "Il bagno accessibile è aperto e vicino?",
        "Ci sono tratti in salita o con fondo difficile?",
        "Il parcheggio è vicino all’accesso principale?",
      ],
      noteTitle: "Nota importante",
      noteText:
        "Nei parchi l’accessibilità varia molto da zona a zona. Anche se un ingresso è comodo, alcuni percorsi interni o servizi possono essere più difficili da raggiungere.",
    },
  },
}

export const getGuidePageData = (categoria) => {
  return guidePagesConfig[categoria] || null
}