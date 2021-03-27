import moment from "moment";
import validator from "validator";

const letters = /^[A-Za-z\s]+$/;
const numbers = /^[\s.,\d]+$/;
const phoneNumber = /^[+\d]+$/;

const notValid = (data) => {
  return {
    content: data,
    class: "incorrect",
  };
};

const validators = {
  age: (age) => {
    const data = age.trim();
    if (
      data !== (null || undefined) &&
      data.match(numbers) !== null &&
      Number.isInteger(parseInt(data)) &&
      parseInt(data) >= 21 &&
      data.match(numbers) !== null
    ) {
      return {
        content: data,
        class: "correct",
      };
    }
    return notValid(data);
  },
  experience: (experience, age) => {
    const data = experience.trim();
    if (
      data !== (null || undefined) &&
      data.match(numbers) !== null &&
      parseInt(data) >= 0 &&
      parseInt(age) > parseInt(experience)
    ) {
      return {
        content: data,
        class: "correct",
      };
    }
    return notValid(data);
  },
  income: (income) => {
    const data = income.trim();
    if (
      data !== (null || undefined) &&
      data.match(numbers) !== null &&
      Number(data) < 1000000 &&
      Number(data) >= 0
    ) {
      return {
        content: Number(data).toFixed(2),
        class: "correct",
      };
    }
    return notValid(data);
  },
  states: (statesString) => {
    const data = statesString.trim();
    if (data !== (null || undefined) && data.match(letters) !== null) {
      return {
        content: data
          .split(" ")
          .map((e) => e.toUpperCase().substring(0, 2))
          .join(" | "),
        class: "correct",
      };
    }
    return notValid(data);
  },
  expDate: (date) => {
    const dateFormat = {
      first: "YYYY-MM-DD",
      second: "MM/DD/YYYY",
    };
    const currentDate = moment().format("MM/DD/YYYY");
    const data = date.trim();
    if (
      data !== (null || undefined) &&
      (moment(data, dateFormat.first).format(dateFormat.first) === data ||
        moment(data, dateFormat.second).format(dateFormat.second) === data) &&
      moment(data).isBefore(currentDate)
    ) {
      return {
        content: data,
        class: "correct",
      };
    }
    return notValid(data);
  },
  number: (number) => {
    const data = number.trim();
    const length = data.length;
    if (data !== (null || undefined) && data.match(phoneNumber) !== null) {
      switch (length) {
        case 10: {
          return data.match(/^\d+$/)
            ? { content: "+1" + data, class: "correct" }
            : notValid(data);
        }
        case 11: {
          return data.charAt(0) === "1"
            ? { content: "+" + data, class: "correct" }
            : notValid(data);
        }
        case 12: {
          return data.charAt(0) === "+" && data.charAt(1) === "1"
            ? { content: data, class: "correct" }
            : notValid(data);
        }
        default:
          return notValid(data);
      }
    }
    return notValid(data);
  },
  children: (hasChildren) => {
    let data = hasChildren.trim();
    if (
      data.toLowerCase() === "true" ||
      data.toLowerCase() === "false" ||
      data.toLowerCase() === ""
    ) {
      return {
        content: data.toUpperCase(),
        class: "correct",
      };
    }
    return notValid(data);
  },
  license: (licenseNumber) => {
    let data = licenseNumber.trim();
    if (data.length === 6 && data.match(/^[A-Za-z\d]+$/)) {
      return {
        content: data,
        class: "correct",
      };
    }
    return notValid(data);
  },
  email: (email) => {
    let data = email.trim();
    if (validator.isEmail(data)) {
      return {
        content: email,
        class: "correct",
      };
    }
    return notValid(email);
  },
  name: (name) => {
    let data = name.trim();
    if (data.match(letters)) {
      return {
        content: name,
        class: "correct",
      };
    }
    return notValid(name);
  },
};

export default validators;
