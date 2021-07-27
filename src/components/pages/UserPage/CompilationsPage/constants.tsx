import { ICompilation, ILook } from "components/pages/StylistPage/CompilationsPage/types";
import { TaskStatus, TypeTask } from "components/pages/StylistPage/TasksPage/types";
import { Link } from "react-router-dom";
import { paths, UsrPage,  } from "../routes/consts";

export const getColumns = (styles) => {
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
      render: (task: TypeTask) => (
        <Link to={`${paths[UsrPage.TASKS]}/${task.id}`}>
          {!!task.id && `Задача №${task.id}`}
        </Link>
      ),
    },
    {
      title: "Луки",
      dataIndex: "looks",
      key: "looks",
      render: (looks: ILook[]) => (
        <div>
          {!!looks?.length &&
            looks.map((look) => (
              <div className={styles["look"]} key={look.id}>
                {look.items.map((item) => (
                  <div className={styles["look-item"]} key={item.id}>
                    <div className={styles["look-item__photo"]}></div>
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
      render: (compilation: ICompilation) => (
        <Link to={`${paths[UsrPage.COMPILATIONS]}/${compilation.id}`}>
          Изменить
        </Link>
      ),
    },
  ];
};
