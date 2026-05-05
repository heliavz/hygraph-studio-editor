# Hygraph Studio - Brand & Design Reference

> Source of truth for visual decisions in this rebuild. Every color, font, radius, and component pattern in the codebase should trace to a token or pattern documented here.
>
> Extracted from the live Hygraph Studio at `app.hygraph.com` on 2026-05-04 via DevTools inspection of the Product entry editor.
>
> Marketing site (`hygraph.com`) tokens differ. Where they diverge, the Studio tokens win, we are rebuilding the product, not the marketing site.

## 0. Marketing vs. Studio - divergence

Hygraph runs two distinct design systems.

| Aspect         | Marketing (`hygraph.com`)           | Studio (`app.hygraph.com`)                | We use |
| -------------- | ----------------------------------- | ----------------------------------------- | ------ |
| Primary color  | `#685CEF`                           | `#5D57E1`                                 | Studio |
| Buttons        | Gradient + 1px stroke + drop shadow | Flat indigo, no gradient                  | Studio |
| Token names    | `--fg-heading`, `--fg-paragraph`    | `--fg-text-base-strong`, `--fg-text-base` | Studio |
| Body font      | `"body"` (custom)                   | Inter                                     | Inter  |
| Heading font   | `"headings"` (custom)               | Inter (different weight)                  | Inter  |
| Default radius | `0.375rem` (6px)                    | `0.375rem` (6px)                          | 6px    |

## 1. Color tokens

Hygraph uses a **purpose-named** token system, not a literal-color one. Tokens describe what a color is _for_ (`bg-primary-hover`, `fg-text-base-muted`), not its hue.

### Token format

In Hygraph CSS: `--bg-primary: 93 87 225;` (RGB component triplet, no commas, no `rgb()` wrapper).
Used at call sites as `rgb(var(--bg-primary) / <alpha>)`.

We replicate the same format in `tailwind.config.ts` so utilities like `bg-primary/50` work natively.

### Primary - the single brand color

| Token                   | RGB           | Hex       | Use                                          |
| ----------------------- | ------------- | --------- | -------------------------------------------- |
| `--bg-primary`          | `93 87 225`   | `#5D57E1` | Primary buttons, focused border, active link |
| `--bg-primary-hover`    | `70 64 185`   | `#4640B9` | Primary button hover                         |
| `--bg-primary-pressed`  | `51 46 135`   | `#332E87` | Primary button pressed                       |
| `--bg-primary-disabled` | `209 208 254` | `#D1D0FE` | Primary button disabled                      |
| `--bg-primary-muted`    | `243 243 255` | `#F3F3FF` | Active sidebar item bg, locale chip bg       |

### Surfaces - page → panels → chips

The Studio layers tonal whites for depth without using shadows.

| Token                 | RGB           | Hex       | Use                       |
| --------------------- | ------------- | --------- | ------------------------- |
| `--bg-base`           | `255 255 255` | `#FFFFFF` | Page canvas, input fields |
| `--bg-surface-1`      | `249 251 255` | `#F9FBFF` | Top bar, left sidebar     |
| `--bg-surface-2`      | `246 248 254` | `#F6F8FE` | Hover on surface-1        |
| `--bg-surface-5`      | `238 240 249` | `#EEF0F9` | Pill/chip backgrounds     |
| `--bg-surface-8`      | `230 233 243` | `#E6E9F3` | Pressed chip              |
| `--bg-input-disabled` | `249 251 255` | `#F9FBFF` | Disabled input bg         |

### Text - 6-step hierarchy

