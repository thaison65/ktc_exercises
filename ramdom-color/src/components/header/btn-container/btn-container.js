import Button from "../../button/button.js";
import ButtonToggle from "../../button/button-toggle.js";

const noTransparent = [
  "max-w-32",
  "items-center",
  "justify-center",
  "flex",
  "border",
  "rounded-lg",
  "border-sky-500",
  "shadow-lg",
  "hover:bg-transparent",
  "bg-sky-500",
  "hover:text-sky-500",
  "text-white",
  "duration-300",
  "cursor-pointer",
  "active:scale-[0.98]",
];

const transparent = [
  "max-w-32",
  "bg-transparent",
  "items-center",
  "justify-center",
  "flex",
  "border",
  "rounded-lg",
  "border-sky-500",
  "shadow-lg",
  "hover:bg-sky-500",
  "text-sky-500",
  "hover:text-white",
  "duration-300",
  "cursor-pointer",
  "active:scale-[0.98]",
];

const BtnContainer = () => {
  const btnContainerElement = document.createElement("div");
  btnContainerElement.classList.add("btn-container");

  btnContainerElement.appendChild(Button(noTransparent, "btn-reset", "Reset"));
  btnContainerElement.appendChild(Button(transparent, "btn-random", "Random"));
  btnContainerElement.appendChild(Button(noTransparent, "btn-inverted", "Inverted"));
  btnContainerElement.appendChild(ButtonToggle());

  return btnContainerElement;
};

export default BtnContainer;
