import { Dropdown } from "./Dropdown.js";
import { Recipes } from "./Recipes.js";

export class Data {
  static getData() {
    const data = fetch("./public/js/api/recipes.json")
      .then(function (response) {
        return response.json();
      })
      .catch(function (error) {
        document.location.href = "../404.html";
      });
    return data;
  }

  static getIngredients() {
    const ingredients = [];
    const sortedIngredients = [];
    this.getData().then(function (data) {
      for (let i = 0; i < data.recipes.length; i++) {
        ingredients.push(data.recipes[i].ingredients);
      }
      for (let i = 0; i < ingredients.length; i++) {
        for (const data of ingredients[i]) {
          if (
            sortedIngredients.includes(data.ingredient) === false &&
            sortedIngredients.indexOf(data.ingredient) === -1
          ) {
            sortedIngredients.push(data.ingredient);
          }
        }
      }
    });
    return sortedIngredients;
  }

  static getAppliances() {
    const appliances = [];
    const sortedAppliances = [];
    this.getData().then(function (data) {
      for (let i = 0; i < data.recipes.length; i++) {
        appliances.push(data.recipes[i].appliance);
      }
      for (let i = 0; i < appliances.length; i++) {
        for (const data of appliances) {
          if (sortedAppliances.includes(data) === false && sortedAppliances.indexOf(data) === -1) {
            sortedAppliances.push(data);
          }
        }
      }
    });
    return sortedAppliances;
  }

  static getUstensils() {
    const ustensils = [];
    const sortedUstensils = [];
    this.getData().then(function (data) {
      for (let i = 0; i < data.recipes.length; i++) {
        ustensils.push(data.recipes[i].ustensils);
      }
      for (let i = 0; i < ustensils.length; i++) {
        for (const data of ustensils[i]) {
          let toLowerData = data[0].toUpperCase() + data.slice(1);

          if (sortedUstensils.includes(toLowerData) === false && sortedUstensils.indexOf(toLowerData) === -1) {
            sortedUstensils.push(toLowerData);
          }
        }
      }
    });
    return sortedUstensils;
  }

  static getRecipes() {
    this.getData().then(function (data) {
      for (const recipe of data.recipes) {
        Recipes.init(recipe);
      }
    });
  }
}
