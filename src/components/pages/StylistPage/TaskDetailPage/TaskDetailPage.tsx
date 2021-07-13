import React, { memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { tasksThunks } from "redux/slicers/tasksPageSlice";
import styles from './TaskDetailPage.module.scss';

const TaskDetailPage: React.FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams() as any;
  
  useEffect(() => {
    dispatch(tasksThunks.getTask(id));
  }, [dispatch, id]);

  return (
    <div className={styles['detail']}>
      <div className={styles["detail__header"]}>
        <h1>Изменение задачи №{id}</h1>
      </div>
    </div>
  );
};

export default memo(TaskDetailPage);
