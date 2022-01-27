import { FC, memo, useState } from "react";

import "./Checkbox.scss";

type TProps = {
  name: string;
  required?: boolean;

  label?: string;
};

const Checkbox: FC<TProps> = ({ name, required, label }) => {
  const [checked, setChecked] = useState(false);
  const onChange = () => setChecked(!checked);

  return (
    <div className="cbox">
      <input
        className="cbox__fld"
        type="checkbox"
        {...{ id: label, value: label, name, required, checked, onChange }}
      />
      {label && (
        <label className="cbox__lbl" htmlFor={label}>
          {label}
        </label>
      )}
    </div>
  );
};

export default memo(Checkbox);
