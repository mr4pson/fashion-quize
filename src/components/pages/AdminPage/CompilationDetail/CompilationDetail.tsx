import { Descriptions, Image } from "antd";
import { getImageUrl } from "common/helpers/common-helpers";
import Loader from "components/modules/Loader";
import moment from "moment";
import { FC, memo, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { TRootState, useAppDispatch } from "redux/ReduxStore";
import { compilationsThunks } from "redux/slicers/compilationsPageSlice";
import { AdmPage, paths } from "../routes/constants";
import styles from "./CompilationDetail.module.scss";

const ProfilePage: FC = () => {
  const { id } = useParams() as any;

  const dispatch = useAppDispatch();
  const { compilation } = useSelector(
    (state: TRootState) => state.compilationsPage
  );

  const taskId = compilation.task?.id;
  const userName = compilation.task?.user?.name;

  useEffect(() => {
    dispatch(compilationsThunks.getCompilation(id));

    return () => {
      compilationsThunks.clearCompilation();
    };
  }, [dispatch, id]);

  return (
    <div className={styles["detail"]}>
      <div className={styles["detail__header"]}>
        <h1>Подборка №{id}</h1>
      </div>
      {compilation.id && (
        <Descriptions size="default" column={2}>
          {taskId && (
            <Descriptions.Item label="Задача">
              <Link to={`${paths[AdmPage.TASKS]}/${taskId}`}>
                Задача №{taskId}
              </Link>
            </Descriptions.Item>
          )}
          <Descriptions.Item label="Пользователь">
            <Link to={`${paths[AdmPage.USERS]}/${compilation.task.user.id}`}>
              {userName}
            </Link>
          </Descriptions.Item>
          <Descriptions.Item label="Статус">
            {compilation.task.status.title}
          </Descriptions.Item>
          <Descriptions.Item label="Создана">
            {moment(compilation.createdAt).format("DD.MM.yyyy hh:mm:ss")}
          </Descriptions.Item>
        </Descriptions>
      )}
      {compilation.looks?.map((look, lookIndex) => (
        <div className={styles["look"]} key={"look" + lookIndex}>
          {look.items.map(({ id, photo, name, price }) => (
            <div className={styles["look-item"]} key={id}>
              <Image
                className={styles["look-item__photo"]}
                width={100}
                height={100}
                src={getImageUrl(photo)}
              />
              <div className={styles["look-item__name"]}>{name}</div>
              <div className={styles["look-item__price"]}>{price} ₽</div>
            </div>
          ))}
        </div>
      ))}
      {!compilation.id && <Loader />}
    </div>
  );
};

export default memo(ProfilePage);
