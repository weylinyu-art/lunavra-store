# NileChic — English website copy (ready-to-publish)

**Domain:** https://nilechic.com  
**Tone:** Premium, minimalist, European/American fashion; confident, tasteful.  
**Typography note (site):** Headings use elegant serif (`Cormorant`); body uses clean sans (`DM Sans`). Palette: nude pink / off-white / black; accents dark gray / gold.

---

## Homepage

### Hero banner

- **Headline:** Quiet luxury, worn close to the skin  
- **Subheadline:** European‑American minimalism meets meticulous fit. Discover lace, silk, and tailored silhouettes—shipped with discreet packaging and thoughtful service.  
- **Primary CTA:** Shop Now → `/shop`  
- **Secondary CTA:** Explore Collection → `/shop`  
- **Badges:** ✨ New · Editor’s pick  
- **Visual description (for designers / SEO):** Full‑bleed hero: soft window light on blush‑nude tones, black negative space, a single editorial figure in refined lace—calm, premium, uncluttered.

### Core trust (four modules)

1. **Secure payments** — Encrypted checkout and trusted payment partners. Your details stay protected from cart to confirmation.  
2. **Discreet delivery** — Plain outer packaging with neutral labeling—no lingerie branding on the box. Your purchase stays private.  
3. **Easy returns** — Thoughtful return windows on eligible styles. Our team helps you exchange sizes when the fit is not quite right.  
4. **Size guide** — Clear measurements, real‑world fit notes, and guidance to reduce guesswork—because confidence starts with clarity.

### Featured products (four cards)

| Product | Price | Short description | Hover text | CTA |
|--------|-------|-------------------|------------|-----|
| Ivory Lace Ensemble | $89 | French-inspired ivory lace with a featherlight feel—crafted for quiet confidence. | Discover the full lace story | Shop Now |
| Champagne Silk Set | $95 | Champagne silk with a luminous drape—anniversary evenings, elevated. | Explore silk tailoring | Shop Now |
| Rose Blush Underwire | $45 | Rose blush support that disappears under tailoring—your everyday essential. | See fit details | Shop Now |
| Silk Slip Nightgown | $85 | Mulberry silk slip: breathable, fluid, and made for restorative nights. | Shop sleepwear | Shop Now |

### Category quick links (four)

- Lingerie Sets → Explore Collection  
- Bras → Explore Collection  
- Sleepwear → Explore Collection  
- Bridal → Explore Collection  

### Brand story (50–80 words)

NileChic is a study in restraint: nude‑pink palettes, off‑white light, and black line work inspired by contemporary European ateliers and American ease. We design intimates for adults who want confidence without noise—lace that breathes, silk that falls cleanly, and fits refined through real wear tests. This is lingerie as a daily ritual: private, precise, and entirely yours.

**Visual description:** Brand panel: split layout with textured linen backdrop, folded ivory lace, a gold accent thread detail, and generous whitespace—editorial, tactile, calm.  
**CTA:** Read our story → `/about`

### Blog / style guide (three highlights)

1. **How to Build a Minimalist Lingerie Capsule** — Keyword: *minimalist lingerie capsule wardrobe* — Fewer pieces, more coherence—neutral palettes, perfect fits, and a calm rotation you will actually wear. → `/blog/minimalist-lingerie-capsule-wardrobe`  
2. **Silk vs Satin Sleepwear** — Keyword: *silk vs satin sleepwear* — Understand fiber behavior, how drape changes mood, and which finish suits your nights and climate. → `/blog/silk-vs-satin-sleepwear`  
3. **The Modern Guide to Bra Fit** — Keyword: *bra fit guide* — A practical framework for band stability, cup depth, and the small adjustments that change everything. → `/blog/modern-bra-fit-guide`  

**Meta (section):** SEO: premium lingerie journal—fit guides, fabric care, bridal timelines, minimalist wardrobe edits.

---

## Product pages (examples)

Full structured copy for products **1–3** is maintained in `lib/data/products.static.json` (descriptions, materials, care, related IDs, image notes). Summaries:

### 1 — Ivory Lace Ensemble — $89

- **CTA:** Add to Cart  
- **Related (internal):** [Blush Rose Two-Piece](/en/product/3), [Gold Trim Bralette](/en/product/5), [Silk Slip Nightgown](/en/product/7)  
- **Size guide reminder:** Between sizes? Open our size guide for measurements and fit notes before you add to cart.  
- **Gallery text:** Front editorial view; back view with hook column; macro lace; flat lay styling (see `imageNotes` on product).

### 2 — Champagne Silk Set — $95

- **CTA:** Add to Cart  
- **Related:** [Ivory Lace Ensemble](/en/product/1), [Silk Slip Nightgown](/en/product/7), [Lace Trim Chemise](/en/product/8)  
- **Fabric / care:** Detailed in JSON (`material`, `care`).  
- **Gallery text:** See `imageNotes` on product.

### 3 — Blush Rose Two-Piece — $78

- **CTA:** Add to Cart  
- **Related:** [Ivory Lace Ensemble](/en/product/1), [Rose Blush Underwire](/en/product/4), [Ivory Seamless Bra](/en/product/6)  
- **Gallery text:** See `imageNotes` on product.

---

## Blog — 50 articles

All posts include **Title, SEO keyword, meta description, 2–5 internal product links**, **H2/H3 sections**, **intro**, **conclusion + CTA**, and **image suggestions** are embedded as prose where relevant.  
**Source files:** `lib/content/blog/chunks/chunk01.ts` … `chunk10.ts` (5 posts × 10 files = **50**).  
**Routes:** `/en/blog`, `/en/blog/[slug]` (and `/ar/...`).

---

## Email popup

- **Headline:** Step inside the private edit  
- **Subheadline:** Occasional notes on new arrivals, limited drops, and fit intelligence—never loud, never cluttered.  
- **Incentive:** Enjoy 10% off your first order when you join.  
- **CTA:** Unlock 10% off  
- **Disclaimer:** By subscribing you agree to receive marketing emails. Unsubscribe anytime.  
- **Implementation:** `components/EmailSignupPopup.tsx` (session dismiss).

---

## Footer

- **About:** Curated elegance with discreet delivery. Serving UAE, Saudi, Kuwait, Bahrain, Oman, Qatar & Egypt.  
- **Contact:** WhatsApp + email (from `lib/config/whatsapp`)  
- **Newsletter:** Join for exclusive offers and new arrivals. **CTA:** Subscribe  
- **Social:** Instagram (live link), Pinterest & Facebook placeholders  
- **Payment placeholder:** Visa · Mastercard · American Express · PayPal  
- **Quick links:** Home, Shop, Gift, About, FAQ, **Journal (blog)**

---

*This file summarizes on-site strings; canonical long-form blog bodies live in the chunk modules listed above.*
