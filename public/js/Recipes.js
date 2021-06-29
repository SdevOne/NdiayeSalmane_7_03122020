export class Recipes {
  static init(recipe) {
    let parent = document.querySelector(".recipes");
    let card = document.createElement("div");
    card.classList.add("recipes__card");
    let img = document.createElement("div");
    img.classList.add("recipes__img");
    let txtContainer = document.createElement("div");
    txtContainer.classList.add("recipes__txt-container");
    let heading = document.createElement("div");
    heading.classList.add("recipes__heading");
    let title = document.createElement("h2");
    title.classList.add("recipes__title");
    title.innerHTML = recipe.name;
    let time = document.createElement("div");
    time.classList.add("recipes__time");
    let icon = document.createElement("span");
    icon.classList.add("far", "fa-clock", "recipes__icon");
    let minutes = document.createElement("p");
    minutes.innerHTML = recipe.time + " min";
    time.appendChild(icon);
    time.appendChild(minutes);
    heading.appendChild(title);
    heading.appendChild(time);
    let noticeContainer = document.createElement("div");
    noticeContainer.classList.add("recipes__notice-container");
    let noticeBlock = document.createElement("div");
    noticeBlock.classList.add("recipes__notice-block");
    console.log(recipe.ingredients);
    for (const ingredient of recipe.ingredients) {
      let ingredients = document.createElement("p");
      ingredients.classList.add("recipes__ingredients");
      ingredients.innerHTML = ingredient.ingredient;
      if (ingredient.quantity !== undefined) {
        let quantity = document.createElement("span");
        quantity.classList.add("recipes__ingredients-quantity");
        quantity.innerHTML = ": " + ingredient.quantity + " ";
        ingredients.appendChild(quantity);
      }
      if (ingredient.unit !== undefined) {
        let unit = document.createElement("span");
        unit.classList.add("recipes__ingredients-unit");
        if (ingredient.unit === "grammes") {
          unit.innerHTML = "g";
        } else {
          unit.innerHTML = ingredient.unit;
        }
        ingredients.appendChild(unit);
      }
      noticeBlock.appendChild(ingredients);
    }
    let noticeBlock2 = document.createElement("div");
    noticeBlock2.classList.add("recipes__notice-block");
    let notice = document.createElement("p");
    notice.classList.add("recipes__notice");
    notice.innerHTML = recipe.description;
    noticeBlock2.appendChild(notice);
    noticeContainer.appendChild(noticeBlock);
    noticeContainer.appendChild(noticeBlock2);
    txtContainer.appendChild(heading);
    txtContainer.appendChild(noticeContainer);
    card.appendChild(img);
    card.appendChild(txtContainer);
    parent.appendChild(card);
  }
}
