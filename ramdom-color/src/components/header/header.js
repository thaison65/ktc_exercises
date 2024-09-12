import TitleHeader from "./title-header/title-header.js";
import BtnContainer from "./btn-container/btn-container.js";

const Header = () => {
  const headerElement = document.createElement("header");

  headerElement.appendChild(TitleHeader());
  headerElement.appendChild(BtnContainer());

  return headerElement;
};

export default Header;
