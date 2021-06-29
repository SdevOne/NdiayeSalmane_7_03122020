export class Tag {
  static init(type, data) {
    let parent = document.querySelector(".tag");
    let tag = document.createElement("p");
    tag.classList.add("tag__element", type);
    tag.innerHTML = data;
    let icon = document.createElement("span");
    icon.classList.add("far", "fa-times-circle", "tag__icon");
    icon.addEventListener("click", (e) => {
      e.target.parentElement.remove();
    });
    tag.appendChild(icon);
    parent.appendChild(tag);
  }
}
