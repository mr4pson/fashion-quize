import { Button, Table } from "antd";
import axios from "axios";
import { memo } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { actions } from "redux/reducers/blocksPageReducer";
import { toBlocksData } from "utils/helpers";
import { AdmPage, paths } from "../routes/constants";
import styles from "./BlocksPage.module.scss";
import { actionButtons, CHANGE, DELETE } from "./constants";
import { TypeBlocks } from "./type";

type Props = {
  blocks: TypeBlocks[];
};

const BlocksPage: React.FC<Props> = (props) => {
  const columns = [
    { title: "Заголовок", dataIndex: "title", key: "title" },
    {
      title: "Цвет",
      dataIndex: "color",
      key: "color",
      render: (color: string) => (
        <div className={styles["color"]}>
          <div className={styles["color__name"]}>{color}</div>
          <div
            className={styles["color__box"]}
            style={{ background: color }}
          ></div>
        </div>
      ),
    },
    {
      title: "Действие",
      dataIndex: "",
      key: "x",
      render: (block: TypeBlocks) => (
        <>
          {actionButtons.map((button) => (
            <Button
              key={button.id}
              onClick={getActionRow(button.type, block.key)}
              className={styles["action"]}
              type="link"
            >
              {button.action}
            </Button>
          ))}
        </>
      ),
    },
  ];

  function getActionRow(type: string, id: string) {
    switch (type) {
      case CHANGE:
        return () => {
          history.push(paths[AdmPage.BLOCKS] + "/" + id);
        };
      case DELETE:
        return () => {
          if (window.confirm("Вы точно хотите удалить этот блок?")) {
            deleteRow(id);
          }
        };
      default:
        break;
    }
  }

  const history = useHistory();

  const dispatch = useDispatch();

  const deleteRow = async (id: string) => {
    const response = await axios.get("/mocks/getBlocks.json");
    const blocksData: TypeBlocks[] = toBlocksData(response.data);
    const result = blocksData.filter((obj) => obj.key !== id);
    dispatch(actions.setBlocks(result));
  };

  return <Table columns={columns} dataSource={props.blocks} />;
};

export default memo(BlocksPage);
