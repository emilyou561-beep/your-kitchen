import { e, o } from './recipeTypes'
import type { Recipe } from './recipeTypes'
import { RAMEN, RAMEN_BASICS } from './ramen'

export type { Recipe, RecipeIngredient, RecipeKind, Route, RouteId, SoupType, RamenArtSpec, Topping } from './recipeTypes'
export { routeOf, artFor, formatMinutes, SOUP_LABEL } from './recipeTypes'

type SideDraft = Omit<Recipe, 'kind'>

/** Japanese home dishes — now shown as sides next to the ramen. */
const SIDE_DRAFTS: SideDraft[] = [
  {
    id: 'nikujaga', name: 'Nikujaga', nameJa: '肉じゃが', blurb: 'Beef and potatoes simmered sweet and savory.',
    minutes: 35, serves: 3, tint: '#C9894A',
    ingredients: [
      e('beef-sliced', 200, 'g'), e('potato', 3, 'pc'), e('onion', 1, 'pc'), e('soy-sauce', 3, 'tbsp'),
      e('mirin', 2, 'tbsp'), e('sugar', 15, 'g'), o('carrot', 1, 'pc'), o('snap-peas', 50, 'g'), o('dashi', 300, 'ml'),
    ],
    steps: [
      'Cut potatoes and carrot into large chunks; slice the onion into wedges.',
      'Brown the beef in a little oil, then add onion, potatoes and carrot.',
      'Add dashi (or water), sugar, mirin and soy sauce. Cover with a drop-lid and simmer 15–20 minutes.',
      'Add snap peas for the last 2 minutes. Rest 5 minutes so the potatoes soak up the broth.',
    ],
  },
  {
    id: 'oyakodon', name: 'Oyakodon', nameJa: '親子丼', blurb: 'Chicken and soft egg over rice.',
    minutes: 20, serves: 2, tint: '#E0B04A',
    ingredients: [
      e('chicken-thigh', 250, 'g'), e('egg', 3, 'pc'), e('onion', 1, 'pc'), e('rice', 1, 'cup'),
      e('soy-sauce', 2, 'tbsp'), e('mirin', 2, 'tbsp'), o('dashi', 150, 'ml'), o('scallion', 1, 'bunch'), o('nori', 1, 'pack'),
    ],
    steps: [
      'Cook the rice. Slice onion thinly and cut chicken into bite-size pieces.',
      'Simmer onion in dashi, soy sauce and mirin for 3 minutes; add chicken and cook through.',
      'Pour lightly beaten eggs over the top, cover for 30 seconds — keep it soft.',
      'Slide onto hot rice and finish with scallion.',
    ],
  },
  {
    id: 'gyudon', name: 'Gyūdon', nameJa: '牛丼', blurb: 'Simmered beef and onion rice bowl.',
    minutes: 20, serves: 2, tint: '#9A5A2E',
    ingredients: [
      e('beef-sliced', 250, 'g'), e('onion', 1, 'pc'), e('rice', 1, 'cup'), e('soy-sauce', 3, 'tbsp'), e('mirin', 2, 'tbsp'),
      o('sugar', 10, 'g'), o('dashi', 200, 'ml'), o('pickled-ginger', 20, 'g'), o('egg', 2, 'pc'),
    ],
    steps: [
      'Cook the rice. Slice the onion into thin half-moons.',
      'Simmer onion in dashi, soy sauce, mirin and sugar until soft.',
      'Add the beef, loosen with chopsticks and simmer 2–3 minutes, skimming any foam.',
      'Spoon over rice with its broth. Top with pickled ginger, or a raw egg yolk.',
    ],
  },
  {
    id: 'miso-soup', name: 'Miso Soup', nameJa: '味噌汁', blurb: 'Tofu, wakame and scallion in dashi.',
    minutes: 10, serves: 2, tint: '#B98A55',
    ingredients: [e('miso', 36, 'g'), e('dashi', 500, 'ml'), o('tofu', 1, 'pack'), o('wakame', 5, 'g'), o('scallion', 1, 'bunch'), o('aburaage', 1, 'pc')],
    steps: [
      'Warm the dashi until just below a simmer.',
      'Add cubed tofu and wakame; heat for 1 minute.',
      'Turn off the heat, dissolve the miso through a ladle, and top with scallion.',
    ],
  },
  {
    id: 'tonjiru', name: 'Tonjiru', nameJa: '豚汁', blurb: 'Hearty pork and root-vegetable miso soup.',
    minutes: 30, serves: 4, tint: '#A8743E',
    ingredients: [
      e('pork-sliced', 150, 'g'), e('miso', 60, 'g'), e('dashi', 800, 'ml'), e('daikon', 1, 'pc'),
      o('carrot', 1, 'pc'), o('burdock', 1, 'pc'), o('konnyaku', 1, 'pack'), o('potato', 1, 'pc'), o('scallion', 1, 'bunch'), o('sesame-oil', 1, 'tbsp'),
    ],
    steps: [
      'Cut daikon and carrot into quarter-moons, burdock into thin slices, pork into bite-size pieces.',
      'Sauté pork in sesame oil, then add vegetables and konnyaku and stir for 2 minutes.',
      'Add dashi and simmer until the daikon is tender, about 15 minutes.',
      'Turn off the heat, dissolve the miso, and finish with scallion.',
    ],
  },
  {
    id: 'tamagoyaki', name: 'Tamagoyaki', nameJa: '玉子焼き', blurb: 'Rolled sweet omelette.',
    minutes: 15, serves: 2, tint: '#E8C35A',
    ingredients: [e('egg', 4, 'pc'), e('sugar', 15, 'g'), o('soy-sauce', 1, 'tsp'), o('dashi', 3, 'tbsp'), o('vegetable-oil', 1, 'tsp')],
    steps: [
      'Beat eggs with sugar, soy sauce and dashi.',
      'Pour a thin layer into an oiled pan; when nearly set, roll it to one side.',
      'Repeat, rolling each new layer around the first. Rest, then slice.',
    ],
  },
  {
    id: 'teriyaki-chicken', name: 'Teriyaki Chicken', nameJa: '照り焼き', blurb: 'Crisp chicken thigh in a glossy glaze.',
    minutes: 20, serves: 2, tint: '#8F4A2A',
    ingredients: [
      e('chicken-thigh', 300, 'g'), e('soy-sauce', 2, 'tbsp'), e('mirin', 2, 'tbsp'), e('sugar', 10, 'g'),
      o('sake', 2, 'tbsp'), o('cabbage', 1, 'pc'), o('sesame-seeds', 5, 'g'),
    ],
    steps: [
      'Pat chicken dry and cook skin-side down over medium heat until crisp.',
      'Flip, cook through, and wipe out excess fat.',
      'Add soy sauce, mirin, sake and sugar; spoon over until glossy. Serve with shredded cabbage.',
    ],
  },
  {
    id: 'karaage', name: 'Karaage', nameJa: '唐揚げ', blurb: 'Soy-ginger marinated fried chicken.',
    minutes: 40, serves: 3, tint: '#B86A2A',
    ingredients: [
      e('chicken-thigh', 400, 'g'), e('soy-sauce', 2, 'tbsp'), e('ginger', 1, 'pc'), e('potato-starch', 60, 'g'), e('vegetable-oil', 500, 'ml'),
      o('garlic', 1, 'pc'), o('sake', 1, 'tbsp'), o('mayonnaise', 30, 'g'),
    ],
    steps: [
      'Cut chicken into large bite-size pieces. Marinate with soy sauce, sake, grated ginger and garlic for 20 minutes.',
      'Coat each piece in potato starch.',
      'Fry at 170°C for 4 minutes, rest 3 minutes, then fry again at 190°C for 1 minute until crisp.',
      'Serve with lemon and a little mayonnaise.',
    ],
  },
  {
    id: 'shogayaki', name: 'Buta no Shōgayaki', nameJa: '生姜焼き', blurb: 'Ginger pork, the lunch-counter classic.',
    minutes: 15, serves: 2, tint: '#A0603A',
    ingredients: [
      e('pork-sliced', 250, 'g'), e('ginger', 1, 'pc'), e('soy-sauce', 2, 'tbsp'), e('mirin', 2, 'tbsp'),
      o('onion', 1, 'pc'), o('sake', 1, 'tbsp'), o('cabbage', 1, 'pc'),
    ],
    steps: [
      'Grate the ginger and mix with soy sauce, mirin and sake.',
      'Fry the pork and onion until browned.',
      'Pour in the ginger sauce and toss until coated. Serve with shredded cabbage and rice.',
    ],
  },
  {
    id: 'tonkatsu', name: 'Tonkatsu', nameJa: 'とんかつ', blurb: 'Panko-crusted pork cutlet.',
    minutes: 30, serves: 2, tint: '#C98A3E',
    ingredients: [
      e('pork-loin', 2, 'pc'), e('egg', 1, 'pc'), e('flour', 30, 'g'), e('panko', 80, 'g'), e('vegetable-oil', 500, 'ml'),
      o('tonkatsu-sauce', 3, 'tbsp'), o('cabbage', 1, 'pc'), o('salt', 2, 'g'),
    ],
    steps: [
      'Snip the fat along the edge of each cutlet so it stays flat; season with salt.',
      'Dredge in flour, dip in beaten egg, then press firmly into panko.',
      'Fry at 170°C for about 5 minutes, turning once, until deep golden. Rest 2 minutes before slicing.',
      'Serve with shredded cabbage and tonkatsu sauce.',
    ],
  },
  {
    id: 'hambagu', name: 'Hambāgu', nameJa: 'ハンバーグ', blurb: 'Juicy Japanese hamburg steak.',
    minutes: 35, serves: 2, tint: '#7E4424',
    ingredients: [
      e('ground-meat', 300, 'g'), e('onion', 1, 'pc'), e('panko', 30, 'g'), e('egg', 1, 'pc'),
      o('milk', 3, 'tbsp'), o('ketchup', 40, 'g'), o('tonkatsu-sauce', 2, 'tbsp'), o('butter', 10, 'g'),
    ],
    steps: [
      'Finely chop and sauté the onion; let it cool. Soak panko in milk.',
      'Knead meat, onion, panko, egg and a pinch of salt until sticky. Shape two thick ovals, pressing a dent in the center.',
      'Brown both sides, then cover and cook on low for 8 minutes.',
      'In the same pan, simmer ketchup, tonkatsu sauce and butter into a glossy sauce.',
    ],
  },
  {
    id: 'omurice', name: 'Omurice', nameJa: 'オムライス', blurb: 'Ketchup chicken rice wrapped in omelette.',
    minutes: 25, serves: 2, tint: '#E2A33C',
    ingredients: [
      e('rice', 1, 'cup'), e('egg', 4, 'pc'), e('ketchup', 80, 'g'), e('onion', 1, 'pc'),
      o('chicken-thigh', 150, 'g'), o('butter', 20, 'g'), o('milk', 2, 'tbsp'),
    ],
    steps: [
      'Fry diced chicken and onion in butter; add cooked rice and ketchup and toss until evenly red.',
      'Beat 2 eggs with a splash of milk. Pour into a hot buttered pan and stir until just set.',
      'Place half the rice in the center, fold the omelette over and turn onto a plate.',
      'Repeat for the second serving. Finish with a line of ketchup.',
    ],
  },
  {
    id: 'saba-misoni', name: 'Saba Misoni', nameJa: '鯖の味噌煮', blurb: 'Mackerel simmered in ginger miso.',
    minutes: 25, serves: 2, tint: '#8C6A3A',
    ingredients: [
      e('mackerel', 2, 'pc'), e('miso', 40, 'g'), e('ginger', 1, 'pc'), e('sugar', 20, 'g'),
      o('sake', 50, 'ml'), o('mirin', 1, 'tbsp'), o('scallion', 1, 'bunch'),
    ],
    steps: [
      'Score the skin of the mackerel and pour boiling water over it to remove odor.',
      'Bring sake, 150 ml water, sugar and sliced ginger to a boil; add the fish skin-side up.',
      'Cover with a drop-lid and simmer 8 minutes. Dissolve the miso in some broth, add it back and simmer 5 more minutes, spooning sauce over.',
    ],
  },
  {
    id: 'shake-teishoku', name: 'Shio Salmon', nameJa: '塩鮭', blurb: 'Salt-grilled salmon, rice and pickles.',
    minutes: 20, serves: 2, tint: '#D9774E',
    ingredients: [e('salmon', 2, 'pc'), e('rice', 1, 'cup'), o('salt', 3, 'g'), o('daikon', 1, 'pc'), o('soy-sauce', 1, 'tsp'), o('cucumber', 1, 'pc')],
    steps: [
      'Salt the salmon lightly and rest 10 minutes; pat dry.',
      'Grill or pan-fry skin-side first until crisp and just cooked.',
      'Serve with rice, grated daikon and a few drops of soy sauce.',
    ],
  },
  {
    id: 'mabo-dofu', name: 'Mābō Dōfu', nameJa: '麻婆豆腐', blurb: 'Japanese-style mapo tofu, gently spicy.',
    minutes: 20, serves: 3, tint: '#B24A2A',
    ingredients: [
      e('tofu', 1, 'pack'), e('ground-meat', 150, 'g'), e('doubanjiang', 15, 'g'), e('potato-starch', 10, 'g'),
      o('garlic', 1, 'pc'), o('ginger', 1, 'pc'), o('scallion', 1, 'bunch'), o('miso', 15, 'g'), o('soy-sauce', 1, 'tbsp'), o('sesame-oil', 1, 'tsp'),
    ],
    steps: [
      'Cut tofu into cubes and warm them in salted simmering water.',
      'Fry garlic, ginger and meat; add chili bean paste and miso and fry until fragrant.',
      'Add 200 ml water and soy sauce, then the tofu. Simmer 3 minutes.',
      'Thicken with potato starch mixed in water. Finish with scallion and sesame oil.',
    ],
  },
  {
    id: 'hiyayakko', name: 'Hiyayakko', nameJa: '冷奴', blurb: 'Chilled tofu with ginger and bonito.',
    minutes: 5, serves: 2, tint: '#E9E2CF',
    ingredients: [e('tofu', 1, 'pack'), e('soy-sauce', 1, 'tbsp'), o('ginger', 1, 'pc'), o('scallion', 1, 'bunch'), o('katsuobushi', 1, 'pack')],
    steps: ['Drain the tofu and cut into two blocks.', 'Top with grated ginger, scallion and bonito flakes. Drizzle with soy sauce just before eating.'],
  },
  {
    id: 'yaki-udon', name: 'Yaki Udon', nameJa: '焼きうどん', blurb: 'Stir-fried udon with pork and cabbage.',
    minutes: 15, serves: 2, tint: '#C7A36A',
    ingredients: [
      e('udon', 2, 'pack'), e('soy-sauce', 2, 'tbsp'), o('pork-sliced', 150, 'g'), o('cabbage', 1, 'pc'),
      o('carrot', 1, 'pc'), o('shiitake', 3, 'pc'), o('katsuobushi', 1, 'pack'), o('vegetable-oil', 1, 'tbsp'),
    ],
    steps: ['Loosen udon in hot water and drain.', 'Stir-fry pork, then vegetables until just tender.', 'Add udon and soy sauce; toss over high heat. Top with bonito flakes.'],
  },
  {
    id: 'yakisoba', name: 'Yakisoba', nameJa: '焼きそば', blurb: 'Festival-style fried noodles.',
    minutes: 15, serves: 2, tint: '#8E5A2C',
    ingredients: [
      e('yakisoba-noodles', 2, 'pack'), e('tonkatsu-sauce', 4, 'tbsp'), o('pork-sliced', 150, 'g'), o('cabbage', 1, 'pc'),
      o('bean-sprouts', 1, 'pack'), o('carrot', 1, 'pc'), o('aonori', 1, 'pack'), o('pickled-ginger', 20, 'g'),
    ],
    steps: ['Stir-fry pork, then cabbage, carrot and bean sprouts.', 'Add the noodles with a splash of water and loosen.', 'Toss with sauce until coated. Top with aonori and pickled ginger.'],
  },
  {
    id: 'zaru-soba', name: 'Zaru Soba', nameJa: 'ざるそば', blurb: 'Chilled buckwheat noodles with dipping sauce.',
    minutes: 15, serves: 2, tint: '#7D6A4A',
    ingredients: [e('soba', 200, 'g'), e('soy-sauce', 3, 'tbsp'), e('mirin', 3, 'tbsp'), e('dashi', 200, 'ml'), o('scallion', 1, 'bunch'), o('nori', 1, 'pack')],
    steps: [
      'Simmer dashi, soy sauce and mirin for 1 minute; chill the dipping sauce.',
      'Boil soba per the packet, then rinse under cold running water until cool.',
      'Serve on a tray with shredded nori; dip each bite with a little scallion.',
    ],
  },
  {
    id: 'kare-raisu', name: 'Japanese Curry', nameJa: 'カレーライス', blurb: 'Mild, thick home-style curry over rice.',
    minutes: 45, serves: 4, tint: '#A8692C',
    ingredients: [
      e('curry-roux', 1, 'pack'), e('onion', 2, 'pc'), e('potato', 2, 'pc'), e('rice', 2, 'cup'),
      o('carrot', 1, 'pc'), o('pork-sliced', 250, 'g'), o('pickled-ginger', 20, 'g'),
    ],
    steps: [
      'Brown the meat and onion; add potato and carrot.',
      'Cover with water and simmer 20 minutes until tender.',
      'Turn off the heat, melt in the roux, then simmer 5 more minutes. Serve over rice.',
    ],
  },
  {
    id: 'okonomiyaki', name: 'Okonomiyaki', nameJa: 'お好み焼き', blurb: 'Savory cabbage pancake, Osaka style.',
    minutes: 30, serves: 2, tint: '#B87A3A',
    ingredients: [
      e('cabbage', 1, 'pc'), e('flour', 100, 'g'), e('egg', 2, 'pc'), e('dashi', 120, 'ml'),
      o('pork-sliced', 100, 'g'), o('tonkatsu-sauce', 3, 'tbsp'), o('mayonnaise', 30, 'g'), o('katsuobushi', 1, 'pack'), o('aonori', 1, 'pack'), o('pickled-ginger', 15, 'g'),
    ],
    steps: [
      'Whisk flour, dashi and eggs; fold in finely shredded cabbage and chopped pickled ginger.',
      'Pour into a hot oiled pan as a thick round; lay pork slices on top.',
      'Cook 5 minutes, flip, and cook 5 more until the pork is crisp.',
      'Brush with sauce, zig-zag mayonnaise, and finish with bonito and aonori.',
    ],
  },
  {
    id: 'kinpira-gobo', name: 'Kinpira Gobō', nameJa: 'きんぴらごぼう', blurb: 'Burdock and carrot, sweet-soy sautéed.',
    minutes: 15, serves: 3, tint: '#7A5232',
    ingredients: [
      e('burdock', 1, 'pc'), e('soy-sauce', 1, 'tbsp'), e('mirin', 1, 'tbsp'), e('sesame-oil', 1, 'tbsp'),
      o('carrot', 1, 'pc'), o('sugar', 5, 'g'), o('sesame-seeds', 5, 'g'),
    ],
    steps: [
      'Cut burdock and carrot into matchsticks; soak burdock briefly in water.',
      'Sauté in sesame oil until slightly soft.',
      'Add soy sauce, mirin and sugar; cook until the liquid is gone. Finish with sesame.',
    ],
  },
  {
    id: 'kabocha-nimono', name: 'Kabocha no Nimono', nameJa: 'かぼちゃの煮物', blurb: 'Kabocha squash simmered in sweet dashi.',
    minutes: 25, serves: 3, tint: '#D98E2C',
    ingredients: [e('kabocha', 400, 'g'), e('dashi', 300, 'ml'), e('soy-sauce', 1, 'tbsp'), e('sugar', 15, 'g'), o('mirin', 1, 'tbsp')],
    steps: [
      'Cut kabocha into chunks, leaving most of the skin on; bevel the edges.',
      'Place skin-side down in a pan with dashi, sugar and mirin; simmer 8 minutes with a drop-lid.',
      'Add soy sauce and simmer until tender. Let it cool in the broth.',
    ],
  },
  {
    id: 'horenso-ohitashi', name: 'Hōrensō no Ohitashi', nameJa: 'ほうれん草のお浸し', blurb: 'Blanched spinach in dashi-soy.',
    minutes: 10, serves: 2, tint: '#4E7A35',
    ingredients: [e('spinach', 1, 'bunch'), e('soy-sauce', 1, 'tbsp'), o('dashi', 50, 'ml'), o('katsuobushi', 1, 'pack'), o('sesame-seeds', 3, 'g')],
    steps: ['Blanch spinach for 40 seconds, cool in cold water and squeeze dry.', 'Cut into 4 cm lengths and dress with dashi and soy sauce.', 'Top with bonito flakes or sesame.'],
  },
  {
    id: 'nasu-dengaku', name: 'Nasu Dengaku', nameJa: '茄子田楽', blurb: 'Eggplant glazed with sweet miso.',
    minutes: 20, serves: 2, tint: '#5B3A5E',
    ingredients: [e('eggplant', 2, 'pc'), e('miso', 30, 'g'), e('sugar', 10, 'g'), e('mirin', 1, 'tbsp'), o('vegetable-oil', 2, 'tbsp'), o('sesame-seeds', 3, 'g')],
    steps: [
      'Halve eggplants lengthwise and score the flesh in a crosshatch.',
      'Pan-fry cut-side down until soft, then flip briefly.',
      'Mix miso, sugar and mirin; spread over the eggplant and grill until bubbling. Finish with sesame.',
    ],
  },
  {
    id: 'onigiri', name: 'Onigiri', nameJa: 'おにぎり', blurb: 'Rice balls with salmon or plum.',
    minutes: 15, serves: 2, tint: '#EDE6D2',
    ingredients: [e('rice', 1, 'cup'), e('salt', 3, 'g'), e('nori', 1, 'pack'), o('salmon', 1, 'pc'), o('umeboshi', 2, 'pc')],
    steps: [
      'Cook the rice and let it cool slightly.',
      'Wet and salt your hands; take a palmful of rice and press a dent for the filling.',
      'Add flaked grilled salmon or a pitted plum, close and press into a triangle. Wrap with nori.',
    ],
  },
  {
    id: 'natto-gohan', name: 'Nattō Gohan', nameJa: '納豆ご飯', blurb: 'The five-minute breakfast.',
    minutes: 5, serves: 1, tint: '#9C7A3C',
    ingredients: [e('natto', 1, 'pack'), e('rice', 0.5, 'cup'), o('soy-sauce', 1, 'tsp'), o('scallion', 1, 'bunch'), o('egg', 1, 'pc')],
    steps: ['Stir the natto vigorously with its sauce (or soy sauce) until stringy.', 'Spoon over hot rice; top with scallion and a raw egg yolk if you like.'],
  },
]

export const SIDES: Recipe[] = SIDE_DRAFTS.map((r) => ({ ...r, kind: 'side' }))

export const RECIPES: Recipe[] = [...RAMEN, ...RAMEN_BASICS, ...SIDES]

export const RECIPE_BY_ID: Record<string, Recipe> = Object.fromEntries(RECIPES.map((r) => [r.id, r]))
