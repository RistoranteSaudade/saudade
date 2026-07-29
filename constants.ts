import { MenuItem, MenuItemType } from './types';

export const RESTAURANT_INFO = {
  name: "Saudade",
  subtitle: "Ristorante Brasiliano",
  address: "Piazza Vittorio Veneto 15/B, 10124 Torino",
  phone: "+39 011 454 8427",
  email: "info@saudaderistorante.it",
  hours: "Aperto 7/7 – 17:30-23:59",
  instagram: "saudade_ristorantebrasiliano",
  footerTagline: "Churrasco brasiliano a Torino, in Piazza Vittorio Veneto.",
  footerHoursNote: "Cucina chiusa 30 minuti prima.",
  bookingLabel: "Prenota",
  navHomeLabel: "Home",
  navMenuLabel: "Menu",
  navAboutLabel: "Chi Siamo",
  navContactLabel: "Contatti",
  navGalleryLabel: "Galleria"
};

export const EXTERNAL_LINKS = {
  book: "https://octotable.com/book/restaurant/778061/booking/home",
  menu: "https://book.octotable.com/otb/menu/menu.xhtml?id=f3ec60547e0a6b87a50746f6c4f67c94",
  thefork: "https://www.thefork.it/ristorante/saudade-r698042",
  instagram: "https://www.instagram.com/saudade_ristorantebrasiliano/"
};

/**
 * IMPOSTAZIONI EVENTO
 * Cambia 'enabled' a false per nascondere la sezione evento dal sito.
 */
export const EVENT_SETTINGS = {
  enabled: true,
  title: "Venerdì Dinner Show",
  description: "Ogni venerdì sera, lasciati trasportare dal ritmo del Brasile. Musica dal vivo, show di danza e il miglior rodizio per una serata indimenticabile.",
  date: "Ogni Venerdì sera"
};

