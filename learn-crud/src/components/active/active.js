import { deleteFetch } from "../../services/fetchApi.js";
import { deleteXmlhtpp } from "../../services/xmlhttp.js";
import titleKey from "../titlekey/title-key.js";

const activeEle = (rating, price, id) => {
  const activeElement = document.createElement("div");
  activeElement.classList.add("container-active");

  activeElement.appendChild(titleKey("Rating", rating));
  activeElement.appendChild(titleKey("Price", price));

  const btnElement = document.createElement("button");
  btnElement.setAttribute("id", "btn-delete");
  btnElement.textContent = "Delete";

  activeElement.appendChild(btnElement);

  btnElement.addEventListener("click", async (event) => {
    event.stopPropagation();

    try {
      await deleteFetch(id);
      // await deleteXmlhtpp(id);
      // alert("Deleted successfully");
    } catch (error) {
      alert("Error deleting product!");
      console.error("Error deleting product:", error);
      return;
    }

    const number = document.getElementById("number_product");
    const numberValue = parseInt(number.textContent) - 1;
    document.getElementById("number_product").textContent = `${numberValue} items`;

    btnElement.parentElement.parentElement.remove();
  });

  return activeElement;
};

export default activeEle;
