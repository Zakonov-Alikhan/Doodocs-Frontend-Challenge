import { useState } from "react";
import classes from "./formInput.module.css";

export default function FormInput({ item, onChange }) {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
    onChange(item.name, e.target.value);
  };

  return (
    <div key={item.id} className={classes.inputGroup}>
      <label htmlFor={item.id} className={classes.label}>
        {item.name}
      </label>
      <input
        type={item.attrs.numeric ? "number" : "text"}
        id={item.id}
        value={value || ""}
        name={item.name}
        required={item.is_required}
        minLength={item.attrs.has_min ? item.attrs.min : undefined}
        maxLength={item.attrs.has_max ? item.attrs.max : undefined}
        className={classes.input}
        onChange={handleChange}
      />
    </div>
  );
}
