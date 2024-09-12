import Item from "./item/item.js";

import { COUNT_COLOR_CONTAINER, COLOR_CODE_LENGTH, CHARS, CHARS_REVERSE } from "../../constains/constains.js";
import { reverseColor } from "../../utils/colors.js";

const Container = () => {
  const containerEl = document.createElement("div");
  containerEl.setAttribute("id", "container");

  for (let index = 0; index < COUNT_COLOR_CONTAINER; index++) {
    containerEl.appendChild(Item());
  }

  containerEl.addEventListener("click", (e) => {
    const hexColor = e.target.textContent.trim();

    if (hexColor.length > 7) {
      console.log("Please enter a valid hex color.");
      return;
    }

    const reverse = reverseColor(COLOR_CODE_LENGTH, hexColor.substring(1), CHARS, CHARS_REVERSE);

    const h1Element = document.querySelector("h1");
    const bodyElement = document.body;
    const toggleButton = document.getElementById("btn-toggle");

    if (h1Element) {
      h1Element.style.color = `#${reverse}`;
    }

    // Tạo một phần tử textarea tạm thời để chứa text
    var tempInput = document.createElement("textarea");
    tempInput.value = hexColor;
    document.body.appendChild(tempInput);

    // Chọn toàn bộ nội dung của textarea
    tempInput.select();
    tempInput.setSelectionRange(0, 99999); // For mobile devices

    // Thực hiện sao chép
    document.execCommand("copy");

    // Xóa phần tử textarea tạm thời
    document.body.removeChild(tempInput);

    // alert(`Copy color Hex: ${hexColor}`);

    bodyElement.style.backgroundColor = hexColor;

    if (toggleButton) {
      toggleButton.checked = false;
    }
  });

  return containerEl;
};

export default Container;
