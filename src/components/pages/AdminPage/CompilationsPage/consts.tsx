import { Image } from "antd";
import { getImageUrl } from "common/helpers/common-helpers";
import { Link } from "react-router-dom";
import { AdmPage, paths } from "../routes/constants";
import styles from "./CompilationsPage.module.scss";
import { TCompilation, TLook } from "./types";

export const getColumns = () => {
  return [
    { title: "ID", dataIndex: "key", key: "key" },
    {
      title: "Статус",
      dataIndex: "status",
      key: "status",
      render: (status) => <>{status?.title}</>,
    },
    {
      title: "Задача",
      dataIndex: "task",
      key: "task",
      render: (task) => <Link to={`${paths[AdmPage.TASKS]}/${task.id}`}>{!!task.id && `Задача №${task.id}`}</Link>,
    },
    {
      title: "Пользователь",
      dataIndex: "user",
      key: "user",
      render: ({ id, name }) => <Link to={`${paths[AdmPage.USERS]}/${id}`}>{name}</Link>,
    },
    {
      title: "Луки",
      dataIndex: "looks",
      key: "looks",
      render: (looks: TLook[]) => (
        <>
          {!!looks?.length &&
            looks.map((look) => (
              <div className={styles["look"]} key={look.id}>
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
        </>
      ),
    },
    {
      title: "Действие",
      dataIndex: "",
      key: "x",
      render: (cmp: TCompilation) => <Link to={`${paths[AdmPage.COMPILATIONS]}/${cmp.id}`}>Посмотреть</Link>,
    },
  ];
};
