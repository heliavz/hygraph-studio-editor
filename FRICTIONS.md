# Friction Journal - Hygraph Studio

A working log of usability frictions observed while using Hygraph Studio to model and edit content for an e-commerce furniture catalog (the NORDLI scenario used throughout this rebuild).

## Method

I built a real schema in a fresh Hygraph project and used the editor to populate one entry through to publication. The schema: 3 enums, 2 components, 4 models (Color, Category, Collection, Product), 22 fields on Product. I noted frictions as I encountered them, in order, while doing the actual work, not as a separate audit pass. The goal was to capture friction at the moment of contact, while the cause was still fresh.

Total time to model the schema: **~45–50 minutes** for a developer who knew the data model going in. I'd estimate 2–3× that for a marketing operations user who needs to make modeling decisions during the build. Useful as a baseline when reasoning about time-to-first-content.

This document is a record of what I noticed, not a list of what I fixed. Of the 21 frictions logged here, this rebuild ships fixes for four (F17, F18, F19, F20). The rest sit here as observations, context for why the four shipped were chosen, and a starting point for what could come next.

## Status legend

- **Shipped:** addressed in this rebuild
- **Deferred:** real friction, could be tackled in a follow-up rebuild
- **Out of scope:** real friction, but outside what a frontend rebuild can address (requires backend, schema engine, or API changes)

---

## Schema modeling

### F1 - Ambiguous "Add" affordance across schema sections

_Status: Deferred_

The Schema page exposes multiple "+ Add" buttons that perform structurally different actions: creating a top-level schema object (enum, component, model), adding a field to an open model, and adding a value to an enum. All three look identical and live in visually similar zones. A user who has just created an enum can land in the "add field of type Enumeration" dialog without realizing the context switched, the dropdown silently lists existing enums, which makes it look like the right form, just empty.

**Cost:** silent misnavigation; the user doesn't know they're lost until they wonder why a dropdown is short.
**Cheap fix:** scope the verb on the button (`+ New enumeration`, `+ Add field`), or visually separate "create schema object" vs "configure model" zones.

---

### F2 - Validation surfaces only on submit, not inline

_Status: Deferred_

When creating a component, the API ID and Plural API ID are auto-generated from the Display Name and can collide. The collision rule is enforced only after the user clicks "Add Component," at which point the form rejects the submission. Nothing in the form previews the constraint while the user is typing or adjusting fields.

This is a generalizable pattern: validation is reactive, not preventive. Editors learn rules by triggering errors instead of being guided around them.

**Cost:** broken flow on first attempt; user retries blind.
**Cheap fix:** inline validation with helper copy near the constrained field (`Plural API ID must differ from API ID`).

---

### F3 - Successful actions lack a confirmation cue

_Status: Deferred_

After clicking "Add" on schema objects (enum, component, field), the dialog closes and the sidebar updates, but there is no toast, no micro-animation on the new item, and no transient highlight. For sub-second actions, the absence of a confirmation cue makes the user unsure the action completed, even when it has. This is not a "missing spinner" problem (spinners on fast actions feel worse, not better); it's a missing success acknowledgement.

**Cost:** repeated clicks, doubt, scrolling the sidebar to verify.
**Cheap fix:** brief flash/highlight on the newly created item, or a non-blocking toast.

---

### F4 - Field tags are visually undifferentiated

_Status: Deferred_

Each field card displays multiple metadata tags (e.g. `Single line text`, `String`, `Localized`, `Title`, `Unique`, `Two-way reference`, `Multiple values`). All tags share the same shape, border, and color. On a 22-field model, the user cannot scan the list to answer "which fields are localized?" or "which are unique?" without reading every tag individually.

**Cost:** O(n) scan instead of O(1) for any cross-cutting question about the model.
**Cheap fix:** semantic tag categories (constraint tags vs type tags vs localization tags) with distinct chrome; color, weight, or icon.

---

### F5 - Hover-only "+ Add" affordance on schema sections

_Status: Deferred_

