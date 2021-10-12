import classNames from "classnames";

export const getCompilationCardBodyClassNames = (isFinished, styles) => {
  return classNames({
    [styles["compilation-card__body"]]: true,
    [styles["compilation-card__body--finished"]]: isFinished,
  });
};