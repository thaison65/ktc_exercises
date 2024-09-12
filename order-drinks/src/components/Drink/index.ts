import { DrinkType, NewDrinkType } from '../../@types/drink';
import ItemCart from '../ItemCart/index.js';

type DrinkElementType = {
  (drink: DrinkType): HTMLElement;
};

const DrinkElement: DrinkElementType = (drink) => {
  const article = document.createElement('article');
  article.classList.add('item-content');

  const img = document.createElement('img');
  img.src = './src/assets/images/cupImage.png';
  img.alt = drink.name;

  const h3 = document.createElement('h3');
  h3.textContent = drink.name;

  const p = document.createElement('p');
  p.textContent = drink.nameEnglish || '';

  const pPrice = document.createElement('p');
  pPrice.classList.add('price');
  pPrice.textContent = `${drink.price} vnd`;

  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = 'Add to Cart';
  button.classList.add('btn-add');

  button.addEventListener('click', () => {
    const drinksString = localStorage.getItem('orderDrinks');
    let drinksArr: NewDrinkType[] = drinksString ? JSON.parse(drinksString) : [];

    const existingDrinkIndex = drinksArr.findIndex((item) => item.id === drink.id);

    if (existingDrinkIndex !== -1) {
      drinksArr[existingDrinkIndex].quantity += 1;
    } else {
      const newDrink: NewDrinkType = {
        ...drink,
        quantity: 1,
      };
      drinksArr.push(newDrink);
    }

    localStorage.setItem('orderDrinks', JSON.stringify(drinksArr));

    const badge = document.getElementById('badge');
    const shoppingCart = document.getElementById('shopping');
    if (badge) {
      badge.style.display = 'flex';
    }
    if (shoppingCart) {
      shoppingCart.classList.remove('show');
    }

    const ulCart = document.getElementById('cart-container');
    if (ulCart) {
      ulCart.innerHTML = ''; // Xóa nội dung cũ
      drinksArr.forEach((item) => {
        ulCart.appendChild(ItemCart(item));
      });
    }

    // Cập nhật số lượng đồ uống
    const quantityDrinks = document.getElementById('quality');
    if (quantityDrinks) {
      const totalQuantity = drinksArr.reduce((total, drink) => total + drink.quantity, 0);
      quantityDrinks.textContent = `${totalQuantity} drinks`;
    }

    // Cập nhật tổng giá
    const totalPrice = document.getElementById('total-price');
    if (totalPrice) {
      const totalAmount = drinksArr.reduce((total, drink) => total + drink.price * drink.quantity, 0);
      totalPrice.textContent = `${totalAmount} vnd`;
    }
  });

  article.appendChild(img);
  article.appendChild(h3);
  article.appendChild(p);
  article.appendChild(pPrice);
  article.appendChild(button);

  return article;
};

export default DrinkElement;
