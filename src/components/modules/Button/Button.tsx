import { memo } from "react";
import { ButtonTypes } from "./types";
import styles from "./Button.module.scss";
import classNames from "classnames";

type Props = {
  type: ButtonTypes;
  children: React.ReactNode;
  className?: string;
};

const Button: React.FC<Props> = ({ children, className = "", type }) => {
  const getClassNames = (type: ButtonTypes) => {
    return classNames({
      [className]: true,
      [styles["button"]]: true,
      [styles["button--primary"]]: type === ButtonTypes.PRIMARY,
      [styles["button--secondary"]]: type === ButtonTypes.SECONDARY,
    });
  };

  return <button className={getClassNames(type)}>{children}</button>;
};

export default memo(Button);
