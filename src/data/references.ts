import type { Asset, Category, Collection, Color } from "./types";

// Fixtures

export const assets: Asset[] = [
  {
    id: "ast_nordli_hero",
    url: "/placeholder-product.jpg",
    altText: {
      en: "NORDLI 6-Drawer Dresser in walnut finish, front three-quarter view",
      // de intentionally missing - demonstrates partial-locale state
    },
    width: 1600,
    height: 1200,
  },
];

export const colors: Color[] = [
  { id: "clr_walnut_natural", name: "Walnut Natural", hex: "#5C3A21" },
  { id: "clr_oak_white", name: "White Oak", hex: "#E6D7B8" },
  { id: "clr_pine_unfinished", name: "Unfinished Pine", hex: "#D4B896" },
  { id: "clr_black_lacquer", name: "Black Lacquer", hex: "#0A0A0A" },
];

export const categories: Category[] = [
  { id: "cat_storage", name: "Storage", slug: "storage" },
  { id: "cat_bedroom", name: "Bedroom", slug: "bedroom" },
  { id: "cat_living_room", name: "Living Room", slug: "living-room" },
  { id: "cat_office", name: "Office", slug: "office" },
];

export const collections: Collection[] = [
  {
    id: "col_nordli",
    name: "NORDLI Modular",
    slug: "nordli",
    season: "ALL_YEAR",
  },
  { id: "col_aurora", name: "Aurora Spring", slug: "aurora", season: "SPRING" },
  {
    id: "col_solstice",
    name: "Solstice Summer",
    slug: "solstice",
    season: "SUMMER",
  },
];

// Resolution helpers

export function resolveAsset(id: string): Asset | undefined {
  return assets.find((a) => a.id === id);
}

export function resolveColor(id: string): Color | undefined {
  return colors.find((c) => c.id === id);
}

export function resolveColors(ids: string[]): Color[] {
  return ids.map(resolveColor).filter((c): c is Color => c !== undefined);
}

export function resolveCategory(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}

export function resolveCollection(id: string): Collection | undefined {
  return collections.find((c) => c.id === id);
}
