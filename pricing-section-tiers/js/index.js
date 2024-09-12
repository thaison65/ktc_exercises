const btnMonthly = document.getElementById('btn-monthly');
const btnAnnually = document.getElementById('btn-annually');
const priceText = document.querySelectorAll('.price');
const textDiscount = document.querySelectorAll('.text-discount');

const items = document.querySelectorAll('.item');

const btnActive = ['border-2', 'shadow-md', 'text-black'];
const btnUnActive = ['border-none', 'hover:shadow-md', 'text-neutral-500', 'hover:text-black'];

const priceMonth = ['$9.99', '$19.99', '$29.99'];
const priceAnnually = ['$6.99', '$15.99', '$25.99'];

const discountAnnually = [84, 192, 312];

btnAnnually.addEventListener('click', () => {
  btnClick(btnMonthly, btnAnnually);

  priceText.forEach((price, index) => {
    price.textContent = priceAnnually[index];
  });

  textDiscount.forEach((discount, index) => {
    discount.textContent = `annually ($${discountAnnually[index]})`;
  });
});

btnMonthly.addEventListener('click', () => {
  btnClick(btnAnnually, btnMonthly);

  priceText.forEach((price, index) => {
    price.textContent = priceMonth[index];
  });

  textDiscount.forEach((discount) => {
    discount.textContent = `monthly`;
  });
});

function btnClick(btn1, btn2) {
  btn1.classList.remove(...btnActive);
  btn2.classList.remove(...btnUnActive);
  btn2.classList.add(...btnActive);
  btn1.classList.add(...btnUnActive);
}

items.forEach((item, index) => {
  localStorage.getItem('index');

  if (localStorage.getItem('index') === String(index)) {
    item.classList.add('border-indigo-800');
  } else {
    item.classList.remove('border-indigo-800');
  }

  item.addEventListener('click', () => {
    item.classList.add('border-indigo-800');
    localStorage.setItem('index', index);
    items.forEach((item, i) => {
      if (index !== i) {
        item.classList.remove('border-indigo-800');
      }
    });
  });
});
