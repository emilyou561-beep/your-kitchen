/**
 * Japanese ramen catalogue: regional and modern styles, each with a quick home route
 * (store-bought stock, ready noodles) and an authentic shop-style route built from
 * the Ramen Basics below. Steps are written for this app; style facts cross-checked
 * against regional ramen guides (see docs/RAMEN_SOURCES.md).
 */
import { e, o } from './recipeTypes'
import type { Recipe, RecipeIngredient } from './recipeTypes'
import { FUN_FACTS } from './funFacts'

/* ───────── shared bundles ───────── */

const N = (id = 'ramen-noodles'): RecipeIngredient => e(id, 2, 'pack')
/** Store-bought classic toppings for quick routes. */
const QUICK_TOP = [o('chashu', 1, 'pack'), o('egg', 2, 'pc'), o('menma', 60, 'g'), o('nori', 1, 'pack'), o('scallion', 1, 'bunch')]
/** Raw ingredients for homemade chashu + ajitama (authentic routes). */
const HOME_TOP = [
  e('pork-belly-block', 500, 'g'), e('egg', 2, 'pc'), o('menma', 60, 'g'), o('nori', 1, 'pack'), o('scallion', 1, 'bunch'),
]
const CHINTAN = [e('chicken-carcass', 2, 'pc'), o('chicken-wings', 300, 'g'), o('kombu', 10, 'g'), o('ginger', 1, 'pc'), o('scallion', 1, 'bunch')]
const TONKOTSU = [e('pork-bones', 2, 'kg'), o('pork-back-fat', 100, 'g'), o('garlic', 1, 'pc'), o('ginger', 1, 'pc')]
const SHOYU_TARE = [e('soy-sauce', 100, 'ml'), e('mirin', 2, 'tbsp'), o('sake', 2, 'tbsp'), o('kombu', 5, 'g'), o('dried-shiitake', 2, 'pc')]

/**
 * Bundles overlap (kombu in both stock and tare, scallion in stock and toppings…).
 * Merge repeated lines: same unit → quantities add; essential if any line is.
 */
function mergeLines(list: RecipeIngredient[]): RecipeIngredient[] {
  const out: RecipeIngredient[] = []
  for (const ri of list) {
    const prev = out.find((x) => x.id === ri.id)
    if (!prev) {
      out.push({ ...ri })
      continue
    }
    if (prev.unit === ri.unit) prev.qty = Math.round((prev.qty + ri.qty) * 100) / 100
    prev.essential = prev.essential || ri.essential
  }
  return out
}

function tidyRecipe(r: Recipe): Recipe {
  return {
    ...r,
    funFact: FUN_FACTS[r.id],
    ingredients: mergeLines(r.ingredients),
    authentic: r.authentic ? { ...r.authentic, ingredients: mergeLines(r.authentic.ingredients) } : undefined,
  }
}

const SERVE = 'Warm the bowls with hot water. Boil the noodles in plenty of water, drain hard, and fold them into the soup.'

/* ───────── Ramen Basics (components) ───────── */

const BASICS_RAW: Recipe[] = [
  {
    id: 'basic-chintan', kind: 'basic', name: 'Clear Chicken Stock', nameJa: '鶏清湯', tint: '#E7C77A',
    blurb: 'The clean, golden base for shoyu and shio bowls.', minutes: 240, serves: 4,
    ingredients: CHINTAN,
    steps: [
      'Rinse the carcasses, blanch 2 minutes, and scrub away any blood.',
      'Cover with 3 L cold water, bring just to a simmer and skim carefully — never let it boil hard.',
      'Add ginger and scallion greens; keep at a bare simmer for 3–4 hours.',
      'Add kombu for the last 30 minutes, then strain through a fine sieve. Keeps 3 days chilled.',
    ],
  },
  {
    id: 'basic-tonkotsu', kind: 'basic', name: 'Tonkotsu Stock', nameJa: '豚骨スープ', tint: '#EFE2C6',
    blurb: 'Milky pork-bone stock, boiled hard until creamy.', minutes: 720, serves: 6,
    ingredients: TONKOTSU,
    steps: [
      'Soak the bones overnight, then blanch 10 minutes; drain and scrub off dark bits.',
      'Crack the bones, cover with fresh water and keep at a rolling boil — the boil is what emulsifies the fat.',
      'Top up with water as it reduces. After 8–12 hours it should be opaque and coat a spoon.',
      'Add garlic and ginger for the last hour, then strain. Pressure cooker shortcut: 2 hours at high pressure, then boil 30 minutes uncovered.',
    ],
  },
  {
    id: 'basic-paitan', kind: 'basic', name: 'Chicken Paitan Stock', nameJa: '鶏白湯', tint: '#F2E3B8',
    blurb: 'Creamy chicken stock — rich like tonkotsu, but lighter.', minutes: 300, serves: 4,
    ingredients: [e('chicken-carcass', 3, 'pc'), e('chicken-wings', 500, 'g'), o('onion', 1, 'pc'), o('garlic', 1, 'pc')],
    steps: [
      'Blanch the carcasses and wings, then cover with fresh water.',
      'Boil hard, uncovered, stirring now and then so nothing catches; top up with water.',
      'After 4–5 hours, mash the bones and blend a ladle of solids back in for extra body. Strain.',
    ],
  },
  {
    id: 'basic-wafu-dashi', kind: 'basic', name: 'Seafood Dashi', nameJa: '魚介出汁', tint: '#C9A060',
    blurb: 'Kombu, sardine and bonito — the “double soup” half.', minutes: 60, serves: 4,
    ingredients: [e('kombu', 15, 'g'), e('niboshi', 30, 'g'), e('katsuobushi', 1, 'pack'), o('dried-shiitake', 2, 'pc')],
    steps: [
      'Pinch the heads and guts off the sardines. Soak kombu, sardines and shiitake in 1.2 L water for 30 minutes.',
      'Heat slowly; pull the kombu just before boiling. Simmer the sardines 10 minutes.',
      'Add the bonito off the heat, steep 3 minutes, then strain without squeezing.',
    ],
  },
  {
    id: 'basic-shoyu-tare', kind: 'basic', name: 'Shoyu Tare', nameJa: '醤油ダレ', tint: '#5A2E14',
    blurb: 'The soy seasoning that goes in the bowl first.', minutes: 30, serves: 8,
    ingredients: SHOYU_TARE,
    steps: [
      'Soak kombu and shiitake in the soy sauce for an hour (or overnight).',
      'Warm the sake and mirin to burn off the alcohol, add the soy mixture and heat to 80°C — do not boil.',
      'Cool and strain. Use 30 ml per bowl. Keeps a month chilled.',
    ],
  },
  {
    id: 'basic-shio-tare', kind: 'basic', name: 'Shio Tare', nameJa: '塩ダレ', tint: '#E7C77A',
    blurb: 'Salt seasoning with kombu and seafood depth.', minutes: 30, serves: 8,
    ingredients: [e('salt', 40, 'g'), e('kombu', 10, 'g'), o('sake', 50, 'ml'), o('mirin', 1, 'tbsp'), o('niboshi', 10, 'g')],
    steps: [
      'Simmer kombu and sardines in 200 ml water for 10 minutes.',
      'Add sake and mirin, then dissolve the salt completely. Strain and cool.',
      'Use 25–30 ml per bowl; taste the soup and adjust.',
    ],
  },
  {
    id: 'basic-miso-tare', kind: 'basic', name: 'Miso Tare', nameJa: '味噌ダレ', tint: '#C98A3C',
    blurb: 'Blended miso with garlic, ginger and sesame.', minutes: 20, serves: 6,
    ingredients: [e('miso', 150, 'g'), e('garlic', 1, 'pc'), e('ginger', 1, 'pc'), o('sesame-paste', 20, 'g'), o('mirin', 2, 'tbsp'), o('doubanjiang', 10, 'g')],
    steps: [
      'Grate the garlic and ginger. Mix everything into a smooth paste.',
      'Fry the paste gently in a little lard or oil for 2 minutes to deepen the flavour.',
      'Use about 50 g per bowl. Keeps two weeks chilled.',
    ],
  },
  {
    id: 'basic-chashu', kind: 'basic', name: 'Chashu', nameJa: 'チャーシュー', tint: '#7E3D1A',
    blurb: 'Rolled pork belly braised in soy.', minutes: 180, serves: 6,
    ingredients: [e('pork-belly-block', 600, 'g'), e('soy-sauce', 100, 'ml'), e('mirin', 50, 'ml'), o('sake', 100, 'ml'), o('sugar', 20, 'g'), o('ginger', 1, 'pc'), o('scallion', 1, 'bunch')],
    steps: [
      'Roll the belly skin-side out and tie tightly with string. Sear all over.',
      'Simmer in soy sauce, mirin, sake, sugar, ginger, scallion and 300 ml water, covered, for 2 hours, turning every 30 minutes.',
      'Cool in the liquid, chill overnight, then slice. Keep the liquid — it seasons the eggs.',
    ],
  },
  {
    id: 'basic-ajitama', kind: 'basic', name: 'Ajitama', nameJa: '味玉', tint: '#F4C842',
    blurb: 'Jammy marinated soft-boiled eggs.', minutes: 20, serves: 4,
    ingredients: [e('egg', 4, 'pc'), e('soy-sauce', 3, 'tbsp'), e('mirin', 3, 'tbsp'), o('sake', 1, 'tbsp')],
    steps: [
      'Lower fridge-cold eggs into boiling water for exactly 6 min 30 s, then into ice water.',
      'Peel and marinate in soy, mirin, sake and 100 ml water (or chashu liquid) for 6–24 hours.',
    ],
  },
  {
    id: 'basic-aroma-oils', kind: 'basic', name: 'Aroma Oils', nameJa: '香味油', tint: '#D6A642',
    blurb: 'Scallion oil, black garlic mayu and back-fat — the finishing layer.', minutes: 30, serves: 8,
    ingredients: [e('vegetable-oil', 200, 'ml'), e('scallion', 1, 'bunch'), o('garlic', 2, 'pc'), o('sesame-oil', 2, 'tbsp'), o('pork-back-fat', 200, 'g')],
    steps: [
      'Scallion oil: fry chopped scallion greens in oil over low heat until dark green and fragrant; strain.',
      'Mayu: fry minced garlic in oil past golden until fully black, then blend with sesame oil. Ventilate well.',
      'Seabura: simmer back fat in water 2 hours until soft, drain and push through a sieve.',
    ],
  },
  {
    id: 'basic-noodles', kind: 'basic', name: 'Homemade Ramen Noodles', nameJa: '自家製麺', tint: '#EBCB92',
    blurb: 'Springy alkaline noodles from bread flour and baked soda.', minutes: 90, serves: 4,
    ingredients: [e('bread-flour', 400, 'g'), e('baking-soda', 10, 'g'), e('salt', 4, 'g'), o('potato-starch', 30, 'g')],
    steps: [
      'Bake the baking soda at 120°C for an hour — this makes it alkaline like kansui. Dissolve 6 g with the salt in 150 ml water.',
      'Mix into the flour until crumbly, press into a block, bag and rest 1 hour.',
      'Roll thin (pasta machine helps), dust with starch and cut. Thin cut for Hakata, thick and wavy for miso.',
    ],
  },
]

