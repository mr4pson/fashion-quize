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
  disabled?: boolean;

  color?: string;
  label?: string;
};

const Input: FC<TProps> = ({ name, type = "search", disabled, color, label }) => {
  const [value, setValue] = useState("");
  const onChange = (e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value);

  const dis = disabled ? "inp__lbl_disabled" : "";

  useEffect(() => {
    value && console.log(`input ${name}:`, value);
  }, [value]);

  return (
    <div className="inp">
      {label && <label className={`inp__lbl ${dis}`} htmlFor={name} style={{ color }}>{label}</label>}
      <input className="inp inp__fld" id={name} {...{ name, type, disabled, value, onChange }} />
    </div>
  );
};

export default memo(Input);
