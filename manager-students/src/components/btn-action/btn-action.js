import { deleteFetch } from '../../services/fetchApi.js';

const tdClasses = ['flex', 'gap-5', 'justify-center', 'items-center', 'py-2'];

const btnClasses = ['text-white', 'px-8', 'py-2', 'rounded-lg', 'hover:-translate-y-1', 'active:translate-y-1', 'transition-transform'];

function btnAction(student) {
  const tdElement = document.createElement('td');
  tdElement.classList.add(...tdClasses);

  const btnDelElement = document.createElement('button');
  btnDelElement.classList.add(...btnClasses);
  btnDelElement.textContent = 'Delete';
  btnDelElement.classList.add('bg-red-500');

  const btnUpdateElement = document.createElement('button');
  btnUpdateElement.classList.add(...btnClasses);
  btnUpdateElement.textContent = 'Update';
  btnUpdateElement.classList.add('bg-sky-500');

  btnDelElement.addEventListener('click', async () => {
    await deleteFetch(student?.id);
    console.log(`Delete button clicked on TD with id: ${student?.id}`);
  });

  btnUpdateElement.addEventListener('click', async () => {
    document.getElementById('id').value = student?.id;
    document.getElementById('name').value = student?.name;
    document.getElementById('age').value = student?.age;
    document.getElementById('email').value = student?.email;
    document.getElementById('phone').value = student?.phone;

    ['id', 'name', 'age', 'email', 'phone'].forEach((value) => {
      const label = document.querySelector(`label[for='${value}']`);

      label.classList.add('text-sm', '-top-4', 'text-blue-700');
      label.classList.remove('text-xl');
    });
  });

  tdElement.appendChild(btnDelElement);
  tdElement.appendChild(btnUpdateElement);

  return tdElement;
}

export default btnAction;
