import { Card, Table } from "antd";
import { TCompilation } from "components/pages/StylistPage/CompilationsPage/types";
import React, { memo } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import styles from './CompilationsPage.module.scss';
import { getColumns } from "./constants";

type TProps = {
  compilations: TCompilation[];
  loading: boolean;
};

const CompilationsPage: React.FC<TProps> = (props) => {
  const columns = getColumns(styles);
  const dataSource = props.compilations?.map((compilation) => ({
    ...compilation,
    key: compilation.id,
    status: compilation.task.status,
    user: compilation.task.user,
  }));

  return (
    <Card
      loading={props.loading}
      title={
        <div className={styles['header']}>
          <h2 className={styles['title']}>Список Подборок</h2>
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

export default memo(CompilationsPage);