/* ───────── Ramen ───────── */

const RAMEN_RAW: Recipe[] = [
  {
    id: 'tokyo-shoyu', kind: 'ramen', name: 'Tokyo Shoyu Ramen', nameJa: '東京醤油ラーメン', region: 'Tokyo', soup: 'shoyu', tint: '#9A5A24',
    blurb: 'Clear chicken-and-dashi soup with soy tare — the classic chuka soba.',
    art: { vessel: 'bowl', soup: '#A8642A', noodle: 'wavy', top: ['chashu', 'egg', 'menma', 'nori', 'naruto', 'scallion'] },
    minutes: 25, serves: 2,
    ingredients: [N(), e('chicken-stock', 700, 'ml'), e('soy-sauce', 4, 'tbsp'), o('dashi', 200, 'ml'), o('mirin', 1, 'tbsp'), ...QUICK_TOP, o('naruto', 1, 'pc')],
    steps: [
      'Heat chicken stock and dashi together.',
      'Put 2 tbsp soy sauce and ½ tbsp mirin in each bowl, pour in the hot soup.',
      SERVE,
      'Top with chashu, halved egg, menma, naruto slices, nori and scallion.',
    ],
    basics: ['basic-chintan', 'basic-wafu-dashi', 'basic-shoyu-tare', 'basic-chashu', 'basic-ajitama', 'basic-aroma-oils'],
    authentic: {
      minutes: 300,
      ingredients: [N(), ...CHINTAN, e('niboshi', 20, 'g'), e('katsuobushi', 1, 'pack'), ...SHOYU_TARE, ...HOME_TOP, o('naruto', 1, 'pc')],
      steps: [
        'A day ahead: make Chashu and Ajitama.',
        'Make Clear Chicken Stock and Seafood Dashi; combine 2 : 1.',
        'Put 30 ml Shoyu Tare and 1 tsp scallion oil in each hot bowl, add 350 ml soup.',
        SERVE,
        'Arrange chashu, ajitama, menma, naruto, nori and scallion.',
      ],
    },
  },
  {
    id: 'hakodate-shio', kind: 'ramen', name: 'Hakodate Shio Ramen', nameJa: '函館塩ラーメン', region: 'Hokkaido', soup: 'shio', tint: '#E7C77A',
    blurb: 'Crystal-clear salt soup with kombu and seafood, thin straight noodles.',
    art: { vessel: 'bowl', soup: '#E9C977', noodle: 'thin', top: ['chashu', 'menma', 'naruto', 'spinach', 'scallion'] },
    minutes: 20, serves: 2,
    ingredients: [N('thin-ramen-noodles'), e('chicken-stock', 700, 'ml'), e('salt', 6, 'g'), o('kombu', 5, 'g'), o('sake', 1, 'tbsp'), o('chashu', 1, 'pack'), o('menma', 40, 'g'), o('naruto', 1, 'pc'), o('spinach', 1, 'bunch'), o('scallion', 1, 'bunch')],
    steps: [
      'Warm the stock with the kombu for 10 minutes; remove the kombu.',
      'Season with salt and sake — it should taste just a little too salty on its own.',
      SERVE,
      'Top with chashu, menma, naruto, blanched spinach and scallion.',
    ],
    basics: ['basic-chintan', 'basic-shio-tare', 'basic-chashu', 'basic-aroma-oils'],
    authentic: {
      minutes: 300,
      ingredients: [N('thin-ramen-noodles'), ...CHINTAN, e('salt', 40, 'g'), e('kombu', 15, 'g'), e('niboshi', 10, 'g'), e('pork-belly-block', 400, 'g'), o('menma', 40, 'g'), o('naruto', 1, 'pc'), o('spinach', 1, 'bunch')],
      steps: [
        'Make Chashu, Clear Chicken Stock and Shio Tare.',
        'Add 25 ml Shio Tare and 1 tsp scallion oil per bowl, then 350 ml stock.',
        SERVE,
        'Finish with chashu, menma, naruto, spinach and scallion.',
      ],
    },
  },
  {
    id: 'sapporo-miso', kind: 'ramen', name: 'Sapporo Miso Ramen', nameJa: '札幌味噌ラーメン', region: 'Hokkaido', soup: 'miso', tint: '#C98A3C',
    blurb: 'Wok-fried vegetables, miso soup sealed with lard, corn and butter.',
    art: { vessel: 'bowl', soup: '#C98A3C', noodle: 'wavy', top: ['sprouts', 'corn', 'butter', 'ground-pork', 'scallion'] },
    minutes: 25, serves: 2,
    ingredients: [N(), e('chicken-stock', 700, 'ml'), e('miso', 80, 'g'), e('bean-sprouts', 1, 'pack'), o('ground-meat', 120, 'g'), o('cabbage', 1, 'pc'), o('garlic', 1, 'pc'), o('ginger', 1, 'pc'), o('corn', 80, 'g'), o('butter', 20, 'g'), o('lard', 20, 'g'), o('scallion', 1, 'bunch')],
    steps: [
      'Fry garlic, ginger and ground meat in lard over high heat; add sprouts and cabbage and toss 1 minute.',
      'Pour in the stock, bring to a boil, then whisk in the miso off the heat.',
      SERVE,
      'Ladle the soup and vegetables over; top with corn, a pat of butter and scallion.',
    ],
    basics: ['basic-chintan', 'basic-miso-tare', 'basic-noodles'],
    authentic: {
      minutes: 300,
      ingredients: [N(), ...CHINTAN, e('pork-bones', 1, 'kg'), e('miso', 150, 'g'), e('garlic', 1, 'pc'), e('ginger', 1, 'pc'), o('sesame-paste', 20, 'g'), e('bean-sprouts', 1, 'pack'), o('ground-meat', 120, 'g'), o('lard', 30, 'g'), o('corn', 80, 'g'), o('butter', 20, 'g')],
      steps: [
        'Make a half-and-half stock: Clear Chicken Stock simmered with blanched pork bones.',
        'Make Miso Tare. Use thick, wavy noodles (Homemade Ramen Noodles, thick cut).',
        'In a smoking wok fry lard, meat and vegetables, add 400 ml stock per bowl and 50 g tare, and boil 30 seconds so the lard emulsifies.',
        SERVE,
        'Top with the vegetables, corn and butter.',
      ],
    },
  },
  {
    id: 'asahikawa-shoyu', kind: 'ramen', name: 'Asahikawa Shoyu Ramen', nameJa: '旭川醤油ラーメン', region: 'Hokkaido', soup: 'shoyu', tint: '#6E3A16',
    blurb: '“Double soup” of pork-chicken and seafood under a layer of hot lard.',
    art: { vessel: 'bowl', soup: '#7A3E18', noodle: 'wavy', top: ['chashu', 'menma', 'scallion', 'back-fat'] },
    minutes: 25, serves: 2,
    ingredients: [N(), e('chicken-stock', 500, 'ml'), e('dashi', 200, 'ml'), e('soy-sauce', 4, 'tbsp'), e('lard', 30, 'g'), o('niboshi', 10, 'g'), ...QUICK_TOP],
    steps: [
      'Simmer the stock and dashi with the sardines for 10 minutes; strain.',
      'Put 2 tbsp soy in each bowl, add soup, then spoon hot melted lard on top — it keeps the bowl hot in winter.',
      SERVE,
      'Top with chashu, menma and plenty of scallion.',
    ],
    basics: ['basic-tonkotsu', 'basic-chintan', 'basic-wafu-dashi', 'basic-shoyu-tare'],
    authentic: {
      minutes: 420,
      ingredients: [N(), e('pork-bones', 1, 'kg'), e('chicken-carcass', 1, 'pc'), e('kombu', 15, 'g'), e('niboshi', 30, 'g'), e('katsuobushi', 1, 'pack'), ...SHOYU_TARE, e('lard', 40, 'g'), ...HOME_TOP],
      steps: [
        'Simmer pork bones and chicken for 6 hours (keep it fairly clear). Separately make Seafood Dashi.',
        'Combine 1 : 1 just before serving — the two soups stay distinct this way.',
        'Bowl: 30 ml Shoyu Tare, 400 ml soup, 1 tbsp hot lard.',
        SERVE,
        'Top with chashu, menma and scallion.',
      ],
    },
  },
  {
    id: 'hakata-tonkotsu', kind: 'ramen', name: 'Hakata Tonkotsu Ramen', nameJa: '博多豚骨ラーメン', region: 'Fukuoka', soup: 'tonkotsu', tint: '#EFE2C6',
    blurb: 'Milky pork-bone soup, ultra-thin firm noodles, pickled ginger on the side.',
    art: { vessel: 'bowl', soup: '#EFE2C6', noodle: 'thin', top: ['chashu', 'kikurage', 'scallion', 'beni-shoga', 'sesame'] },
    minutes: 20, serves: 2,
    ingredients: [N('thin-ramen-noodles'), e('tonkotsu-base', 80, 'ml'), e('chicken-stock', 400, 'ml'), o('soy-milk', 200, 'ml'), o('lard', 15, 'g'), o('chashu', 1, 'pack'), o('kikurage', 5, 'g'), o('scallion', 1, 'bunch'), o('pickled-ginger', 20, 'g'), o('sesame-seeds', 5, 'g'), o('takana', 30, 'g')],
    steps: [
      'Heat stock, soy milk and tonkotsu concentrate with the lard — keep it just below a boil.',
      'Cook the thin noodles only 30–60 seconds for the classic firm (katamen) bite.',
      'Top with chashu, sliced wood ear and scallion; add pickled ginger, sesame and takana at the table.',
      'Order a second portion of noodles (kaedama) into the leftover soup.',
    ],
    basics: ['basic-tonkotsu', 'basic-shio-tare', 'basic-chashu', 'basic-noodles'],
    authentic: {
      minutes: 780,
      ingredients: [N('thin-ramen-noodles'), ...TONKOTSU, e('salt', 30, 'g'), e('kombu', 10, 'g'), e('pork-belly-block', 400, 'g'), o('kikurage', 5, 'g'), o('scallion', 1, 'bunch'), o('pickled-ginger', 20, 'g'), o('sesame-seeds', 5, 'g'), o('takana', 30, 'g')],
      steps: [
        'Make Tonkotsu Stock (12 hours) and Shio Tare; make Chashu.',
        'Bowl: 25 ml Shio Tare (plus a splash of soy if you like), 350 ml boiling stock.',
        'Thin noodles, 40 seconds. Top with chashu, wood ear and scallion.',
      ],
    },
  },
  {
    id: 'kurume', kind: 'ramen', name: 'Kurume Ramen', nameJa: '久留米ラーメン', region: 'Fukuoka', soup: 'tonkotsu', tint: '#DCC49A',
    blurb: 'The original tonkotsu: deeper, funkier, with crispy pork-fat bits.',
    art: { vessel: 'bowl', soup: '#D9C092', noodle: 'thin', top: ['chashu', 'nori', 'scallion', 'pork-bits'] },
    minutes: 25, serves: 2,
    ingredients: [N('thin-ramen-noodles'), e('tonkotsu-base', 100, 'ml'), e('chicken-stock', 400, 'ml'), o('soy-milk', 150, 'ml'), o('pork-back-fat', 50, 'g'), o('soy-sauce', 1, 'tbsp'), o('chashu', 1, 'pack'), o('nori', 1, 'pack'), o('scallion', 1, 'bunch')],
    steps: [
      'Render the back fat in a pan until the bits are crisp; keep the fat.',
      'Heat stock, soy milk, concentrate and a little soy sauce; finish with a spoon of the fat.',
      SERVE,
      'Top with chashu, nori, scallion and the crispy fat bits.',
    ],
    basics: ['basic-tonkotsu', 'basic-shio-tare'],
    authentic: {
      minutes: 900,
      ingredients: [N('thin-ramen-noodles'), ...TONKOTSU, e('salt', 30, 'g'), e('kombu', 10, 'g'), ...HOME_TOP],
      steps: [
        'Make Tonkotsu Stock, then keep a pot going: each day top up with fresh bones and water (yobimodoshi) — the aged soup is the Kurume flavour.',
        'Bowl: Shio Tare with a splash of soy, 350 ml stock.',
        'Thin noodles; top with chashu, nori, scallion.',
      ],
    },
  },
  {
    id: 'kumamoto', kind: 'ramen', name: 'Kumamoto Ramen', nameJa: '熊本ラーメン', region: 'Kumamoto', soup: 'tonkotsu', tint: '#E3D2B0',
    blurb: 'Pork-and-chicken soup with black garlic oil and fried garlic chips.',
    art: { vessel: 'bowl', soup: '#E6D4B2', noodle: 'thin', top: ['mayu', 'garlic-chips', 'chashu', 'egg', 'kikurage', 'nori', 'scallion'] },
    minutes: 25, serves: 2,
    ingredients: [N(), e('tonkotsu-base', 80, 'ml'), e('chicken-stock', 500, 'ml'), e('garlic', 2, 'pc'), e('vegetable-oil', 4, 'tbsp'), o('sesame-oil', 1, 'tbsp'), o('kikurage', 5, 'g'), ...QUICK_TOP],
    steps: [
      'Fry half the garlic as thin chips until golden; drain. Fry the rest, minced, until black, then mix with sesame oil (quick mayu).',
      'Heat stock and concentrate together.',
      SERVE,
      'Top with chashu, egg, wood ear, nori, scallion, garlic chips and a swirl of mayu.',
    ],
    basics: ['basic-tonkotsu', 'basic-chintan', 'basic-aroma-oils', 'basic-chashu', 'basic-ajitama'],
    authentic: {
      minutes: 780,
      ingredients: [N(), ...TONKOTSU, e('chicken-carcass', 1, 'pc'), e('soy-sauce', 60, 'ml'), e('salt', 10, 'g'), e('garlic', 3, 'pc'), e('vegetable-oil', 100, 'ml'), o('kikurage', 5, 'g'), ...HOME_TOP],
      steps: [
        'Make Tonkotsu Stock with a chicken carcass added for the last 3 hours (lighter than Hakata).',
        'Make Mayu and garlic chips (Aroma Oils).',
        'Bowl: shoyu-forward tare, stock, 1 tsp mayu. Medium-thin noodles.',
        'Top with chashu, ajitama, wood ear, nori, scallion and garlic chips.',
      ],
    },
  },
  {
    id: 'kagoshima', kind: 'ramen', name: 'Kagoshima Ramen', nameJa: '鹿児島ラーメン', region: 'Kagoshima', soup: 'tonkotsu', tint: '#D8C49C',
    blurb: 'Gentle, semi-clear tonkotsu with chicken and vegetables, served with pickles.',
    art: { vessel: 'bowl', soup: '#D8C49C', noodle: 'wavy', top: ['chashu', 'sprouts', 'onion', 'scallion'] },
    minutes: 25, serves: 2,
    ingredients: [N(), e('tonkotsu-base', 50, 'ml'), e('chicken-stock', 600, 'ml'), o('dried-shiitake', 2, 'pc'), o('onion', 1, 'pc'), o('bean-sprouts', 1, 'pack'), o('chashu', 1, 'pack'), o('scallion', 1, 'bunch'), o('daikon', 1, 'pc')],
    steps: [
      'Simmer stock with shiitake for 10 minutes, then add the concentrate.',
      'Fry the onion until golden for the topping; blanch the sprouts.',
      SERVE,
      'Top with chashu, sprouts, fried onion and scallion; serve pickled daikon on the side.',
    ],
    basics: ['basic-tonkotsu', 'basic-chintan'],
    authentic: {
      minutes: 480,
      ingredients: [N(), e('pork-bones', 1.5, 'kg'), e('chicken-carcass', 1, 'pc'), e('dried-shiitake', 3, 'pc'), e('kombu', 10, 'g'), o('onion', 1, 'pc'), o('carrot', 1, 'pc'), e('soy-sauce', 60, 'ml'), ...HOME_TOP],
      steps: [
        'Simmer pork bones, chicken, onion, carrot, kombu and shiitake gently for 7 hours — keep it cloudy, not milky.',
        'Season each bowl with a light shoyu tare.',
        'Top with chashu, sprouts, fried onion and scallion.',
      ],
    },
  },
  {
    id: 'iekei', kind: 'ramen', name: 'Iekei Ramen', nameJa: '家系ラーメン', region: 'Yokohama', soup: 'tonkotsu', tint: '#B98A55',
    blurb: 'Tonkotsu-shoyu with chicken oil, thick straight noodles, spinach and nori.',
    art: { vessel: 'bowl', soup: '#B98A55', noodle: 'thick', top: ['nori', 'spinach', 'chashu', 'egg'] },
    minutes: 25, serves: 2,
    ingredients: [N('thick-ramen-noodles'), e('tonkotsu-base', 80, 'ml'), e('chicken-stock', 500, 'ml'), e('soy-sauce', 4, 'tbsp'), e('nori', 1, 'pack'), e('spinach', 1, 'bunch'), o('chicken-thigh', 100, 'g'), o('chashu', 1, 'pack'), o('egg', 2, 'pc'), o('garlic', 1, 'pc')],
    steps: [
      'Render the chicken skin/fat slowly to make a little chicken oil (chiyu).',
      'Bowl: 2 tbsp soy, 1–2 tsp chicken oil, then hot stock mixed with the concentrate.',
      'Thick noodles, 4–5 minutes. Top with blanched spinach, 3 sheets of nori, chashu and egg.',
      'At the table: grated garlic, and dip the nori in the soup to wrap rice.',
    ],
    basics: ['basic-tonkotsu', 'basic-shoyu-tare', 'basic-chashu', 'basic-ajitama'],
    authentic: {
      minutes: 780,
      ingredients: [N('thick-ramen-noodles'), ...TONKOTSU, e('chicken-carcass', 2, 'pc'), ...SHOYU_TARE, e('chicken-thigh', 200, 'g'), e('nori', 1, 'pack'), e('spinach', 1, 'bunch'), e('pork-belly-block', 400, 'g'), o('egg', 2, 'pc')],
      steps: [
        'Make Tonkotsu Stock, adding chicken carcasses for the last 4 hours; skim and keep the yellow chicken fat as chiyu.',
        'Bowl: 30 ml Shoyu Tare, 15 ml chiyu, 350 ml stock.',
        'Thick straight noodles; spinach, nori, chashu, ajitama.',
      ],
    },
  },
  {
    id: 'jiro', kind: 'ramen', name: 'Jiro-style Ramen', nameJa: '二郎系ラーメン', region: 'Tokyo', soup: 'shoyu', tint: '#8E5A2C',
    blurb: 'A mountain of sprouts and cabbage, thick pork, raw garlic, back fat.',
    art: { vessel: 'bowl', soup: '#8E5A2C', noodle: 'thick', top: ['mountain', 'chashu', 'back-fat'] },
    minutes: 30, serves: 2,
    ingredients: [N('thick-ramen-noodles'), e('chicken-stock', 600, 'ml'), e('soy-sauce', 5, 'tbsp'), e('bean-sprouts', 2, 'pack'), e('cabbage', 1, 'pc'), e('garlic', 2, 'pc'), o('pork-back-fat', 100, 'g'), o('sugar', 5, 'g'), o('chashu', 1, 'pack'), o('tonkotsu-base', 40, 'ml')],
    steps: [
      'Simmer the back fat in the stock for 15 minutes; mash it into flecks.',
      'Mix soy sauce with a little sugar (karame). Boil sprouts and cabbage 2 minutes.',
      'Thick noodles, 6–7 minutes. Bowl: karame, soup, noodles.',
      'Pile the vegetables high, add thick chashu, raw chopped garlic and spoonfuls of back fat.',
    ],
    basics: ['basic-tonkotsu', 'basic-aroma-oils', 'basic-noodles'],
    authentic: {
      minutes: 600,
      ingredients: [N('thick-ramen-noodles'), e('pork-bones', 2, 'kg'), e('pork-back-fat', 300, 'g'), e('pork-belly-block', 600, 'g'), e('soy-sauce', 150, 'ml'), e('bean-sprouts', 2, 'pack'), e('cabbage', 1, 'pc'), e('garlic', 3, 'pc'), o('sugar', 10, 'g')],
      steps: [
        'Boil pork bones with a whole slab of pork belly; pull the pork after 3 hours, keep boiling the bones for 6 more.',
        'Soak the pork in soy sauce and sugar — that liquid becomes the karame tare.',
        'Make Seabura (Aroma Oils). Use extra-thick Homemade Ramen Noodles.',
        'Assemble: karame, soup, noodles, vegetable mountain, thick pork, garlic, back fat.',
      ],
    },
  },
  {
    id: 'kitakata', kind: 'ramen', name: 'Kitakata Ramen', nameJa: '喜多方ラーメン', region: 'Fukushima', soup: 'shoyu', tint: '#B07A3A',
    blurb: 'Light pork-and-niboshi shoyu, flat curly noodles, lots of chashu.',
    art: { vessel: 'bowl', soup: '#B27C3C', noodle: 'flat', top: ['chashu', 'chashu', 'menma', 'scallion'] },
    minutes: 25, serves: 2,
    ingredients: [N('thick-ramen-noodles'), e('chicken-stock', 500, 'ml'), e('dashi', 200, 'ml'), e('soy-sauce', 4, 'tbsp'), o('niboshi', 10, 'g'), o('chashu', 2, 'pack'), o('menma', 60, 'g'), o('scallion', 1, 'bunch')],
    steps: [
      'Simmer stock, dashi and sardines 10 minutes; strain.',
      'Bowl: 2 tbsp soy each, then soup.',
      'Flat, wavy noodles. Cover the surface with chashu slices (chashu-men), then menma and scallion.',
    ],
    basics: ['basic-tonkotsu', 'basic-wafu-dashi', 'basic-shoyu-tare', 'basic-chashu', 'basic-noodles'],
    authentic: {
      minutes: 420,
      ingredients: [N('thick-ramen-noodles'), e('pork-bones', 1, 'kg'), e('niboshi', 40, 'g'), e('kombu', 10, 'g'), ...SHOYU_TARE, e('pork-belly-block', 700, 'g'), o('menma', 60, 'g'), o('scallion', 1, 'bunch')],
      steps: [
        'Simmer pork bones gently with sardines and kombu for 6 hours — clear, not milky.',
        'Make a light Shoyu Tare and plenty of Chashu.',
        'Noodles: high-water, flat and curly (Homemade Ramen Noodles with 45% water, rubbed to curl).',
      ],
    },
  },
  {
    id: 'shirakawa', kind: 'ramen', name: 'Shirakawa Ramen', nameJa: '白河ラーメン', region: 'Fukushima', soup: 'shoyu', tint: '#A8642A',
    blurb: 'Golden chicken shoyu with hand-pressed curly noodles and smoky chashu.',
    art: { vessel: 'bowl', soup: '#A8642A', noodle: 'flat', top: ['chashu', 'spinach', 'menma', 'naruto', 'nori'] },
    minutes: 25, serves: 2,
    ingredients: [N(), e('chicken-stock', 700, 'ml'), e('soy-sauce', 4, 'tbsp'), o('chashu', 1, 'pack'), o('spinach', 1, 'bunch'), o('menma', 40, 'g'), o('naruto', 1, 'pc'), o('nori', 1, 'pack')],
    steps: [
      'Heat the stock. Sear chashu slices in a dry pan for a smoky edge.',
      'Bowl: soy sauce then stock.',
      SERVE,
      'Top with chashu, spinach, menma, naruto and nori.',
    ],
    basics: ['basic-chintan', 'basic-shoyu-tare', 'basic-chashu', 'basic-noodles'],
    authentic: {
      minutes: 360,
      ingredients: [N(), ...CHINTAN, e('pork-bones', 0.5, 'kg'), ...SHOYU_TARE, e('pork-belly-block', 500, 'g'), o('spinach', 1, 'bunch'), o('menma', 40, 'g'), o('naruto', 1, 'pc')],
      steps: [
        'Make Clear Chicken Stock with a few pork bones.',
        'Roast (not braise) the chashu, then glaze with tare.',
        'Hand-roll the noodles and crush them by hand for the irregular curl.',
      ],
    },
  },
  {
    id: 'sano', kind: 'ramen', name: 'Sano Ramen', nameJa: '佐野ラーメン', region: 'Tochigi', soup: 'shoyu', tint: '#B88A4A',
    blurb: 'Very clear, light shoyu with soft, bamboo-pressed flat noodles.',
    art: { vessel: 'bowl', soup: '#C2944E', noodle: 'flat', top: ['chashu', 'menma', 'naruto', 'scallion'] },
    minutes: 20, serves: 2,
    ingredients: [N(), e('chicken-stock', 700, 'ml'), e('soy-sauce', 3, 'tbsp'), o('chashu', 1, 'pack'), o('menma', 40, 'g'), o('naruto', 1, 'pc'), o('scallion', 1, 'bunch')],
    steps: ['Heat the stock; season lightly with soy.', 'Cook the noodles a little softer than usual.', 'Top with chashu, menma, naruto, scallion.'],
    basics: ['basic-chintan', 'basic-shoyu-tare', 'basic-noodles'],
    authentic: {
      minutes: 360,
      ingredients: [N(), ...CHINTAN, ...SHOYU_TARE, e('pork-belly-block', 400, 'g'), o('menma', 40, 'g'), o('naruto', 1, 'pc')],
      steps: [
        'Make a very clear Clear Chicken Stock.',
        'Noodles: very high-water dough rolled with a rolling pin (aotake style), cut wide and flat.',
        'Light Shoyu Tare; classic toppings.',
      ],
    },
  },
  {
    id: 'toyama-black', kind: 'ramen', name: 'Toyama Black Ramen', nameJa: '富山ブラック', region: 'Toyama', soup: 'shoyu', tint: '#2A160A',
    blurb: 'Jet-black, very salty soy soup with black pepper — made to eat with rice.',
    art: { vessel: 'bowl', soup: '#2E1A0C', noodle: 'thick', top: ['chashu', 'menma', 'leek', 'pepper'] },
    minutes: 20, serves: 2,
    ingredients: [N('thick-ramen-noodles'), e('chicken-stock', 600, 'ml'), e('soy-sauce', 6, 'tbsp'), e('black-pepper', 4, 'g'), o('dashi', 100, 'ml'), o('mirin', 1, 'tsp'), o('chashu', 1, 'pack'), o('menma', 60, 'g'), o('scallion', 1, 'bunch'), o('rice', 1, 'cup')],
    steps: [
      'Bowl: 3 tbsp dark soy and a little mirin each; add very hot stock and dashi.',
      'Firm, medium-thick noodles.',
      'Top with salty chashu, menma and lots of thick-sliced scallion; crack black pepper over everything.',
      'Serve with plain rice.',
    ],
    basics: ['basic-chintan', 'basic-shoyu-tare'],
    authentic: {
      minutes: 300,
      ingredients: [N('thick-ramen-noodles'), ...CHINTAN, e('soy-sauce', 200, 'ml'), e('black-pepper', 5, 'g'), e('pork-belly-block', 400, 'g'), o('menma', 60, 'g')],
      steps: ['Make Clear Chicken Stock.', 'Make a double-strength Shoyu Tare with dark soy aged in the chashu liquid.', 'Assemble with heavy black pepper.'],
    },
  },
  {
    id: 'hachioji', kind: 'ramen', name: 'Hachioji Ramen', nameJa: '八王子ラーメン', region: 'Tokyo', soup: 'shoyu', tint: '#9A5A24',
    blurb: 'Shoyu soup capped with lard and a scatter of chopped raw onion.',
    art: { vessel: 'bowl', soup: '#9C5C26', noodle: 'thin', top: ['onion', 'chashu', 'menma', 'nori'] },
    minutes: 20, serves: 2,
    ingredients: [N(), e('chicken-stock', 700, 'ml'), e('soy-sauce', 4, 'tbsp'), e('onion', 1, 'pc'), e('lard', 20, 'g'), ...QUICK_TOP],
    steps: [
      'Chop the onion finely; rinse briefly in cold water.',
      'Bowl: soy, hot stock, a spoon of melted lard.',
      SERVE,
      'Top with chashu, menma, nori and a generous heap of raw onion.',
    ],
    basics: ['basic-chintan', 'basic-shoyu-tare', 'basic-chashu'],
    authentic: {
      minutes: 300,
      ingredients: [N(), ...CHINTAN, ...SHOYU_TARE, e('onion', 1, 'pc'), e('lard', 30, 'g'), ...HOME_TOP],
      steps: ['Make Clear Chicken Stock, Shoyu Tare and Chashu.', 'Float lard on top to seal the heat.', 'Chopped onion, chashu, menma, nori.'],
    },
  },
  {
    id: 'takayama', kind: 'ramen', name: 'Takayama Ramen', nameJa: '高山ラーメン', region: 'Gifu', soup: 'shoyu', tint: '#A0602A',
    blurb: 'Thin curly noodles in a light soup where the tare is simmered into the pot.',
    art: { vessel: 'bowl', soup: '#A86A30', noodle: 'thin', top: ['chashu', 'menma', 'scallion'] },
    minutes: 20, serves: 2,
    ingredients: [N('thin-ramen-noodles'), e('chicken-stock', 500, 'ml'), e('dashi', 200, 'ml'), e('soy-sauce', 4, 'tbsp'), o('niboshi', 10, 'g'), o('chashu', 1, 'pack'), o('menma', 40, 'g'), o('scallion', 1, 'bunch')],
    steps: ['Simmer stock, dashi, sardines and soy together for 10 minutes (the soy goes in the pot, not the bowl).', 'Thin curly noodles.', 'Top with chashu, menma, scallion.'],
    basics: ['basic-chintan', 'basic-wafu-dashi'],
    authentic: {
      minutes: 300,
      ingredients: [N('thin-ramen-noodles'), ...CHINTAN, e('niboshi', 30, 'g'), e('katsuobushi', 1, 'pack'), ...SHOYU_TARE, e('pork-belly-block', 400, 'g')],
      steps: ['Make Clear Chicken Stock and Seafood Dashi.', 'Simmer the tare into the combined soup for 20 minutes.', 'Assemble with thin curly noodles.'],
    },
  },
  {
    id: 'kyoto', kind: 'ramen', name: 'Kyoto Ramen', nameJa: '京都ラーメン', region: 'Kyoto', soup: 'shoyu', tint: '#5A2E14',
    blurb: 'Dark, rich shoyu with back fat and a mountain of Kujo green onion.',
    art: { vessel: 'bowl', soup: '#5E3016', noodle: 'thin', top: ['scallion', 'chashu', 'back-fat', 'menma'] },
    minutes: 25, serves: 2,
    ingredients: [N('thin-ramen-noodles'), e('chicken-stock', 600, 'ml'), e('soy-sauce', 5, 'tbsp'), e('scallion', 2, 'bunch'), o('pork-back-fat', 60, 'g'), o('tonkotsu-base', 40, 'ml'), o('chashu', 1, 'pack'), o('menma', 40, 'g')],
    steps: [
      'Simmer the back fat in the stock for 15 minutes and mash into flecks.',
      'Bowl: dark soy, then soup with fat.',
      'Thin straight noodles; cover with sliced green onion and chashu.',
    ],
    basics: ['basic-tonkotsu', 'basic-chintan', 'basic-shoyu-tare', 'basic-aroma-oils'],
    authentic: {
      minutes: 600,
      ingredients: [N('thin-ramen-noodles'), e('pork-bones', 1, 'kg'), e('chicken-carcass', 2, 'pc'), ...SHOYU_TARE, e('pork-back-fat', 200, 'g'), e('scallion', 2, 'bunch'), e('pork-belly-block', 400, 'g')],
      steps: ['Pork-and-chicken stock, 8 hours.', 'Dark Shoyu Tare and Seabura.', 'Pile on the green onion.'],
    },
  },
  {
    id: 'wakayama', kind: 'ramen', name: 'Wakayama Ramen', nameJa: '和歌山ラーメン', region: 'Wakayama', soup: 'tonkotsu', tint: '#8E5A2C',
    blurb: 'Brown tonkotsu-shoyu “chuka soba” with pink-swirl fish cake.',
    art: { vessel: 'bowl', soup: '#94602E', noodle: 'thin', top: ['chashu', 'menma', 'naruto', 'scallion'] },
    minutes: 25, serves: 2,
    ingredients: [N('thin-ramen-noodles'), e('tonkotsu-base', 60, 'ml'), e('chicken-stock', 500, 'ml'), e('soy-sauce', 4, 'tbsp'), o('chashu', 1, 'pack'), o('menma', 40, 'g'), o('naruto', 1, 'pc'), o('scallion', 1, 'bunch'), o('egg', 2, 'pc')],
    steps: ['Heat stock with concentrate.', 'Bowl: 2 tbsp soy each, then soup.', 'Thin noodles; chashu, menma, fish cake, scallion. Boiled eggs on the side, the local way.'],
    basics: ['basic-tonkotsu', 'basic-shoyu-tare', 'basic-chashu'],
    authentic: {
      minutes: 780,
      ingredients: [N('thin-ramen-noodles'), ...TONKOTSU, ...SHOYU_TARE, ...HOME_TOP, o('naruto', 1, 'pc')],
      steps: ['Tonkotsu Stock plus strong Shoyu Tare (1 : 10).', 'Classic toppings with kamaboko.'],
    },
  },
  {
    id: 'tokushima', kind: 'ramen', name: 'Tokushima Ramen', nameJa: '徳島ラーメン', region: 'Tokushima', soup: 'tonkotsu', tint: '#6E3A16',
    blurb: 'Dark tonkotsu-shoyu topped with sweet simmered pork and a raw egg.',
    art: { vessel: 'bowl', soup: '#704020', noodle: 'thin', top: ['pork-bits', 'raw-egg', 'sprouts', 'scallion'] },
    minutes: 25, serves: 2,
    ingredients: [N(), e('tonkotsu-base', 60, 'ml'), e('chicken-stock', 500, 'ml'), e('soy-sauce', 5, 'tbsp'), e('pork-sliced', 150, 'g'), e('egg', 2, 'pc'), o('sugar', 15, 'g'), o('mirin', 1, 'tbsp'), o('bean-sprouts', 1, 'pack'), o('scallion', 1, 'bunch'), o('rice', 1, 'cup')],
    steps: [
      'Simmer the pork in 2 tbsp soy, sugar and mirin until sticky-sweet.',
      'Bowl: soy, then hot stock with the concentrate.',
      'Noodles; top with sweet pork, sprouts, scallion and a raw egg yolk. Eat with rice.',
    ],
    basics: ['basic-tonkotsu', 'basic-shoyu-tare'],
    authentic: {
      minutes: 780,
      ingredients: [N(), ...TONKOTSU, ...SHOYU_TARE, e('pork-sliced', 200, 'g'), e('egg', 2, 'pc'), o('sugar', 20, 'g'), o('bean-sprouts', 1, 'pack')],
      steps: ['Tonkotsu Stock with a dark Shoyu Tare.', 'Sweet-simmered pork belly bits instead of chashu.', 'Raw egg on top.'],
    },
  },
  {
    id: 'onomichi', kind: 'ramen', name: 'Onomichi Ramen', nameJa: '尾道ラーメン', region: 'Hiroshima', soup: 'shoyu', tint: '#8E5A2C',
    blurb: 'Seafood-chicken shoyu dotted with back-fat cubes, flat noodles.',
    art: { vessel: 'bowl', soup: '#93602E', noodle: 'flat', top: ['back-fat', 'chashu', 'menma', 'scallion'] },
    minutes: 25, serves: 2,
    ingredients: [N('thick-ramen-noodles'), e('chicken-stock', 500, 'ml'), e('dashi', 200, 'ml'), e('soy-sauce', 4, 'tbsp'), e('pork-back-fat', 60, 'g'), o('niboshi', 10, 'g'), o('chashu', 1, 'pack'), o('menma', 40, 'g'), o('scallion', 1, 'bunch')],
    steps: [
      'Dice the back fat and sizzle it until just cooked through.',
      'Simmer stock, dashi and sardines; season bowls with soy.',
      'Flat noodles; top with chashu, menma, scallion and the fat cubes.',
    ],
    basics: ['basic-chintan', 'basic-wafu-dashi', 'basic-shoyu-tare'],
    authentic: {
      minutes: 300,
      ingredients: [N('thick-ramen-noodles'), ...CHINTAN, e('niboshi', 30, 'g'), ...SHOYU_TARE, e('pork-back-fat', 100, 'g'), e('pork-belly-block', 400, 'g')],
      steps: ['Chicken stock plus Seafood Dashi (small fish).', 'Shoyu Tare; seabura cubes, not puree.', 'Flat noodles.'],
    },
  },
  {
    id: 'tsubame-sanjo', kind: 'ramen', name: 'Tsubame-Sanjo Ramen', nameJa: '燕三条背脂ラーメン', region: 'Niigata', soup: 'niboshi', tint: '#8C6A3A',
    blurb: 'Strong sardine-shoyu under a blanket of back fat, thick noodles, raw onion.',
    art: { vessel: 'bowl', soup: '#8C6A3A', noodle: 'thick', top: ['back-fat', 'onion', 'chashu', 'menma'] },
    minutes: 30, serves: 2,
    ingredients: [N('thick-ramen-noodles'), e('niboshi', 30, 'g'), e('chicken-stock', 600, 'ml'), e('soy-sauce', 5, 'tbsp'), e('pork-back-fat', 100, 'g'), e('onion', 1, 'pc'), o('chashu', 1, 'pack'), o('menma', 40, 'g')],
    steps: [
      'Simmer the sardines in the stock for 15 minutes; strain.',
      'Simmer and mash the back fat.',
      'Thick noodles, soy, soup — then cover the surface with back fat; top with chopped onion, chashu, menma.',
    ],
    basics: ['basic-wafu-dashi', 'basic-shoyu-tare', 'basic-aroma-oils'],
    authentic: {
      minutes: 360,
      ingredients: [N('thick-ramen-noodles'), e('niboshi', 80, 'g'), e('pork-bones', 1, 'kg'), ...SHOYU_TARE, e('pork-back-fat', 200, 'g'), e('onion', 1, 'pc'), e('pork-belly-block', 400, 'g')],
      steps: ['Pork stock with a large amount of niboshi.', 'Seabura (Aroma Oils), lots of it.', 'Assemble with onion.'],
    },
  },
  {
    id: 'nagaoka-ginger', kind: 'ramen', name: 'Nagaoka Ginger Shoyu Ramen', nameJa: '長岡生姜醤油ラーメン', region: 'Niigata', soup: 'shoyu', tint: '#5E3016',
    blurb: 'Dark shoyu sharpened with lots of ginger — a warming winter bowl.',
    art: { vessel: 'bowl', soup: '#5E3016', noodle: 'wavy', top: ['chashu', 'menma', 'nori', 'scallion'] },
    minutes: 20, serves: 2,
    ingredients: [N(), e('chicken-stock', 700, 'ml'), e('soy-sauce', 5, 'tbsp'), e('ginger', 2, 'pc'), ...QUICK_TOP],
    steps: ['Grate the ginger; simmer half in the stock 5 minutes.', 'Bowl: dark soy, stock, a pinch of fresh ginger.', 'Classic toppings.'],
    basics: ['basic-chintan', 'basic-shoyu-tare'],
    authentic: {
      minutes: 300,
      ingredients: [N(), ...CHINTAN, e('pork-bones', 0.5, 'kg'), ...SHOYU_TARE, e('ginger', 3, 'pc'), ...HOME_TOP],
      steps: ['Pork-chicken stock simmered with a whole ginger root.', 'Ginger-infused Shoyu Tare.', 'Classic toppings.'],
    },
  },
  {
    id: 'niboshi', kind: 'ramen', name: 'Niboshi Ramen', nameJa: '煮干しラーメン', region: 'Aomori', soup: 'niboshi', tint: '#9C8058',
    blurb: 'Grey-brown sardine soup, bitter-savoury and bold.',
    art: { vessel: 'bowl', soup: '#9C8058', noodle: 'thin', top: ['chashu', 'menma', 'onion', 'nori'] },
    minutes: 30, serves: 2,
    ingredients: [N('thin-ramen-noodles'), e('niboshi', 50, 'g'), e('chicken-stock', 600, 'ml'), e('soy-sauce', 4, 'tbsp'), o('kombu', 5, 'g'), o('onion', 1, 'pc'), o('chashu', 1, 'pack'), o('menma', 40, 'g'), o('nori', 1, 'pack')],
    steps: [
      'Soak sardines and kombu in the stock 30 minutes, then simmer 15 minutes; strain.',
      'Bowl: soy, soup. Thin noodles.',
      'Top with chashu, menma, chopped onion, nori.',
    ],
    basics: ['basic-wafu-dashi', 'basic-chintan', 'basic-shoyu-tare'],
    authentic: {
      minutes: 360,
      ingredients: [N('thin-ramen-noodles'), e('niboshi', 150, 'g'), ...CHINTAN, ...SHOYU_TARE, e('pork-belly-block', 400, 'g'), o('onion', 1, 'pc')],
      steps: ['Boil a heavy load of sardines hard for a cloudy “sementos” soup, or gently for clear.', 'Blend with Clear Chicken Stock.', 'Shoyu Tare; classic toppings.'],
    },
  },
  {
    id: 'tori-paitan', kind: 'ramen', name: 'Tori Paitan Ramen', nameJa: '鶏白湯ラーメン', region: 'Modern', soup: 'paitan', tint: '#F2E3B8',
    blurb: 'Creamy chicken soup with tender chicken chashu.',
    art: { vessel: 'bowl', soup: '#F2E3B8', noodle: 'wavy', top: ['chashu', 'egg', 'scallion', 'yuzu'] },
    minutes: 30, serves: 2,
    ingredients: [N(), e('chicken-stock', 500, 'ml'), e('soy-milk', 200, 'ml'), e('chicken-thigh', 200, 'g'), e('salt', 6, 'g'), o('garlic', 1, 'pc'), o('egg', 2, 'pc'), o('scallion', 1, 'bunch'), o('yuzu', 1, 'pc')],
    steps: [
      'Poach the chicken thigh in the stock 15 minutes; slice.',
      'Blend the stock with soy milk and garlic until frothy; season with salt.',
      SERVE,
      'Top with chicken slices, egg, scallion and a strip of yuzu peel.',
    ],
    basics: ['basic-paitan', 'basic-shio-tare', 'basic-ajitama'],
    authentic: {
      minutes: 360,
      ingredients: [N(), e('chicken-carcass', 3, 'pc'), e('chicken-wings', 500, 'g'), e('salt', 30, 'g'), e('kombu', 10, 'g'), e('chicken-thigh', 300, 'g'), e('egg', 2, 'pc'), o('yuzu', 1, 'pc')],
      steps: ['Chicken Paitan Stock, blended for body.', 'Shio Tare.', 'Low-temperature chicken chashu (63°C, 2 hours).'],
    },
  },
  {
    id: 'tantanmen', kind: 'ramen', name: 'Tantanmen', nameJa: '担々麺', region: 'Japanese-Chinese', soup: 'spicy', tint: '#D9893A',
    blurb: 'Sesame-rich, chili-oil-red soup with spiced ground pork.',
    art: { vessel: 'bowl', soup: '#D9893A', noodle: 'wavy', top: ['ground-pork', 'bok-choy', 'chili-oil', 'scallion'] },
    minutes: 25, serves: 2,
    ingredients: [N(), e('chicken-stock', 600, 'ml'), e('sesame-paste', 60, 'g'), e('ground-meat', 150, 'g'), e('chili-oil', 2, 'tbsp'), e('soy-sauce', 3, 'tbsp'), o('doubanjiang', 15, 'g'), o('soy-milk', 100, 'ml'), o('sichuan-pepper', 2, 'g'), o('bok-choy', 2, 'pc'), o('garlic', 1, 'pc'), o('scallion', 1, 'bunch')],
    steps: [
      'Fry the ground pork with garlic and chili bean paste until crisp.',
      'Bowl: sesame paste, soy and chili oil whisked smooth; add hot stock (and soy milk).',
      SERVE,
      'Top with the pork, blanched bok choy, scallion and ground Sichuan pepper.',
    ],
    basics: ['basic-chintan', 'basic-aroma-oils'],
    authentic: {
      minutes: 300,
      ingredients: [N(), ...CHINTAN, e('sesame-paste', 80, 'g'), e('ground-meat', 150, 'g'), e('chili-oil', 3, 'tbsp'), e('sichuan-pepper', 3, 'g'), e('soy-sauce', 3, 'tbsp'), o('doubanjiang', 15, 'g'), o('bok-choy', 2, 'pc')],
      steps: ['Clear Chicken Stock.', 'Make your own chili oil with toasted chili flakes and Sichuan pepper.', 'Assemble as quick route.'],
    },
  },
  {
    id: 'hiroshima-shirunashi', kind: 'ramen', name: 'Hiroshima Soupless Tantanmen', nameJa: '汁なし担担麺', region: 'Hiroshima', soup: 'soupless', tint: '#B83A22',
    blurb: 'No soup: noodles tossed in numbing chili oil, mix 30 times before eating.',
    art: { vessel: 'dry', noodle: 'thin', top: ['ground-pork', 'scallion', 'chili-oil', 'sesame'] },
    minutes: 15, serves: 2,
    ingredients: [N('thin-ramen-noodles'), e('chili-oil', 3, 'tbsp'), e('sichuan-pepper', 3, 'g'), e('soy-sauce', 2, 'tbsp'), e('ground-meat', 120, 'g'), o('rice-vinegar', 1, 'tbsp'), o('sesame-paste', 20, 'g'), o('scallion', 1, 'bunch'), o('rice', 1, 'cup')],
    steps: [
      'Fry the ground pork with a splash of soy until crisp.',
      'Bowl: chili oil, soy, vinegar, sesame paste and lots of ground Sichuan pepper.',
      'Add drained noodles, top with pork and scallion. Mix at least 30 times. Finish leftover sauce with rice.',
    ],
  },
  {
    id: 'katsuura-tantanmen', kind: 'ramen', name: 'Katsuura Tantanmen', nameJa: '勝浦タンタンメン', region: 'Chiba', soup: 'spicy', tint: '#C4462A',
    blurb: 'Soy soup under a red layer of chili oil with sweet sautéed onion — no sesame.',
    art: { vessel: 'bowl', soup: '#C4462A', noodle: 'wavy', top: ['onion', 'ground-pork', 'chili-oil'] },
    minutes: 20, serves: 2,
    ingredients: [N(), e('chicken-stock', 700, 'ml'), e('soy-sauce', 4, 'tbsp'), e('chili-oil', 4, 'tbsp'), e('onion', 1, 'pc'), e('ground-meat', 120, 'g'), o('garlic', 1, 'pc')],
    steps: ['Sauté onion, garlic and pork in the chili oil until soft and sweet.', 'Add stock and soy; boil 1 minute.', SERVE],
  },
  {
    id: 'karamiso', kind: 'ramen', name: 'Spicy Miso Ramen', nameJa: '辛味噌ラーメン', region: 'Yamagata', soup: 'miso', tint: '#B9572A',
    blurb: 'Miso ramen with a ball of fiery chili miso to stir in.',
    art: { vessel: 'bowl', soup: '#C26A30', noodle: 'thick', top: ['chili-oil', 'chashu', 'sprouts', 'scallion'] },
    minutes: 25, serves: 2,
    ingredients: [N('thick-ramen-noodles'), e('chicken-stock', 700, 'ml'), e('miso', 80, 'g'), e('doubanjiang', 20, 'g'), o('chili-oil', 1, 'tbsp'), o('garlic', 1, 'pc'), o('bean-sprouts', 1, 'pack'), o('chashu', 1, 'pack'), o('scallion', 1, 'bunch')],
    steps: ['Mix doubanjiang, a little miso and garlic into a chili-miso ball.', 'Whisk the rest of the miso into hot stock.', 'Thick noodles; top with sprouts, chashu, scallion and the chili ball.'],
  },
  {
    id: 'taiwan-ramen', kind: 'ramen', name: 'Taiwan Ramen', nameJa: '台湾ラーメン', region: 'Nagoya', soup: 'spicy', tint: '#B45A2A',
    blurb: 'Nagoya’s fiery soy soup with chili-garlic pork and garlic chives.',
    art: { vessel: 'bowl', soup: '#A8642A', noodle: 'thin', top: ['ground-pork', 'nira', 'chili-oil'] },
    minutes: 20, serves: 2,
    ingredients: [N('thin-ramen-noodles'), e('chicken-stock', 700, 'ml'), e('soy-sauce', 4, 'tbsp'), e('ground-meat', 150, 'g'), e('garlic', 2, 'pc'), o('chili-oil', 2, 'tbsp'), o('doubanjiang', 15, 'g'), o('nira', 1, 'bunch'), o('sugar', 3, 'g')],
    steps: ['Fry pork with lots of garlic, chili bean paste and a pinch of sugar.', 'Bowl: soy, stock. Thin noodles.', 'Top with the fiery pork and chopped garlic chives.'],
  },
  {
    id: 'taiwan-mazesoba', kind: 'ramen', name: 'Taiwan Mazesoba', nameJa: '台湾まぜそば', region: 'Nagoya', soup: 'soupless', tint: '#9A4A20',
    blurb: 'Thick noodles, spicy pork, raw yolk, nira, nori — mix and finish with rice.',
    art: { vessel: 'dry', noodle: 'thick', top: ['ground-pork', 'raw-egg', 'nira', 'nori', 'garlic-chips'] },
    minutes: 20, serves: 2,
    ingredients: [N('thick-ramen-noodles'), e('ground-meat', 150, 'g'), e('egg', 2, 'pc'), e('soy-sauce', 3, 'tbsp'), e('garlic', 2, 'pc'), o('chili-oil', 2, 'tbsp'), o('doubanjiang', 15, 'g'), o('nira', 1, 'bunch'), o('nori', 1, 'pack'), o('katsuobushi', 1, 'pack'), o('rice', 1, 'cup'), o('rice-vinegar', 1, 'tbsp')],
    steps: ['Fry pork with chili, garlic and soy.', 'Bowl: soy and chili oil; add thick noodles.', 'Top with pork, a raw yolk, nira, nori, bonito and raw garlic. Mix well; add rice to the leftover sauce (oimeshi).'],
  },
  {
    id: 'abura-soba', kind: 'ramen', name: 'Abura Soba', nameJa: '油そば', region: 'Tokyo', soup: 'soupless', tint: '#8E5A2C',
    blurb: 'Soupless noodles in soy tare and aroma oil; add vinegar and chili oil to taste.',
    art: { vessel: 'dry', noodle: 'thick', top: ['chashu', 'menma', 'scallion', 'nori'] },
    minutes: 15, serves: 2,
    ingredients: [N('thick-ramen-noodles'), e('soy-sauce', 3, 'tbsp'), e('sesame-oil', 2, 'tbsp'), o('oyster-sauce', 1, 'tbsp'), o('rice-vinegar', 1, 'tbsp'), o('chili-oil', 1, 'tbsp'), o('chashu', 1, 'pack'), o('menma', 40, 'g'), o('scallion', 1, 'bunch'), o('nori', 1, 'pack')],
    steps: ['Bowl: soy, oyster sauce, sesame oil (or lard).', 'Add drained thick noodles and toss.', 'Top with chashu, menma, scallion; add vinegar and chili oil at the table.'],
  },
  {
    id: 'tsukemen', kind: 'ramen', name: 'Tsukemen', nameJa: 'つけ麺', region: 'Tokyo', soup: 'dipping', tint: '#7A4A22',
    blurb: 'Cold thick noodles dipped into a thick, tangy pork-and-fish broth.',
    art: { vessel: 'tsuke', soup: '#7A4A22', noodle: 'thick', top: ['chashu', 'egg', 'menma', 'nori'] },
    minutes: 25, serves: 2,
    ingredients: [N('thick-ramen-noodles'), e('tonkotsu-base', 60, 'ml'), e('chicken-stock', 300, 'ml'), e('soy-sauce', 4, 'tbsp'), e('katsuobushi', 1, 'pack'), o('niboshi', 10, 'g'), o('rice-vinegar', 1, 'tbsp'), o('sugar', 5, 'g'), ...QUICK_TOP],
    steps: [
      'Simmer stock, concentrate, soy, sugar and a little vinegar until thick; stir in crumbled bonito (fish powder).',
      'Boil thick noodles 8–10 minutes, then rinse in ice water so they are firm and glossy.',
      'Serve noodles and toppings on one plate, the hot dip in a separate bowl.',
      'When finished, ask for soup-wari: thin the leftover dip with hot dashi and drink it.',
    ],
    basics: ['basic-tonkotsu', 'basic-wafu-dashi', 'basic-shoyu-tare', 'basic-noodles'],
    authentic: {
      minutes: 780,
      ingredients: [N('thick-ramen-noodles'), ...TONKOTSU, e('chicken-carcass', 1, 'pc'), e('niboshi', 40, 'g'), e('katsuobushi', 1, 'pack'), ...SHOYU_TARE, o('rice-vinegar', 1, 'tbsp'), ...HOME_TOP],
      steps: ['Very concentrated Tonkotsu Stock with chicken, blended with Seafood Dashi (gyokai-tonkotsu).', 'Double-strength Shoyu Tare with a touch of sugar and vinegar.', 'Extra-thick Homemade Ramen Noodles.'],
    },
  },
  {
    id: 'hiyashi-chuka', kind: 'ramen', name: 'Hiyashi Chuka', nameJa: '冷やし中華', region: 'Summer', soup: 'chilled', tint: '#E8A33C',
    blurb: 'Chilled noodles with colourful strips and a tangy soy-vinegar dressing.',
    art: { vessel: 'chilled', noodle: 'wavy', top: ['chilled-strips'] },
    minutes: 25, serves: 2,
    ingredients: [N(), e('soy-sauce', 3, 'tbsp'), e('rice-vinegar', 3, 'tbsp'), e('sugar', 15, 'g'), e('cucumber', 1, 'pc'), e('egg', 2, 'pc'), o('ham', 1, 'pack'), o('tomato', 1, 'pc'), o('sesame-oil', 1, 'tbsp'), o('japanese-mustard', 5, 'g'), o('pickled-ginger', 15, 'g')],
    steps: [
      'Whisk soy, vinegar, sugar, sesame oil and 2 tbsp water; chill.',
      'Make a thin omelette and cut into strips; cut cucumber and ham into matchsticks; wedge the tomato.',
      'Boil the noodles, rinse in ice water, drain well.',
      'Arrange the toppings in rows over the noodles, pour over the dressing, add mustard and pickled ginger.',
    ],
  },
  {
    id: 'champon', kind: 'ramen', name: 'Nagasaki Champon', nameJa: 'ちゃんぽん', region: 'Nagasaki', soup: 'tonkotsu', tint: '#EADBC0',
    blurb: 'Milky pork-and-chicken soup loaded with stir-fried seafood and vegetables.',
    art: { vessel: 'bowl', soup: '#EADBC0', noodle: 'thick', top: ['seafood', 'cabbage', 'naruto', 'sprouts'] },
    minutes: 25, serves: 2,
    ingredients: [N('thick-ramen-noodles'), e('chicken-stock', 600, 'ml'), e('seafood-mix', 200, 'g'), e('cabbage', 1, 'pc'), o('pork-sliced', 100, 'g'), o('bean-sprouts', 1, 'pack'), o('carrot', 1, 'pc'), o('naruto', 1, 'pc'), o('milk', 100, 'ml'), o('lard', 15, 'g')],
    steps: [
      'Stir-fry pork, seafood and vegetables in lard over high heat.',
      'Add the stock (and a little milk for creaminess); season with salt.',
      'Cook the noodles directly in the soup for 2 minutes, then pour everything into bowls.',
    ],
  },
  {
    id: 'okinawa-soba', kind: 'ramen', name: 'Okinawa Soba', nameJa: '沖縄そば', region: 'Okinawa', soup: 'shio', tint: '#E0C080',
    blurb: 'Bonito-pork broth, thick wheat noodles and soft-braised spare ribs.',
    art: { vessel: 'bowl', soup: '#E2C27E', noodle: 'thick', top: ['ribs', 'naruto', 'scallion', 'beni-shoga'] },
    minutes: 60, serves: 2,
    ingredients: [N('thick-ramen-noodles'), e('pork-ribs', 400, 'g'), e('dashi', 400, 'ml'), e('soy-sauce', 3, 'tbsp'), e('sugar', 20, 'g'), o('sake', 50, 'ml'), o('salt', 3, 'g'), o('naruto', 1, 'pc'), o('scallion', 1, 'bunch'), o('pickled-ginger', 20, 'g')],
    steps: [
      'Pressure-cook the ribs in water 25 minutes; keep the broth.',
      'Simmer the ribs in soy, sugar and sake until glazed.',
      'Mix pork broth and dashi 2 : 1, season with salt and a little soy.',
      'Thick noodles; top with ribs, fish cake, scallion and red pickled ginger.',
    ],
  },
  {
    id: 'tenri', kind: 'ramen', name: 'Tenri Stamina Ramen', nameJa: '天理ラーメン', region: 'Nara', soup: 'spicy', tint: '#B45A2A',
    blurb: 'Garlicky, spicy soy soup with a heap of stir-fried napa cabbage.',
    art: { vessel: 'bowl', soup: '#B45A2A', noodle: 'thick', top: ['cabbage', 'nira', 'chili-oil'] },
    minutes: 20, serves: 2,
    ingredients: [N('thick-ramen-noodles'), e('chicken-stock', 700, 'ml'), e('soy-sauce', 4, 'tbsp'), e('napa-cabbage', 1, 'pc'), e('garlic', 2, 'pc'), o('pork-sliced', 100, 'g'), o('doubanjiang', 15, 'g'), o('nira', 1, 'bunch'), o('chili-oil', 1, 'tbsp')],
    steps: ['Stir-fry pork, garlic and plenty of napa cabbage with chili bean paste.', 'Add stock and soy; simmer 3 minutes.', SERVE],
  },
  {
    id: 'takaida', kind: 'ramen', name: 'Takaida-style Ramen', nameJa: '高井田ラーメン', region: 'Osaka', soup: 'shoyu', tint: '#3E200C',
    blurb: 'Near-black shoyu with very thick straight noodles.',
    art: { vessel: 'bowl', soup: '#40220E', noodle: 'thick', top: ['chashu', 'scallion', 'menma'] },
    minutes: 20, serves: 2,
    ingredients: [N('thick-ramen-noodles'), e('chicken-stock', 600, 'ml'), e('soy-sauce', 6, 'tbsp'), o('chashu', 1, 'pack'), o('scallion', 1, 'bunch'), o('menma', 40, 'g')],
    steps: ['Bowl: a lot of dark soy, then stock.', 'Very thick straight noodles.', 'Chashu, menma, scallion.'],
  },
  {
    id: 'sanmamen', kind: 'ramen', name: 'Sanmamen', nameJa: 'サンマーメン', region: 'Yokohama', soup: 'shoyu', tint: '#A0602A',
    blurb: 'Shoyu ramen under a glossy sauce of stir-fried bean sprouts and pork.',
    art: { vessel: 'bowl', soup: '#A86A30', noodle: 'thin', top: ['starch-sauce', 'sprouts'] },
    minutes: 20, serves: 2,
    ingredients: [N('thin-ramen-noodles'), e('chicken-stock', 700, 'ml'), e('soy-sauce', 4, 'tbsp'), e('bean-sprouts', 1, 'pack'), e('potato-starch', 10, 'g'), o('pork-sliced', 100, 'g'), o('cabbage', 1, 'pc'), o('oyster-sauce', 1, 'tbsp')],
    steps: ['Stir-fry pork, sprouts and cabbage; add 150 ml stock and oyster sauce, then thicken with starch.', 'Bowl: soy, remaining stock, noodles.', 'Pour the hot thick topping over.'],
  },
  {
    id: 'karamen', kind: 'ramen', name: 'Miyazaki Karamen', nameJa: '辛麺', region: 'Miyazaki', soup: 'spicy', tint: '#B83A22',
    blurb: 'Red garlic-soy soup with whisked egg, nira and ground meat.',
    art: { vessel: 'bowl', soup: '#B83A22', noodle: 'thick', top: ['nira', 'ground-pork', 'chili-oil'] },
    minutes: 20, serves: 2,
    ingredients: [N('thick-ramen-noodles'), e('chicken-stock', 700, 'ml'), e('soy-sauce', 3, 'tbsp'), e('egg', 2, 'pc'), e('garlic', 2, 'pc'), e('chili-oil', 2, 'tbsp'), o('ground-meat', 100, 'g'), o('nira', 1, 'bunch')],
    steps: ['Fry garlic and meat, add stock, soy and chili.', 'Drizzle in beaten egg and add nira.', 'Pour over the noodles.'],
  },
  {
    id: 'miso-butter-corn', kind: 'ramen', name: 'Miso Butter Corn Ramen', nameJa: '味噌バターコーン', region: 'Hokkaido', soup: 'miso', tint: '#D09A40',
    blurb: 'The comfort version: sweet corn, melting butter, miso.',
    art: { vessel: 'bowl', soup: '#D09A40', noodle: 'wavy', top: ['corn', 'butter', 'scallion', 'nori'] },
    minutes: 15, serves: 2,
    ingredients: [N(), e('chicken-stock', 700, 'ml'), e('miso', 70, 'g'), e('corn', 120, 'g'), e('butter', 30, 'g'), o('garlic', 1, 'pc'), o('scallion', 1, 'bunch'), o('nori', 1, 'pack')],
    steps: ['Whisk miso and grated garlic into hot stock.', SERVE, 'Top with a big spoon of corn, a slab of butter, scallion and nori.'],
  },
  {
    id: 'tomato-ramen', kind: 'ramen', name: 'Tomato Ramen', nameJa: 'トマトラーメン', region: 'Modern', soup: 'shio', tint: '#C8462A',
    blurb: 'Bright tomato-chicken soup finished with cheese and olive oil.',
    art: { vessel: 'bowl', soup: '#C8462A', noodle: 'thin', top: ['tomato', 'cheese', 'chashu'] },
    minutes: 20, serves: 2,
    ingredients: [N('thin-ramen-noodles'), e('chicken-stock', 500, 'ml'), e('tomato', 3, 'pc'), e('garlic', 1, 'pc'), o('cheese', 30, 'g'), o('salt', 4, 'g'), o('chashu', 1, 'pack')],
    steps: ['Cook garlic and chopped tomato until broken down; add stock and blend.', 'Season with salt.', 'Thin noodles; top with cheese and chashu.'],
  },
]

export const RAMEN_BASICS: Recipe[] = BASICS_RAW.map(tidyRecipe)
export const RAMEN: Recipe[] = RAMEN_RAW.map(tidyRecipe)
