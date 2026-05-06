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

export interface FieldDefinition {
  key: keyof Product;
  label: string;
  type: FieldType;
  isLocalized?: boolean;
  isTitle?: boolean;
  isUnique?: boolean;
  isMultiple?: boolean;
  enumOptions?: readonly string[];
}

export const productFieldDefinitions: FieldDefinition[] = [
  {
    key: "name",
    label: "name",
    type: "text",
    isLocalized: true,
    isTitle: true,
  },
  { key: "slug", label: "slug", type: "text", isUnique: true },
  {
    key: "shortDescription",
    label: "shortDescription",
    type: "text",
    isLocalized: true,
  },
  {
    key: "longDescription",
    label: "longDescription",
    type: "richtext",
    isLocalized: true,
  },
  { key: "sku", label: "sku", type: "text" },
  { key: "price", label: "price", type: "number" },
  { key: "salePrice", label: "salePrice", type: "number" },
  {
    key: "currency",
    label: "currency",
    type: "enum",
    enumOptions: ["EUR", "USD", "GBP", "SEK"],
  },
  {
    key: "inventoryStatus",
    label: "inventoryStatus",
    type: "enum",
    enumOptions: ["IN_STOCK", "LOW_STOCK", "OUT_OF_STOCK", "DISCONTINUED"],
  },
  { key: "heroImageId", label: "heroImage", type: "asset" },
  { key: "dimensions", label: "dimensions", type: "component" },
  { key: "weight", label: "weight", type: "component" },
  { key: "colorIds", label: "Colors", type: "reference", isMultiple: true },
  { key: "categoryId", label: "Category", type: "reference" },
  { key: "collectionId", label: "Collection", type: "reference" },
  { key: "assemblyRequired", label: "assemblyRequired", type: "boolean" },
  {
    key: "careInstructions",
    label: "careInstructions",
    type: "text",
    isLocalized: true,
  },
  { key: "warrantyMonths", label: "warrantyMonths", type: "number" },
  { key: "isFeatured", label: "isFeatured", type: "boolean" },
  { key: "stockCount", label: "stockCount", type: "number" },
  {
    key: "relatedProductIds",
    label: "Related Products",
    type: "reference",
    isMultiple: true,
  },
  {
    key: "metaDescription",
    label: "metaDescription",
    type: "text",
    isLocalized: true,
  },
];
