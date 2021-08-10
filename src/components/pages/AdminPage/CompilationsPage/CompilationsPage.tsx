import { Table } from "antd";
import { FC, memo } from "react";

import styles from "./CompilationsPage.module.scss";
import { getColumns } from "./consts";
import { TCompilation } from "./types";

type TProps = {
  compilations: TCompilation[];
  loading: boolean;
};

const CompilationsPage: FC<TProps> = (props) => {
  const columns = getColumns();
  const dataSource = props.compilations?.map((compilation) => ({
    ...compilation,
    key: compilation.id,
    status: compilation.task.status,
    user: compilation.task.user,
  }));

  return (
    <>
      <div className={styles["table-top"]}>
        <h1 className={styles["table-top__title"]}>Список подборок</h1>
      </div>
      <Table columns={columns} dataSource={dataSource} loading={props.loading} />
    </>
  );
};

export default memo(CompilationsPage);
