const ButtonToggle = () => {
  const buttonToggle = document.createElement("label");
  buttonToggle.classList.add("switch");

  const inputToggle = document.createElement("input");
  inputToggle.type = "checkbox";
  inputToggle.setAttribute("id", "btn-toggle");

  const spanElement = document.createElement("span");
  spanElement.classList.add("slider");

  buttonToggle.appendChild(inputToggle);
  buttonToggle.appendChild(spanElement);

  return buttonToggle;
};

export default ButtonToggle;
