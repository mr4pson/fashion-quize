import classNames from "classnames";
import { TypeTask } from "components/pages/StylistPage/TasksPage/types";
import { memo } from "react";
import styles from "./TaskCard.module.scss";

type Props = {
  task: TypeTask;
  onTaskCancel: (id: number) => void;
};

const TaskCard: React.FC<Props> = ({ task, onTaskCancel }) => {
  return (
    <div className={styles["task-card"]}>
      <div className={styles["task-card__header"]}>
        <div className={styles["task-card__info"]}>
          <div className={styles["task-card__number"]}>{task.id}.</div>
          <div className={styles["task-card__type"]}>{task.type.title}</div>
        </div>
      </div>
      <div className={styles["task-card__body"]}>
        <div className={styles["task-feature"]}>
          <div className={styles["task-feature__title"]}>Дата создания:</div>
          <div className={styles["task-feature__value"]}>{task.createdAt}</div>
        </div>
        <div className={styles["task-feature"]}>
          <div className={styles["task-feature__title"]}>Исполнить до:</div>
          <div className={styles["task-feature__value"]}>
            {task.date} {task.time}
          </div>
        </div>
        <div className={styles["task-card__footer"]}>
          <div
            className={classNames(
              styles["task-card__status"],
              styles["task-card__status--on-way"]
            )}
          >
            {task.status.title}
          </div>
          <button
            onClick={() => onTaskCancel(task.id)}
            className={styles["task-card__cancel-btn"]}
          >
            Отменить
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(TaskCard);
