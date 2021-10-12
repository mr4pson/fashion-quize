import classNames from "classnames";

export const getLookIndexClassNames = (isSelected, styles) => {
  return classNames({
    [styles["look__index"]]: true,
    [styles["look__index--selected"]]: isSelected === true,
    [styles["look__index--not-selected"]]: isSelected === false,
  });
};