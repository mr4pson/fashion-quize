import { Button, Card, Table } from "antd";
import { TypeTask } from "components/pages/StylistPage/TasksPage/types";
import moment from "moment";
import React, { memo } from "react";
import { getColumns } from "./constants";
import styles from "./TasksPage.module.scss";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useHistory } from "react-router";
import { paths, UsrPage } from "../routes/consts";

type Props = {
  onTaskCancel: (id: number) => void;
  tasks: TypeTask[];
  loading: boolean;
};

const TasksPage: React.FC<Props> = (props) => {
  const history = useHistory();
  const columns = getColumns(styles, props.onTaskCancel);

  const dataSource = props.tasks?.map((task) => ({
    ...task,
    key: task.id,
    updatedAt: moment(task.updatedAt).format("DD.MM.YYYY HH:mm:ss"),
    createdAt: moment(task.createdAt).format("DD.MM.YYYY HH:mm:ss"),
  }));

  const handleAddTask = () => {
    history.push(paths[UsrPage.TASKS_CREATE]);
  }

  return (
    <Card
      loading={props.loading}
      title={
        <div className={styles['page-header']}>
          <h2 className={styles['page-header__title']}>Список задач</h2>
          <Button className={styles['page-header__btn']} type={"primary"} onClick={handleAddTask}>Добавить</Button>
        </div>
      }
      bordered={false}
    >
      <PerfectScrollbar>
        <Table columns={columns} dataSource={dataSource} />
      </PerfectScrollbar>
    </Card>
  );
};

export default memo(TasksPage);
