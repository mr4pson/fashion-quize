import { FC, memo, useState } from "react";
import { TQandAItem } from "../types";
import styles from "./QandAItem.module.scss";
import classNames from "classnames";

type TProps = {
  item: TQandAItem;
};

const QandAItem: FC<TProps> = ({ item }) => {
  const [isActive, setIsActive] = useState(false);

  const getClassNames = (isActive) => {
    return classNames({
      [styles["q-and-a-item"]]: true,
      [styles["q-and-a-item--active"]]: isActive,
    });
  };

  const changeIsActive = () => {
    setIsActive((prevState) => !prevState);
  };

  return (
    <div className={getClassNames(isActive)}>
      <div className={styles["q-and-a-item__title"]} onClick={changeIsActive}>
        {item.title}
      </div>
      <div className={styles["q-and-a-item__desc"]}>{item.description}</div>
      <button
        className={styles["q-and-a-item__expand-btn"]}
        onClick={changeIsActive}
      ></button>
    </div>
  );
};

export default memo(QandAItem);