The button to add a new model, component, or enum only appears on hover over the section header. A user staring at a populated MODELS list with no visible "create" affordance has no way to know one exists without mousing over each header. Internal inconsistency: REMOTE SOURCES and TAXONOMIES in the same sidebar show a persistent ⊕ icon next to the section header.

**Cost:** discoverability gap, especially on touch devices.
**Cheap fix:** persistent `+` icon next to every section header, matching the existing pattern Hygraph already uses for two of the five sections.

---

### F6 - No delete affordance on sidebar items

_Status: Deferred_

To delete a model, component, or enum, the user must click into it, then click the three-dot icon in the header, then choose Delete. There is no right-click, no icon, and no swipe affordance on the sidebar item itself. Schema iteration is naturally prototype-and-discard, so this extra two-click overhead compounds.

**Cost:** ~2 extra clicks per discarded schema object during iteration.
**Cheap fix:** three-dot icon on hover, or right-click context menu, on every sidebar item.

---

### F7 - Localization is a peer checkbox, not a primary decision

_Status: Out of scope_

The "Localized" toggle sits inline with `required`, `hidden in editor`, and similar field-level booleans. Localization is structurally different: it changes the API shape, query complexity, and editor workflow downstream. Editors who miss the toggle on first pass discover the omission only when they add a locale later and find their fields aren't translatable, which requires field-by-field schema edits to fix.

**Cost:** retroactive schema work; risk of inconsistent localization across fields in the same model.
**Cheap fix:** elevate localization to its own section in the field config panel, or surface it as a model-level setting that propagates to fields by default.

---

### F8 - Self-references default to two-way; consequences not explained

_Status: Out of scope_

Creating a self-referential field (e.g. `relatedProducts` on Product) creates a two-way reference by default, which produces a phantom reverse field on the same model (`products`). There is no inline copy at the moment of choice explaining what two-way means or that the user is about to get a second field they didn't ask for. The user discovers the duplicate only after returning to the field list.

**Cost:** schema clutter, confused editor forms, late realization the model is wrong.
**Cheap fix:** explicit one-way / two-way radio with one-sentence explanation of each, defaulting to one-way for self-references.

---

### F9 - Field-type icons exist but aren't legibilized

_Status: Deferred_

Field cards use distinct icons for component fields (diamond), reference fields (link), enumeration fields (down-chevron), asset fields (paperclip), etc. The icon language is consistent but undocumented in-product. New users learn it by trial and error, often after misclassifying a field. There is no legend, tooltip, or hover state explaining what each icon represents.

**Cost:** trial-and-error learning curve for icon vocabulary.
**Cheap fix:** tooltip on icon hover; or a one-time legend on first visit to the schema page.

---

### F10 - Field config panels look identical across field types

_Status: Deferred_

Configuration forms for different field types (string, reference, asset, enum) share the same layout, the same section ordering, and largely the same options. Field-type-distinctive settings (cardinality on references, allowed file types on assets, multi-select on enums) aren't visually elevated over generic settings (description, hidden in editor). The form doesn't help the user reason about what's distinctive about the field type they just chose.

**Cost:** users second-guess whether they picked the right field type; distinctive settings get missed.
**Cheap fix:** field-type-specific settings shown first, in their own visually distinct section.

---

### F11 - Asset fields default to two-way reference

_Status: Out of scope_

Every asset field on a model (`heroImage`, `gallery`, `ogImage`) creates a back-reference on the Asset model. For a CMS where assets are typically referenced from dozens of models and hundreds of entries, this default is wrong: the Asset entry form bloats with auto-generated reverse fields the user never asked for.

**Cost:** Asset model becomes unreadable at scale; reverse fields clutter the API.
**Cheap fix:** one-way default for asset references; explicit opt-in for two-way when the user actually needs reverse lookups.

---

### F12 - No editor preview from schema view

_Status: Out of scope_

Field-level decisions (required, hidden, validation rules) directly shape what the content editor sees, but the schema view gives no preview of the resulting form. Toggling "required" on three fields produces no visible change anywhere in the schema UI; the user must navigate to Content, create or open an entry, and inspect the form to verify their choices landed. Every schema iteration cycle includes a context switch.

