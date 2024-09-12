const Button = (arrClass, id, title) => {
  const divElement = document.createElement("div");

  arrClass.forEach((value) => {
    divElement.classList.add(value);
  });

  const buttonElement = document.createElement("Button");
  buttonElement.setAttribute("id", id);
  buttonElement.classList.add("px-5", "py-2");
  buttonElement.textContent = title;

  divElement.appendChild(buttonElement);

  return divElement;
};

export default Button;
