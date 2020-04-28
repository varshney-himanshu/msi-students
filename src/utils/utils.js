export function extractDateString(d) {
  let dateString = "";

  let date = new Date(d);
  if (date !== null) {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    if (countDigits(day) < 2) {
      day = "0" + day.toString();
    }

    if (countDigits(month) < 2) {
      month = "0" + month.toString();
    }

    dateString =
      day.toString() + "-" + month.toString() + "-" + year.toString();
  }
  return dateString;
}

export function countDigits(number) {
  let counter = 0;

  while (number > 0) {
    counter++;
    number = Math.floor(number / 10);
  }

  return counter;
}

export function generateID() {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return (
    "T" +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
}

export function arrayBufferToBase64(buffer) {
  var binary = "";
  var bytes = [].slice.call(new Uint8Array(buffer));
  bytes.forEach(b => (binary += String.fromCharCode(b)));
  return window.btoa(binary);
}