| Token                     | RGB           | Hex       | Use                                   |
| ------------------------- | ------------- | --------- | ------------------------------------- |
| `--fg-text-base-strong`   | `24 27 42`    | `#181B2A` | Page titles, primary values           |
| `--fg-text-base-soft`     | `73 81 115`   | `#495173` | Section labels                        |
| `--fg-text-base`          | `52 58 85`    | `#343A55` | Default body text, field values       |
| `--fg-text-base-muted`    | `94 105 147`  | `#5E6993` | Helper text, secondary metadata       |
| `--fg-text-base-ghost`    | `119 130 173` | `#7782AD` | Tertiary, breadcrumbs, "Last updated" |
| `--fg-text-base-disabled` | `148 157 192` | `#949DC0` | Disabled text                         |

### Borders

| Token                     | RGB           | Hex       | Use                               |
| ------------------------- | ------------- | --------- | --------------------------------- |
| `--border-base-muted`     | `230 233 243` | `#E6E9F3` | Subtle dividers, panel separators |
| `--border-base`           | `208 212 229` | `#D0D4E5` | Default border, input border      |
| `--border-base-strong`    | `177 184 210` | `#B1B8D2` | Hovered borders                   |
| `--border-input-selected` | `93 87 225`   | `#5D57E1` | Focused input (= primary)         |

### Semantic - success / warning / danger / info

Each pair is solid + muted (background-tinted).

| Purpose | Solid                   | Muted                     | Use in our build                         |
| ------- | ----------------------- | ------------------------- | ---------------------------------------- |
| Success | `26 123 94` (`#1A7B5E`) | `233 251 241` (`#E9FBF1`) | ✅ locale complete dot, env badge        |
| Warning | `154 96 0` (`#9A6000`)  | `253 247 220` (`#FDF7DC`) | ⚠️ locale partial dot                    |
| Danger  | `195 54 52` (`#C33634`) | `255 240 240` (`#FFF0F0`) | ❌ locale empty dot, destructive actions |
| Info    | `49 97 223` (`#3161DF`) | `230 246 255` (`#E6F6FF`) | "Localized" pill bg/text                 |

### Accent hues - for chips and tags

Hygraph defines 8+ named accents. We use only what we need:

| Hue                | Solid        | Muted         |
| ------------------ | ------------ | ------------- |
| Indigo (= primary) | `93 87 225`  | `243 243 255` |
| Blue               | `49 97 223`  | `230 246 255` |
| Green              | `26 123 94`  | `233 251 241` |
| Pink               | `180 61 128` | `255 240 246` |
| Orange             | `169 82 32`  | `255 242 221` |

## 2. Typography

### Family

Inter, ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"

**Action item:** Our scaffold uses Geist. We swap to Inter via `next/font/google` in `src/app/layout.tsx` immediately after this file lands.

No separate display/heading font. Studio uses Inter at multiple weights only.

### Weight scale

| Weight | Use                                                     |
| ------ | ------------------------------------------------------- |
| 400    | Body, input values                                      |
| 500    | Field labels, button labels, sidebar nav                |
| 600    | Section headings, "ENTRY INFORMATION" caption           |
| 700    | Page title (e.g., "NORDLI 6-Drawer Dresser"), sparingly |

### Size scale (px, derived from screenshots)

| Token | px    | Use                                             |
| ----- | ----- | ----------------------------------------------- |
| xs    | 11–12 | Pills, locale chips, uppercase section captions |
| sm    | 13    | Helper text, sidebar nav, breadcrumb            |
| base  | 14    | Field labels, body, input values                |
| md    | 16    | Right-rail values                               |
| lg    | 18    | Page title                                      |

Studio is **denser than Tailwind defaults**, body is 14px, not 16px.

### Line height

`1.4–1.5` for body. `1.2` for headings.

## 3. Spacing

4px base scale.

| Tailwind unit | px  | Where it shows              |
| ------------- | --- | --------------------------- |
| `1`           | 4   | Locale chip → input         |
| `2`           | 8   | Label → input               |
| `3`           | 12  | Pill → label inline gap     |
| `4`           | 16  | Inside-input padding        |
| `6`           | 24  | Field-to-field vertical     |
| `8`           | 32  | Section-to-section vertical |
| `12`          | 48  | Page-edge gutter            |

