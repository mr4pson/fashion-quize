import { Skeleton } from "antd";
import classNames from "classnames";
import { memo } from "react";
import styles from "./TaskCardSkeleton.module.scss";

const TaskCard: React.FC = () => {
  return (
    <div className={classNames(styles["task-card"], "task-card")}>
      <div className={styles["task-card__header"]}>
        <div className={styles["task-card__info"]}>
          <Skeleton.Input
            active
            size={"small"}
            className={styles["skeleton"]}
          />
        </div>
        <Skeleton.Button
          active
          size={"small"}
          shape={"round"}
          className={styles["task-card__status"]}
        />
      </div>
      <div className={styles["task-card__body"]}>
        <div className={styles["task-feature"]}>
          <Skeleton.Input
            active
            size={"small"}
            className={classNames(
              styles["task-feature__title"],
              styles["skeleton"]
            )}
          />
          <Skeleton.Input
            active
            size={"small"}
            className={classNames(
              styles["task-feature__value"],
              styles["skeleton"]
            )}
          />
        </div>
        <div className={styles["task-feature"]}>
          <Skeleton.Input
            active
            size={"small"}
            className={classNames(
              styles["task-feature__title"],
              styles["skeleton"]
            )}
          />
          <Skeleton.Input
            active
            size={"small"}
            className={classNames(
              styles["task-feature__value"],
              styles["skeleton"]
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(TaskCard);
