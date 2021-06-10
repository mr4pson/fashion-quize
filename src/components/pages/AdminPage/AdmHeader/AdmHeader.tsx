import { Button, Layout } from "antd";
import { useAuth } from "hooks/useAuth";
import React, { memo } from "react";
import { useHistory } from "react-router";
import styles from "./AdmHeader.module.scss";

const { Header } = Layout;

const AdmHeader: React.FC = () => {
  const history = useHistory();
  const { logout } = useAuth(history);
  return (
    <Header className={styles["adm-header"]}>
      <Button onClick={logout} type="link">Выйти</Button>
    </Header>
  );
};

export default memo(AdmHeader);
