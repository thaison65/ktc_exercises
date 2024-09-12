import activeEle from "../active/active.js";
import imageEle from "../image/image.js";
import infoEle from "../info/info.js";
import Hotel from "../../models/Hotel.js";
import modalEle from "../modals/modals.js";

const sectionEle = (data) => {
  const hotel = new Hotel(data.id, data.name, data.image, data.phone, data.address, data.price, data.numberRating, data.description);
  if (!hotel) {
    return;
  }
  const itemContentEle = document.createElement("section");
  itemContentEle.classList.add("item-content");

  const container = document.createElement("div");
  container.classList.add("item-container");

  container.appendChild(imageEle(hotel.image, "Image"));
  container.appendChild(infoEle(hotel.name, hotel.phone, hotel.address, hotel.description));

  itemContentEle.appendChild(container);
  itemContentEle.appendChild(activeEle(hotel.numberRating, hotel.price, hotel.id));

  itemContentEle.addEventListener("click", () => {
    document.body.appendChild(modalEle(hotel));
    const modal = document.getElementById("modal");
    modal.style.display = "flex";
  });

  return itemContentEle;
};

export default sectionEle;
