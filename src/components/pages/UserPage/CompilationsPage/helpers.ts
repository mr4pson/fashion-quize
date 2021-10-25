import classNames from "classnames";

export const getRatingClassNames = (isSelected: boolean, styles: any) => {
  return classNames({
    [styles["rating__item"]]: true,
    [styles["rating__item--active"]]: isSelected,
  });
};