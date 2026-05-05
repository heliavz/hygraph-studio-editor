// Locales

export const LOCALES = [
  { code: "en", name: "English", isDefault: true },
  { code: "de", name: "German", isDefault: false },
] as const;

export type LocaleCode = (typeof LOCALES)[number]["code"];
export type LocaleInfo = (typeof LOCALES)[number];

// Localized values: omitted/undefined locale = "not filled" (drives the
// completion-dot UI). Empty string would be ambiguous with "user typed empty".
export type LocalizedString = Partial<Record<LocaleCode, string>>;
export type LocalizedRichText = Partial<Record<LocaleCode, string>>;

// Enums

export type Currency = "EUR" | "USD" | "GBP" | "SEK";
export type InventoryStatus =
  | "IN_STOCK"
  | "LOW_STOCK"
  | "OUT_OF_STOCK"
  | "DISCONTINUED";
export type Season = "SPRING" | "SUMMER" | "AUTUMN" | "WINTER" | "ALL_YEAR";

// Components (embedded value objects)

export interface Dimensions {
  widthCm: number;
  heightCm: number;
  depthCm: number;
}

export interface Weight {
  valueKg: number;
}

// Reference models

export interface Asset {
  id: string;
  url: string;
  altText: LocalizedString;
  width: number;
  height: number;
}

export interface Color {
  id: string;
  name: string;
  hex: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  season: Season;
}

// Product (the entry being edited)

export interface Product {
  id: string;

  // Localized text fields
  name: LocalizedString;
  shortDescription: LocalizedString;
  longDescription: LocalizedRichText;
  careInstructions: LocalizedString;
  metaDescription: LocalizedString;

  // Single-locale fields
  slug: string;
  sku: string;

  // Money
  price: number;
  salePrice?: number;
  currency: Currency;

  // Inventory
  inventoryStatus: InventoryStatus;
  stockCount: number;

  // Components
  dimensions: Dimensions;
  weight: Weight;

  // References (IDs only - resolved via helpers in references.ts)
  heroImageId: string;
  colorIds: string[];
  categoryId: string;
  collectionId: string;
  relatedProductIds: string[]; // self-reference

  // Booleans
  assemblyRequired: boolean;
  isFeatured: boolean;

  // Numbers
  warrantyMonths: number;

  // Metadata
  createdAt: string; // ISO 8601
  updatedAt: string;
  publishedAt?: string; // undefined = unpublished
}
