import type { Product } from "./types";

export type FieldType =
  | "text"
  | "richtext"
  | "number"
  | "enum"
  | "asset"
  | "component"
  | "reference"
  | "boolean";

export type FieldSection =
  | "content"
  | "pricing"
  | "inventory"
  | "details"
  | "categorization"
  | "seo";

export const FIELD_SECTIONS: { id: FieldSection; label: string }[] = [
  { id: "content", label: "Content" },
  { id: "pricing", label: "Pricing" },
  { id: "inventory", label: "Inventory" },
  { id: "details", label: "Details" },
  { id: "categorization", label: "Categorization" },
  { id: "seo", label: "SEO & Visibility" },
];

export interface FieldDefinition {
  key: keyof Product;
  label: string;
  type: FieldType;
  section: FieldSection;
  isLocalized?: boolean;
  isTitle?: boolean;
  isUnique?: boolean;
  isMultiple?: boolean;
  enumOptions?: readonly string[];
}

export const productFieldDefinitions: FieldDefinition[] = [
  // Content
  {
    key: "name",
    label: "name",
    type: "text",
    section: "content",
    isLocalized: true,
    isTitle: true,
  },
  {
    key: "slug",
    label: "slug",
    type: "text",
    section: "content",
    isUnique: true,
  },
  { key: "sku", label: "sku", type: "text", section: "content" },
  {
    key: "shortDescription",
    label: "shortDescription",
    type: "text",
    section: "content",
    isLocalized: true,
  },
  {
    key: "longDescription",
    label: "longDescription",
    type: "richtext",
    section: "content",
    isLocalized: true,
  },
  // Pricing
  { key: "price", label: "price", type: "number", section: "pricing" },
  { key: "salePrice", label: "salePrice", type: "number", section: "pricing" },
  {
    key: "currency",
    label: "currency",
    type: "enum",
    section: "pricing",
    enumOptions: ["EUR", "USD", "GBP", "SEK"],
  },
  // Inventory
  {
    key: "inventoryStatus",
    label: "inventoryStatus",
    type: "enum",
    section: "inventory",
    enumOptions: ["IN_STOCK", "LOW_STOCK", "OUT_OF_STOCK", "DISCONTINUED"],
  },
  {
    key: "stockCount",
    label: "stockCount",
    type: "number",
    section: "inventory",
  },
  // Details
  { key: "heroImageId", label: "heroImage", type: "asset", section: "details" },
  {
    key: "dimensions",
    label: "dimensions",
    type: "component",
    section: "details",
  },
  { key: "weight", label: "weight", type: "component", section: "details" },
  {
    key: "assemblyRequired",
    label: "assemblyRequired",
    type: "boolean",
    section: "details",
  },
  {
    key: "careInstructions",
    label: "careInstructions",
    type: "text",
    section: "details",
    isLocalized: true,
  },
  {
    key: "warrantyMonths",
    label: "warrantyMonths",
    type: "number",
    section: "details",
  },
  // Categorization
  {
    key: "colorIds",
    label: "Colors",
    type: "reference",
    section: "categorization",
    isMultiple: true,
  },
  {
    key: "categoryId",
    label: "Category",
    type: "reference",
    section: "categorization",
  },
  {
    key: "collectionId",
    label: "Collection",
    type: "reference",
    section: "categorization",
  },
  {
    key: "relatedProductIds",
    label: "Related Products",
    type: "reference",
    section: "categorization",
    isMultiple: true,
  },
  // SEO & Visibility
  { key: "isFeatured", label: "isFeatured", type: "boolean", section: "seo" },
  {
    key: "metaDescription",
    label: "metaDescription",
    type: "text",
    section: "seo",
    isLocalized: true,
  },
];
