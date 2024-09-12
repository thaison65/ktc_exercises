import sectionEle from "./src/components/section/section.js";

import { getFetch, postFetch } from "./src/services/fetchApi.js";
import { getXmlhtpp, postXmlhtpp } from "./src/services/xmlhttp.js";

const formElement = document.querySelector("form");
const content = document.getElementById("content");
const number = document.getElementById("number_product");

const inputPhone = document.querySelector("input[name='phone']");
const inputPrice = document.querySelector("input[name='price']");

formElement.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(formElement);
  const name = formData.get("name");
  const phone = formData.get("phone");
  const price = formData.get("price");
  const address = formData.get("address");
  const description = formData.get("description");

  try {
    let product = {
      name,
      phone,
      price,
      address,
      description,

      image: "https://loremflickr.com/640/480/city",
      numberRating: Math.floor(Math.random() * 100),
    };

    await postFetch(product);
    // await postXmlhtpp(product);
    alert("ADD PRODUCT successfully");
  } catch (error) {
    console.error("Error post item:", error);
    alert("Error post item. Please try again later.");
    return;
  }

  content.appendChild(sectionEle(product));
  number.textContent = `${number.textContent.split(" ")[0]} ${parseInt(number.textContent.split(" ")[1]) + 1} hotels`;

  formElement.reset();
});

inputPhone.addEventListener("input", (event) => {
  const phone = event.target.value;
  if (isNaN(phone)) {
    event.target.value = phone.slice(0, -1);
    alert("Please enter a valid phone number!");
    return;
  }
  return true;
});

inputPrice.addEventListener("input", (event) => {
  const price = event.target.value;
  if (isNaN(price)) {
    event.target.value = price.slice(0, -1);
    alert("Please enter a valid number!");
    return;
  }
  return true;
});

const getAPI = async () => {
  try {
    const response = await getFetch();
    // const response = await getXmlhtpp();

    number.textContent = `${response.length} items`;
    response.forEach((item) => content.appendChild(sectionEle(item)));
  } catch (error) {
    console.error("Error:", error);
  }
};

getAPI();
