import { Button, Table } from "antd";
import { memo } from "react";
import { useHistory } from "react-router";
import { AdmPage, paths } from "../routes/constants";
import styles from "./BlocksPage.module.scss";
import { CHANGE, DELETE, getColumns } from "./constants";
import { TypeBlock } from "./type";

type Props = {
  blocks: TypeBlock[];
  onBlockRemove: (id: number) => void;
};

const BlocksPage: React.FC<Props> = (props) => {
  const columns = getColumns(styles, getActionRow);

  function getActionRow(type: string, id: number) {
    switch (type) {
      case CHANGE:
        return () => {
          history.push(paths[AdmPage.BLOCKS] + "/edit/" + id);
        };
      case DELETE:
        return () => {
          props.onBlockRemove(id);
        };
      default:
        break;
    }
  }

  const history = useHistory();

  const dataSource = props.blocks?.map((block) => ({
    key: block.id,
    ...block,
  }));

  const handleRedirect = () => {
    history.push(paths[AdmPage.BLOCKS_CREATE]);
  };

  return (
    <>
      <div className={styles["table-top"]}>
        <h1 className={styles["table-top__title"]}>Список блоков</h1>
        <Button
          onClick={handleRedirect}
          className={styles["table-top__btn"]}
          type="primary"
        >
          Создать
        </Button>
      </div>
      <Table columns={columns} dataSource={dataSource} />
    </>
  );
};

export default memo(BlocksPage);
