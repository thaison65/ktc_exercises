function randomColor(colorLength, chars) {
  let colorCode = "";
  for (let i = 0; i < colorLength; i++) {
    const randomNum = Math.floor(Math.random() * chars.length);
    colorCode += chars.substring(randomNum, randomNum + 1);
  }

  return colorCode;
}

function reverseColor(colorLength, char, chars, charsReverse) {
  let colorCode = "";
  for (let i = 0; i < colorLength; i++) {
    const index = chars.indexOf(char[i]);

    colorCode += charsReverse[index];
  }
  return colorCode;
}

export { randomColor, reverseColor };
