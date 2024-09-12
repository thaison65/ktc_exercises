import itemStudent from '../components/item-student/item-student.js';
import { getFetch, putFetch } from '../services/fetchApi.js';
import { checkCharacter, checkLenght, checkRequired, checkEmail, checkNumberPhone } from '../utils/validation.js';
import Student from '../models/student.js';

const formElement = document.getElementById('form');
const inputElement = document.querySelectorAll('input');

const tbodyElement = document.getElementById('student-list');
const searchText = document.getElementById('search');
const btnSearch = document.getElementById('btn-search');

let students = [{}];

inputElement.forEach((input) => {
  input.addEventListener('input', () => {
    const label = document.querySelector(`label[for='${input.id}']`);

    if (!!input.value || input.value.trim() !== '') {
      label.classList.add('text-sm', '-top-4', 'text-blue-700');
      label.classList.remove('text-xl');
      return;
    } else {
      label.classList.remove('text-sm', '-top-4', 'text-blue-700');
      label.classList.add('text-xl');
    }
  });
});

formElement.addEventListener('submit', async (event) => {
  event.preventDefault();

  // const formData = new FormData();
  // const id = formData.get('id');
  // const name = formData.get('name');
  // const age = parseInt(formData.get('age'));
  // const email = formData.get('email');
  // const phone = formData.get('phone');

  const id = document.getElementById('id').value;
  const name = document.getElementById('name').value;
  const age = document.getElementById('age').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;

  try {
    if (!checkRequired(id)) {
      handleError('id', 'Please enter a valid ID!', 'Value ID is not required');
    }

    if (!checkRequired(name)) {
      handleError('name', 'Please enter the correct format for the name!', 'Name is not format');
    }

    if (!checkRequired(age) || !checkLenght(age, 1, 3)) {
      handleError('age', 'Please enter the correct format for the age!', 'Age is not format');
    }

    if (!checkRequired(email) || !checkEmail(email)) {
      handleError('email', 'Please enter the correct format for the email!', 'Email is not format');
    }

    if (!checkRequired(phone) || !checkNumberPhone(phone) || !checkLenght(phone, 8, 11)) {
      handleError('phone', 'Please enter the correct format for the phone!', 'Phone is not format');
    }

    const student = new Student(id, name, age, email, phone);

    const filteredStudents = students.filter((value) => student.id === value.id);

    const data = {
      id: student.id,
      name: student.name,
      age: student.age,
      email: student.email,
      phone: student.phone,
    };

    if (filteredStudents.length > 0) {
      await putFetch(student.id, data);
      alert('Item updated successfully!');
      window.location.reload();
      return;
    }

    await postFetch(data);
    alert('Item added successfully!');
    window.location.reload();
    return;
  } catch (error) {
    console.error('Error:', error);
    return;
  }
});

function handleError(id, textErr, messageErr) {
  document.getElementById(id).value = '';
  const text = document.getElementById(`text-${id}`);
  text.textContent = textErr;
  text.classList.remove('opacity-15');
  text.classList.add('text-red-800', 'opacity-100');
  throw new Error(messageErr);
}

async function getStudents() {
  try {
    const reponse = await getFetch();
    students = [...reponse];

    students.forEach((student) => {
      tbodyElement.appendChild(itemStudent(student));
    });
  } catch (error) {
    console.error('Error:', error);
    return;
  }
}
getStudents();

btnSearch.addEventListener('click', () => {
  const searchValue = searchText.value.toLowerCase();
  const filteredStudents =
    students.filter((student) => student.name.toLowerCase().includes(searchValue)) ||
    students.email.toLowerCase().includes(searchValue) ||
    students.phone.toLowerCase().includes(searchValue);

  while (tbodyElement.firstChild) {
    tbodyElement.removeChild(tbodyElement.firstChild);
  }

  if (!!filteredStudents || searchValue === '') {
    filteredStudents.forEach((student) => {
      tbodyElement.appendChild(itemStudent(student));
    });
    return;
  }

  tbodyElement.textContent = 'Nothing to search for ' + searchValue;
});
