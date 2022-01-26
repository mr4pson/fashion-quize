import { FC, memo, useEffect, useState } from "react";

import "./Checkbox.scss";

type TProps = {
  name: string;

  label?: string;
};

const Checkbox: FC<TProps> = ({ name, label }) => {
  const [checked, setChecked] = useState(false);
  const onChange = () => setChecked((prevState) => !prevState);

  useEffect(() => {
    console.log(`checkbox ${name}:`, checked);
  }, [checked]);

  return (
    <div className="cbox">
      <input className="cbox__fld" type="checkbox" id={name} {...{ name, checked, onChange }} />
      {label && (
        <label className="cbox__lbl" htmlFor={name}>
          {label}
        </label>
      )}
    </div>
  );
};

export default memo(Checkbox);
