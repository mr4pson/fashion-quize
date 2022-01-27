import { ChangeEvent, FC, memo, useState } from "react";
import "./Input.scss";

type HTMLInputTypeAttribute =
  | "button"
  | "color"
  | "date"
  | "datetime-local"
  | "email"
  | "file"
  | "hidden"
  | "image"
  | "month"
  | "number"
  | "password"
  | "range"
  | "reset"
  | "search"
  | "select"
  | "submit"
  | "tel"
  | "text"
  | "time"
  | "url"
  | "week"
  | (string & {});

type TProps = {
  name: string;
  type?: HTMLInputTypeAttribute;
  options?: (string | number | readonly string[])[];
  disabled?: boolean;
  required?: boolean;

  label?: string;
};

const Input: FC<TProps> = ({ name, type = "search", options = [], disabled, required, label }) => {
  const initValue = type === "select" ? options[0] : "";
  const [value, setValue] = useState(initValue);
  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setValue(e.currentTarget.value);

  return (
    <div className="inp">
      {label && (
        <label className="inp__lbl" htmlFor={label}>
          {label}
        </label>
      )}
      {type === "select" ? (
        <select className="inp inp__fld" {...{ id: label, name, disabled, required, value, onChange }}>
          {options.map((value, key) => (
            <option {...{ key }}>{value}</option>
          ))}
        </select>
      ) : (
        <input
          className="inp inp__fld"
          autoComplete="off"
          {...{ id: label, name, type, disabled, required, value, onChange }}
          {...(type === "password" && { minLength: 6, maxLength: 20 })}
        />
      )}
    </div>
  );
};

export default memo(Input);
