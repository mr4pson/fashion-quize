import { ChangeEvent, FC, memo, useEffect, useState } from "react";

import { FStyle } from "styles";
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
  mixin?: FStyle[];
  disabled?: boolean;

  label?: string;
};

const Input: FC<TProps> = ({ name, type = "search", mixin = [], disabled, label }) => {
  const [value, setValue] = useState("");
  const onChange = (e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value);

  useEffect(() => {
    value && console.log(`input ${name}:`, value);
  }, [value]);

  return (
    <div className={`inp ${mixin.join(" ")}`}>
      {label && <label className="inp__lbl" htmlFor={name}>{label}</label>}
      <input className="inp inp__fld" autoComplete="off" id={name} {...{ name, type, disabled, value, onChange }} />
    </div>
  );
};

export default memo(Input);
