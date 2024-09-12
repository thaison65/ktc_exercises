import Header from "./src/components/header/header.js";
import Container from "./src/components/container/container.js";

import { convertRGBtoHex } from "./src/utils/convertRGBtoHex.js";
import { CHARS, CHARS_REVERSE, COLOR_CODE_LENGTH } from "./src/constains/constains.js";
import { generateColor, generateColorsReverse } from "./src/hooks/generateColor.js";
import { reverseColor } from "./src/utils/colors.js";

let arrHexColor = [];
localStorage.setItem("arrHexColor", arrHexColor);

const rootElement = document.getElementById("root");
rootElement.appendChild(Header());
rootElement.appendChild(Container());

const btnReset = document.getElementById("btn-reset");
btnReset.addEventListener("click", (e) => {
  e.stopPropagation();
  document.body.style.backgroundColor = "#ffffff";
  document.querySelector("h1").style.color = "#000000";
  document.getElementById("btn-toggle").checked = false;
});

const btnToggle = document.getElementById("btn-toggle");
btnToggle.addEventListener("click", (e) => {
  e.stopPropagation();

  const bgBody = document.body.style.backgroundColor;
  const colorContainerEls = document.querySelectorAll(".color-container");

  if (!bgBody) {
    document.querySelector("h1").style.color = "#ffffff";
    document.body.style.backgroundColor = "#000000";
    return;
  }

  if (!!bgBody.includes("#")) {
    console.log("Mã hex");
    return;
  }

  const colorHex = convertRGBtoHex(bgBody);
  const colorReverse = reverseColor(COLOR_CODE_LENGTH, colorHex, CHARS, CHARS_REVERSE);

  document.querySelector("h1").style.color = `#${colorHex}`;

  document.body.style.backgroundColor = `#${colorReverse}`;

  const data = localStorage.getItem("arrHexColor");

  if (data) {
    const storedTodos = JSON.parse(data);
    arrHexColor = [...storedTodos];
  }

  for (let color of arrHexColor) {
    if (color === colorHex) {
      const index = arrHexColor.indexOf(color);
      arrHexColor[index] = colorReverse;

      localStorage.setItem("arrHexColor", JSON.stringify(arrHexColor));

      colorContainerEls[index].style.backgroundColor = `#${colorReverse}`;
      colorContainerEls[index].textContent = `#${colorReverse}`;

      return;
    }
  }
});

const btnRandomColor = document.getElementById("btn-random");
const colorContainerEls = document.querySelectorAll(".color-container");
btnRandomColor.addEventListener("click", (e) => {
  e.stopPropagation();
  localStorage.setItem("arrHexColor", arrHexColor);
  colorContainerEls.forEach((colorContainerEl) => {
    generateColor(colorContainerEl);
  });
  document.getElementById("btn-toggle").checked = false;
});

const btnInvalid = document.getElementById("btn-inverted");
btnInvalid.addEventListener("click", (e) => {
  e.stopPropagation();
  generateColorsReverse(colorContainerEls);
  document.getElementById("btn-toggle").checked = false;
});