export const FULL_MENU: MenuItem[] = [
  // Rodizio & Carni
  {
    id: 'm1',
    name: 'Rodizio Saudade',
    description: 'Un\'esperienza autentica di churrasco brasiliano con 9 carni selezionate, servite direttamente al tavolo dai nostri churrasqueiros. La selezione varia secondo disponibilità e stagionalità, privilegiando allevamenti grass fed argentini, brasiliani e uruguaiani.',
    price: '€42',
    type: MenuItemType.MEAT,
    isSignature: true,
    cuts: [
      'Picanha Black Angus Argentina / Uruguay',
      'Controfiletto, Spinacino o Scamone Black Angus Argentino',
      'Vacio / Diaframma Black Angus Argentino',
      'Ribs di Black Angus Argentina cotte a bassa temperatura',
      'Coupim Brasiliano',
      'Costolette o Spalla d\'Agnello',
      'Bocconcino Saudade – capocollo farcito con coppa fresca e provola',
      'Salsiccia Artigianale',
      'Costina di Maiale',
      'Coppa di Maiale'
    ]
  },

  // Accompagnamenti
  {
    id: 's1',
    name: 'Pão de Queijo Artigianale',
    description: 'Piccoli panini al formaggio tipici brasiliani, preparati con impasto gluten free a base di manioca e formaggi selezionati. Croccanti fuori, morbidi ed elastici all\'interno, sfornati freschi ogni giorno.',
    price: '',
    type: MenuItemType.SIDES,
    isSignature: true
  },
  {
    id: 's2',
    name: 'Pastel Brasiliano alla Provola Affumicata',
    description: 'Sfoglia sottile e croccante, fritta al momento, con cuore filante di provola affumicata. Uno dei grandi classici dello street food brasiliano, reinterpretato in stile Saudade.',
    price: '',
    type: MenuItemType.SIDES
  },
  {
    id: 's3',
    name: 'Empanadas Argentine Artigianali',
    description: 'Fagottini di pasta dorata ripieni di carne selezionata, verdure e spezie sudamericane. Preparati a mano secondo tradizione argentina.',
    price: '',
    type: MenuItemType.SIDES
  },
  {
    id: 's4',
    name: 'Kibe Brasiliano di Carne',
    description: 'Croccante fuori e morbido all\'interno, preparato con manzo speziato e grano bulgur. Una ricetta iconica della cucina brasiliana di origine mediorientale.',
    price: '',
    type: MenuItemType.SIDES
  },
  {
    id: 's5',
    name: 'Feijoada Autentica Carioca',
    description: 'La vera feijoada brasiliana tradizionale: fagioli neri cotti lentamente con carni selezionate, spezie e aromi brasiliani. Servita come da tradizione con i suoi accompagnamenti tipici.',
    price: '',
    type: MenuItemType.SIDES,
    isSignature: true
  },
  {
    id: 's6',
    name: 'Feijoada Vegana',
    description: 'Versione vegetale della classica feijoada carioca, preparata lentamente con fagioli neri, verdure, spezie e ingredienti selezionati. Disponibile su richiesta.',
    price: '',
    type: MenuItemType.SIDES
  },
  {
    id: 's7',
    name: 'Vinagrete',
    description: 'Condimento fresco brasiliano a base di pomodoro, cipolla e peperoni marinati.',
    price: '',
    type: MenuItemType.SIDES
  },
  {
    id: 's8',
    name: 'Farofa Artigianale',
    description: 'Farina di manioca tostata lentamente con burro e aromi tradizionali brasiliani.',
    price: '',
    type: MenuItemType.SIDES
  },
  {
    id: 's9',
    name: 'Salpicão Brasiliano Artigianale',
    description: 'Petto di pollo sfilacciato a mano con carote fresche, mais, uvetta e maionese secondo tradizione brasiliana. Fresco, cremoso e dal perfetto equilibrio di sapori.',
    price: '',
    type: MenuItemType.SIDES
  },
  {
    id: 's10',
    name: 'Maionesa Brasiliana',
    description: 'Classica insalata di patate brasiliana fatta in casa con patate, carote, piselli e maionese cremosa. Un accompagnamento tipico delle churrascarias brasiliane.',
    price: '',
    type: MenuItemType.SIDES
  },

  // Dolci (Sobremesas)
  {
    id: 'd2',
    name: 'Pineapple Carpaccio Brulée',
    description: 'Ananas caramellato, dolce e rinfrescante.',
    price: '€4',
    type: MenuItemType.DESSERT
  },
  {
    id: 'd3',
    name: 'Tiramisù',
    description: 'La nostra versione del classico italiano.',
    price: '€6',
    type: MenuItemType.DESSERT
  },
  {
    id: 'd4',
    name: 'Panna Cotta',
    description: 'Dolce al cucchiaio setoso e delicato.',
    price: '€6',
    type: MenuItemType.DESSERT
  },
  {
    id: 'd5',
    name: 'Cannolo scomposto',
    description: 'Ricotta, pistacchi e croccante di cialda, in versione scomposta.',
    price: '€6',
    type: MenuItemType.DESSERT
  },
  {
    id: 'd1',
    name: 'Brigadeiro',
    description: 'Il dolce brasiliano per eccellenza: cioccolato e latte condensato.',
    price: '€5',
    type: MenuItemType.DESSERT,
    isSignature: true
  },

];

/** Carta bar / cantina — route nascosta `/carta`, non in navigazione */
export interface CartaItem {
  id: string;
  name: string;
  description: string;
  price: string;
  image?: any;
}

export interface CartaSection {
  id: string;
  title: string;
  items: CartaItem[];
}

