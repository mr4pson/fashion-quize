import { Button, Table } from "antd";
import axios from "axios";
import { memo } from "react";
import { useDispatch } from "react-redux";
import { actions } from "redux/reducers/blocksPageReducer";
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
      render: () => {
        return (
          <>
            {actionButtons.map((button) => (
              <Button
                onClick={getActionRow(button.type, button.id)}
                key={button.id}
                type="link"
                className={styles["action"]}
              >
                {button.action}
              </Button>
            ))}
          </>
        );
      },
    },
  ];

  const getActionRow = (type, id) => {
    switch (type) {
      case CHANGE:
        break;
      case DELETE:
        return () => {
          if (window.confirm("Вы точно хотите удалить этот блок?")) {
            deleteRow(id);
          }
        };
      default:
        break;
    }
  };

  const dispatch = useDispatch();

  const deleteRow = async (id) => {
    const response = await axios.get("/mocks/getBlocks.json");
    const result = response.data.filter((obj) => obj.id !== id);
    dispatch(actions.setBlocks(result));
  };

  return <Table columns={columns} dataSource={props.blocks} />;
};

export default memo(BlocksPage);
