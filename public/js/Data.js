import { Dropdown } from "./Dropdown.js";
import { Recipes } from "./Recipes.js";

export class Data {
  /**
   * @returns {Promise}
   */
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

  /**
   * Affiche toutes les recettes
   */
  static async getRecipes() {
    const data = await this.getData();
    for (const recipe of data.recipes) {
      Recipes.all(recipe);
    }
  }

  /**
   * filtre les ingrédients
   * @param {Array} data Recette à filtrer
   * @returns Liste filtrée des ingrédients
   */
  static filtersIngredients(data) {
    const ingredients = [];
    const sortedIngredients = [];
    for (const recipe of data) {
      for (let i = 0; i < recipe.ingredients.length; i++) {
        ingredients.push(recipe.ingredients[i].ingredient);
      }
    }
    for (let i = 0; i < ingredients.length; i++) {
      for (const data of ingredients) {
        if (sortedIngredients.includes(data) === false && sortedIngredients.indexOf(data) === -1) {
          sortedIngredients.push(data);
        }
      }
    }
    return sortedIngredients;
  }

  /**
   * filtre les appareils
   * @param {Array} data Recette à filtrer
   * @returns Liste filtrée des appareils
   */
  static filtersAppliances(data) {
    const appliances = [];
    const sortedAppliances = [];
    for (const appliance of data) {
      appliances.push(appliance.appliance);
    }
    for (let i = 0; i < appliances.length; i++) {
      for (const data of appliances) {
        if (sortedAppliances.includes(data) === false && sortedAppliances.indexOf(data) === -1) {
          sortedAppliances.push(data);
        }
      }
    }
    return sortedAppliances;
  }

  /**
   * filtre les ustensiles
   * @param {Array} data Recette à filtrer
   * @returns Liste filtrée des ustensiles
   */
  static filtersUstensils(data) {
    const ustensils = [];
    const sortedUstensils = [];
    for (const recipe of data) {
      for (let i = 0; i < recipe.ustensils.length; i++) {
        ustensils.push(recipe.ustensils[i]);
      }
    }
    for (let i = 0; i < ustensils.length; i++) {
      for (const data of ustensils) {
        if (sortedUstensils.includes(data) === false && sortedUstensils.indexOf(data) === -1) {
          sortedUstensils.push(data);
        }
      }
    }
    return sortedUstensils;
  }

  /**
   * actualise la liste des filtres
   * @param {Array} filtersElement
   */
  static async refreshButtons(filtersElement) {
    const btnscontainer = document.querySelector(".dropdown");
    const btns = [
      ["ingredients", "Ingrédients"],
      ["appliances", "Appareils"],
      ["ustensils", "Ustensiles"],
    ];
    btnscontainer.innerHTML = "";
    let ingredientsBtn = Dropdown.btn(btns[0][0], btns[0][1], filtersElement[0]);
    btnscontainer.appendChild(ingredientsBtn);
    let appliancesBtn = Dropdown.btn(btns[1][0], btns[1][1], filtersElement[1]);
    btnscontainer.appendChild(appliancesBtn);
    let ustensilsBtn = Dropdown.btn(btns[2][0], btns[2][1], filtersElement[2]);
    btnscontainer.appendChild(ustensilsBtn);
  }

  /**
   * actualise les résultats
   */
  static refresh(recipeArray) {
    Recipes.filter(recipeArray);
    let newFilters = [
      this.filtersIngredients(recipeArray),
      this.filtersAppliances(recipeArray),
      this.filtersUstensils(recipeArray),
    ];
    this.refreshButtons(newFilters);
  }

  /**
   *
   * @param {Object} recipe
   * @returns {Object}
   */
  static filterEmpty(recipe) {
    if (recipe !== undefined) {
      return recipe;
    }
  }
  /**
   *
   * @param {Array} tags Liste des filtres
   */
  static async refreshByTag(tags) {
    const data = await this.getData();
    const recipesContainer = document.querySelector(".recipes");
    const recipeArray = data.recipes;
    recipesContainer.innerHTML = "";
    for (let k = 0; k < tags.length; k++) {
      const tag = tags[k].toLowerCase();
      for (let i = 0; i < recipeArray.length; i++) {
        const recipe = recipeArray[i];
        if (recipe !== undefined) {
          if (
            recipe.name.toLowerCase().includes(tag) === false &&
            recipe.description.toLowerCase().includes(tag) === false &&
            recipe.appliance.toLowerCase().includes(tag) === false
          ) {
            let lengthCount1 = 0;
            for (let j = 0; j < recipe.ingredients.length; j++) {
              let ingredientsLength = recipe.ingredients.length;
              if (recipe.ingredients[j].ingredient.toLowerCase().includes(tag) === false) {
                lengthCount1++;
              }
              if (lengthCount1 === ingredientsLength) {
                let lengthCount2 = 0;
                for (let k = 0; k < recipe.ustensils.length; k++) {
                  let ustensilsLength = recipe.ustensils.length;
                  if (recipe.ustensils[k].toLowerCase().includes(tag) === false) {
                    lengthCount2++;
                  }
                  if (lengthCount2 === ustensilsLength) {
                    delete recipeArray[i];
                  }
                }
              }
            }
          }
        }
      }
    }
    const filtered = recipeArray.filter((recipe) => this.filterEmpty(recipe));
    this.refresh(filtered);
  }
}
