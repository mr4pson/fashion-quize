import { Button } from "antd";
import { TypeTask } from "components/pages/StylistPage/TasksPage/types";
import moment from "moment";
import React, { memo } from "react";
import styles from "./TasksPage.module.scss";
import { useHistory } from "react-router";
import { paths, UsrPage } from "../routes/consts";
import TaskCard from "./TaskCard";
import PageHeader from "../common/PageHeader";
import TaskCardSkeleton from "./TaskCardSkeleton";
import { TASK_CARD_SKELETON_NUMBER } from "./constants";
import IncreasePageButton from "../common/IncreasePageButton";

type Props = {
  tasks: TypeTask[];
  loading: boolean;
  isIncreasePageBtnVisible: boolean;
  onTaskCancel: (id: number) => void;
  increaseTaskPage: () => void;
};

const TasksPage: React.FC<Props> = (props) => {
  const history = useHistory();

  const tasks = props.tasks?.map((task) => ({
    ...task,
    key: task.id,
    updatedAt: moment(task.updatedAt).format("DD.MM.YYYY HH:mm:ss"),
    createdAt: moment(task.createdAt).format("DD.MM.YYYY"),
  }));

  const handleAddTask = () => {
    history.push(paths[UsrPage.TASKS_CREATE]);
  };

  return (
    <div className={styles["tasks-page"]}>
      <PageHeader
        title={"Список задач"}
        btnTitle={"Добавить задачу"}
        elementsNumberLabel={`Всего ${tasks.length} задач`}
        handleBtnClick={handleAddTask}
      />
      <div className={styles["tasks-page__body"]}>
        {tasks.length > 0 &&
          tasks.map((task, index) => (
            <TaskCard
              key={`task-${index}`}
              task={task}
              onTaskCancel={props.onTaskCancel}
            />
          ))}
        {tasks.length === 0 && !props.loading && (
          <div className={styles["tasks-page__no-data"]}>Список задач пуст</div>
        )}
        {props.loading &&
          [...Array(TASK_CARD_SKELETON_NUMBER)].map((num, index) => (
            <TaskCardSkeleton key={`skeleton-${index}`} />
          ))}
        {props.isIncreasePageBtnVisible && (
          <IncreasePageButton onClick={props.increaseTaskPage} />
        )}
      </div>
    </div>
  );
};

export default memo(TasksPage);
