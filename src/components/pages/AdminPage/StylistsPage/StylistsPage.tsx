import { Button, Table } from "antd";
import { memo } from "react";
import { useHistory } from "react-router";
import { AdmPage, paths } from "../routes/constants";
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
          history.push(paths[AdmPage.STYLISTS] + "/edit/" + id);
        };
      case DELETE:
        return () => {
          props.onStylistsRemove(id);
        };
      default:
        break;
    }
  }

  const history = useHistory();

  const dataSource = props.stylists?.map((stylist) => ({
    key: stylist.id,
    ...stylist,
  }));

  const handleRedirect = () => {
    history.push(paths[AdmPage.STYLISTS_CREATE]);
  };

  return (
    <>
      <div className={styles["table-top"]}>
        <h1 className={styles["table-top__title"]}>Список стилистов</h1>
        <Button onClick={handleRedirect} className={styles["table-top__btn"]} type="primary">
          Создать
        </Button>
      </div>
      <Table columns={columns} dataSource={dataSource} />
    </>
  );
};

export default memo(StylistsPage);
