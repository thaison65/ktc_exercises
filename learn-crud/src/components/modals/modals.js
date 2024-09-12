import { putFetch } from "../../services/fetchApi.js";
import { putXmlhtpp } from "../../services/xmlhttp.js";
import inputField from "../inputField/inputField.js";

const modalEle = (data) => {
  const modalElement = document.createElement("div");
  modalElement.setAttribute("id", "modal");

  const content = document.createElement("div");
  content.classList.add("modal-content");

  const h2Element = document.createElement("h2");
  h2Element.textContent = "Update item";

  const formElement = document.createElement("form");
  formElement.appendChild(inputField("name", "Name", "text", "Enter the name of the hotel", data.name));
  formElement.appendChild(inputField("phone", "Phone", "phone", "Enter phone number of hotel", data.phone));
  formElement.appendChild(inputField("price", "Price", "text", "Enter price of hotel", data.price));
  formElement.appendChild(inputField("address", "Address", "text", "Enter address of hotel", data.address));
  formElement.appendChild(inputField("description", "Description", "text", "Enter description", data.description));

  const btnContainer = document.createElement("div");
  btnContainer.classList.add("btn-container");

  const btnCancel = document.createElement("button");
  btnCancel.textContent = "Cancel";
  btnCancel.setAttribute("id", "btn-cancel");

  const btnUpdate = document.createElement("button");
  btnUpdate.textContent = "Update";
  btnUpdate.setAttribute("id", "btn-update");
  btnUpdate.setAttribute("type", "submit");

  btnContainer.appendChild(btnCancel);
  btnContainer.appendChild(btnUpdate);

  formElement.appendChild(btnContainer);

  content.appendChild(h2Element);
  content.appendChild(formElement);

  modalElement.appendChild(content);

  modalElement.addEventListener("click", (event) => {
    event.stopPropagation();
    // modalElement.remove();
  });

  btnCancel.addEventListener("click", (event) => {
    event.stopPropagation();
    modalElement.remove();
  });

  formElement.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(formElement);
    const name = formData.get("name");
    const phone = formData.get("phone");
    const price = formData.get("price");
    const address = formData.get("address");
    const description = formData.get("description");

    try {
      const updatedData = { name, phone, price, address, description };

      await putFetch(data.id, updatedData);
      // await putXmlhtpp(data.id, updatedData);
    } catch (error) {
      console.error("Error updating item:", error);
      alert("Error updating item. Please try again later.");
      return;
    }

    modalElement.remove();
  });

  return modalElement;
};

export default modalEle;
