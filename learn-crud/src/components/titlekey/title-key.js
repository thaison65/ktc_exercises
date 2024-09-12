const titleKey = (key, title) => {
  if (title.length > 100) {
    title = title.substring(0, 60) + "...";
  }

  const titleElement = document.createElement("p");
  const spanElement = document.createElement("span");
  spanElement.classList.add("title-key");
  spanElement.textContent = `${key}: `;
  titleElement.appendChild(spanElement);

  const pElement = document.createElement("span");
  pElement.textContent = key === "Price" ? `$${title}` : title;

  titleElement.appendChild(pElement);

  return titleElement;
};

export default titleKey;
