import { Table } from "antd";
import Descriptions from "antd/lib/descriptions";
import Loader from "components/modules/Loader";
import moment from "moment";
import { FC, memo, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { TRootState, useAppDispatch } from "redux/ReduxStore";
import { usersThunks } from "redux/slicers/usersPageSlice";
import { ESexes } from "../TasksPage/types";
import { getColumns } from "./consts";
import styles from "./UserDetail.module.scss";
import { Link } from "react-router-dom";
import { ID, paths, StlPage } from "../routes/consts";


const UserDetail: FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams() as any;

  const { user, loading } = useSelector((state: TRootState) => state.usersPage);

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
        <>
          <Descriptions size="default" column={2}>
            <Descriptions.Item label="Email">{user?.login}</Descriptions.Item>
            <Descriptions.Item label="ФИО">{user?.name}</Descriptions.Item>
            <Descriptions.Item label="Возраст">{user?.age}</Descriptions.Item>
            <Descriptions.Item label="Город">{user?.city}</Descriptions.Item>
            <Descriptions.Item label="Дата регистрации">
              {moment(user?.createdAt).format("DD.MM.yyyy")}
            </Descriptions.Item>
            <Descriptions.Item label="Пол">{user?.sex === ESexes.MALE ? 'Мужской' : 'Женский'}</Descriptions.Item>
            <Descriptions.Item label="Анкета">
              <Link
                to={`${paths[StlPage.QUIZE].replace(ID, user.answers![0]?.id.toString())}`}
              >
                Перейти к анкете
              </Link>
            </Descriptions.Item>
          </Descriptions>
          <h2>Список задач</h2>
          <Table columns={getColumns(styles)} dataSource={user.tasks} loading={loading} />
        </>
      )}
      {!user.id && <Loader />}
    </div>
  );
};

export default memo(UserDetail);
