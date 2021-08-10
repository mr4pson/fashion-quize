import { Descriptions } from "antd";
import Loader from "components/modules/Loader";
import moment from "moment";
import { FC, memo, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { TRootState, useAppDispatch } from "redux/ReduxStore";
import { tasksThunks } from "redux/slicers/tasksPageSlice";
import { AdmPage, paths } from "../routes/constants";
import styles from "./TaskDetail.module.scss";

const TaskDetail: FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams() as any;

  const { task, types, statuses } = useSelector(
    (state: TRootState) => state.tasksPage
  );

  const compilationId = task?.compilation?.id;
  const userName = task?.user?.name;

  useEffect(() => {
    (async () => {
      await dispatch(tasksThunks.getTaskStatuses());
      await dispatch(tasksThunks.getTaskTypes());
      dispatch(tasksThunks.getTask(id));
    })();

    return () => dispatch(tasksThunks.clearTask());
  }, [dispatch, id]);

  return (
    <div className={styles["detail"]}>
      <div className={styles["detail__header"]}>
        <h1>Задача №{id}</h1>
      </div>
      {task.id && types && statuses && (
        <Descriptions size="default" column={2}>
          {compilationId && <Descriptions.Item label="Подборка">
            <Link to={`${paths[AdmPage.COMPILATIONS]}/${compilationId}`}>
              Подборка №{compilationId}
            </Link>
          </Descriptions.Item>}
          <Descriptions.Item label="Пользователь">
            <Link to={`${paths[AdmPage.USERS]}/${task.user.id}`}>{userName}</Link>
          </Descriptions.Item>
          <Descriptions.Item label="Статус">{task.status.title}</Descriptions.Item>
          <Descriptions.Item label="Тип">{task.type.title}</Descriptions.Item>
          <Descriptions.Item label="Создана">{moment(task.createdAt).format("DD.MM.yyyy hh:mm:ss")}</Descriptions.Item>
          <Descriptions.Item label="Исполнить до">{task.date}</Descriptions.Item>
          <Descriptions.Item label="Комментарий">{task.comment}</Descriptions.Item>
        </Descriptions>
      )}
      {!(task.id && types && statuses) && <Loader />}
    </div>
  );
};

export default memo(TaskDetail);
