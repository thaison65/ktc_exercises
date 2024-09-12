class Student {
  #id;
  #name;
  #age;
  #email;
  #phone;

  constructor(id, name, age, email, phone) {
    this.#id = id;
    this.#name = name;
    this.#age = age;
    this.#email = email;
    this.#phone = phone;
  }

  get id() {
    return this.#id;
  }

  set id(value) {
    if (typeof value === 'string' && value.trim() !== '') {
      this.#id = value;
    } else {
      throw new Error('ID must be a non-empty string');
    }
  }

  get name() {
    return this.#name;
  }

  set name(value) {
    if (typeof value === 'string' && value.trim() !== '') {
      this.#name = value;
    } else {
      throw new Error('Name must be a non-empty string');
    }
  }

  get age() {
    return this.#age;
  }

  set age(value) {
    if (typeof value === 'number' && value >= 0) {
      this.#age = value;
    } else {
      throw new Error('Age must be a non-negative number');
    }
  }

  get email() {
    return this.#email;
  }

  set email(value) {
    if (typeof value === 'string' && value.trim() !== '' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      this.#email = value;
    } else {
      throw new Error('Email must be a non-empty string and valid email format');
    }
  }

  get phone() {
    return this.#phone;
  }

  set phone(value) {
    if (typeof value === 'string' && value.trim() !== '' && /^\+?[0-9]{8,12}$/.test(value)) {
      this.#phone = value;
    } else {
      throw new Error('Phone must be a non-empty string and valid phone number format');
    }
  }
}

export default Student;
