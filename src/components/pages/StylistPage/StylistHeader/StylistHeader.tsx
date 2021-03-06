import { Button, Layout } from "antd";
import React from "react";
import { useHistory } from "react-router";

import { useAuth } from "hooks/useAuth";
import styles from "./StylistHeader.module.scss";

const { Header } = Layout;

const StylistHeader: React.FC = () => {
  const history = useHistory();
  const { logout } = useAuth(history);

  return (
    <Header className={styles["stl-header"]}>
      <Button onClick={logout} type="link">
        Выйти
      </Button>
    </Header>
  );
};

export default StylistHeader;
