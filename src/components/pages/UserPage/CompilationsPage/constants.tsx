import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Button, Image } from "antd";
import classNames from "classnames";
import { getImageUrl } from "common/helpers/common-helpers";
import {
  TCompilation,
  TLook
} from "components/pages/StylistPage/CompilationsPage/types";
import {
  TaskStatus,
  TypeTask
} from "components/pages/StylistPage/TasksPage/types";


export const checkIfRateIsAccessible = (taskTitle) =>
  !["Подтверждена пользователем", "В пути", "Завершена"].includes(taskTitle);

export const getColumns = (styles, showModal: (id: number) => void) => {
  const getLookClassNames = (isSelected) => {
    return classNames({
      [styles["look"]]: true,
      [styles["look--selected"]]: isSelected,
    });
  };

  return [
    { title: "ID", dataIndex: "key", key: "key" },
    {
      title: "Статус",
      dataIndex: "status",
      key: "status",
      render: (status: TaskStatus) => <div>{status?.title}</div>,
    },
    {
      title: "Задача",
      dataIndex: "task",
      key: "task",
      render: (task: TypeTask) =>
        // <Link to={`${paths[UsrPage.TASKS]}/${task.id}`}>
        !!task.id && `Задача №${task.id}`,
      // </Link>
    },
    {
      title: "Луки",
      dataIndex: "looks",
      key: "looks",
      render: (looks: TLook[]) => (
        <div>
          {!!looks?.length &&
            looks.map((look) => (
              <div className={getLookClassNames(look.selected)} key={look.id}>
                {look.selected === true && (
                  <CheckCircleOutlined
                    className={styles["mobile-look__selected-icon"]}
                  />
                )}
                {look.selected === false && (
                  <CloseCircleOutlined
                    className={styles["mobile-look__not-selected-icon"]}
                  />
                )}
                {look.items.map((item) => (
                  <div className={styles["look-item"]} key={item.id}>
                    <Image
                      className={styles["look-item__photo"]}
                      width={100}
                      height={80}
                      src={getImageUrl(item.photo)}
                    />
                    <div className={styles["look-item__name"]}>{item.name}</div>
                  </div>
                ))}
              </div>
            ))}
        </div>
      ),
    },
    {
      title: "Действие",
      dataIndex: "",
      key: "x",
      render: (compilation: TCompilation) => (
        <>
          {checkIfRateIsAccessible(compilation.task.status.title) && (
            <Button type="link" onClick={() => showModal(compilation.id)}>
              Выбрать подборки
            </Button>
          )}
        </>
      ),
    },
  ];
};

export const initialSelectedLooks = [false, false, false];
