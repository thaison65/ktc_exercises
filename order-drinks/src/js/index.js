var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a, _b, _c, _d, _e;
import CategoryElememt from '../components/Category/index.js';
import ItemCart from '../components/ItemCart/index.js';
import MenuElement from '../components/Menu/index.js';
import { getFetch } from '../services/fetchApi.js';
const STORAGE_KEY = 'orderDrinks';
const ORDER_HISTORY_KEY = 'orderHistory';
const NO_DRINKS_MESSAGE = 'No drinks in the shopping cart';
const elements = {
    ulFilter: document.getElementById('filter-container'),
    content: document.getElementById('content'),
    btnShoppingCart: document.querySelector('.container-icon-shopping'),
    btnClearCart: document.getElementById('btn-clear-cart'),
    btnSubmit: document.getElementById('btn-checkout'),
    txtSearch: document.getElementById('txt-search'),
    btnSearch: document.getElementById('btn-search'),
};
const searchDrinks = () => {
    const searchInput = elements.txtSearch.value.trim().toLowerCase();
    const drinkItems = document.querySelectorAll('.item-content');
    let hasVisibleItems = false;
    drinkItems.forEach((item) => {
        var _a, _b, _c, _d;
        const drinkName = ((_b = (_a = item.querySelector('.item-content h3')) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.toLowerCase()) || '';
        const drinkPrice = ((_d = (_c = item.querySelector('.item-content p')) === null || _c === void 0 ? void 0 : _c.textContent) === null || _d === void 0 ? void 0 : _d.toLowerCase()) || '';
        const isVisible = drinkName.includes(searchInput) || drinkPrice.includes(searchInput);
        item.style.display = isVisible ? 'flex' : 'none';
        hasVisibleItems = hasVisibleItems || isVisible;
    });
    const noResultsMessage = document.getElementById('no-results-message');
    if (noResultsMessage) {
        noResultsMessage.style.display = hasVisibleItems ? 'none' : 'block';
    }
};
(_a = elements.btnSearch) === null || _a === void 0 ? void 0 : _a.addEventListener('click', searchDrinks);
(_b = elements.txtSearch) === null || _b === void 0 ? void 0 : _b.addEventListener('input', () => {
    searchDrinks();
    if (elements.txtSearch.value.trim() === '') {
        resetSearchResults();
    }
});
const resetSearchResults = () => {
    const drinkItems = document.querySelectorAll('#content .drink-item');
    drinkItems.forEach((item) => (item.style.display = 'block'));
    const noResultsMessage = document.getElementById('no-results-message');
    if (noResultsMessage) {
        noResultsMessage.style.display = 'none';
    }
};
const fetchData = () => __awaiter(void 0, void 0, void 0, function* () {
    const [categories, drinks] = yield Promise.all([getFetch('category'), getFetch('drink')]);
    return { categories, drinks };
});
const renderFilterCategories = (categories) => {
    var _a;
    const allCategory = CategoryElememt({ id: 'all', name: 'All' });
    (_a = elements.ulFilter) === null || _a === void 0 ? void 0 : _a.appendChild(allCategory);
    categories.forEach(({ id, name }) => {
        var _a;
        (_a = elements.ulFilter) === null || _a === void 0 ? void 0 : _a.appendChild(CategoryElememt({ id, name }));
    });
};
const renderContent = (categories, drinks) => {
    categories.forEach((category) => {
        var _a;
        (_a = elements.content) === null || _a === void 0 ? void 0 : _a.appendChild(MenuElement(category, drinks));
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
    const drinksArr = JSON.parse(orderDrinks);
    const { totalQuantity, totalPrice } = calculateCartTotals(drinksArr);
    updateCartElements(cartElements, totalQuantity, totalPrice);
    updateCartItems(cartElements.ulCart, drinksArr);
};
const removeItemFromCart = (drinkId) => {
    const orderDrinks = localStorage.getItem(STORAGE_KEY);
    if (!orderDrinks)
        return;
    let drinksArr = JSON.parse(orderDrinks);
    drinksArr = drinksArr.filter((drink) => drink.id !== drinkId);
    updateLocalStorageAndUI(drinksArr);
    removeCartItemElement(drinkId);
};
const initializeCart = () => {
    const orderDrinks = localStorage.getItem(STORAGE_KEY);
    if (orderDrinks && orderDrinks.length > 0) {
        const badge = document.getElementById('badge');
        if (badge)
            badge.style.display = 'flex';
    }
    updateCartUI();
};
const toggleShoppingCart = () => {
    const shoppingCart = document.getElementById('shopping');
    const ulCart = document.getElementById('cart-container');
    if (!shoppingCart || !ulCart)
        return;
    shoppingCart.classList.toggle('show');
    const isCartVisible = shoppingCart.classList.contains('show');
    if (isCartVisible) {
        clearCartContainer(ulCart);
        populateCart(ulCart);
        updateCartUI();
    }
    else {
        clearCartContainer(ulCart);
    }
};
const clearCart = () => {
    const ulCart = document.getElementById('cart-container');
    if (!ulCart)
        return;
    clearCartContainer(ulCart);
    ulCart.textContent = NO_DRINKS_MESSAGE;
    localStorage.removeItem(STORAGE_KEY);
    updateUIElements();
};
const updateEmptyCart = (cartElements) => {
    if (cartElements.quantityDrinks)
        cartElements.quantityDrinks.textContent = '0 drinks';
    if (cartElements.totalPriceElement)
        cartElements.totalPriceElement.textContent = '0 vnd';
    if (cartElements.ulCart)
        cartElements.ulCart.textContent = NO_DRINKS_MESSAGE;
    if (cartElements.badge)
        cartElements.badge.style.display = 'none';
};
const calculateCartTotals = (drinksArr) => {
    return drinksArr.reduce((acc, drink) => ({
        totalQuantity: acc.totalQuantity + drink.quantity,
        totalPrice: acc.totalPrice + drink.price * drink.quantity,
    }), { totalQuantity: 0, totalPrice: 0 });
};
const updateCartElements = (cartElements, totalQuantity, totalPrice) => {
    if (cartElements.quantityDrinks)
        cartElements.quantityDrinks.textContent = `${totalQuantity} drinks`;
    if (cartElements.totalPriceElement)
        cartElements.totalPriceElement.textContent = `${totalPrice} vnd`;
    if (cartElements.badge)
        cartElements.badge.style.display = totalQuantity > 0 ? 'flex' : 'none';
};
const updateCartItems = (ulCart, drinksArr) => {
    if (!ulCart)
        return;
    ulCart.textContent = '';
    drinksArr.forEach((drink) => {
        ulCart.appendChild(ItemCart(drink, updateCartUI, removeItemFromCart));
    });
};
const updateLocalStorageAndUI = (drinksArr) => {
    if (drinksArr.length === 0) {
        localStorage.removeItem(STORAGE_KEY);
        const badge = document.getElementById('badge');
        if (badge)
            badge.style.display = 'none';
    }
    else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(drinksArr));
    }
    updateCartUI();
};
const removeCartItemElement = (drinkId) => {
    const itemElement = document.getElementById(`cart-item-${drinkId}`);
    if (itemElement)
        itemElement.remove();
};
const clearCartContainer = (ulCart) => {
    while (ulCart.firstChild) {
        ulCart.removeChild(ulCart.firstChild);
    }
};
const populateCart = (ulCart) => {
    const orderDrinks = localStorage.getItem(STORAGE_KEY);
    if (!orderDrinks) {
        ulCart.textContent = NO_DRINKS_MESSAGE;
        return;
    }
    const drinksArr = JSON.parse(orderDrinks);
    drinksArr.forEach((drink) => {
        ulCart.appendChild(ItemCart(drink, updateCartUI, removeItemFromCart));
    });
};
const updateUIElements = () => {
    const badge = document.getElementById('badge');
    const quantityDrinks = document.getElementById('quality');
    const totalPrice = document.getElementById('total-price');
    const shoppingCart = document.getElementById('shopping');
    if (badge)
        badge.style.display = 'none';
    if (quantityDrinks)
        quantityDrinks.textContent = '0 drinks';
    if (totalPrice)
        totalPrice.textContent = '0 vnd';
    if (shoppingCart)
        shoppingCart.classList.remove('show');
};
(_c = elements.btnShoppingCart) === null || _c === void 0 ? void 0 : _c.addEventListener('click', (event) => {
    event.preventDefault();
    toggleShoppingCart();
});
(_d = elements.btnClearCart) === null || _d === void 0 ? void 0 : _d.addEventListener('click', (event) => {
    event.preventDefault();
    clearCart();
});
const saveOrderToLocalStorage = () => {
    const orderDrinks = localStorage.getItem(STORAGE_KEY);
    if (!orderDrinks)
        return;
    const drinksArr = JSON.parse(orderDrinks);
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
(_e = elements.btnSubmit) === null || _e === void 0 ? void 0 : _e.addEventListener('click', (event) => {
    event.preventDefault();
    saveOrderToLocalStorage();
    clearCart();
});
const initializeApp = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { categories, drinks } = yield fetchData();
    renderFilterCategories(categories);
    renderContent(categories, drinks);
    initializeCart();
    (_a = elements.btnSearch) === null || _a === void 0 ? void 0 : _a.addEventListener('click', searchDrinks);
    (_b = elements.txtSearch) === null || _b === void 0 ? void 0 : _b.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            searchDrinks();
        }
    });
});
initializeApp();
