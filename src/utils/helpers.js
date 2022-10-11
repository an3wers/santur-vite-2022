// Функция округляет значение 5,4380943 -> 5,4
export const useToFixedNumber = (num) => {
  if (typeof num == "number") {
    return Number(num.toFixed(2));
  }
};

// Функция, которая преобразовывает значение в инпуте выбора количества товара
// входные переметры: кратность, максимальное значение, текущее значение
export const setCountProduct = (value, maxCount, multiplicity) => {
  // TODO: Обработать состояние value == 0 для удаления товара
  let tmp = 0;

  if (typeof value == "string") {
    value = Number(value.trim().replace(/,/g, "."));
  }

  if (value === 0) {
    // value = multiplicity
    // console.log(value)
    return value;
  }

  if (value > maxCount) {
    value = maxCount;
  }

  if (value < 0) {
    value = multiplicity;
  }

  if (value > 0 && value <= maxCount) {
    // Проверка кратности
    tmp = value / multiplicity;

    // if (String(tmp).includes(".")) {
    if (!Number.isInteger(tmp)) {
      if (value == maxCount) {
        // tmp = Math.floor(tmp);
        tmp = Math.round(tmp);
      } else {
        tmp = Math.ceil(tmp);
      }

      value = tmp * multiplicity;
      return useToFixedNumber(value);
    } else {
      return useToFixedNumber(value);
    }
  }
};

export const phoneFormatter = (phone) => {
  let cleaned = ("" + phone).replace(/\D/g, "");

  //Check if the input is of correct
  let match = cleaned.match(/^(7|)?(\d{3})(\d{3})(\d{2})(\d{2})$/);

  if (match) {
    //Remove the matched extension code
    //Change this to format for any country code.
    let intlCode = match[1] ? "+7 " : "";
    return [
      intlCode,
      "(",
      match[2],
      ") ",
      match[3],
      "-",
      match[4],
      "-",
      match[5],
    ].join("");
  }
  return null;
};

export const phoneCleanerFormat = (phone) => {
  return phone.replace(/[^0-9]/g, "");
};

export const useStrCrop = (str, charsCount) => {
  if (typeof str === "string") {
    if (str.length > charsCount) {
      return str.slice(0, charsCount) + "…";
    }
    return str;
  }
  return str;
};

export const useNounEnding = (number, one, two, five) => {
  let n = Math.abs(number);
  n %= 100;
  if (n >= 5 && n <= 20) {
    return five;
  }
  n %= 10;
  if (n === 1) {
    return one;
  }
  if (n >= 2 && n <= 4) {
    return two;
  }
  return five;
};

export const useCurrency = (n, curr = "RUB", LanguageFormat = "Ru-ru") => {
  return Intl.NumberFormat(LanguageFormat, {
    style: "currency",
    currency: curr,
  }).format(n);
};

export const useDate = (date = new Date()) => {
  // return date format 01.02.2010

  // const date = new Date(y, m, d)

  let dd = date.getDate();
  let mm = date.getMonth() + 1;
  let yy = date.getFullYear();

  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }

  return dd + "." + mm + "." + yy;
};

export const useDateFormatter = (
  date,
  options = { day: "numeric", month: "long", year: "numeric" }
) => {
  // debugger;
  const myDate = date.split(".");

  // console.log(myDate);

  /*

    input date format: string '10.10.2022'

    example options
    const options = {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }

  */

  const result = new Intl.DateTimeFormat("ru", options);

  return result.format(new Date(+myDate[2], +myDate[1] - 1, +myDate[0]));

  // return date;
};
