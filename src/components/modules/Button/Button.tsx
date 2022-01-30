import classNames from "classnames";
import { FC, memo, MouseEventHandler, ReactNode } from "react";

import { BMixin } from ".";
import "./Button.scss";

type Props = {
  type?: "submit" | "reset" | "button";
  mixin?: BMixin[];
  disabled?: boolean;
  children: ReactNode;
  className?: string;

  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const Button: FC<Props> = ({
  type = "button",
  mixin = [],
  disabled,
  children,
  className,
  onClick,
}) => {
  return (
    <button
      className={classNames(`btn ${mixin.join(" ")}`, className)}
      {...{ type, disabled, onClick }}
    >
      {children}
    </button>
  );
};

export default memo(Button);
