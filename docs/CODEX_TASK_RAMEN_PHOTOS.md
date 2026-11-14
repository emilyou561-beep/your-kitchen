# Task: add photos for the 19 ramen bowls that still use illustrations

You are working in the **Yoru Kitchen** repo (`~/Desktop/Claude Folder/your-kitchen`, React + Vite + TypeScript). Read `docs/HANDOFF.md` and `docs/PHOTO_CREDITS.md` first.

## How photos work (already built — do not change this code)
- A ramen card/detail page shows `public/images/ramen/<id>.jpg` if the file exists; otherwise it falls back to a hand-drawn illustration (`src/components/RecipeImage.tsx`).
- Photos automatically get a live effect (soup ripple, steam, pointer tilt) from `src/components/LivePhoto.tsx`. The ripple is masked to an ellipse around the soup; default is a centred bowl (`DEFAULT_SOUP` in `LivePhoto.tsx`).
- Credits live in `src/data/photoCredits.ts` and are shown under the photo on the detail page. A unit test (`src/lib/logic.test.ts`, "photos") fails if a credited id has no file or isn't a ramen.
- Ramen with photos are sorted to the front of the menu (`src/pages/Recipes.tsx`).

## Bowls that need a photo

| id (file name) | Style | What it must look like |
|---|---|---|
| `asahikawa-shoyu` | Asahikawa Shoyu Ramen (Hokkaido) | “Double soup” of pork-chicken and seafood under a layer of hot lard. |
| `kagoshima` | Kagoshima Ramen | Gentle, semi-clear tonkotsu with chicken and vegetables, served with pickles. |
| `jiro` | Jiro-style Ramen (Tokyo) | A mountain of sprouts and cabbage, thick pork, raw garlic, back fat. |
| `toyama-black` | Toyama Black Ramen | Jet-black, very salty soy soup with black pepper — made to eat with rice. |
| `hachioji` | Hachioji Ramen (Tokyo) | Shoyu soup capped with lard and a scatter of chopped raw onion. |
| `tokushima` | Tokushima Ramen | Dark tonkotsu-shoyu topped with sweet simmered pork and a raw egg. |
| `onomichi` | Onomichi Ramen (Hiroshima) | Seafood-chicken shoyu dotted with back-fat cubes, flat noodles. |
| `tsubame-sanjo` | Tsubame-Sanjo Ramen (Niigata) | Strong sardine-shoyu under a blanket of back fat, thick noodles, raw onion. |
| `nagaoka-ginger` | Nagaoka Ginger Shoyu Ramen (Niigata) | Dark shoyu sharpened with lots of ginger. |
| `niboshi` | Niboshi Ramen (Aomori) | Grey-brown sardine soup, bitter-savoury and bold. |
| `hiroshima-shirunashi` | Hiroshima Soupless Tantanmen | No soup: noodles tossed in numbing chili oil. |
| `katsuura-tantanmen` | Katsuura Tantanmen (Chiba) | Soy soup under a red layer of chili oil with sautéed onion — no sesame. |
| `taiwan-ramen` | Taiwan Ramen (Nagoya) | Fiery soy soup with chili-garlic ground pork and garlic chives. |
| `taiwan-mazesoba` | Taiwan Mazesoba (Nagoya) | Soupless thick noodles, spicy pork, raw yolk, nira, nori. |
| `hiyashi-chuka` | Hiyashi Chuka | Chilled noodles on a plate with rows of egg, cucumber, ham, tomato strips. |
| `tenri` | Tenri Stamina Ramen (Nara) | Garlicky, spicy soy soup with a heap of stir-fried napa cabbage. |
| `takaida` | Takaida-style Ramen (Osaka) | Near-black shoyu with very thick straight noodles. |
| `sanmamen` | Sanmamen (Yokohama) | Shoyu ramen under a glossy thickened sauce of bean sprouts and pork. |
| `karamen` | Miyazaki Karamen | Red garlic-soy soup with whisked egg, nira and ground meat. |

`docs/RAMEN_PHOTO_PROMPTS.md` has a ready image-generation prompt for each id.

## Rules for each photo
1. **Source, in this order:**
   - (a) Free stock with a commercial-use licence — Unsplash (free, not Unsplash+), Pexels or Pixabay — **only if the bowl clearly matches the description above**. Do not use a generic ramen photo for a regional style.
   - (b) Otherwise generate a photorealistic image yourself with the prompt from `docs/RAMEN_PHOTO_PROMPTS.md`.
   - Skip a bowl rather than use a wrong-looking image.
2. **Never use:** shop names, logos, brand text or watermarks on bowls or in frame; recognisable faces; scraped images from restaurant sites, blogs, Google Images, Instagram or TV.
3. **Look:** realistic food photo, bowl roughly centred, overhead or three-quarter angle, warm light. Match the existing photos in `public/images/ramen/`.
4. **File:** `public/images/ramen/<id>.jpg`, JPEG, **1400×900** (crop to fill, bowl centred), quality ~78, under ~400 KB.
5. **Credit:** add one line per photo to `src/data/photoCredits.ts`, following the existing format:
   - stock: `{ author: '<photographer>', url: '<photo page URL>', site: 'Unsplash' | 'Pexels' | 'Pixabay' }`
   - AI-generated: `{ author: 'AI generated', url: '', site: '<tool name>' }`. If `url` is empty, make sure the credit in `src/pages/RecipeDetail.tsx` renders as plain text, not an empty link (small change allowed there).
   - Add the same row to the table in `docs/PHOTO_CREDITS.md`.
6. **Soup position:** if the bowl isn't centred, add an entry in `src/data/photoSoup.ts` (`{ cx, cy, rx, ry }` as fractions of the frame) so the ripple sits on the soup only.

## Do not
- Change recipe data, styling, components or the live-photo effect beyond what is listed above.
- Remove or replace any of the 22 existing photos.
- Add dependencies.

## Done when
- `npm test` and `npm run build` both pass.
- `npm run dev`, then open http://localhost:5180/recipes: every new photo shows on its wooden board. On its detail page the ripple sits on the soup and the credit is correct.
- Commit on a new branch `ramen-photos-2` with a clear message. Do **not** push or merge; leave that to Emily.
- Reply with a table: id → source (stock link or "AI") → any bowls you skipped and why.
