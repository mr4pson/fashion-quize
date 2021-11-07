import React, { memo } from "react";
import styles from "./PageHeader.module.scss";

type Props = {
  title: string;
  btnTitle?: string;
  buttonType?: "button" | "submit" | "reset" | undefined;
  handleBtnClick?: () => void;
};

const PageHeader: React.FC<Props> = ({ title, btnTitle, buttonType, handleBtnClick }) => {
  return (
    <div className={styles["page-header"]}>
      <h1 className={styles["page-header__title"]}>{title}</h1>
      {btnTitle && (
        <button type={buttonType} onClick={handleBtnClick} className={styles["page-header__btn"]}>
          {btnTitle}
        </button>
      )}
    </div>
  );
};

export default memo(PageHeader);
