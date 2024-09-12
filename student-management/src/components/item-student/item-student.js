import btnAction from '../btn-action/btn-action.js';

function itemStudent(student) {
  const trElement = document.createElement('tr');

  const tdElement = document.createElement('td');
  tdElement.classList.add('py-2');

  tdElement.textContent = student.id;
  trElement.appendChild(tdElement);

  Object.entries(student).forEach(([key, value]) => {
    if (key !== 'id') {
      const tdElement = document.createElement('td');
      tdElement.classList.add('py-2');

      tdElement.textContent = value;
      trElement.appendChild(tdElement);
    }
  });

  trElement.appendChild(btnAction(student));

  return trElement;
}

export default itemStudent;
