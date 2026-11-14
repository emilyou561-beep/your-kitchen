# Yoru Kitchen Design System

> All app UI text is in English. Japanese is decoration only (signboards, stamps), must be `aria-hidden`, and must never carry functional information.
> Single source of truth in code: `src/styles/tokens.css`. Change the token first when changing the design.

## 1. Direction

A Showa-retro home kitchen: warm paper, vermilion, navy and mustard; thick ink outlines plus blur-free "misregistered print" shadows; real food photos as the hero; minimal text.

**Avoid:** gradient backgrounds, glassmorphism, emoji, restaurant-ordering UI, piled-on decorations like cherry blossoms or lanterns, and tutorial text above the fold.

## 2. Color

| Token | Value | Use | Contrast |
|---|---|---|---|
| `--yk-vermilion` | #B83227 | Primary buttons, titles, missing-ingredient hints | 4.9:1 on paper |
| `--yk-vermilion-dark` | #8F251C | Primary button hover | |
| `--yk-navy` | #234D76 | Home background, selected state, secondary titles | 7.2:1 on paper |
| `--yk-navy-deep` | #1A3A5A | Seigaiha wave base | |
| `--yk-navy-shadow` | #14304D | Offset shadow on navy | |
| `--yk-paper` | #F5E8CD | Page background, fridge door | |
| `--yk-paper-light` | #FFFBF1 | Cards, panels | |
| `--yk-paper-edge` | #D8C7A2 | Dashed dividers, note edges | Decorative only |
| `--yk-mustard` | #D6A642 | Focus ring, handles, selected outline, "Almost" status dot | Decorative / non-text only |
| `--yk-ink` | #28251F | Body text, outlines, shadows | 13:1 on paper |
| `--yk-ink-soft` | #5A5246 | Secondary text | 6.9:1 on paper |
| `--yk-moss` | #3F6B3A | "Ready" status, owned | 5.6:1 on paper |

Rules: never use mustard as a text color; never distinguish states by color alone (status badges always include text).

## 3. Typography

| Role | Font | Where |
|---|---|---|
| Display | Shrikhand 400 | Logo, page titles, dish names on cards, home question |
| UI | Zen Maru Gothic 500/700/900 (rounded, friendly, like a handwritten recipe card) | Navigation, buttons, body, forms |
| Serif | Fraunces 400 / 400 italic / 600 italic | "Did you know?" fun fact card |
| Handwriting | Kalam 400 | Fridge notes (decorative only) |
| Japanese decoration | Zen Antique | Signboards, stamps, small text at the top of pages |

Fonts are bundled locally via `@fontsource`, so they work offline with no dependency on Google services.

Type scale (rem): 13 / 15 / 17 (body) / 22 / 28 / 40 / home question `clamp(44px → 72px)`.

## 4. Spacing · Radius · Shadow

- Spacing on a 4px base: 4, 8, 12, 16, 24, 32, 48, 64, 96.
- Radius: 8 (inputs), 16 (ingredient tiles), 28 (cards/panels), 40 (fridge door), 999 (buttons).
- Outlines: 3px ink (primary), 2px (secondary controls).
- All shadows are blur-free: buttons `0 6px 0 ink`; cards `6px 8px 0 ink`; large home blocks `14px 16px 0 navy-shadow` (mobile 8px 10px).

## 5. Texture

- Paper grain: `/images/paper-grain.png`, 320px tile, opacity baked into the image (about 15%), used on body, header and fridge door.
- Awning stripes: vermilion/paper 56px vertical stripes (32px on mobile), followed by a 3px ink line.
- Seigaiha waves: SVG pattern, paper-colored lines at 45% opacity, home page footer only.
- Home sunburst: mustard `repeating-conic-gradient` at 16% opacity, hidden on mobile.

## 6. Imagery

- Realistic photos, Japanese ceramics (blue-and-white sometsuke, stoneware), wooden table, warm side light, visible steam.
- Dish centered slightly left, leaving the top-right corner for the decorative signboard.
- Treatment: 10–12px paper frame + ink outline + offset shadow, slight rotation (±1.5°).
- Consistent ratios: home 16:9.3; recipe cards 5:3; detail page 16:10.
- Sources: original AI-generated images or licensed stock. No TV screenshots, trademarks, or random web images.
- When there is no photo, `RecipeImage` falls back to the illustration (bowl + dish colors). Never show a broken image.

## 7. Breakpoints

| Name | Width | Changes |
|---|---|---|
| Mobile | ≤ 720px | Hamburger menu, home photo on top with the fridge door overlapping below, narrower awning |
| Tablet | 721–1100px | Home two-column layout narrows |
| Desktop | > 1100px | Full layout, max width 1440 (page content 1280) |
| Other | ≤ 960 | My Kitchen / detail page single column; ≤ 520 receipt rows tighten |

## 8. Components

| Component | File | Notes |
|---|---|---|
| Header (awning + logo + nav) | `components/Header.tsx` | Mustard underline on current page; count badges; mobile hamburger menu closes on Esc |
| Button | `.yk-btn` + `--primary / --secondary / --navy / --lg / --sm` | Min 44px tall; sinks 4–6px on press; `:disabled` is semi-transparent |
| Icon button | `.yk-icon-btn` | 44×44, must have an `aria-label` |
| Fridge door (home) | `pages/Home.tsx` | Freezer note + fridge-door question + the only CTA |
| Ingredient tile | `.yk-tile` | Click to add/remove, `aria-pressed`; draggable |
| Category filter | `.yk-tab` | `aria-pressed` button group |
| Inventory row | `.yk-row` | Quantity stepper, unit, storage location, delete |
| Recipe card | `.yk-card` | Photo, status badge, dish name (English/romaji), Japanese decoration, time, missing essentials, Select |
| Status badge | `.yk-status--ready / almost / shop` | Dot + text |
| Plan bar | `.yk-planbar` | Appears after selecting dishes, sticky at the bottom |
| Receipt | `.yk-receipt` | Zigzag edge, tabular numbers, editable rows, print styles |
| Toast | `.yk-toast` | `role=status`, auto-dismisses after 2.4 seconds |
| Waves | `components/Waves.tsx` | Decorative only |
