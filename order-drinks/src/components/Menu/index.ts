import CategoryType from '../../@types/category';
import { DrinkType } from '../../@types/drink';
import DrinkElement from '../Drink/index.js';

type MenuElementType = {
  (category: CategoryType, drinks: DrinkType[]): HTMLElement;
};

const MenuElement: MenuElementType = (category, drinks) => {
  const sectionMenu = document.createElement('section');
  sectionMenu.classList.add('menu-category');

  const article = document.createElement('article');
  article.classList.add('title-category');
  article.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path
                fill="#171717"
                d="M10 3H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1M9 9H5V5h4zm11-6h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1m-1 6h-4V5h4zm-9 4H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1m-1 6H5v-4h4zm8-6c-2.206 0-4 1.794-4 4s1.794 4 4 4s4-1.794 4-4s-1.794-4-4-4m0 6c-1.103 0-2-.897-2-2s.897-2 2-2s2 .897 2 2s-.897 2-2 2" />
            </svg>`;
  const h2 = document.createElement('h2');
  h2.textContent = `${category.name} Menu`;

  const section = document.createElement('section');
  section.classList.add('menu-item');

  drinks.forEach((drink) => {
    if (category.id === drink.categoryId) {
      section.appendChild(DrinkElement(drink));
    }
  });
  article.appendChild(h2);

  sectionMenu.appendChild(article);
  sectionMenu.appendChild(section);

  return sectionMenu;
};

export default MenuElement;
