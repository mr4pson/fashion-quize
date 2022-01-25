import { FC, memo, useEffect, useState } from "react";

import { FStyle } from "styles";
import { CScheme } from ".";
import "./Checkbox.scss";

type TProps = {
  name: string;

  label?: string;
  mixin?: (CScheme | FStyle)[];
};

const Checkbox: FC<TProps> = ({ name, label, mixin = [] }) => {
  const [checked, setChecked] = useState(false);
  const onChange = () => setChecked((prevState) => !prevState);

  useEffect(() => {
    console.log(`checkbox ${name}:`, checked);
  }, [checked]);

  return (
    <div className={`cbox ${mixin.join(" ")}`}>
      <input className="cbox__fld" type="checkbox" id={name} {...{ name, checked, onChange }} />
      {label && <label htmlFor={name}>{label}</label>}
    </div>
  );
};

export default memo(Checkbox);
