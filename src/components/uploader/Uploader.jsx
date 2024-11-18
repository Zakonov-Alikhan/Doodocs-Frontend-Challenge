import { useId, useRef } from "react";
import classes from "./uploader.module.css";

export default function Uploader({ setJSONContainer, setIsDisabled }) {
  const id = useId();
  const inputRef = useRef();

  const HandleFileInput = () => {
    const file = inputRef.current.files[0];

    if (file) {
      const type = file.type;

      if (type === "application/pdf") {
        // PDF обработка
        setJSONContainer("Пока работает только .txt :)");
      } else if (type.includes("rtf")) {
        // RTF обработка
        setJSONContainer("Пока работает только .txt :)");
      } else if (type.includes("wordprocessingml")) {
        // DOCX обработка
        setJSONContainer("Пока работает только .txt :)");
      } else if (type.includes("text/plain")) {
        const fileReader = new FileReader();

        fileReader.onload = (event) => {
          const parsedJSON = parsHTMLToJSON(event.target.result);
          handleFileSubmit(parsedJSON);
          setJSONContainer(JSON.stringify(parsedJSON, null, 2));
          setIsDisabled(false);
        };

        fileReader.readAsText(file);
      } else {
        setJSONContainer("<-- Формат файла не поддерживается -->");
      }
    }
  };

  function parsHTMLToJSON(file) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(file, "text/html");

    const spans = doc.querySelectorAll("span");
    const jsonResult = [];

    spans.forEach((span) => {
      const idMatch = span.textContent.match(/{{ input "(.*)" }}/);
      if (idMatch) {
        const id = idMatch[1]; // извлекаем (.*), группу захвата
        const name =
          span.closest("p")?.textContent?.split(":")[0].trim() || "Unknown"; // название поля

        const isNumeric = name.toLowerCase().includes("иин");
        const isRequired = !name.includes("(опционально)");

        jsonResult.push({
          id: id,
          type: "INPUT_TEXT",
          name: name,
          is_required: isRequired,
          attrs: {
            has_max: true,
            max: isNumeric ? 12 : 255,
            has_min: true,
            min: isNumeric ? 12 : 1,

            ...(isNumeric && { numeric: true }), //использую spread оператор для добавления свойства при необходимости
          },
        });
      }
    });
    return jsonResult;
  }

  async function handleFileSubmit(jsonArray) {
    try {
      const response = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonArray, null, 2),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Данные успешно отправленны: ", result);
      } else {
        throw new Error(`Ошибка ${response.statusText}! Данные не отправленны`);
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  return (
    <>
      {/* Достаточно было просто обернуть в label, но для надёжности свяжем айдишником */}
      <label htmlFor={id} className={classes.uploaderLabel}>
        <div className={classes.uploadDescription}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 15V18H6V15H4V18C4 19.1 4.9 20 6 20H18C19.1 20 20 19.1 20 18V15H18ZM7 9L8.41 10.41L11 7.83V16H13V7.83L15.59 10.41L17 9L12 4L7 9Z"
              fill="#3C4149"
            />
          </svg>
          <p>
            <span className={classes.underline}> Выберите файл</span> или
            перенесите его сюда
          </p>
          {/* <p>Можно выбрать несколько файлов: pdf, doc, docx, rtf</p> */}
        </div>
        <input
          ref={inputRef}
          id={id}
          type="file"
          onChange={HandleFileInput}
          style={{ display: "none" }}
        />
      </label>
    </>
  );
}
