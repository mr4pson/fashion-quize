import { Table } from "antd";
import { TUser } from "components/pages/StylistPage/TasksPage/types";
import moment from "moment";
import { FC, memo } from "react";
import { useHistory } from "react-router";
import { getColumns } from "./consts";
import styles from './UsersPage.module.scss';

type TProps = {
  users: TUser[];
  loading: boolean;
};

const UsersPage: FC<TProps> = (props) => {
  const history = useHistory();
  const columns = getColumns(history);

  const dataSource = props.users?.map((user) => ({
    ...user,
    key: user.id,
    updatedAt: moment(user.updatedAt).format("DD.MM.YYYY HH:mm:ss"),
    createdAt: moment(user.createdAt).format("DD.MM.YYYY HH:mm:ss"),
  }));

  return (
    <>
      <div className={styles["table-top"]}>
        <h1 className={styles["table-top__title"]}>Список пользователей</h1>
      </div>
      <Table columns={columns} dataSource={dataSource} loading={props.loading} />
    </>
  );
};

export default memo(UsersPage);
