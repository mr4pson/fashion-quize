import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useState } from "react";
import { useHistory, useLocation } from "react-router";

import { getUserInfo } from "common/helpers/common-helpers";
import { userType } from "common/types/type";
import { ReactComponent as LogoSvg } from "../../../images/logo.svg";
import { getJwtPair } from "../AdminPage/helpers";
import { menuItems } from "./consts";
import { paths, StlPage } from "./routes/consts";
import StylistRoutes from "./routes/StylistRoutes";
import StylistHeader from "./StylistHeader";
import styles from "./StylistPage.module.scss";

const { Content, Footer, Sider } = Layout;

const StylistPage: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const history = useHistory();
  const location = useLocation();

  const onCollapse = (collapsed: boolean) => {
    setIsCollapsed(collapsed);
  };

  (async () => {
    const jwtPair = await getJwtPair();
    const userInfo = await getUserInfo();
    if (!jwtPair || userInfo.role !== userType.STYLIST) {
      history.push("/login");
    }
  })();

  const getSelectedKey = () => {
    if (location.pathname.includes(paths[StlPage.TASKS])) return "1";
    if (location.pathname.includes(paths[StlPage.COMPILATIONS])) return "2";
    return "1";
  };

  return (
    <Layout className={styles["layout"]}>
      <Sider
        trigger={isCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        collapsedWidth={50}
        collapsible
        collapsed={isCollapsed}
        onCollapse={onCollapse}
      >
        <div className={styles["layout__logo"]}>
          <LogoSvg />
        </div>
        <Menu theme="dark" defaultSelectedKeys={[getSelectedKey()]} mode="inline">
          {menuItems.map((item) => (
            <Menu.Item
              key={item.key}
              icon={item.icon}
              onClick={() => history.push(item.route)}
              className={styles["item"]}
            >
              {item.title}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout className={styles["layout"]}>
        <StylistHeader />
        <Content style={{ margin: "0 16px" }}>
          <div className={styles["page-content"]}>
            <StylistRoutes />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}></Footer>
      </Layout>
    </Layout>
  );
};

export default StylistPage;
