import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '68afqfk5',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false
})

const menuItems = [
  // Carni
  {
    _id: 'menu-m1', _type: 'menuItem',
    name: 'Rodizio Saudade',
    description: 'Un\'esperienza autentica di churrasco brasiliano con 9 carni selezionate, servite direttamente al tavolo dai nostri churrasqueiros. La selezione varia secondo disponibilità e stagionalità, privilegiando allevamenti grass fed argentini, brasiliani e uruguaiani.',
    price: '€42', category: 'Le Carni', isSignature: true, order: 1,
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
    _id: 'menu-s1', _type: 'menuItem',
    name: 'Pão de Queijo Artigianale',
    description: 'Piccoli panini al formaggio tipici brasiliani, preparati con impasto gluten free a base di manioca e formaggi selezionati. Croccanti fuori, morbidi ed elastici all\'interno, sfornati freschi ogni giorno.',
    price: '', category: 'Accompagnamenti', isSignature: true, isTraditionalSide: false, order: 10
  },
  {
    _id: 'menu-s2', _type: 'menuItem',
    name: 'Pastel Brasiliano alla Provola Affumicata',
    description: 'Sfoglia sottile e croccante, fritta al momento, con cuore filante di provola affumicata. Uno dei grandi classici dello street food brasiliano, reinterpretato in stile Saudade.',
    price: '', category: 'Accompagnamenti', isSignature: false, isTraditionalSide: false, order: 11
  },
  {
    _id: 'menu-s3', _type: 'menuItem',
    name: 'Empanadas Argentine Artigianali',
    description: 'Fagottini di pasta dorata ripieni di carne selezionata, verdure e spezie sudamericane. Preparati a mano secondo tradizione argentina.',
    price: '', category: 'Accompagnamenti', isSignature: false, isTraditionalSide: false, order: 12
  },
  {
    _id: 'menu-s4', _type: 'menuItem',
    name: 'Kibe Brasiliano di Carne',
    description: 'Croccante fuori e morbido all\'interno, preparato con manzo speziato e grano bulgur. Una ricetta iconica della cucina brasiliana di origine mediorientale.',
    price: '', category: 'Accompagnamenti', isSignature: false, isTraditionalSide: false, order: 13
  },
  {
    _id: 'menu-s5', _type: 'menuItem',
    name: 'Feijoada Autentica Carioca',
    description: 'La vera feijoada brasiliana tradizionale: fagioli neri cotti lentamente con carni selezionate, spezie e aromi brasiliani. Servita come da tradizione con i suoi accompagnamenti tipici.',
    price: '', category: 'Accompagnamenti', isSignature: true, isTraditionalSide: false, order: 14
  },
  {
    _id: 'menu-s6', _type: 'menuItem',
    name: 'Feijoada Vegana',
    description: 'Versione vegetale della classica feijoada carioca, preparata lentamente con fagioli neri, verdure, spezie e ingredienti selezionati. Disponibile su richiesta.',
    price: '', category: 'Accompagnamenti', isSignature: false, isTraditionalSide: false, order: 15
  },
  {
    _id: 'menu-s7', _type: 'menuItem',
    name: 'Vinagrete',
    description: 'Condimento fresco brasiliano a base di pomodoro, cipolla e peperoni marinati.',
    price: '', category: 'Accompagnamenti', isSignature: false, isTraditionalSide: true, order: 20
  },
  {
    _id: 'menu-s8', _type: 'menuItem',
    name: 'Farofa Artigianale',
    description: 'Farina di manioca tostata lentamente con burro e aromi tradizionali brasiliani.',
    price: '', category: 'Accompagnamenti', isSignature: false, isTraditionalSide: true, order: 21
  },
  {
    _id: 'menu-s9', _type: 'menuItem',
    name: 'Salpicão Brasiliano Artigianale',
    description: 'Petto di pollo sfilacciato a mano con carote fresche, mais, uvetta e maionese secondo tradizione brasiliana. Fresco, cremoso e dal perfetto equilibrio di sapori.',
    price: '', category: 'Accompagnamenti', isSignature: false, isTraditionalSide: true, order: 22
  },
  {
    _id: 'menu-s10', _type: 'menuItem',
    name: 'Maionesa Brasiliana',
    description: 'Classica insalata di patate brasiliana fatta in casa con patate, carote, piselli e maionese cremosa. Un accompagnamento tipico delle churrascarias brasiliane.',
    price: '', category: 'Accompagnamenti', isSignature: false, isTraditionalSide: true, order: 23
  },
  // Dolci
  {
    _id: 'menu-d1', _type: 'menuItem',
    name: 'Brigadeiro',
    description: 'Il dolce brasiliano per eccellenza: cioccolato e latte condensato.',
    price: '€5', category: 'Dolci', isSignature: true, order: 30
  },
  {
    _id: 'menu-d2', _type: 'menuItem',
    name: 'Pineapple Carpaccio Brulée',
    description: 'Ananas caramellato, dolce e rinfrescante.',
    price: '€4', category: 'Dolci', isSignature: false, order: 31
  },
  {
    _id: 'menu-d3', _type: 'menuItem',
    name: 'Tiramisu',
    description: 'La nostra versione del classico italiano.',
    price: '€6', category: 'Dolci', isSignature: false, order: 32
  },
  {
    _id: 'menu-d4', _type: 'menuItem',
    name: 'Panna Cotta',
    description: 'Dolce al cucchiaio setoso e delicato.',
    price: '€6', category: 'Dolci', isSignature: false, order: 33
  },
  // Cocktails
  {
    _id: 'menu-w1', _type: 'menuItem',
    name: 'Caipirinha Classica',
    description: 'Cachaça, lime fresco pestato, zucchero di canna, ghiaccio.',
    price: '€8', category: 'Cantina', isSignature: true, order: 40
  },
  {
    _id: 'menu-w2', _type: 'menuItem',
    name: 'Caipirinha Paixão',
    description: 'Con frutto della passione.',
    price: '€9', category: 'Cantina', isSignature: false, order: 41
  },
  {
    _id: 'menu-w3', _type: 'menuItem',
    name: 'Caipirinha Manga',
    description: 'Con mango fresco.',
    price: '€8', category: 'Cantina', isSignature: false, order: 42
  },
  {
    _id: 'menu-w4', _type: 'menuItem',
    name: 'Brazilian Spritz',
    description: 'La nostra versione del classico aperitivo.',
    price: '€10', category: 'Cantina', isSignature: false, order: 43
  }
]