export const CARTA_SECTIONS: CartaSection[] = [
  {
    id: 'cocktail-signature',
    title: 'Cocktail Signature',
    items: [
      {
        id: 'cs1',
        name: 'Señor Increíble',
        description: 'Rum Jamaica White Kingston 62, Rum Jamaica Gold Kingston 62 Scuro, estratto di pompelmo, passion fruit, pimento, lime e miele',
        price: '€10',
        image: '/images/SAUDADE-106.jpg'
      },
      {
        id: 'cs2',
        name: 'Brazilian Spritz',
        description: 'Mondoro aperitivo ai fiori di sambuco, mango, lime, ginger beer',
        price: '€10',
        image: '/images/SAUDADE-110.jpg'
      },
      {
        id: 'cs3',
        name: 'Porto Seguro',
        description: 'Bickens London Dry Gin, falernum, passion fruit, limone, orzata e zucchero liquido',
        price: '€10',
        image: '/images/SAUDADE-109.jpg'
      },
      {
        id: 'cs4',
        name: 'Caipirinha',
        description: 'Cachaça Sagatiba, lime, zucchero di canna',
        price: '€8',
        image: '/images/SAUDADE-103.jpg'
      },
      {
        id: 'cs5',
        name: 'Caipirinha Moranguja',
        description: 'Cachaça Sagatiba, polpa di fragola, estratto di maracuja e zucchero di canna',
        price: '€9',
        image: '/images/SAUDADE-111.jpg'
      }
    ]
  },
  {
    id: 'caipirinhas',
    title: 'Caipirinhas',
    items: [
      {
        id: 'ca1',
        name: 'Paixão',
        description: 'Cachaça Sagatiba, lime, estratto di maracuja, zucchero di canna',
        price: '€9'
      },
      {
        id: 'ca2',
        name: 'Manga',
        description: 'Cachaça Sagatiba, lime, estratto di mango, zucchero di canna',
        price: '€8'
      },
      {
        id: 'ca4',
        name: 'Ginga',
        description: 'Cachaça Sagatiba, lime, estratto di mango e maracuja, zucchero di canna',
        price: '€9'
      },
      {
        id: 'ca5',
        name: 'Moranguja',
        description: 'Cachaça Sagatiba, polpa di fragola, estratto di maracuja e zucchero di canna',
        price: '€9'
      }
    ]
  },
  {
    id: 'gin',
    title: 'Gin Premium / Gin Tonic',
    items: [
      {
        id: 'g1',
        name: 'Occitan',
        description: 'Francia – Distilled Gin – 44%. Botaniche: ginepro, lavanda, agrumi, erbe provenzali. Profilo aromatico, floreale. Tonica: Mediterranean Tonic',
        price: '€14'
      },
      {
        id: 'g2',
        name: 'Malfy Pompelmo',
        description: 'Italia – Distilled Gin – 41%. Botaniche: ginepro, pompelmo rosa siciliano, limone, rabarbaro. Profilo fruttato, agrumato. Tonica: Mediterranean Tonic',
        price: '€14'
      },
      {
        id: 'g3',
        name: 'Bulldog',
        description: 'Regno Unito – London Dry Gin – 40%. Botaniche: ginepro, dragon eye (longan), liquirizia, papavero. Profilo morbido, leggermente speziato. Tonica: Indian Tonic',
        price: '€12'
      },
      {
        id: 'g4',
        name: "Martin Miller's",
        description: 'Regno Unito / Islanda – London Dry Gin – 40%. Botaniche: ginepro, coriandolo, angelica, agrumi. Profilo secco, pulito. Tonica: Indian Tonic',
        price: '€12'
      },
      {
        id: 'g5',
        name: "Bobby's",
        description: 'Paesi Bassi – Distilled Gin – 42%. Botaniche: ginepro, citronella, chiodi di garofano, pepe cubebe. Profilo speziato, secco. Tonica: Indian Tonic',
        price: '€14'
      },
      {
        id: 'g6',
        name: 'Crosskeys',
        description: 'Svezia – Distilled Gin – 43%. Botaniche: mirtillo, sambuco, ginepro, scorza di limone. Profilo fruttato, fresco. Tonica: Indian Tonic',
        price: '€14'
      },
      {
        id: 'g7',
        name: 'Roku',
        description: 'Giappone – Distilled Gin – 43%. Botaniche: yuzu, tè verde sencha, fiore di ciliegio, pepe sansho. Profilo floreale, elegante. Tonica: Mediterranean Tonic',
        price: '€14'
      },
      {
        id: 'g8',
        name: "Hendrick's",
        description: 'Scozia – Distilled Gin – 44%. Botaniche: ginepro, rosa damascena, cetriolo, coriandolo. Profilo floreale, fresco. Tonica: Indian Tonic',
        price: '€14'
      },
      {
        id: 'g9',
        name: 'Portofino',
        description: 'Italia – Distilled Gin – 43%. Botaniche: limone, ginepro, rosmarino, lavanda, maggiorana. Profilo aromatico, agrumato. Tonica: Mediterranean Tonic',
        price: '€14'
      },
      {
        id: 'g10',
        name: 'Gin Mare',
        description: 'Spagna – Distilled Gin – 42,7%. Botaniche: oliva Arbequina, rosmarino, basilico, timo. Profilo erbaceo, mediterraneo. Tonica: Mediterranean Tonic',
        price: '€14'
      },
      {
        id: 'g11',
        name: 'Nordés',
        description: "Spagna – Distilled Gin (base d'uva Albariño) – 40%. Botaniche: eucalipto, alloro, menta, salvia, agrumi. Profilo floreale, aromatico. Tonica: Mediterranean Tonic",
        price: '€14'
      }
    ]
  },
  {
    id: 'spritz',
    title: 'Spritz e Altri Cocktail',
    items: [
      {
        id: 'sp1',
        name: 'Sunset Lychee',
        description: 'Vodka Sky, Aperol, liquore al lychee, limone, zucchero',
        price: '€8'
      },
      {
        id: 'sp2',
        name: 'Aperol Spritz',
        description: 'Aperol, Prosecco, seltz',
        price: '€7'
      },
      {
        id: 'sp3',
        name: 'Campari Spritz',
        description: 'Campari, Prosecco, seltz',
        price: '€7'
      },
      {
        id: 'sp4',
        name: 'Mondoro Hugo Spritz',
        description: 'Mondoro ai fiori di sambuco, Prosecco, seltz',
        price: '€7'
      },
      {
        id: 'sp5',
        name: 'Sarti Rosa Spritz',
        description: 'Sarti Rosa, Prosecco, seltz',
        price: '€7'
      },
      {
        id: 'sp6',
        name: 'Campari Soda',
        description: '',
        price: '€6'
      },
      {
        id: 'sp7',
        name: 'Crodino XL',
        description: '',
        price: '€6'
      },
      {
        id: 'sp8',
        name: 'Espolòn Paloma',
        description: 'Tequila Espolòn Blanco, succo di lime, sciroppo di agave, Thomas Henry Pink Grapefruit',
        price: '€10'
      }
    ]
  },
  {
    id: 'analcolici',
    title: 'Analcolici',
    items: [
      {
        id: 'an1',
        name: 'Wake Up',
        description: 'Estratto di ananas, estratto di mela, succo di pera, sciroppo di yuzu (agrume aromatico giapponese)',
        price: '€8'
      },
      {
        id: 'an2',
        name: 'Tropical',
        description: 'Spremuta di arancia, estratto di ananas, polpa di mango, sciroppo di passion fruit',
        price: '€10'
      },
      {
        id: 'an3',
        name: 'Ruby',
        description: 'Estratto di ananas, estratto di mela, spremuta di arancia, sciroppo di lampone',
        price: '€10'
      }
    ]
  },
  {
    id: 'rossi',
    title: 'Rossi',
    items: [
      { id: 'vr1', name: 'Galantas – Cabernet Franc', description: '', price: '€40' },
      { id: 'vr2', name: 'Barolo DOCG "Palas"', description: '', price: '€50' },
      { id: 'vr3', name: 'Barbaresco DOCG – Massucco', description: '', price: '€45' },
      { id: 'vr4', name: 'Barbaresco DOCG – Palàs', description: '', price: '€50' },
      { id: 'vr5', name: 'Il Bruciato – Bolgheri DOC', description: '', price: '€45' },
      { id: 'vr6', name: 'Amarone della Valpolicella DOCG – Domini Veneti', description: '', price: '€60' },
      { id: 'vr7', name: 'Rosso di Montalcino DOC Pian delle Vigne', description: '', price: '€40' },
      { id: 'vr8', name: 'Peppoli Chianti Classico DOCG', description: '', price: '€40' },
      { id: 'vr9', name: 'Pinot Nero Alto Adige DOC – St. Michael-Eppan', description: '', price: '€28' },
      { id: 'vr10', name: "Aglianico – L'Archetipo", description: '', price: '€29' },
      { id: 'vr11', name: 'Ruchè di Castagnole Monferrato DOCG', description: '', price: '€30' },
      { id: 'vr12', name: 'Nebbiolo – Pietro Argante', description: '', price: '€29' },
      { id: 'vr13', name: "Barbera d'Asti Superiore DOCG – Bricco dei Guazzi", description: '', price: '€29' },
      { id: 'vr14', name: 'Morellino di Scansano DOCG – Serpaia di Endrizzi', description: '', price: '€26' },
      { id: 'vr15', name: 'Pinot Nero Trentino DOC – Lavis', description: '', price: '€28' },
      { id: 'vr16', name: 'Cabernet Trentino DOC – Lavis', description: '', price: '€30' },
      { id: 'vr17', name: 'Negroamaro Salento IGT – Poggio Maru', description: '', price: '€23' },
      { id: 'vr18', name: "Nero d'Avola Sicilia DOC – Trinacria", description: '', price: '€23' },
      { id: 'vr19', name: 'Barbera – De Stefanis', description: '', price: '€23' },
      { id: 'vr20', name: 'Nebbiolo – De Stefanis', description: '', price: '€26' },
      { id: 'vr21', name: 'Dolcetto – De Stefanis', description: '', price: '€23' },
      { id: 'vr22', name: "Barbera d'Asti Superiore DOCG – Malgrà", description: '', price: '€33' },
      { id: 'vr23', name: 'Botrosecco – Maremma Toscana DOC', description: '', price: '€40' },
      { id: 'vr24', name: 'Baglio dei Sikani – Etna Rosso DOC', description: '', price: '€38' }
    ]
  },
  {
    id: 'rosati',
    title: 'Rosati',
    items: [
      { id: 'ro1', name: 'Calafuria Salento IGT Rosato – Tormaresca', description: '', price: '€25' },
      { id: 'ro2', name: 'Rosato – De Stefanis', description: '', price: '€28' },
      { id: 'ro3', name: "Ju Zire – Cerasuolo d'Abruzzo DOP Rosato", description: '', price: '€27' }
    ]
  },
  {
    id: 'dolci',
    title: 'Dolci',
    items: [
      {
        id: 'd2',
        name: 'Pineapple Carpaccio Brulée',
        description: 'Ananas caramellato, dolce e rinfrescante.',
        price: '€4',
        image: '/images/SAUDADE-87.jpg'
      },
      {
        id: 'd3',
        name: 'Tiramisù',
        description: 'La nostra versione del classico italiano.',
        price: '€6',
        image: '/images/SAUDADE-85.jpg'
      },
      {
        id: 'd4',
        name: 'Panna Cotta',
        description: 'Dolce al cucchiaio setoso e delicato.',
        price: '€6',
        image: '/images/panna-cotta.jpg'
      },
      {
        id: 'd5',
        name: 'Cannolo scomposto',
        description: 'Ricotta, pistacchi e croccante di cialda, in versione scomposta.',
        price: '€6',
        image: '/images/SAUDADE-90.jpg'
      },
      {
        id: 'd1',
        name: 'Brigadeiro',
        description: 'Il dolce brasiliano per eccellenza: cioccolato e latte condensato.',
        price: '€5',
        image: '/images/brigadeiro.jpg'
      }
    ]
  }
];
export interface CartaCategory {
  id: string;
  title: string;
  sections: CartaSection[];
}

const cartaSection = (id: string) => {
  const section = CARTA_SECTIONS.find((s) => s.id === id);
  if (!section) throw new Error(`Missing carta section: ${id}`);
  return section;
};

export const CARTA_CATEGORIES: CartaCategory[] = [
  {
    id: 'vini',
    title: 'Vini',
    sections: [cartaSection('rossi'), cartaSection('rosati')]
  },
  {
    id: 'cocktails',
    title: 'Cocktails',
    sections: [
      cartaSection('cocktail-signature'),
      cartaSection('caipirinhas'),
      cartaSection('gin'),
      cartaSection('spritz'),
      cartaSection('analcolici')
    ]
  },
  {
    id: 'dolci',
    title: 'Dolci',
    sections: [cartaSection('dolci')]
  }
];
