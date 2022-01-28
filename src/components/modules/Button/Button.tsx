import { FC, memo, MouseEventHandler, ReactNode } from "react";

import { BMixin } from ".";
import "./Button.scss";

type Props = {
  type?: "submit" | "reset" | "button";
  mixin?: BMixin[];
  disabled?: boolean;
  children: ReactNode;

  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const Button: FC<Props> = ({ type = "button", mixin = [], disabled, children, onClick }) => {
  return (
    <button className={`btn ${mixin.join(" ")}`} {...{ type, disabled, onClick }}>
      {children}
    </button>
  );
};

export default memo(Button);