const siteSettings = {
  _id: 'siteSettings', _type: 'siteSettings',
  name: 'Saudade',
  subtitle: 'Ristorante Brasiliano',
  address: 'Piazza Vittorio Veneto 15/B, 10124 Torino',
  phone: '+39 011 454 8427',
  email: 'info@saudaderistorante.it',
  hours: 'Aperto 7/7 – 17:30-23:59',
  instagram: 'saudade_ristorantebrasiliano',
  bookingUrl: 'https://octotable.com/book/restaurant/778061/booking/home',
  menuPdfUrl: 'https://book.octotable.com/otb/menu/menu.xhtml?id=f3ec60547e0a6b87a50746f6c4f67c94'
}

const eventSettings = {
  _id: 'eventSettings', _type: 'eventSettings',
  enabled: true,
  title: 'Venerdì Dinner Show',
  description: 'Ogni venerdì sera, lasciati trasportare dal ritmo del Brasile. Musica dal vivo, show di danza e il miglior rodizio per una serata indimenticabile.',
  date: 'Ogni Venerdì sera'
}

async function run() {
  console.log('Importazione dati in Sanity...')

  const transaction = client.transaction()

  for (const item of menuItems) {
    transaction.createOrReplace(item)
  }
  transaction.createOrReplace(siteSettings)
  transaction.createOrReplace(eventSettings)

  await transaction.commit()
  console.log(`✓ ${menuItems.length} voci menu importate`)
  console.log('✓ Impostazioni sito importate')
  console.log('✓ Evento settimanale importato')
  console.log('\nFatto! Apri Sanity Studio per verificare.')
}

run().catch(err => {
  console.error('Errore:', err.message)
  process.exit(1)
})
