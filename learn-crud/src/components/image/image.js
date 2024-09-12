const imageEle = (src, alt) => {
  const containerElement = document.createElement("div");
  containerElement.classList.add("image-container");

  const imageElement = document.createElement("img");
  imageElement.src = src;
  imageElement.alt = alt;

  containerElement.appendChild(imageElement);

  return containerElement;
};

export default imageEle;
