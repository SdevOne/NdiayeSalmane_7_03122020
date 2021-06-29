import { Data } from "./Data.js";

export class Dropdown {
  static btn(type, placeholder) {
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
      this.replaceBtn(type);
    });
    searchBox.appendChild(searchInput);
    searchBox.appendChild(icon);
    container.appendChild(searchBox);
    return container;
  }

  static searchResult(searchData, type) {
    let parent = document.querySelector(".dropdown__search-box");
    let result = document.createElement("p");
    result.classList.add("dropdown__search-result", type);
    result.innerHTML = searchData;
    parent.appendChild(result);
  }

  static list(data, type, placeholder) {
    let container = document.createElement("div");
    container.classList.add("dropdown-list", type);
    let searchContainer = document.createElement("div");
    searchContainer.classList.add("dropdown-list__search-container");
    let input = document.createElement("input");
    input.classList.add("dropdown-list__search", "list-search");
    input.setAttribute("placeholder", placeholder);
    input.setAttribute("type", "search");
    let icon = document.createElement("span");
    icon.classList.add("fas", "fa-chevron-up", "dropdown__icon");
    icon.addEventListener("click", (e) => {
      const type = e.target.parentElement.parentElement.classList[1];
      this.replaceList(type);
    });
    let list = document.createElement("ul");
    list.classList.add("dropdown-list__container");
    searchContainer.appendChild(input);
    searchContainer.appendChild(icon);
    container.appendChild(searchContainer);
    container.appendChild(list);
    console.log(data);
    for (const item of data) {
      let li = document.createElement("li");
      li.classList.add("dropdown-list__item");
      li.innerHTML = item;
      list.appendChild(li);
    }
    return container;
  }

  static replaceList(type) {
    let placeholder;
    let btn;
    let list;
    switch (type) {
      case "ingredients":
        placeholder = "Ingrédients";
        btn = this.btn(type, placeholder);
        list = document.querySelector(".dropdown-list.ingredients");
        document.querySelector(".dropdown").replaceChild(btn, list);
        break;
      case "appliances":
        placeholder = "Appareils";
        btn = this.btn(type, placeholder);
        list = document.querySelector(".dropdown-list.appliances");
        document.querySelector(".dropdown").replaceChild(btn, list);
        break;
      case "ustensils":
        placeholder = "Ustensiles";
        btn = this.btn(type, placeholder);
        list = document.querySelector(".dropdown-list.ustensils");
        document.querySelector(".dropdown").replaceChild(btn, list);
        break;
    }
  }

  static replaceBtn(type) {
    let placeholder;
    let btn;
    let list;
    switch (type) {
      case "ingredients":
        placeholder = "Recherche un ingrédient";
        list = Dropdown.list(Data.getIngredients(), type, placeholder);
        btn = document.querySelector(".dropdown__element.ingredients");
        document.querySelector(".dropdown").replaceChild(list, btn);
        break;
      case "appliances":
        placeholder = "Recherche un appareil";
        list = Dropdown.list(Data.getAppliances(), type, placeholder);
        btn = document.querySelector(".dropdown__element.appliances");
        document.querySelector(".dropdown").replaceChild(list, btn);
        break;
      case "ustensils":
        placeholder = "Recherche un ustensile";
        list = Dropdown.list(Data.getUstensils(), type, placeholder);
        btn = document.querySelector(".dropdown__element.ustensils");
        document.querySelector(".dropdown").replaceChild(list, btn);
        break;
    }
  }
}
