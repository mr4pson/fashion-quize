import { FC, memo, useEffect, useState } from "react";

import { CMixin } from ".";
import "./Checkbox.scss";

type TProps = {
  name: string;

  color?: string;
  label?: string;
  mixin?: CMixin;
};

const Checkbox: FC<TProps> = ({ name, color, label, mixin = "" }) => {
  const [checked, setChecked] = useState(false);
  const onChange = () => setChecked((prevState) => !prevState);

  useEffect(() => {
    console.log(`checkbox ${name}:`, checked);
  }, [checked]);

  return (
    <div className="cbox">
      <input className="cbox__fld" type="checkbox" id={name} {...{ name, checked, onChange }} />
      {label && <label className={`cbox__lbl ${mixin}`} htmlFor={name} style={{ color }}>{label}</label>}
    </div>
  );
};

export default memo(Checkbox);
