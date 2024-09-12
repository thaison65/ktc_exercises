function convertRGBtoHex(rgbString) {
  const rgbValues = rgbString.split("(")[1].split(")")[0];

  let hexColor = rgbValues
    .split(", ")
    .map((value) => {
      if (value === "0") {
        return "00";
      }

      if (value % 16 === 0) {
        return `${(parseInt(value, 10) / 16).toString(16)}0`;
      }

      const hexPair = (parseInt(value, 10) / 16).toString(16).padStart(2, "0");
      return hexPair;
    })
    .join("");

  if (hexColor.length > 6) {
    hexColor = hexColor.split(".").join("");
  }
  return hexColor;
}

export { convertRGBtoHex };
