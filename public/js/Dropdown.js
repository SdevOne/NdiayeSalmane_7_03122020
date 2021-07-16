import { Data } from "./Data.js";
import { Tag } from "./Tag.js";
import { Recipes } from "./Recipes.js";

export class Dropdown {
  /**
   * crée un filtre de recherche
   * @param {string} type Définit le background du bouton
   * @param {string} placeholder Placeholder du champ de recherche du bouton
   * @returns {HTMLDivElement}
   */
  static btn(type, placeholder, data) {
    let container = document.createElement("div");
    container.classList.add("dropdown__element", type);
    let searchBox = document.createElement("div");
    searchBox.classList.add("dropdown__search-box");
    let searchInput = document.createElement("input");
    searchInput.classList.add("dropdown__search");
    searchInput.setAttribute("type", "search");
    searchInput.setAttribute("placeholder", placeholder);
    let icon = document.createElement("span");
    icon.classList.add("fas", "fa-chevron-down", "dropdown__icon");
    icon.addEventListener("click", (e) => {
      const type = e.target.parentElement.parentElement.classList[1];
      const openedList = document.querySelector(".dropdown-list");
      if (openedList !== null) {
        let type = openedList.classList[1];
        this.replaceList(type);
      }
      this.replaceBtn(type, data);
    });
    searchBox.appendChild(searchInput);
    searchBox.appendChild(icon);
    container.appendChild(searchBox);
    return container;
  }

  /**
   *
   * @param {string} searchData Entrée recherchée
   * @param {string} type Définit le background pour l'affichage
   */
  static searchResult(searchData, type) {
    let parent = document.querySelector(".dropdown__search-box");
    let result = document.createElement("p");
    result.classList.add("dropdown__search-result", type);
    result.innerHTML = searchData;
    parent.appendChild(result);
  }

  /**
   * crée une liste correspondant au filtre séléctionné
   * @param {array} data Différents éléments de la liste
   * @param {string} type Définit le background
   * @param {string} placeholder Placeholder du champ de recherche de la liste
   * @returns {HTMLDivElement}
   */
  static list(type, placeholder, data) {
    let container = document.createElement("div");
    container.classList.add("dropdown-list", type);
    let searchContainer = document.createElement("div");
    searchContainer.classList.add("dropdown-list__search-container");
    let input = document.createElement("input");
    input.classList.add("dropdown-list__search", "list-search");
    input.setAttribute("placeholder", placeholder);
    input.setAttribute("type", "search");
    input.addEventListener("keyup", (e) => {
      const search = e.target.value;
      const listItem = document.querySelectorAll(".dropdown-list__item");
      for (const item of listItem) {
        console.log(item.textContent.toLowerCase().includes(search));
        if (item.textContent.toLowerCase().includes(search) === false) {
          item.style.display = "none";
        } else {
          item.style.display = "block";
        }
      }
    });
    let icon = document.createElement("span");
    icon.classList.add("fas", "fa-chevron-up", "dropdown__icon");
    icon.addEventListener("click", (e) => {
      const type = e.target.parentElement.parentElement.classList[1];
      this.replaceList(type, data);
    });
    let list = document.createElement("ul");
    list.classList.add("dropdown-list__container");
    searchContainer.appendChild(input);
    searchContainer.appendChild(icon);
    container.appendChild(searchContainer);
    container.appendChild(list);
    for (const item of data) {
      let li = document.createElement("li");
      li.classList.add("dropdown-list__item");
      li.addEventListener("click", (e) => {
        Tag.init(type, e.target.innerHTML);
        this.replaceList(type, data);
        const tags = document.querySelectorAll(".tag__element");
        const tagsList = [];
        tags.forEach((tag) => {
          tagsList.push(tag.textContent);
        });
        Data.refreshByTag(tagsList);
      });
      li.innerHTML = item;
      list.appendChild(li);
    }
    return container;
  }

  /**
   * remplace une liste par le filtre correspondant
   * @param {string} type Définit le background
   */
  static replaceList(type, data) {
    let placeholder;
    let btn;
    let list;
    switch (type) {
      case "ingredients":
        placeholder = "Ingrédients";
        btn = this.btn(type, placeholder, data);
        list = document.querySelector(".dropdown-list.ingredients");
        document.querySelector(".dropdown").replaceChild(btn, list);
        break;
      case "appliances":
        placeholder = "Appareils";
        btn = this.btn(type, placeholder, data);
        list = document.querySelector(".dropdown-list.appliances");
        document.querySelector(".dropdown").replaceChild(btn, list);
        break;
      case "ustensils":
        placeholder = "Ustensiles";
        btn = this.btn(type, placeholder, data);
        list = document.querySelector(".dropdown-list.ustensils");
        document.querySelector(".dropdown").replaceChild(btn, list);
        break;
    }
  }

  /**
   * remplace un filtre par la liste qui lui correspond
   * @param {string} type Définit le background
   */
  static async replaceBtn(type, data) {
    let placeholder;
    let btn;
    let list;
    switch (type) {
      case "ingredients":
        placeholder = "Recherche un ingrédient";
        list = this.list(type, placeholder, data);
        btn = document.querySelector(".dropdown__element.ingredients");
        document.querySelector(".dropdown").replaceChild(list, btn);
        break;
      case "appliances":
        placeholder = "Recherche un appareil";
        list = this.list(type, placeholder, data);
        btn = document.querySelector(".dropdown__element.appliances");
        document.querySelector(".dropdown").replaceChild(list, btn);
        break;
      case "ustensils":
        placeholder = "Recherche un ustensile";
        list = this.list(type, placeholder, data);
        btn = document.querySelector(".dropdown__element.ustensils");
        document.querySelector(".dropdown").replaceChild(list, btn);
        break;
    }
  }
}