**Cost:** broken feedback loop between modeling and editing; schema authors verify their work in a different section of the app.
**Cheap fix:** live preview pane (right rail) showing the editor form for the current model, updating as fields are configured. This is the same pattern Sanity Studio uses with its preview deck.

---

## Content editing

### F13 - Slug auto-generation doesn't fire on entry creation

_Status: Out of scope_

The slug field is configured to generate from the title field's value, but when creating a new Product entry, the slug remains empty until manually typed. Auto-generation either fires only at save time or only on field blur in a way that's not obvious. Editors expect "auto-generate from name" to mean the slug field populates as they type the name.

**Cost:** every entry requires manual slug entry despite the schema configuration claiming otherwise; or, worse, editors leave it blank and discover later that URLs broke.
**Cheap fix:** populate the slug field live as the source field is typed, with an "edit" affordance for manual override.

---

### F14 - Components show UUIDs in collapsed state, not values

\*Status: **Shipped\***

When a component field (e.g. Dimensions, Weight) is collapsed in the editor form, the summary line displays the underlying entry's hash ID (e.g. `Dimensions: ba9087ece27945568ae457931cfb34ee`) instead of a human-readable summary of its field values (e.g. `80 × 130 × 45 cm`).

For an editor reviewing a long form, the collapsed state is useless. They cannot verify the component's content without expanding it, defeating the purpose of collapsing.

**Cost:** every component on the form requires an expand-click to verify its content; long forms become an exercise in click-to-reveal.
**Cheap fix:** synthesize a human summary from the component's fields (`{width} × {height} × {depth} {unit}`) shown in the collapsed header.

**How this rebuild addresses it:** components render their human-readable value (`80 × 130 × 45 cm`, `38.5 kg`) in the collapsed summary. The synthesis is per-component-type, configured alongside the field schema.

---

### F15 - Right rail is dominated by upgrade prompts

\*Status: **Shipped\***

Of seven sections in the editor's right-hand info panel, three (Schedule, Versions, Variants) are upgrade walls on free / self-serve tiers. The upgrade prompts occupy ~40% of right-rail real estate while the user is trying to focus on entry editing. This is paywall-during-workflow rather than paywall-at-entry-point.

**Cost:** trust erosion during onboarding; visual noise in the editor's peripheral attention zone; reinforces "this CMS is selling to me, not helping me" framing.
**Cheap fix:** collapse upgrade prompts into a single dismissible card or move them into a Settings/Plan section. Upgrade discovery belongs at moments of intent, not in the steady-state editing UI.

**How this rebuild addresses it:** the three upgrade walls are consolidated into a single collapsed `Upgrade to unlock` section that expands to a compact list of the locked features. Default state is collapsed, so the steady-state right rail is dominated by entry information instead of upsell.

---

### F16 - Reference chips show API ID instead of model display name

_Status: Deferred_

The chip representing a referenced entry (e.g. for the Colors field) displays the model's API ID (`ColorApi`) as the prefix label instead of the human Display Name (`Color`). Editors think in display names, not API identifiers. The API ID is a developer concern.

**Cost:** developer-leak into the editorial UI; editors see strings they don't recognize.
**Cheap fix:** consistently use Display Name in editor chrome, reserve API IDs for the API Playground and developer-facing surfaces.

---

### F17 - Inconsistent verbs for reference actions across field types

\*Status: **Shipped\***

Action buttons for attaching referenced entries use multiple different verb patterns across one editor form:

- "Add existing entries / Create new entry" (multi-ref to model)
- "Replace X / Create & replace X" (single-ref to model)
- "Add existing X / Create new X" (multi-ref to model, different model)
- "Add X" (asset multi)
- "Replace X" (asset single)

Same underlying action ("attach a reference") expressed five different ways within a single form. Editors must re-parse each field's vocabulary instead of pattern-matching.

**Cost:** cognitive overhead per field; editors second-guess whether "Replace" and "Add existing" do the same thing.
**Cheap fix:** unified verb model (`Link existing` / `Create new`) across reference fields regardless of cardinality and target type.

