import { Layout } from "antd";
import React, { memo } from "react";
import styles from "./AdmHeader.module.scss";

const { Header } = Layout;

const AdmHeader: React.FC = () => {
  return <Header className={styles["adm-header"]} />;
};

export default memo(AdmHeader);
