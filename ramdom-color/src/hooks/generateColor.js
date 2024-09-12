import { CHARS, CHARS_REVERSE, COLOR_CODE_LENGTH, COUNT_COLOR_CONTAINER } from "../constains/constains.js";
import { randomColor, reverseColor } from "../utils/colors.js";

function generateColor(colorContainerEl) {
  const newColorCode = randomColor(COLOR_CODE_LENGTH, CHARS);
  //   console.log(newColorCode); // Lấy được mã hex
  let arrHexColor = [];
  const data = localStorage.getItem("arrHexColor");

  if (data) {
    const storedTodos = JSON.parse(data);
    arrHexColor = [...storedTodos];
  }

  arrHexColor = [...arrHexColor, newColorCode];

  localStorage.setItem("arrHexColor", JSON.stringify(arrHexColor));

  colorContainerEl.style.backgroundColor = `#${newColorCode}`;
  colorContainerEl.textContent = `#${newColorCode}`;
}

function generateColorsReverse(colorContainerEls) {
  let arrHexColor = [];
  const data = localStorage.getItem("arrHexColor");

  if (data) {
    const storedTodos = JSON.parse(data);
    arrHexColor = [...storedTodos];
  }

  for (let i = 0; i < COUNT_COLOR_CONTAINER; i++) {
    const newColorCode = reverseColor(COLOR_CODE_LENGTH, arrHexColor[i], CHARS, CHARS_REVERSE);

    arrHexColor[i] = newColorCode;
    localStorage.setItem("arrHexColor", JSON.stringify(arrHexColor));

    colorContainerEls[i].style.backgroundColor = `#${newColorCode}`;
    colorContainerEls[i].textContent = `#${newColorCode}`;
  }
}

export { generateColor, generateColorsReverse };
