import CategoryType from '../@types/category.js';
import { NewDrinkType } from '../@types/drink.js';
import CategoryElememt from '../components/Category/index.js';
import ItemCart from '../components/ItemCart/index.js';
import MenuElement from '../components/Menu/index.js';
import { getFetch } from '../services/fetchApi.js';

const STORAGE_KEY = 'orderDrinks';
const ORDER_HISTORY_KEY = 'orderHistory';
const NO_DRINKS_MESSAGE = 'No drinks in the shopping cart';

const elements = {
  ulFilter: document.getElementById('filter-container') as HTMLUListElement,
  content: document.getElementById('content') as HTMLElement,
  btnShoppingCart: document.querySelector('.container-icon-shopping') as HTMLElement,
  btnClearCart: document.getElementById('btn-clear-cart') as HTMLElement,
  btnSubmit: document.getElementById('btn-checkout') as HTMLElement,
  txtSearch: document.getElementById('txt-search') as HTMLInputElement,
  btnSearch: document.getElementById('btn-search') as HTMLButtonElement,
};

const searchDrinks = () => {
  const searchInput = elements.txtSearch.value.trim().toLowerCase();
  const drinkItems = document.querySelectorAll('.item-content') as NodeListOf<HTMLElement>;
  let hasVisibleItems = false;

  drinkItems.forEach((item) => {
    const drinkName = item.querySelector('.item-content h3')?.textContent?.toLowerCase() || '';
    const drinkPrice = item.querySelector('.item-content p')?.textContent?.toLowerCase() || '';
    const isVisible = drinkName.includes(searchInput) || drinkPrice.includes(searchInput);
    item.style.display = isVisible ? 'flex' : 'none';
    hasVisibleItems = hasVisibleItems || isVisible;
  });

  const noResultsMessage = document.getElementById('no-results-message');
  if (noResultsMessage) {
    noResultsMessage.style.display = hasVisibleItems ? 'none' : 'block';
  }
};

elements.btnSearch?.addEventListener('click', searchDrinks);
elements.txtSearch?.addEventListener('input', () => {
  searchDrinks();
  if (elements.txtSearch.value.trim() === '') {
    resetSearchResults();
  }
});

const resetSearchResults = () => {
  const drinkItems = document.querySelectorAll('#content .drink-item') as NodeListOf<HTMLElement>;
  drinkItems.forEach((item) => (item.style.display = 'block'));
  const noResultsMessage = document.getElementById('no-results-message');
  if (noResultsMessage) {
    noResultsMessage.style.display = 'none';
  }
};

const fetchData = async () => {
  const [categories, drinks] = await Promise.all([getFetch('category'), getFetch('drink')]);
  return { categories, drinks };
};

const renderFilterCategories = (categories: CategoryType[]) => {
  const allCategory = CategoryElememt({ id: 'all', name: 'All' });
  elements.ulFilter?.appendChild(allCategory);

  categories.forEach(({ id, name }) => {
    elements.ulFilter?.appendChild(CategoryElememt({ id, name }));
  });
};

const renderContent = (categories: CategoryType[], drinks: any[]) => {
  categories.forEach((category) => {
    elements.content?.appendChild(MenuElement(category, drinks));
  });
};

const updateCartUI = () => {
  const orderDrinks = localStorage.getItem(STORAGE_KEY);
  const cartElements = {
    quantityDrinks: document.getElementById('quality'),
    totalPriceElement: document.getElementById('total-price'),
    ulCart: document.getElementById('cart-container'),
    badge: document.getElementById('badge'),
  };

  if (!orderDrinks) {
    updateEmptyCart(cartElements);
    return;
  }

  const drinksArr: NewDrinkType[] = JSON.parse(orderDrinks);
  const { totalQuantity, totalPrice } = calculateCartTotals(drinksArr);

  updateCartElements(cartElements, totalQuantity, totalPrice);
  updateCartItems(cartElements.ulCart, drinksArr);
};

const removeItemFromCart = (drinkId: string) => {
  const orderDrinks = localStorage.getItem(STORAGE_KEY);
  if (!orderDrinks) return;

  let drinksArr: NewDrinkType[] = JSON.parse(orderDrinks);
  drinksArr = drinksArr.filter((drink) => drink.id !== drinkId);

  updateLocalStorageAndUI(drinksArr);
  removeCartItemElement(drinkId);
};

const initializeCart = () => {
  const orderDrinks = localStorage.getItem(STORAGE_KEY);
  if (orderDrinks && orderDrinks.length > 0) {
    const badge = document.getElementById('badge');
    if (badge) badge.style.display = 'flex';
  }
  updateCartUI();
};

const toggleShoppingCart = () => {
  const shoppingCart = document.getElementById('shopping');
  const ulCart = document.getElementById('cart-container');
  if (!shoppingCart || !ulCart) return;

  shoppingCart.classList.toggle('show');

  const isCartVisible = shoppingCart.classList.contains('show');
  if (isCartVisible) {
    clearCartContainer(ulCart);
    populateCart(ulCart);
    updateCartUI();
  } else {
    clearCartContainer(ulCart);
  }
};

