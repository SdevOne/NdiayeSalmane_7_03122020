import { Data } from "./Data.js";
import { Dropdown } from "./Dropdown.js";
import { Tag } from "./Tag.js";

/*const ingredients = Data.getIngredients();
const appliances = Data.getAppliances();
const ustensils = Data.getUstensils();
const filters = document.querySelectorAll(".dropdown__element .dropdown__icon");

filters.forEach((filter) => {
  filter.addEventListener("click", (e) => {
    const type = e.target.parentElement.parentElement.classList[1];
    let placeholder;
    let list;
    let btn;
    switch (type) {
      case "ingredients":
        placeholder = "Recherche un ingrédient";
        list = Dropdown.list(ingredients, type, placeholder);
        btn = document.querySelector(".dropdown__element.ingredients");
        document.querySelector(".dropdown").replaceChild(list, btn);
        break;
      case "appliances":
        placeholder = "Recherche un appareil";
        list = Dropdown.list(appliances, type, placeholder);
        btn = document.querySelector(".dropdown__element.appliances");
        document.querySelector(".dropdown").replaceChild(list, btn);
        break;
      case "ustensils":
        placeholder = "Recherche un ustensile";
        list = Dropdown.list(ustensils, type, placeholder);
        btn = document.querySelector(".dropdown__element.ustensils");
        document.querySelector(".dropdown").replaceChild(list, btn);
        break;
    }
  });
});*/

let btns = [
  ["ingredients", "Ingrédients"],
  ["appliances", "Appareils"],
  ["ustensils", "Ustensiles"],
];
let parent = document.querySelector(".dropdown");
for (let i = 0; i < btns.length; i++) {
  let btn = Dropdown.btn(btns[i][0], btns[i][1]);
  parent.appendChild(btn);
}

Tag.init("ingredients", "Lait");

Data.getRecipes();
