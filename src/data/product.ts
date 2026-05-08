import type { Product } from "./types";

export const product: Product = {
  // CUID-style ID matching Hygraph's actual format (shown in the right-rail
  // ENTRY INFORMATION panel)
  id: "cm6jx8z2k0001p3w9hm3kxr7n",

  // Localized - English complete, German partial
  // This intentional asymmetry is what the locale-completion improvements are demonstrated against.

  name: {
    en: "NORDLI 6-Drawer Dresser",
    de: "NORDLI 6-Schubladen-Kommode",
  },

  shortDescription: {
    en: "A modular 6-drawer dresser in solid wood. Stackable, customizable, and built for spaces of any size.",
    de: "Eine modulare 6-Schubladen-Kommode aus Massivholz.",
  },

  longDescription: {
    en: `<h1>NORDLI 6-Drawer Dresser</h1><p>The NORDLI 6-Drawer Dresser brings together considered Scandinavian craftsmanship and modern modularity. Each drawer glides on <strong>full-extension runners</strong> with soft-close.</p><ul><li>Solid Nordic pine frame with hand-finished walnut veneer</li><li>Stackable vertically or arranged horizontally</li><li>Designed for small bedrooms, expansive lofts, or shared spaces</li></ul><p>The veneer develops a richer patina over time, making each piece increasingly distinct.</p>`,
    // de missing - most expensive translation gap, drives ❌ on completion dot
  },

  careInstructions: {
    en: "Wipe with a soft, slightly damp cloth. Avoid direct sunlight and prolonged heat exposure. Re-tighten drawer screws annually.",
    // de missing
  },

  metaDescription: {
    en: "Solid-wood 6-drawer modular dresser by NORDLI. Stackable Scandinavian design with soft-close runners. Free assembly guide.",
    // de missing
  },

  // Single-locale

  slug: "nordli-6-drawer-dresser",
  sku: "NRD-6DR-WLN-001",

  // Money

  price: 599.0,
  salePrice: 479.0,
  currency: "EUR",

  // Inventory

  inventoryStatus: "IN_STOCK",
  stockCount: 47,

  // Components

  dimensions: {
    widthCm: 80,
    heightCm: 130,
    depthCm: 45,
  },

  weight: {
    valueKg: 38.5,
  },

  // References

  heroImageId: "ast_nordli_hero",
  colorIds: ["clr_walnut_natural", "clr_oak_white"],
  categoryId: "cat_bedroom",
  collectionId: "col_nordli",
  relatedProductIds: [],

  // Flags

  assemblyRequired: true,
  isFeatured: true,

  // Numbers

  warrantyMonths: 60,

  // Metadata

  createdAt: "2026-05-03T15:38:00Z",
  updatedAt: "2026-05-03T15:57:00Z",
  // publishedAt deliberately omitted - entry is unpublished, matches the
  // "Entry is not published" state in the Hygraph
};
