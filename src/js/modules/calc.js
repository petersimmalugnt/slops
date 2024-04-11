/* CALCULATE PIXELS */
const calc = (val, elRect) => {
  elRect =
    typeof elRect === "number" && !isNaN(elRect)
      ? elRect
      : lenis.dimensions.height;
  let pixelVal = val.replace(
    /(\d+)(vw|vh|%|rem|px)?/g,
    (match, number, unit) => {
      number = parseFloat(number);
      switch (unit) {
        case "vw":
          return (number * lenis.dimensions.width) / 100;
        case "vh":
          return (number * lenis.dimensions.height) / 100;
        case "%":
          return (number * elRect) / 100;
        case "rem":
          return (
            number *
            parseFloat(getComputedStyle(document.documentElement).fontSize)
          );
        case "px":
        default:
          return number;
      }
    }
  );

  try {
    return eval(pixelVal);
  } catch (error) {
    console.error("Error evaluating expression:", error);
    return null;
  }
};
