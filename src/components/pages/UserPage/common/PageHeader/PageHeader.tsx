import { Button } from "antd";
import React, { memo } from "react";
import styles from "./PageHeader.module.scss";

type TProps = {
  title: string;
  btnTitle?: string;
  elementsNumberLabel?: string | React.ReactNode;
  handleBtnClick?: () => void;
};

const PageHeader: React.FC<TProps> = ({
  title,
  btnTitle,
  elementsNumberLabel,
  handleBtnClick,
}) => {
  return (
    <div className={styles["page-header"]}>
      <div>
        <h1 className={styles["page-header__title"]}>{title}</h1>
        {elementsNumberLabel && (
          <div className={styles["page-header__elements-number"]}>
            {elementsNumberLabel}
          </div>
        )}
      </div>
      {btnTitle && handleBtnClick && (
        <Button
          type="primary"
          onClick={handleBtnClick}
          className={styles["page-header__btn"]}
        >
          {btnTitle}
        </Button>
      )}
    </div>
  );
};

export default memo(PageHeader);
