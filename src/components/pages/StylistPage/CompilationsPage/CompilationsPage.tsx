import { Table } from "antd";
import { memo } from "react";

import styles from "./CompilationsPage.module.scss";
import { getColumns } from "./consts";
import { ICompilation } from "./types";

type TProps = {
  compilations: ICompilation[];
};

const CompilationsPage: React.FC<TProps> = (props) => {
  const columns = getColumns(styles);

  const dataSource = props.compilations?.map((compilation) => ({
    key: compilation.id,
    ...compilation,
  }));

  return (
    <>
      <div className={styles["table-top"]}>
        <h1 className={styles["table-top__title"]}>Список подборок</h1>
      </div>
      <Table columns={columns} dataSource={dataSource} />
    </>
  );
};

export default memo(CompilationsPage);
