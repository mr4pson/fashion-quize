import { FC, memo, ReactNode } from "react";

import { BMixin } from ".";
import "./Button.scss";

type Props = {
  type?: "submit" | "reset" | "button";
  mixin?: BMixin[];
  disabled?: boolean;

  children: ReactNode;
};

const Button: FC<Props> = ({ type = "button", mixin = [], disabled, children }) => {
  return (
    <button className={`btn ${mixin.join(" ")}`} {...{ type, disabled }}>
      {children}
    </button>
  );
};

export default memo(Button);
