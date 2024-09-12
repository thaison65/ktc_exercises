const inputField = (id, lable, type, placeholder, value) => {
  const inputFieldElement = document.createElement("div");
  inputFieldElement.classList.add("textfield");

  const lableElement = document.createElement("lable");
  lableElement.setAttribute("for", id);
  lableElement.textContent = lable;

  const inputElement = document.createElement("input");
  inputElement.setAttribute("id", id);
  inputElement.setAttribute("name", id);
  inputElement.setAttribute("type", type);
  inputElement.setAttribute("placeholder", placeholder);
  inputElement.setAttribute("value", value);
  inputElement.classList.add("input-style");

  inputFieldElement.appendChild(lableElement);
  inputFieldElement.appendChild(inputElement);

  return inputFieldElement;
};

export default inputField;
