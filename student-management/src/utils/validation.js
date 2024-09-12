function checkRequired(val) {
  if (!!val) {
    return true;
  }
  return false;
}

function checkLenght(val, min, max) {
  if (val.length > min && val.length <= max) {
    return true;
  }
  return false;
}

function checkCharacter(val) {
  var letter =
    '^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ' +
    'ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ' +
    'ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$';
  if (val.match(letter)) {
    return true;
  }
  return false;
}

function checkEmail(val) {
  var letter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (val.match(letter)) {
    return true;
  }
  return false;
}

function checkNumberPhone(val) {
  var letter = /^[0-9]+$/;
  if (val.match(letter)) {
    return true;
  }
  return false;
}

export { checkRequired, checkLenght, checkCharacter, checkEmail, checkNumberPhone };
