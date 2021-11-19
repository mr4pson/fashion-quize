import { Button } from "antd";
import classNames from "classnames";
import { FC, memo } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as LeftArrowSvg } from "../icons/left-arrow.svg";
import styles from "./QuizeHeader.module.scss";
import { TQuizeHeaderConfig } from "./types";

type Props = TQuizeHeaderConfig;

const QuizeHeader: FC<Props> = ({
  title,
  description,
  backUrl,
  currentSectionNumber,
  sectionLength,
}) => {
  return (
    <div className={styles["quize-header"]}>
      {backUrl && (
        <Link className={styles["quize-header__back-btn"]} to={backUrl}>
          <Button type={"link"}>
            <LeftArrowSvg />
            <span>Назад</span>
          </Button>
        </Link>
      )}
      {!backUrl && <div className={styles["quize-header__back-btn"]} />}
      <div className={classNames(styles["quize-header__info"], "quize-header__info")}>
        <h1 className={styles["quize-header__title"]}>{title}</h1>
        {description && (
          <div className={styles["quize-header__desc"]}>{description}</div>
        )}
      </div>
      {currentSectionNumber && sectionLength && (
        <div className={styles["quize-header__progress"]}>
          <b>{currentSectionNumber}</b>
          <span>/</span>
          <span>{sectionLength}</span>
        </div>
      )}
    </div>
  );
};

export default memo(QuizeHeader);
