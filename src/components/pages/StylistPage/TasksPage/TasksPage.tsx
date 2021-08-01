import { Table } from "antd";
import moment from "moment";
import { FC, memo } from "react";
import { useHistory } from "react-router";

import { getColumns } from "./constants";
import styles from "./TasksPage.module.scss";
import { TypeTask } from "./types";

type Props = {
  tasks: TypeTask[];
  loading: boolean;
};

const TasksPage: FC<Props> = (props) => {
  const history = useHistory();
  const columns = getColumns(styles, history);

  const dataSource = props.tasks?.map((task) => ({
    ...task,
    key: task.id,
    updatedAt: moment(task.updatedAt).format("DD.MM.YYYY HH:mm:ss"),
    createdAt: moment(task.createdAt).format("DD.MM.YYYY HH:mm:ss"),
  }));

  return (
    <>
      <div className={styles["table-top"]}>
        <h1 className={styles["table-top__title"]}>Список задач</h1>
      </div>
      <Table columns={columns} dataSource={dataSource} loading={props.loading}/>
    </>
  );
};

export default memo(TasksPage);
