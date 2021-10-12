import { Button } from "antd";
import React, { memo } from "react";
import styles from "./IncreasePageButton.module.scss";

type Props = {
  onClick?: () => void;
};

const IncreasePageButton: React.FC<Props> = ({ onClick }) => {
  return (
    <Button
      className={styles["show-more-btn"]}
      type={"link"}
      onClick={onClick}
    >
      Показать больше
    </Button>
  );
};

export default memo(IncreasePageButton);
