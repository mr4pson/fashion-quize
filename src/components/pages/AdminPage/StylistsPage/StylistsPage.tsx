import { Button, Table } from "antd";
import { memo } from "react";
import { DELETE, EDIT, getColumns } from "./constants";
import styles from "./StylistsPage.module.scss";
import { TypeStylists } from "./types";

type Props = {
  stylists: TypeStylists[];
  onStylistsRemove: (id: number) => void;
};

const StylistsPage: React.FC<Props> = (props) => {
  const columns = getColumns(styles, getActionRow);

  function getActionRow(type: string, id: number) {
    switch (type) {
      case EDIT:
        return () => {
          // history.push(paths[AdmPage.QUESTIONS_ROUTE].replace(QUIZE_TYPE, props.quizeType).replace(ID, id.toString()));
        };
      case DELETE:
        return () => {
          props.onStylistsRemove(id);
        };
      default:
        break;
    }
  }

  const dataSource = props.stylists?.map((stylist) => ({
    key: stylist.id,
    ...stylist,
  }));

  return (
    <>
      <div className={styles["table-top"]}>
        <h1 className={styles["table-top__title"]}>Список стилистов</h1>
        <Button
          // onClick={handleRedirect}
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

export default memo(StylistsPage);
