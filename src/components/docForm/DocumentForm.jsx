import { useState } from "react";
import classes from "./documentForm.module.css";

export default function DocumentForm() {
  const [data, setData] = useState([]);

  async function getData() {
    try {
      const response = await fetch("http://localhost:5000/api/upload");
      if (!response.ok) {
        throw new Error("Ошибка загрузки данных");
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error(`Ошибка: `, error);
    }
  }
  getData();

  return (
    <aside>
      <form>
        <div className={classes.formDescription}>
          <h2 className={classes.h2}>Пожалуйста, заполните данные</h2>
          <p className={classes.p}>
            После заполнения и отправки формы будет создан документ с введенными
            данными.
          </p>
        </div>

        <div>
          <div>
            {/* {Array.isArray(data) ? (
              data.map((item) => <div key={item.id}>{item.name}</div>)
            ) : (
              <p>Загрузка...</p>
            )} */}
          </div>
        </div>
      </form>
    </aside>
  );
}
