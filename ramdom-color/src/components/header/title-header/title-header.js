const TitleHeader = () => {
  const titleHeaderElement = document.createElement("h1");
  titleHeaderElement.classList.add("text-2xl", "font-semibold");
  titleHeaderElement.textContent = "Random Color Generator";

  return titleHeaderElement;
};

export default TitleHeader;