const clearCart = () => {
  const ulCart = document.getElementById('cart-container');
  if (!ulCart) return;

  clearCartContainer(ulCart);
  ulCart.textContent = NO_DRINKS_MESSAGE;

  localStorage.removeItem(STORAGE_KEY);
  updateUIElements();
};

const updateEmptyCart = (cartElements: {
  quantityDrinks: HTMLElement | null;
  totalPriceElement: HTMLElement | null;
  ulCart: HTMLElement | null;
  badge: HTMLElement | null;
}) => {
  if (cartElements.quantityDrinks) cartElements.quantityDrinks.textContent = '0 drinks';
  if (cartElements.totalPriceElement) cartElements.totalPriceElement.textContent = '0 vnd';
  if (cartElements.ulCart) cartElements.ulCart.textContent = NO_DRINKS_MESSAGE;
  if (cartElements.badge) cartElements.badge.style.display = 'none';
};

const calculateCartTotals = (drinksArr: NewDrinkType[]) => {
  return drinksArr.reduce(
    (acc, drink) => ({
      totalQuantity: acc.totalQuantity + drink.quantity,
      totalPrice: acc.totalPrice + drink.price * drink.quantity,
    }),
    { totalQuantity: 0, totalPrice: 0 }
  );
};

const updateCartElements = (
  cartElements: {
    quantityDrinks: HTMLElement | null;
    totalPriceElement: HTMLElement | null;
    badge: HTMLElement | null;
  },
  totalQuantity: number,
  totalPrice: number
) => {
  if (cartElements.quantityDrinks) cartElements.quantityDrinks.textContent = `${totalQuantity} drinks`;
  if (cartElements.totalPriceElement) cartElements.totalPriceElement.textContent = `${totalPrice} vnd`;
  if (cartElements.badge) cartElements.badge.style.display = totalQuantity > 0 ? 'flex' : 'none';
};

const updateCartItems = (ulCart: HTMLElement | null, drinksArr: NewDrinkType[]) => {
  if (!ulCart) return;
  ulCart.textContent = '';
  drinksArr.forEach((drink) => {
    ulCart.appendChild(ItemCart(drink, updateCartUI, removeItemFromCart));
  });
};

const updateLocalStorageAndUI = (drinksArr: NewDrinkType[]) => {
  if (drinksArr.length === 0) {
    localStorage.removeItem(STORAGE_KEY);
    const badge = document.getElementById('badge');
    if (badge) badge.style.display = 'none';
  } else {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(drinksArr));
  }
  updateCartUI();
};

const removeCartItemElement = (drinkId: string) => {
  const itemElement = document.getElementById(`cart-item-${drinkId}`);
  if (itemElement) itemElement.remove();
};

const clearCartContainer = (ulCart: HTMLElement) => {
  while (ulCart.firstChild) {
    ulCart.removeChild(ulCart.firstChild);
  }
};

const populateCart = (ulCart: HTMLElement) => {
  const orderDrinks = localStorage.getItem(STORAGE_KEY);
  if (!orderDrinks) {
    ulCart.textContent = NO_DRINKS_MESSAGE;
    return;
  }
  const drinksArr: NewDrinkType[] = JSON.parse(orderDrinks);
  drinksArr.forEach((drink) => {
    ulCart.appendChild(ItemCart(drink, updateCartUI, removeItemFromCart));
  });
};

const updateUIElements = () => {
  const badge = document.getElementById('badge');
  const quantityDrinks = document.getElementById('quality');
  const totalPrice = document.getElementById('total-price');
  const shoppingCart = document.getElementById('shopping');

  if (badge) badge.style.display = 'none';
  if (quantityDrinks) quantityDrinks.textContent = '0 drinks';
  if (totalPrice) totalPrice.textContent = '0 vnd';
  if (shoppingCart) shoppingCart.classList.remove('show');
};

elements.btnShoppingCart?.addEventListener('click', (event) => {
  event.preventDefault();
  toggleShoppingCart();
});

elements.btnClearCart?.addEventListener('click', (event) => {
  event.preventDefault();
  clearCart();
});

const saveOrderToLocalStorage = () => {
  const orderDrinks = localStorage.getItem(STORAGE_KEY);
  if (!orderDrinks) return;

  const drinksArr: NewDrinkType[] = JSON.parse(orderDrinks);
  const orderHistory = JSON.parse(localStorage.getItem(ORDER_HISTORY_KEY) || '[]');

  const newOrder = {
    id: Date.now(),
    date: new Date().toISOString(),
    items: drinksArr,
    total: drinksArr.reduce((acc, drink) => acc + drink.price * drink.quantity, 0),
  };

  orderHistory.push(newOrder);
  localStorage.setItem(ORDER_HISTORY_KEY, JSON.stringify(orderHistory));
};

elements.btnSubmit?.addEventListener('click', (event) => {
  event.preventDefault();
  saveOrderToLocalStorage();
  clearCart();
});

const initializeApp = async () => {
  const { categories, drinks } = await fetchData();
  renderFilterCategories(categories);
  renderContent(categories, drinks);
  initializeCart();

  elements.btnSearch?.addEventListener('click', searchDrinks);
  elements.txtSearch?.addEventListener('keyup', (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      searchDrinks();
    }
  });
};

initializeApp();
