import { NewDrinkType } from '../../@types/drink';

type ItemCartType = (props: NewDrinkType, updateCartUI?: () => void, removeItemFromCart?: (id: string) => void) => HTMLElement;

const ItemCart: ItemCartType = ({ ...props }, updateCartUI, removeItemFromCart) => {
  const { id, name, price, quantity, nameEnglish } = props;

  const item = document.createElement('li');
  item.classList.add('item-cart');

  const img = document.createElement('img');
  img.src = './src/assets/images/cupImage.png';
  img.alt = 'cupImage';

  const content = document.createElement('div');
  content.classList.add('content-item');

  const h4 = document.createElement('h4');
  h4.textContent = name;

  const p = document.createElement('p');
  p.textContent = nameEnglish || '';

  const pPrice = document.createElement('p');
  pPrice.classList.add('price');
  pPrice.textContent = `${price} vnd`;

  content.appendChild(h4);
  content.appendChild(p);
  content.appendChild(pPrice);

  const section = document.createElement('section');
  section.classList.add('action-item-cart');

  const btnPlus = document.createElement('button');
  btnPlus.textContent = '+';
  btnPlus.classList.add('btn-plus', 'btn');

  const pQuantity = document.createElement('p');
  pQuantity.textContent = `${quantity}`;
  pQuantity.classList.add('number-drinks');

  const btnMinus = document.createElement('button');
  btnMinus.textContent = '-';
  btnMinus.classList.add('btn-minus', 'btn');

  let currentQuantity = quantity;

  const updateQuantity = (newQuantity: number) => {
    currentQuantity = newQuantity;
    pQuantity.textContent = `${currentQuantity}`;

    const cartItems = JSON.parse(localStorage.getItem('orderDrinks') || '[]');
    const updatedCartItems = cartItems.map((item: NewDrinkType) => (item.id === id ? { ...item, quantity: currentQuantity } : item));

    localStorage.setItem('orderDrinks', JSON.stringify(updatedCartItems));

    console.log(updatedCartItems);

    updateCartUI?.();
  };

  btnPlus.addEventListener('click', () => {
    if (currentQuantity < 10) {
      updateQuantity(currentQuantity + 1);
    } else {
      alert('Maximum quantity is 10');
    }
  });

  btnMinus.addEventListener('click', () => {
    if (currentQuantity > 1) {
      updateQuantity(currentQuantity - 1);
    } else {
      if (window.confirm('Do you want to remove this item from the cart?')) {
        removeItemFromCart?.(id);
      }
    }
  });

  section.appendChild(btnPlus);
  section.appendChild(pQuantity);
  section.appendChild(btnMinus);

  item.appendChild(img);
  item.appendChild(content);
  item.appendChild(section);

  return item;
};

export default ItemCart;
