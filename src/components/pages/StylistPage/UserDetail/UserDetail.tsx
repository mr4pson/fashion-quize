import Descriptions from "antd/lib/descriptions";
import Loader from "components/modules/Loader";
import moment from "moment";
import { FC, memo, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { TRootState, useAppDispatch } from "redux/ReduxStore";
import { usersThunks } from "redux/slicers/usersPageSlice";
import { ESexes } from "../TasksPage/types";
import styles from "./UserDetail.module.scss";


const UserDetail: FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams() as any;

  const { user } = useSelector((state: TRootState) => state.usersPage);

  useEffect(() => {
    (async () => {
      dispatch(usersThunks.getUser(id));
    })();

    return () => dispatch(usersThunks.clearUser());
  }, [dispatch, id]);

  return (
    <div className={styles["detail"]}>
      <div className={styles["detail__header"]}>
        <h1>Пользователь №{id}</h1>
      </div>
      {user.id && (
        <Descriptions size="default" column={2}>
          <Descriptions.Item label="Email">{user?.login}</Descriptions.Item>
          <Descriptions.Item label="ФИО">{user?.name}</Descriptions.Item>
          <Descriptions.Item label="Возраст">{user?.age}</Descriptions.Item>
          <Descriptions.Item label="Город">{user?.city}</Descriptions.Item>
          <Descriptions.Item label="Дата регистрации">
            {moment(user?.createdAt).format("DD.MM.yyyy")}
          </Descriptions.Item>
          <Descriptions.Item label="Пол">{user?.sex === ESexes.MALE ? 'Мужской' : 'Женский'}</Descriptions.Item>
        </Descriptions>
        
      )}
      {!user.id && <Loader />}
    </div>
  );
};

export default memo(UserDetail);
