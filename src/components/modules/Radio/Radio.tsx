import { FC, memo } from "react";
import "./Radio.scss";

type TProps = {
  name: string;
  required?: boolean;

  label: string;
};

const Radio: FC<TProps> = ({ name, required, label }) => {
  return (
    <div className="radio">
      <input className="radio radio__fld" type="radio" {...{ id: label, value: label, name, required }} />
      {label && (
        <label className="radio__lbl" htmlFor={label}>
          {label}
        </label>
      )}
    </div>
  );
};

export default memo(Radio);
