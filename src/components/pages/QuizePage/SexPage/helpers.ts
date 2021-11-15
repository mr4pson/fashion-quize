import classNames from "classnames";
import { ISex } from "./types";

export const getSexItemClassNames = (sex: ISex, styles) => {
  return classNames({
    [styles["sex-page__item"]]: true,
    [styles[`sex-page__item--${sex.path}`]]: true,
    [styles[`sex-page__item--active`]]: sex.isActive,
  });
};

export const checkIfSubmitDisable = (sexs: ISex[]): boolean => {
  return !!!sexs.find((sex) => sex.isActive);
}