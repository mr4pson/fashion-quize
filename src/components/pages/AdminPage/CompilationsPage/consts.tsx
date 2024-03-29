import { Image } from "antd";
import classNames from "classnames";
import { getImageUrl } from "common/helpers/common-helpers";
import { Link } from "react-router-dom";
import { AdmPage, paths } from "../routes/constants";
import { TCompilation, TLook } from "./types";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

export const getColumns = (styles) => {
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
      render: (status) => <>{status?.title}</>,
    },
    {
      title: "Задача",
      dataIndex: "task",
      key: "task",
      render: (task) => (
        <Link to={`${paths[AdmPage.TASKS]}/${task.id}`}>
          {!!task.id && `Задача №${task.id}`}
        </Link>
      ),
    },
    {
      title: "Пользователь",
      dataIndex: "user",
      key: "user",
      render: ({ id, name }) => (
        <Link to={`${paths[AdmPage.USERS]}/${id}`}>{name}</Link>
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
                {look.items.map((item) => (
                  <div className={styles["look-item"]} key={item.id}>
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
      render: (cmp: TCompilation) => (
        <Link to={`${paths[AdmPage.COMPILATIONS]}/${cmp.id}`}>Посмотреть</Link>
      ),
    },
  ];
};