**How this rebuild addresses it:** every reference field, single, multi, asset, model-to-model uses the same two verbs: `Link existing` and `Create new`. Cardinality is communicated by other affordances (chip stack vs single chip, presence of `×` to remove), not by verb choice.

---

## Localization

### F18 - Vertical-stack locale form: scaling cost

\*Status: **Shipped\***

Localized fields render as a vertical stack of locale variants (en, de, fr, …). The pattern is fine for two locales but degrades non-linearly as locales are added: editors translating from English to German must scroll up and down to compare, and there is no affordance to view source and target side by side. The scroll cost compounds when fields are long-form (rich text, long descriptions).

**Cost:** scroll-driven comparison fatigue; editors translating in a separate window or translation tool, then pasting back.
**Cheap fix:** side-by-side locale view as an editor-level toggle. Translators get the comparison view; mono-locale editors keep the stacked view.

**How this rebuild addresses it:** a `↔` toggle in the right rail's Localizations section switches all localized fields between stacked and side-by-side layouts. The toggle is global to the entry, so the editor picks the layout that matches their task.

---

### F19 - No auto-translation at the moment of need

_Status: Deferred_

Hygraph's AI Assist is surfaced in the top bar but not exposed at the point where it would matter most, next to an empty target-locale field. An editor staring at a missing German `longDescription` is one click away from "translate the English version into German," but the product makes them navigate to a separate AI surface rather than offering it inline.

**Cost:** AI Assist is invisible during the workflow it most helps; translation-from-source becomes manual.
**Cheap fix:** inline `Translate from {default locale}` action on each empty localized field, calling the existing AI Assist endpoint.

---

### F20 - Locale labels use BCP-47 codes instead of human names

_Status: Deferred_

Locale tabs and chips display BCP-47 codes (`de`, `nl`, `fr-CA`) instead of human-readable language names (`Deutsch`, `Nederlands`, `Français (Canada)`). For a developer, the codes are unambiguous. For a translator or editorial user, they're a small but constant decoding cost.

**Cost:** mild, but a recurring micro-friction for a daily user, multiplied across every localized field.
**Cheap fix:** show the human name as the primary label, with the code as a small subtitle or tooltip.

---

### F21 - No per-locale completion indicator on entry or in entry list

\*Status: **Shipped\***

The editor surfaces no signal to answer "is this entry fully translated?" The right-rail localization list shows which locales exist on the entry but not how complete each one is. The Content tab's entry list has the same problem at higher altitude, editors can't scan the list to find "entries missing German" without opening each one.

**Cost:** completion auditing requires opening every entry, every locale, and visually scanning every field. At scale, this is the work that doesn't get done.
**Cheap fix:** completion indicators per locale at two altitudes, per-field (a status dot on each localized field) and per-entry (a completion bar in the right rail and in the entry list).

**How this rebuild addresses it:** every localized field shows a green/amber/red dot per locale based on completion status (complete / partial / empty). The right rail aggregates these into a per-locale completion bar with explicit counts (`1 complete · 1 partial · 3 missing`). The field outline column on the left rail surfaces the dots at the top altitude, so an editor sees missing translations without scrolling. The entry-list level is not in scope for this rebuild but would use the same status model.

---

## Closing notes

The four shipped frictions (F14, F15, F17, F21) were chosen because they:

1. Could be addressed entirely in the frontend, without backend or schema-engine changes.
2. Affect every editor on every entry, not just edge cases.
3. Together demonstrate four distinct categories of fix: information surfacing (F21), information hiding (F15), data display (F14), and language consistency (F17).

The remaining 17 are not less important. Several (F1, F2, F12) are arguably higher-leverage. They were deferred because they require either schema-page work outside this rebuild's footprint, or backend changes outside what a frontend portfolio can demonstrate.

The fact that 21 frictions surfaced in 45 minutes of focused use is itself the most important data point. A mature CMS's editor surface is the place its customers spend the most time; small frictions there compound across thousands of editor-hours per month.