## 4. Border radii

| Name | px   | Use                                               |
| ---- | ---- | ------------------------------------------------- |
| sm   | 4    | Small pills (Title, Localized, Unique)            |
| md   | 6    | Inputs, buttons (matches both marketing & Studio) |
| lg   | 8    | Panels, modals, the right rail                    |
| pill | 9999 | Locale chips (en, de)                             |

## 5. Shadows

Studio is restrained, most depth comes from surface layering, not shadow.

| Name | Value                              | Use                        |
| ---- | ---------------------------------- | -------------------------- |
| sm   | `0 1px 2px rgb(33 37 56 / 0.06)`   | Hover lift on cards (rare) |
| md   | `0 4px 12px rgb(33 37 56 / 0.08)`  | Dropdowns, popovers        |
| lg   | `0 16px 32px rgb(33 37 56 / 0.12)` | Modals                     |

The `--shadow-base: 33 37 56` token in Hygraph is the **shadow color**, not a full recipe. We construct above.

## 6. Layout dimensions

Approximate, from screenshot inspection.

| Element                    | Size     |
| -------------------------- | -------- |
| Top bar height             | 56–64 px |
| Left sidebar width         | ~200 px  |
| Right rail width           | ~280 px  |
| Field-outline column width | ~220 px  |
| Center form max-width      | ~840 px  |

## 7. Component patterns

### Top bar

- Surface `--bg-surface-1`, no shadow
- Bottom border `--border-base-muted`
- Contents (left → right): workspace selector + environment pill (green for "Master Environment"), spacer, "Upgrade your plan" CTA, search, AI Assist button, helper-icon row, avatar
- Height 56–64 px

### Left sidebar

- Surface `--bg-surface-1`
- "hygraph STUDIO" wordmark at top
- Nav items: icon + label, ~40 px tall
- Active item: `--bg-primary-muted` bg + `--fg-text-primary` text + indigo icon
- Hover: `--bg-surface-2`
- "Apps" and "Project Settings" pinned to bottom

### Field row - the central editor pattern

- Label: 14 px, weight 500, `--fg-text-base-strong`
- Pills inline with label, small (4 px radius), `--bg-surface-5` bg, `--fg-text-base-muted` text, ~12 px text
- Locale chip: pill (rounded-full), `--bg-surface-5` bg, ~12 px text
- Input: `--bg-input` (white), `--border-base` 1 px border, 6 px radius, ~12 px vertical padding / ~14 px horizontal padding

### Buttons

**Primary** (e.g., "Publish"):

- `--bg-primary` bg, white text, 6 px radius, padding `8px 16px`
- Hover: `--bg-primary-hover`
- **Flat - no gradient.** Marketing uses gradient. We don't.

**Secondary** (e.g., "Save" enabled):

- `--bg-surface-5` bg, `--fg-text-base-strong` text, 6 px radius, same padding
- Hover: `--bg-surface-8`

### Pills / badges

Small chips with `--bg-surface-5` background for: field-type labels (Title, Unique), modifiers (Localized), env (Master Environment uses green semantic variant).

### Right rail

- Surface `--bg-base` (white)
- Tabbed top: INFO / COMMENTS, underlined active
- Sections separated by `--border-base-muted` dividers
- Section caption: 11–12 px, weight 600, uppercase, `--fg-text-base-muted`, positive letter-spacing

## 8. What we will NOT borrow

- **Marketing-site gradient buttons.** Flat indigo only.
- **Custom marketing fonts** (`"body"`, `"headings"`). Inter only.
- **The "Upgrade your plan" / paywall right-rail pattern.** Our rebuild explicitly improves it, we collapse upgrade prompts into a single dismissible card.
- **The reference-verb soup** ("Add existing entries / Create new entry / Replace X / Add X" etc.). Our rebuild fixes this, single Link existing / Create new everywhere.

---

_Last extracted: 2026-05-04. Re-extract before any major redesign milestone._
