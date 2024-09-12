import titleKey from "../titlekey/title-key.js";

const infoEle = (name, phone, address, description) => {
  const infoContainerElement = document.createElement("div");
  infoContainerElement.classList.add("info-container");
  const nameElement = document.createElement("h3");
  nameElement.textContent = name;

  infoContainerElement.appendChild(nameElement);
  infoContainerElement.appendChild(titleKey("Phone", phone));
  infoContainerElement.appendChild(titleKey("Address", address));
  infoContainerElement.appendChild(titleKey("Description", description));

  

  return infoContainerElement;
};

export default infoEle;
