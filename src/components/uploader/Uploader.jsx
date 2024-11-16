import { useId } from "react";
import classes from "./uploader.module.css";

export default function Uploader() {
  const id = useId();
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
          <p>Можно выбрать несколько файлов: pdf, doc, docx, rtf</p>
        </div>
        <input id={id} type="file" style={{ display: "none" }} />
      </label>
    </>
  );
}
