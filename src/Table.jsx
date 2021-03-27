import React, { useEffect, useState } from "react";
import validators from "./validators/table-validators";
import styles from "./Table.module.css";

const Table = (props) => {
  const [data, setData] = useState([]);
  const [phones, setPhones] = useState([]);
  const [emails, setEmails] = useState([]);

  const duplicateIndexes = {};

  let findDuplicates = (arr) =>
    arr.filter((item, index) => arr.indexOf(item) !== index);

  let emailDuplicates = findDuplicates(emails);
  let phoneDuplicates = findDuplicates(phones);

  for (const el of emailDuplicates) {
    let firstIndex = emails.indexOf(el);
    let secondIndex = emails.indexOf(el, firstIndex + 1);
    duplicateIndexes[firstIndex] = secondIndex;
    duplicateIndexes[secondIndex] = firstIndex;
  }

  for (const el of phoneDuplicates) {
    let firstIndex = phones.indexOf(el);
    let secondIndex = phones.indexOf(el, firstIndex + 1);
    duplicateIndexes[firstIndex] = secondIndex;
    duplicateIndexes[secondIndex] = firstIndex;
  }

  useEffect(() => {
    if (typeof props.data === "object") {
      let data = props.data.data;
      data[0].push("ID", "Duplicate With");
      setData(data);
    }
  }, [props.data]);
  useEffect(() => {
    if (data.length !== 0) {
      let emailsArray = [];
      let phonesArray = [];
      for (const el of data) {
        emailsArray.push(el[2].trim().toLowerCase());
        phonesArray.push(validators.number(el[1]).content);
      }
      setPhones([...emailsArray]);
      setEmails([...phonesArray]);
    }
  }, [data]);

  const renderHead = (data) => {
    let headers = data[0];
    if (headers !== null && headers !== undefined && headers.length !== 0) {
      return headers.map((header, i) => {
        return <th key={i}>{header}</th>;
      });
    }
  };

  const renderBody = (data) => {
    if (data !== null && data !== undefined && data.length !== 0)
      return data.slice(1).map((person, i) => {
        const [
          name,
          phone,
          email,
          age,
          experience,
          income,
          children,
          states,
          expDate,
          license,
        ] = person;
        return (
          <tr key={i}>
            <td className={styles[validators.name(name).class]}>
              {validators.number(name).content}
            </td>
            <td className={styles[validators.number(phone).class]}>
              {validators.number(phone).content}
            </td>
            <td className={styles[validators.email(email).class]}>
              {validators.email(email).content}
            </td>
            <td className={styles[validators.age(age).class]}>
              {validators.age(age).content}
            </td>
            <td
              className={styles[validators.experience(experience, age).class]}>
              {validators.experience(experience, age).content}
            </td>
            <td className={styles[validators.income(income).class]}>
              {isNaN(Number(income)) ? income : Number(income).toFixed(2)}
            </td>
            <td className={styles[validators.children(children).class]}>
              {validators.children(children).content}
            </td>
            <td className={styles[validators.states(states).class]}>
              {validators.states(states).content}
            </td>
            <td className={styles[validators.expDate(expDate).class]}>
              {validators.expDate(expDate).content}
            </td>
            <td className={styles[validators.license(license).class]}>
              {validators.license(license).content}
            </td>
            <td>{i + 1}</td>
            <td>{duplicateIndexes[i+1]}</td>
          </tr>
        );
      });
  };
  return (
    <div>
      <table>
        <thead className={styles.head}>
          <tr>{renderHead(data)}</tr>
        </thead>
        <tbody>{renderBody(data)}</tbody>
      </table>
    </div>
  );
};

export default Table;
