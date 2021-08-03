import { Button, Table } from "antd";
import { FC, memo } from "react";
import { useHistory } from "react-router";

import { AdmPage, paths } from "../routes/constants";
import { getColumns } from "./consts";
import styles from "./StylistsPage.module.scss";
import { TypeStylists } from "./types";

type TProps = {
  stylists: TypeStylists[];
  loading: boolean;
  onStylistsRemove: (id: number) => void;
};

const StylistsPage: FC<TProps> = (props) => {
  const getActionRow = (type: string, id: number) =>
    ({
      EDIT: () => history.push(paths[AdmPage.STYLISTS] + "/edit/" + id),
      DELETE: () => props.onStylistsRemove(id),
    }[type]);

  const columns = getColumns(styles, getActionRow);

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
      <Table columns={columns} loading={props.loading} dataSource={dataSource} />
    </>
  );
};

export default memo(StylistsPage);
