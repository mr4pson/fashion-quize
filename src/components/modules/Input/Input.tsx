import { ChangeEvent, FC, memo, useEffect, useState } from "react";

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
  | "radio"
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

  label?: string;
};

const Input: FC<TProps> = ({ name, type = "search", options = [], disabled, label }) => {
  const initValue = type === "select" ? options[0] : "";
  const [value, setValue] = useState(initValue);
  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setValue(e.currentTarget.value);

  useEffect(() => {
    value && console.log(`input ${name}:`, value);
  }, [value]);

  return (
    <div className="inp text-md">
      {label && (
        <label className="inp__lbl" htmlFor={name}>
          {label}
        </label>
      )}
      {type === "select" ? (
        <select className="inp inp__fld" id={name} {...{ name, disabled, value, onChange }}>
          {options.map((val, idx) => (
            <option key={idx}>{val}</option>
          ))}
        </select>
      ) : (
        <input className="inp inp__fld" autoComplete="off" id={name} {...{ name, type, disabled, value, onChange }} />
      )}
    </div>
  );
};

export default memo(Input);
