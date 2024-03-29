import { getImageUrl } from "common/helpers/common-helpers";
import { Link } from "react-router-dom";
import { Image } from "antd";

import { paths, StlPage } from "../routes/consts";
import { TaskStatus, TypeTask } from "../TasksPage/types";
import styles from "./CompilationsPage.module.scss";
import { TCompilation, TLook } from "./types";
import classNames from "classnames";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

export const getColumns = () => {
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
      render: (status: TaskStatus) => <>{status?.title}</>,
    },
    {
      title: "Задача",
      dataIndex: "task",
      key: "task",
      render: (task: TypeTask) => (
        <Link to={`${paths[StlPage.TASKS]}/${task.id}`}>
          {!!task.id && `Задача №${task.id}`}
        </Link>
      ),
    },
    {
      title: "Пользователь",
      dataIndex: "user",
      key: "user",
      render: ({ id, name }) => (
        <Link to={`${paths[StlPage.USERS]}/${id}`}>{name}</Link>
      ),
    },
    {
      title: "Луки",
      dataIndex: "looks",
      key: "looks",
      render: (looks: TLook[]) => (
        <>
          {!!looks?.length &&
            looks.map((look) => (
              <div className={getLookClassNames(look.selected)} key={look.id}>
                {look.items.map((item) => (
                  <div className={styles["look-item"]} key={item.id}>
                    {look.selected === true && (
                      <CheckCircleOutlined
                        className={styles["look__selected-icon"]}
                      />
                    )}
                    {look.selected === false && (
                      <CloseCircleOutlined
                        className={styles["look__not-selected-icon"]}
                      />
                    )}
                    <Image
                      className={styles["look-item__photo"]}
                      width={100}
                      height={80}
                      src={getImageUrl(item.photo)}
                    />
                    <div className={styles["look-item__name"]}>{item.name}</div>
                    <div className={styles["look-item__price"]}>
                      {item.price} ₽
                    </div>
                  </div>
                ))}
              </div>
            ))}
        </>
      ),
    },
    {
      title: "Действие",
      dataIndex: "",
      key: "x",
      render: (compilation: TCompilation) => {
        if (compilation.task.status.title !== "Завершена") {
          return (
            <Link to={`${paths[StlPage.COMPILATIONS]}/${compilation.id}`}>
              Изменить
            </Link>
          );
        }
        return;
      },
    },
  ];
};
