import fs from 'node:fs'
import path from 'node:path'
import { createClient } from '@sanity/client'

const projectId = process.env.SANITY_PROJECT_ID || process.env.VITE_SANITY_PROJECT_ID || '68afqfk5'
const dataset = process.env.SANITY_DATASET || 'production'
const token = process.env.SANITY_TOKEN

if (!token) {
  console.error('Missing SANITY_TOKEN')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  token,
  useCdn: false
})

const root = process.cwd()
const publicDir = path.join(root, 'public')
const WINE_SECTIONS = new Set(['Rossi', 'Rosati'])
const SECTION_DEFS = [
  { _id: 'section-carni', _type: 'menuSection', name: 'Le Carni', category: 'Le Carni', order: 1 },
  { _id: 'section-accompagnamenti', _type: 'menuSection', name: 'Accompagnamenti', category: 'Accompagnamenti', order: 2 },
  { _id: 'section-accompagnamenti-tradizionali', _type: 'menuSection', name: 'Accompagnamenti tradizionali', category: 'Accompagnamenti', order: 3 },
  { _id: 'section-dolci', _type: 'menuSection', name: 'Dolci', category: 'Dolci', order: 10 },
  { _id: 'section-rossi', _type: 'menuSection', name: 'Rossi', category: 'Vini', order: 20 },
  { _id: 'section-rosati', _type: 'menuSection', name: 'Rosati', category: 'Vini', order: 21 },
  { _id: 'section-cocktail-signature', _type: 'menuSection', name: 'Cocktail Signature', category: 'Cocktails', order: 30 },
  { _id: 'section-caipirinhas', _type: 'menuSection', name: 'Caipirinhas', category: 'Cocktails', order: 31 },
  { _id: 'section-gin', _type: 'menuSection', name: 'Gin Premium / Gin Tonic', category: 'Cocktails', order: 32 },
  { _id: 'section-spritz', _type: 'menuSection', name: 'Spritz e Altri Cocktail', category: 'Cocktails', order: 33 },
  { _id: 'section-analcolici', _type: 'menuSection', name: 'Analcolici', category: 'Cocktails', order: 34 }
]
const SECTION_IDS = Object.fromEntries(SECTION_DEFS.map((section) => [section.name, section._id]))

const span = (key, text) => ({ _type: 'span', _key: key, text })
const block = (key, text) => ({
  _type: 'block',
  _key: key,
  style: 'normal',
  markDefs: [],
  children: [span(`${key}-span`, text)]
})

const sectionRef = (name) => ({
  _type: 'reference',
  _ref: SECTION_IDS[name]
})

