import { Data } from "./Data.js";

const data = await Data.getData();
const allFilters = [
  Data.filtersIngredients(data.recipes),
  Data.filtersAppliances(data.recipes),
  Data.filtersUstensils(data.recipes),
];
Data.refreshButtons(allFilters);

await Data.getRecipes();
await Data.refreshBySearchbar();
