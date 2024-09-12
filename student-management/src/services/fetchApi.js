const options = (method, data) => {
  return {
    method: method,
    body: data ? JSON.stringify(data) : undefined,
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  };
};

const url = 'https://66a9e2a6613eced4eba6ad57.mockapi.io';

function getFetch() {
  return fetch(`${url}/api/students`, options('GET'))
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((err) => {
      throw new Error(` ${err}`);
    });
}

function postFetch(data) {
  return fetch(`${url}/api/students`, options('POST', data))
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((err) => {
      throw new Error(` ${err}`);
    });
}

function putFetch(id, data) {
  return fetch(`${url}/api/students/${id}`, options('PUT', data))
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((err) => {
      throw new Error(` ${err}`);
    });
}

function deleteFetch(id) {
  return fetch(`${url}/api/students/${id}`, options('DELETE'))
    .then((response) => response.json())
    .catch((err) => {
      throw new Error(` ${err}`);
    });
}

export { getFetch, postFetch, putFetch, deleteFetch };
