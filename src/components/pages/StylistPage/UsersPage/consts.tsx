import { Link } from "react-router-dom";
import { paths, StlPage } from "../routes/consts";

export const getColumns = (history: any) => {

  return [
    { title: "ID", dataIndex: "id", key: "id" },
    {
      title: "ФИО",
      dataIndex: "name",
      key: "name",
      render: (name) => <div>{name}</div>,
    },
    {
      title: "Город",
      dataIndex: "city",
      key: "city",
      render: (city) => <div>{city}</div>,
    },
    {
      title: "Email",
      dataIndex: "login",
      key: "login",
      render: (login) => <div>{login}</div>,
    },
    {
      title: "Дата регистрации",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => <div>{createdAt}</div>,
    },
    {
      title: "Действие",
      dataIndex: "id",
      key: "id",
      render: (id) => (
        <Link to={`${paths[StlPage.USERS]}/${id}`}>Посмотреть</Link>
      ),
    },
  ];
};
