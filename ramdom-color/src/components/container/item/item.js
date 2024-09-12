import { generateColor } from "../../../hooks/generateColor.js";

const Item = () => {
  const colorContainerEl = document.createElement("div");
  colorContainerEl.classList.add("color-container");

  generateColor(colorContainerEl);

  return colorContainerEl;
};

export default Item;
