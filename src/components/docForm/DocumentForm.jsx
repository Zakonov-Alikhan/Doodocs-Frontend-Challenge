// DocumentForm.jsx
import { useState } from "react";
import classes from "./documentForm.module.css";
import FormInput from "../UI/formInput/FormInput";
import useFetchData from "../../hooks/useFetchData";

export default function DocumentForm({ setFormData }) {
  const { data, error } = useFetchData("http://localhost:5000/api/uploaded");

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <aside>
      <form className={classes.form}>
        <div className={classes.formDescription}>
          <h2 className={classes.h2}>Пожалуйста, заполните данные</h2>
          <p className={classes.p}>
            После заполнения и отправки формы будет создан документ с введенными
            данными.
          </p>
        </div>

        <div className={classes.inputList}>
          {Array.isArray(data) && data.length > 0 ? (
            data.map((item) => (
              <FormInput
                key={item.id}
                item={item}
                onChange={handleInputChange}
              />
            ))
          ) : (
            <p>Загрузка...</p>
          )}
        </div>
      </form>
    </aside>
  );
}