async function uploadImage(publicPath) {
  const filePath = path.join(publicDir, publicPath.replace(/^\//, ''))
  const stream = fs.createReadStream(filePath)
  const asset = await client.assets.upload('image', stream, {
    filename: path.basename(filePath)
  })
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
}

async function menuItems() {
  const image103 = await uploadImage('/images/SAUDADE-103.jpg')
  const image106 = await uploadImage('/images/SAUDADE-106.jpg')
  const image109 = await uploadImage('/images/SAUDADE-109.jpg')
  const image110 = await uploadImage('/images/SAUDADE-110.jpg')
  const image111 = await uploadImage('/images/SAUDADE-111.jpg')
  const image87 = await uploadImage('/images/SAUDADE-87.jpg')
  const image85 = await uploadImage('/images/SAUDADE-85.jpg')
  const imagePanna = await uploadImage('/images/panna-cotta.jpg')
  const image90 = await uploadImage('/images/SAUDADE-90.jpg')
  const imageBrigadeiro = await uploadImage('/images/brigadeiro.jpg')

  return [
    {
      _id: 'menu-m1', _type: 'menuItem', name: 'Rodizio Saudade',
      description: "Un'esperienza autentica di churrasco brasiliano con 9 carni selezionate, servite direttamente al tavolo dai nostri churrasqueiros. La selezione varia secondo disponibilità e stagionalità, privilegiando allevamenti grass fed argentini, brasiliani e uruguaiani.",
      price: '€42', category: 'Le Carni', displayArea: 'menu', tab: 'carni', section: 'Le Carni', isSignature: true, order: 1,
      cuts: [
        'Picanha Black Angus Argentina / Uruguay',
        'Controfiletto, Spinacino o Scamone Black Angus Argentino',
        'Vacio / Diaframma Black Angus Argentino',
        'Ribs di Black Angus Argentina cotte a bassa temperatura',
        'Coupim Brasiliano',
        "Costolette o Spalla d'Agnello",
        'Bocconcino Saudade – capocollo farcito con coppa fresca e provola',
        'Salsiccia Artigianale',
        'Costina di Maiale',
        'Coppa di Maiale'
      ]
    },
    { _id: 'menu-s1', _type: 'menuItem', name: 'Pão de Queijo Artigianale', description: "Piccoli panini al formaggio tipici brasiliani, preparati con impasto gluten free a base di manioca e formaggi selezionati. Croccanti fuori, morbidi ed elastici all'interno, sfornati freschi ogni giorno.", price: '', category: 'Accompagnamenti', displayArea: 'menu', tab: 'accompagnamenti', section: 'Accompagnamenti', isSignature: true, isTraditionalSide: false, order: 10 },
    { _id: 'menu-s2', _type: 'menuItem', name: 'Pastel Brasiliano alla Provola Affumicata', description: 'Sfoglia sottile e croccante, fritta al momento, con cuore filante di provola affumicata. Uno dei grandi classici dello street food brasiliano, reinterpretato in stile Saudade.', price: '', category: 'Accompagnamenti', displayArea: 'menu', tab: 'accompagnamenti', section: 'Accompagnamenti', isSignature: false, isTraditionalSide: false, order: 11 },
    { _id: 'menu-s3', _type: 'menuItem', name: 'Empanadas Argentine Artigianali', description: 'Fagottini di pasta dorata ripieni di carne selezionata, verdure e spezie sudamericane. Preparati a mano secondo tradizione argentina.', price: '', category: 'Accompagnamenti', displayArea: 'menu', tab: 'accompagnamenti', section: 'Accompagnamenti', isSignature: false, isTraditionalSide: false, order: 12 },
    { _id: 'menu-s4', _type: 'menuItem', name: 'Kibe Brasiliano di Carne', description: 'Croccante fuori e morbido all’interno, preparato con manzo speziato e grano bulgur. Una ricetta iconica della cucina brasiliana di origine mediorientale.', price: '', category: 'Accompagnamenti', displayArea: 'menu', tab: 'accompagnamenti', section: 'Accompagnamenti', isSignature: false, isTraditionalSide: false, order: 13 },
    { _id: 'menu-s5', _type: 'menuItem', name: 'Feijoada Autentica Carioca', description: 'La vera feijoada brasiliana tradizionale: fagioli neri cotti lentamente con carni selezionate, spezie e aromi brasiliani. Servita come da tradizione con i suoi accompagnamenti tipici.', price: '', category: 'Accompagnamenti', displayArea: 'menu', tab: 'accompagnamenti', section: 'Accompagnamenti', isSignature: true, isTraditionalSide: false, order: 14 },
    { _id: 'menu-s6', _type: 'menuItem', name: 'Feijoada Vegana', description: 'Versione vegetale della classica feijoada carioca, preparata lentamente con fagioli neri, verdure, spezie e ingredienti selezionati. Disponibile su richiesta.', price: '', category: 'Accompagnamenti', displayArea: 'menu', tab: 'accompagnamenti', section: 'Accompagnamenti', isSignature: false, isTraditionalSide: false, order: 15 },
    { _id: 'menu-s7', _type: 'menuItem', name: 'Vinagrete', description: 'Condimento fresco brasiliano a base di pomodoro, cipolla e peperoni marinati.', price: '', category: 'Accompagnamenti', displayArea: 'menu', tab: 'accompagnamenti', section: 'Accompagnamenti tradizionali', isSignature: false, isTraditionalSide: true, order: 20 },
    { _id: 'menu-s8', _type: 'menuItem', name: 'Farofa Artigianale', description: 'Farina di manioca tostata lentamente con burro e aromi tradizionali brasiliani.', price: '', category: 'Accompagnamenti', displayArea: 'menu', tab: 'accompagnamenti', section: 'Accompagnamenti tradizionali', isSignature: false, isTraditionalSide: true, order: 21 },
    { _id: 'menu-s9', _type: 'menuItem', name: 'Salpicão Brasiliano Artigianale', description: 'Petto di pollo sfilacciato a mano con carote fresche, mais, uvetta e maionese secondo tradizione brasiliana. Fresco, cremoso e dal perfetto equilibrio di sapori.', price: '', category: 'Accompagnamenti', displayArea: 'menu', tab: 'accompagnamenti', section: 'Accompagnamenti tradizionali', isSignature: false, isTraditionalSide: true, order: 22 },
    { _id: 'menu-s10', _type: 'menuItem', name: 'Maionesa Brasiliana', description: 'Classica insalata di patate brasiliana fatta in casa con patate, carote, piselli e maionese cremosa. Un accompagnamento tipico delle churrascarias brasiliane.', price: '', category: 'Accompagnamenti', displayArea: 'menu', tab: 'accompagnamenti', section: 'Accompagnamenti tradizionali', isSignature: false, isTraditionalSide: true, order: 23 },

    { _id: 'carta-cs1', _type: 'menuItem', name: 'Señor Increíble', description: 'Rum Jamaica White Kingston 62, Rum Jamaica Gold Kingston 62 Scuro, estratto di pompelmo, passion fruit, pimento, lime e miele', price: '€10', category: 'Cantina', displayArea: 'carta', tab: 'cocktails', section: 'Cocktail Signature', image: image106, order: 100 },
    { _id: 'carta-cs2', _type: 'menuItem', name: 'Brazilian Spritz', description: 'Mondoro aperitivo ai fiori di sambuco, mango, lime, ginger beer', price: '€10', category: 'Cantina', displayArea: 'carta', tab: 'cocktails', section: 'Cocktail Signature', image: image110, order: 101 },
    { _id: 'carta-cs3', _type: 'menuItem', name: 'Porto Seguro', description: 'Bickens London Dry Gin, falernum, passion fruit, limone, orzata e zucchero liquido', price: '€10', category: 'Cantina', displayArea: 'carta', tab: 'cocktails', section: 'Cocktail Signature', image: image109, order: 102 },
    { _id: 'carta-cs4', _type: 'menuItem', name: 'Caipirinha', description: 'Cachaça Sagatiba, lime, zucchero di canna', price: '€8', category: 'Cantina', displayArea: 'carta', tab: 'cocktails', section: 'Cocktail Signature', image: image103, order: 103 },
    { _id: 'carta-cs5', _type: 'menuItem', name: 'Caipirinha Moranguja', description: 'Cachaça Sagatiba, polpa di fragola, estratto di maracuja e zucchero di canna', price: '€9', category: 'Cantina', displayArea: 'carta', tab: 'cocktails', section: 'Cocktail Signature', image: image111, order: 104 },
    { _id: 'carta-ca1', _type: 'menuItem', name: 'Paixão', description: 'Cachaça Sagatiba, lime, estratto di maracuja, zucchero di canna', price: '€9', category: 'Cantina', displayArea: 'carta', tab: 'cocktails', section: 'Caipirinhas', order: 110 },
    { _id: 'carta-ca2', _type: 'menuItem', name: 'Manga', description: 'Cachaça Sagatiba, lime, estratto di mango, zucchero di canna', price: '€8', category: 'Cantina', displayArea: 'carta', tab: 'cocktails', section: 'Caipirinhas', order: 111 },
    { _id: 'carta-ca4', _type: 'menuItem', name: 'Ginga', description: 'Cachaça Sagatiba, lime, estratto di mango e maracuja, zucchero di canna', price: '€9', category: 'Cantina', displayArea: 'carta', tab: 'cocktails', section: 'Caipirinhas', order: 112 },
    { _id: 'carta-ca5', _type: 'menuItem', name: 'Moranguja', description: 'Cachaça Sagatiba, polpa di fragola, estratto di maracuja e zucchero di canna', price: '€9', category: 'Cantina', displayArea: 'carta', tab: 'cocktails', section: 'Caipirinhas', order: 113 },
    { _id: 'carta-g1', _type: 'menuItem', name: 'Occitan', description: 'Francia – Distilled Gin – 44%. Botaniche: ginepro, lavanda, agrumi, erbe provenzali. Profilo aromatico, floreale. Tonica: Mediterranean Tonic', price: '€14', category: 'Cantina', displayArea: 'carta', tab: 'cocktails', section: 'Gin Premium / Gin Tonic', order: 120 },
    { _id: 'carta-g2', _type: 'menuItem', name: 'Malfy Pompelmo', description: 'Italia – Distilled Gin – 41%. Botaniche: ginepro, pompelmo rosa siciliano, limone, rabarbaro. Profilo fruttato, agrumato. Tonica: Mediterranean Tonic', price: '€14', category: 'Cantina', displayArea: 'carta', tab: 'cocktails', section: 'Gin Premium / Gin Tonic', order: 121 },
    { _id: 'carta-g3', _type: 'menuItem', name: 'Bulldog', description: 'Regno Unito – London Dry Gin – 40%. Botaniche: ginepro, dragon eye (longan), liquirizia, papavero. Profilo morbido, leggermente speziato. Tonica: Indian Tonic', price: '€12', category: 'Cantina', displayArea: 'carta', tab: 'cocktails', section: 'Gin Premium / Gin Tonic', order: 122 },
    { _id: 'carta-g4', _type: 'menuItem', name: "Martin Miller's", description: 'Regno Unito / Islanda – London Dry Gin – 40%. Botaniche: ginepro, coriandolo, angelica, agrumi. Profilo secco, pulito. Tonica: Indian Tonic', price: '€12', category: 'Cantina', displayArea: 'carta', tab: 'cocktails', section: 'Gin Premium / Gin Tonic', order: 123 },
    { _id: 'carta-g5', _type: 'menuItem', name: "Bobby's", description: 'Paesi Bassi – Distilled Gin – 42%. Botaniche: ginepro, citronella, chiodi di garofano, pepe cubebe. Profilo speziato, secco. Tonica: Indian Tonic', price: '€14', category: 'Cantina', displayArea: 'carta', tab: 'cocktails', section: 'Gin Premium / Gin Tonic', order: 124 },
    { _id: 'carta-g6', _type: 'menuItem', name: 'Crosskeys', description: 'Svezia – Distilled Gin – 43%. Botaniche: mirtillo, sambuco, ginepro, scorza di limone. Profilo fruttato, fresco. Tonica: Indian Tonic', price: '€14', category: 'Cantina', displayArea: 'carta', tab: 'cocktails', section: 'Gin Premium / Gin Tonic', order: 125 },
    { _id: 'carta-g7', _type: 'menuItem', name: 'Roku', description: 'Giappone – Distilled Gin – 43%. Botaniche: yuzu, tè verde sencha, fiore di ciliegio, pepe sansho. Profilo floreale, elegante. Tonica: Mediterranean Tonic', price: '€14', category: 'Cantina', displayArea: 'carta', tab: 'cocktails', section: 'Gin Premium / Gin Tonic', order: 126 },
    { _id: 'carta-g8', _type: 'menuItem', name: "Hendrick's", description: 'Scozia – Distilled Gin – 44%. Botaniche: ginepro, rosa damascena, cetriolo, coriandolo. Profilo floreale, fresco. Tonica: Indian Tonic', price: '€14', category: 'Cantina', displayArea: 'carta', tab: 'cocktails', section: 'Gin Premium / Gin Tonic', order: 127 },
    { _id: 'carta-g9', _type: 'menuItem', name: 'Portofino', description: 'Italia – Distilled Gin – 43%. Botaniche: limone, ginepro, rosmarino, lavanda, maggiorana. Profilo aromatico, agrumato. Tonica: Mediterranean Tonic', price: '€14', category: 'Cantina', displayArea: 'carta', tab: 'cocktails', section: 'Gin Premium / Gin Tonic', order: 128 },
    { _id: 'carta-g10', _type: 'menuItem', name: 'Gin Mare', description: 'Spagna – Distilled Gin – 42,7%. Botaniche: oliva Arbequina, rosmarino, basilico, timo. Profilo erbaceo, mediterraneo. Tonica: Mediterranean Tonic', price: '€14', category: 'Cantina', displayArea: 'carta', tab: 'cocktails', section: 'Gin Premium / Gin Tonic', order: 129 },
    { _id: 'carta-g11', _type: 'menuItem', name: 'Nordés', description: "Spagna – Distilled Gin (base d'uva Albariño) – 40%. Botaniche: eucalipto, alloro, menta, salvia, agrumi. Profilo floreale, aromatico. Tonica: Mediterranean Tonic", price: '€14', category: 'Cantina', displayArea: 'carta', tab: 'cocktails', section: 'Gin Premium / Gin Tonic', order: 130 },
    { _id: 'carta-sp1', _type: 'menuItem', name: 'Sunset Lychee', description: 'Vodka Sky, Aperol, liquore al lychee, limone, zucchero', price: '€8', category: 'Cantina', displayArea: 'carta', tab: 'cocktails', section: 'Spritz e Altri Cocktail', order: 140 },
    { _id: 'carta-sp2', _type: 'menuItem', name: 'Aperol Spritz', description: 'Aperol, Prosecco, seltz', price: '€7', category: 'Cantina', displayArea: 'carta', tab: 'cocktails', section: 'Spritz e Altri Cocktail', order: 141 },
    { _id: 'carta-sp3', _type: 'menuItem', name: 'Campari Spritz', description: 'Campari, Prosecco, seltz', price: '€7', category: 'Cantina', displayArea: 'carta', tab: 'cocktails', section: 'Spritz e Altri Cocktail', order: 142 },
    { _id: 'carta-sp4', _type: 'menuItem', name: 'Mondoro Hugo Spritz', description: 'Mondoro ai fiori di sambuco, Prosecco, seltz', price: '€7', category: 'Cantina', displayArea: 'carta', tab: 'cocktails', section: 'Spritz e Altri Cocktail', order: 143 },
    { _id: 'carta-sp5', _type: 'menuItem', name: 'Sarti Rosa Spritz', description: 'Sarti Rosa, Prosecco, seltz', price: '€7', category: 'Cantina', displayArea: 'carta', tab: 'cocktails', section: 'Spritz e Altri Cocktail', order: 144 },
    { _id: 'carta-sp6', _type: 'menuItem', name: 'Campari Soda', description: '', price: '€6', category: 'Cantina', displayArea: 'carta', tab: 'cocktails', section: 'Spritz e Altri Cocktail', order: 145 },
    { _id: 'carta-sp7', _type: 'menuItem', name: 'Crodino XL', description: '', price: '€6', category: 'Cantina', displayArea: 'carta', tab: 'cocktails', section: 'Spritz e Altri Cocktail', order: 146 },
    { _id: 'carta-sp8', _type: 'menuItem', name: 'Espolòn Paloma', description: 'Tequila Espolòn Blanco, succo di lime, sciroppo di agave, Thomas Henry Pink Grapefruit', price: '€10', category: 'Cantina', displayArea: 'carta', tab: 'cocktails', section: 'Spritz e Altri Cocktail', order: 147 },
    { _id: 'carta-an1', _type: 'menuItem', name: 'Wake Up', description: 'Estratto di ananas, estratto di mela, succo di pera, sciroppo di yuzu (agrume aromatico giapponese)', price: '€8', category: 'Cantina', displayArea: 'carta', tab: 'cocktails', section: 'Analcolici', order: 150 },
    { _id: 'carta-an2', _type: 'menuItem', name: 'Tropical', description: 'Spremuta di arancia, estratto di ananas, polpa di mango, sciroppo di passion fruit', price: '€10', category: 'Cantina', displayArea: 'carta', tab: 'cocktails', section: 'Analcolici', order: 151 },
    { _id: 'carta-an3', _type: 'menuItem', name: 'Ruby', description: 'Estratto di ananas, estratto di mela, spremuta di arancia, sciroppo di lampone', price: '€10', category: 'Cantina', displayArea: 'carta', tab: 'cocktails', section: 'Analcolici', order: 152 },

    { _id: 'carta-vr1', _type: 'menuItem', name: 'Galantas – Cabernet Franc', description: '', price: '€40', category: 'Cantina', displayArea: 'carta', tab: 'vini', section: 'Rossi', order: 200 },
    { _id: 'carta-vr2', _type: 'menuItem', name: 'Barolo DOCG "Palas"', description: '', price: '€50', category: 'Cantina', displayArea: 'carta', tab: 'vini', section: 'Rossi', order: 201 },
    { _id: 'carta-vr3', _type: 'menuItem', name: 'Barbaresco DOCG – Massucco', description: '', price: '€45', category: 'Cantina', displayArea: 'carta', tab: 'vini', section: 'Rossi', order: 202 },
    { _id: 'carta-vr4', _type: 'menuItem', name: 'Barbaresco DOCG – Palàs', description: '', price: '€50', category: 'Cantina', displayArea: 'carta', tab: 'vini', section: 'Rossi', order: 203 },
    { _id: 'carta-vr5', _type: 'menuItem', name: 'Il Bruciato – Bolgheri DOC', description: '', price: '€45', category: 'Cantina', displayArea: 'carta', tab: 'vini', section: 'Rossi', order: 204 },
    { _id: 'carta-vr6', _type: 'menuItem', name: 'Amarone della Valpolicella DOCG – Domini Veneti', description: '', price: '€60', category: 'Cantina', displayArea: 'carta', tab: 'vini', section: 'Rossi', order: 205 },
    { _id: 'carta-vr7', _type: 'menuItem', name: 'Rosso di Montalcino DOC Pian delle Vigne', description: '', price: '€40', category: 'Cantina', displayArea: 'carta', tab: 'vini', section: 'Rossi', order: 206 },
    { _id: 'carta-vr8', _type: 'menuItem', name: 'Peppoli Chianti Classico DOCG', description: '', price: '€40', category: 'Cantina', displayArea: 'carta', tab: 'vini', section: 'Rossi', order: 207 },
    { _id: 'carta-vr9', _type: 'menuItem', name: 'Pinot Nero Alto Adige DOC – St. Michael-Eppan', description: '', price: '€28', category: 'Cantina', displayArea: 'carta', tab: 'vini', section: 'Rossi', order: 208 },
    { _id: 'carta-vr10', _type: 'menuItem', name: "Aglianico – L'Archetipo", description: '', price: '€29', category: 'Cantina', displayArea: 'carta', tab: 'vini', section: 'Rossi', order: 209 },
    { _id: 'carta-vr11', _type: 'menuItem', name: 'Ruchè di Castagnole Monferrato DOCG', description: '', price: '€30', category: 'Cantina', displayArea: 'carta', tab: 'vini', section: 'Rossi', order: 210 },
    { _id: 'carta-vr12', _type: 'menuItem', name: 'Nebbiolo – Pietro Argante', description: '', price: '€29', category: 'Cantina', displayArea: 'carta', tab: 'vini', section: 'Rossi', order: 211 },
    { _id: 'carta-vr13', _type: 'menuItem', name: "Barbera d'Asti Superiore DOCG – Bricco dei Guazzi", description: '', price: '€29', category: 'Cantina', displayArea: 'carta', tab: 'vini', section: 'Rossi', order: 212 },
    { _id: 'carta-vr14', _type: 'menuItem', name: 'Morellino di Scansano DOCG – Serpaia di Endrizzi', description: '', price: '€26', category: 'Cantina', displayArea: 'carta', tab: 'vini', section: 'Rossi', order: 213 },
    { _id: 'carta-vr15', _type: 'menuItem', name: 'Pinot Nero Trentino DOC – Lavis', description: '', price: '€28', category: 'Cantina', displayArea: 'carta', tab: 'vini', section: 'Rossi', order: 214 },
    { _id: 'carta-vr16', _type: 'menuItem', name: 'Cabernet Trentino DOC – Lavis', description: '', price: '€30', category: 'Cantina', displayArea: 'carta', tab: 'vini', section: 'Rossi', order: 215 },
    { _id: 'carta-vr17', _type: 'menuItem', name: 'Negroamaro Salento IGT – Poggio Maru', description: '', price: '€23', category: 'Cantina', displayArea: 'carta', tab: 'vini', section: 'Rossi', order: 216 },
    { _id: 'carta-vr18', _type: 'menuItem', name: "Nero d'Avola Sicilia DOC – Trinacria", description: '', price: '€23', category: 'Cantina', displayArea: 'carta', tab: 'vini', section: 'Rossi', order: 217 },
    { _id: 'carta-vr19', _type: 'menuItem', name: 'Barbera – De Stefanis', description: '', price: '€23', category: 'Cantina', displayArea: 'carta', tab: 'vini', section: 'Rossi', order: 218 },
    { _id: 'carta-vr20', _type: 'menuItem', name: 'Nebbiolo – De Stefanis', description: '', price: '€26', category: 'Cantina', displayArea: 'carta', tab: 'vini', section: 'Rossi', order: 219 },
    { _id: 'carta-vr21', _type: 'menuItem', name: 'Dolcetto – De Stefanis', description: '', price: '€23', category: 'Cantina', displayArea: 'carta', tab: 'vini', section: 'Rossi', order: 220 },
    { _id: 'carta-vr22', _type: 'menuItem', name: "Barbera d'Asti Superiore DOCG – Malgrà", description: '', price: '€33', category: 'Cantina', displayArea: 'carta', tab: 'vini', section: 'Rossi', order: 221 },
    { _id: 'carta-vr23', _type: 'menuItem', name: 'Botrosecco – Maremma Toscana DOC', description: '', price: '€40', category: 'Cantina', displayArea: 'carta', tab: 'vini', section: 'Rossi', order: 222 },
    { _id: 'carta-vr24', _type: 'menuItem', name: 'Baglio dei Sikani – Etna Rosso DOC', description: '', price: '€38', category: 'Cantina', displayArea: 'carta', tab: 'vini', section: 'Rossi', order: 223 },
    { _id: 'carta-ro1', _type: 'menuItem', name: 'Calafuria Salento IGT Rosato – Tormaresca', description: '', price: '€25', category: 'Cantina', displayArea: 'carta', tab: 'vini', section: 'Rosati', order: 230 },
    { _id: 'carta-ro2', _type: 'menuItem', name: 'Rosato – De Stefanis', description: '', price: '€28', category: 'Cantina', displayArea: 'carta', tab: 'vini', section: 'Rosati', order: 231 },
    { _id: 'carta-ro3', _type: 'menuItem', name: "Ju Zire – Cerasuolo d'Abruzzo DOP Rosato", description: '', price: '€27', category: 'Cantina', displayArea: 'carta', tab: 'vini', section: 'Rosati', order: 232 },

    { _id: 'carta-d2', _type: 'menuItem', name: 'Pineapple Carpaccio Brulée', description: 'Ananas caramellato, dolce e rinfrescante.', price: '€4', category: 'Dolci', displayArea: 'carta', tab: 'dolci', section: 'Dolci', image: image87, order: 300 },
    { _id: 'carta-d3', _type: 'menuItem', name: 'Tiramisù', description: 'La nostra versione del classico italiano.', price: '€6', category: 'Dolci', displayArea: 'carta', tab: 'dolci', section: 'Dolci', image: image85, order: 301 },
    { _id: 'carta-d4', _type: 'menuItem', name: 'Panna Cotta', description: 'Dolce al cucchiaio setoso e delicato.', price: '€6', category: 'Dolci', displayArea: 'carta', tab: 'dolci', section: 'Dolci', image: imagePanna, order: 302 },
    { _id: 'carta-d5', _type: 'menuItem', name: 'Cannolo scomposto', description: 'Ricotta, pistacchi e croccante di cialda, in versione scomposta.', price: '€6', category: 'Dolci', displayArea: 'carta', tab: 'dolci', section: 'Dolci', image: image90, order: 303 },
    { _id: 'carta-d1', _type: 'menuItem', name: 'Brigadeiro', description: 'Il dolce brasiliano per eccellenza: cioccolato e latte condensato.', price: '€5', category: 'Dolci', displayArea: 'carta', tab: 'dolci', section: 'Dolci', image: imageBrigadeiro, order: 304 }
  ].map((item) => {
    if (item.category !== 'Cantina') return item
    return {
      ...item,
      category: WINE_SECTIONS.has(item.section) ? 'Vini' : 'Cocktails'
    }
  }).map((item) => ({
    ...item,
    sectionRef: item.section ? sectionRef(item.section) : undefined
  }))
}

async function pageDocs() {
  return {
    homePage: {
      _id: 'homePage',
      _type: 'homePage',
      seoTitle: 'Saudade | Churrascaria Brasiliana a Torino',
      seoDescription: 'Rodizio brasiliano, feijoada e cocktail bar in Piazza Vittorio Veneto, Torino.',
      heroSlides: [
        { _type: 'homeHeroSlide', _key: 'slide-rodizio', headline: 'Rodizio', accent: 'senza limiti', description: 'Nove carni alla spada, grass fed, servite dai nostri churrasqueiros.', image: await uploadImage('/images/hero-picanha.jpg') },
        { _type: 'homeHeroSlide', _key: 'slide-tagli', headline: 'Tagli', accent: 'selezionati', description: 'Picanha, Black Angus, Coupim, Bocconcino Saudade.', image: await uploadImage('/images/hero-sliced-meat.jpg') },
        { _type: 'homeHeroSlide', _key: 'slide-cuore', headline: 'Il cuore', accent: 'del Brasile', description: 'Brace, cocktail e churrascaria in Piazza Vittorio Veneto, dal 2019.', image: await uploadImage('/images/hero-environment.jpg') }
      ],
      meaningHeading: 'Cosa significa Saudade',
      meaningBody: 'In portoghese parla di memoria e di voglia. Il sapore di un posto, l’odore di una tavola piena, la voglia di ritrovarli. A Torino portiamo il calore delle churrascarie del sud del Brasile, qui e adesso.',
      mobileStoryVideos: ['/videos/carne-2.mp4', '/videos/carne-1.mp4'],
      churrascariaSection: {
        _type: 'homeImageSection',
        heading: 'La vera churrascaria',
        body: 'Qui il tempo si misura in passaggi di spada. Il churrasqueiro arriva al tavolo, taglia, ascolta, torna. Un rituale lento, fatto di brace, conversazione e piatti che restano finché non alzate la mano.',
        secondaryBody: 'Dal 2019 siamo in Piazza Vittorio Veneto, nel cuore di Torino, con lo spirito del Brasile.',
        image: await uploadImage('/images/intro-grilled-meat.jpg')
      },
      rodizioSection: {
        heading: 'Il Rodizio',
        body: 'Nove carni alla spada, direttamente al vostro tavolo. Tagli grass fed da Argentina, Brasile e Uruguay, serviti come in churrascaria: senza lista da spuntare, solo il gesto e il gusto.',
        image: await uploadImage('/images/rodizio-hero.jpg')
      },
      piazzaSection: {
        _type: 'homeImageSection',
        heading: 'La sera in Piazza Vittorio',
        body: 'Quando la brace lascia spazio al bar, arrivano caipirinhas, cachaça e i nostri signature cocktail. La piazza fuori, la luce bassa dentro. Il pasto diventa serata, senza fretta di alzarsi.',
        image: await uploadImage('/images/piazza-vittorio.jpg')
      },
      quoteText: 'La carne non è solo cibo,',
      quoteAccent: 'è convivialità.',
      quoteBackgroundImage: await uploadImage('/images/visual-breaker-marbling.jpg')
    },
    menuPage: {
      _id: 'menuPage',
      _type: 'menuPage',
      title: 'Menu',
      heroImage: await uploadImage('/images/SAUDADE-132.jpg'),
      allergyNote: 'Per allergie o intolleranze, avvisate il personale.',
      coverNote: 'Coperto €3,00.'
    },
    cartaPage: {
      _id: 'cartaPage',
      _type: 'cartaPage',
      title: 'Carta',
      heroImage: await uploadImage('/images/SAUDADE-106.jpg'),
      footerNote: 'Disponibilità di etichette e distillati soggetta a variazioni.'
    },
    contactPage: {
      _id: 'contactPage',
      _type: 'contactPage',
      title: 'Contatti',
      heroImage: await uploadImage('/images/SAUDADE-37.jpg'),
      locationTitle: 'Dove siamo',
      directionsLabel: 'Indicazioni',
      bookingTitle: 'Prenota',
      bookingBody: 'Per un tavolo subito, prenota online.',
      formTitle: 'Scrivici',
      formIntro: 'Rispondiamo il prima possibile.',
      successTitle: 'Messaggio inviato',
      successBody: 'Ti risponderemo al più presto.'
    },
    blogPage: {
      _id: 'blogPage',
      _type: 'blogPage',
      title: 'Novità',
      emptyState: 'Nessun articolo pubblicato al momento.'
    },
    aboutPage: {
      _id: 'aboutPage',
      _type: 'aboutPage',
      sections: [
        { _type: 'heroBlock', _key: 'hero', heading: 'Chi Siamo', backgroundImage: await uploadImage('/images/SAUDADE-148.jpg') },
        { _type: 'richTextBlock', _key: 'intro', body: [block('intro-block', "Saudade è una parola difficile da tradurre. Parla di mancanza e di affetto: il ricordo di un sapore, di una casa lontana, di una festa intorno al fuoco. L'abbiamo scelta perché è quello che vogliamo farvi sentire a tavola. Un pezzo di Brasile che resta.")] },
        { _type: 'textImageBlock', _key: 'piazza', heading: 'Dal 2019 in Piazza Vittorio', imagePosition: 'right', image: await uploadImage('/images/hero-environment.jpg'), body: [block('piazza-block-1', 'Siamo aperti sette giorni su sette nel cuore di Torino, dove la piazza è già una scena. Qui il Brasile guida come accogliamo, cuciniamo e facciamo stare a tavola.'), block('piazza-block-2', 'Chi passa una sera da noi spesso torna, per la carne e per il ritmo: lento, conviviale, senza fretta di chiudere il conto.')] },
        { _type: 'textImageBlock', _key: 'rodizio', heading: 'Il rituale del rodizio', imagePosition: 'left', image: await uploadImage('/images/hero-server.jpg'), body: [block('rodizio-block-1', 'Il rodizio è il cuore di Saudade. I churrasqueiros passano tra i tavoli con la spada, tagliano al momento, ascoltano, tornano. Nove carni selezionate, allevamenti grass fed, una selezione che segue stagione e disponibilità.'), block('rodizio-block-2', 'Al tavolo restano il gesto e il tempo di stare insieme, senza un menù da spuntare in fretta.')] },
        { _type: 'textImageBlock', _key: 'bar', heading: 'Brace e bar', imagePosition: 'right', image: await uploadImage('/images/about-cocktails.jpg'), body: [block('bar-block-1', "Accanto al rodizio c'è la cucina brasiliana che conosciamo da casa: feijoada carioca, pão de queijo, empanadas. Sapori che tengono compagnia alla carne e aprono la strada alla sera."), block('bar-block-2', 'Al bar serviamo caipirinhas, cachaça e cocktail signature. Stessa convivialità, con il bicchiere in mano.')] },
        { _type: 'quoteBlock', _key: 'quote', quote: 'In Brasile il cibo è una festa. Ogni festa inizia intorno al fuoco.' }
      ]
    },
    siteSettings: {
      _id: 'siteSettings', _type: 'siteSettings',
      name: 'Saudade',
      subtitle: 'Ristorante Brasiliano',
      address: 'Piazza Vittorio Veneto 15/B, 10124 Torino',
      phone: '+39 011 454 8427',
      email: 'info@saudaderistorante.it',
      hours: 'Aperto 7/7 – 17:30-23:59',
      instagram: 'saudade_ristorantebrasiliano',
      footerTagline: 'Churrasco brasiliano a Torino, in Piazza Vittorio Veneto.',
      footerHoursNote: 'Cucina chiusa 30 minuti prima.',
      bookingLabel: 'Prenota',
      navHomeLabel: 'Home',
      navMenuLabel: 'Menu',
      navAboutLabel: 'Chi Siamo',
      navContactLabel: 'Contatti',
      bookingUrl: 'https://octotable.com/book/restaurant/778061/booking/home',
      menuPdfUrl: 'https://book.octotable.com/otb/menu/menu.xhtml?id=f3ec60547e0a6b87a50746f6c4f67c94'
    },
    eventSettings: {
      _id: 'eventSettings', _type: 'eventSettings',
      enabled: true,
      title: 'Venerdì Dinner Show',
      description: 'Ogni venerdì sera, lasciati trasportare dal ritmo del Brasile. Musica dal vivo, show di danza e il miglior rodizio per una serata indimenticabile.',
      date: 'Ogni Venerdì sera'
    }
  }
}

async function run() {
  const items = await menuItems()
  const docs = await pageDocs()
  const transaction = client.transaction()

  for (const section of SECTION_DEFS) transaction.createOrReplace(section)
  for (const item of items) transaction.createOrReplace(item)
  transaction.createOrReplace(docs.homePage)
  transaction.createOrReplace(docs.menuPage)
  transaction.createOrReplace(docs.cartaPage)
  transaction.createOrReplace(docs.contactPage)
  transaction.createOrReplace(docs.blogPage)
  transaction.createOrReplace(docs.aboutPage)
  transaction.createOrReplace(docs.siteSettings)
  transaction.createOrReplace(docs.eventSettings)

  await transaction.commit()
  console.log(`Synced ${items.length} menu items and page documents.`)
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
