function getXmlhtpp() {
  return new Promise((resolve, reject) => {
    const xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status === 200) {
          const data = JSON.parse(this.responseText);
          resolve(data);
        } else {
          reject(new Error(`Lỗi khi gọi API: ${this.status}`));
        }
      }
    };

    xhttp.open('GET', 'https://66a9e2a6613eced4eba6ad57.mockapi.io/api/hotels');
    xhttp.send();
  });
}

function postXmlhtpp(data) {
  return new Promise((resolve, reject) => {
    const xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status === 200) {
          const data = JSON.parse(this.responseText);
          resolve(data);
        } else {
          reject(new Error(`Lỗi khi gọi API: ${this.status}`));
        }
      }
    };

    xhttp.open('POST', 'https://66a9e2a6613eced4eba6ad57.mockapi.io/api/hotels');
    xhttp.setRequestHeader('Content-type', 'application/json');
    xhttp.send(JSON.stringify(data));
  });
}

function putXmlhtpp(id, data) {
  return new Promise((resolve, reject) => {
    const xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status === 200) {
          const data = JSON.parse(this.responseText);
          resolve(data);
        } else {
          reject(new Error(`Lỗi khi gọi API: ${this.status}`));
        }
      }
    };

    xhttp.open('PUT', `https://66a9e2a6613eced4eba6ad57.mockapi.io/api/hotels/${id}`);
    xhttp.setRequestHeader('Content-type', 'application/json');
    xhttp.send(JSON.stringify(data));
  });
}

function deleteXmlhtpp(id) {
  return new Promise((resolve, reject) => {
    const xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status === 200 || this.status === 204) {
          // 204 No Content thường được trả về khi xóa thành công
          resolve('Xóa thành công');
        } else {
          reject(new Error(`Lỗi khi xóa: ${this.status}`));
        }
      }
    };

    xhttp.open('DELETE', `https://66a9e2a6613eced4eba6ad57.mockapi.io/api/hotels/${id}`);
    xhttp.send();
  });
}

export { getXmlhtpp, postXmlhtpp, putXmlhtpp, deleteXmlhtpp };
