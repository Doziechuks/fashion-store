export function roundNumber(number: number): string {
  if (isNaN(number)) {
    return "Invalid Number";
  }

  // Check if the number has a decimal part
  if (Number.isInteger(number)) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // If the number has a decimal part, round it to zero decimal places
  const roundedNumber = Math.round(number);

  // Convert the rounded number to a string
  const numStr = roundedNumber.toString();

  // Separate the integer and decimal parts (if any)
  const [integerPart, decimalPart] = numStr.split(".");

  // Add commas to the integer part
  let formattedInteger = "";
  for (let i = 0; i < integerPart.length; i++) {
    const digit = integerPart[i];
    const positionFromRight = integerPart.length - i - 1;

    // Add a comma for thousands, millions, etc.
    if (positionFromRight % 3 === 0 && i !== 0) {
      formattedInteger += ",";
    }

    formattedInteger += digit;
  }

  // Combine the formatted integer and the decimal part (if any)
  const formattedNumber = decimalPart
    ? `${formattedInteger}.${decimalPart}`
    : formattedInteger;

  return formattedNumber;
}
