import { Layout, Menu } from "antd";
import React, { memo, useState } from "react";
import { useHistory } from "react-router";
import AdmHeader from "./AdmHeader";
import styles from "./AdminPage.module.scss";
import { menuItems } from "./constants";
import { getJwtPair } from "./helpers";
import AdmRoutes from "./routes/AdmRoutes";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { ReactComponent as LogoSvg } from '../../../images/logo.svg';

const { Content, Footer, Sider } = Layout;

const AdminPage: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const history = useHistory();

  const onCollapse = (collapsed: boolean) => {
    setIsCollapsed(collapsed);
  };

  (async () => {
    const jwtPair = await getJwtPair();
    if (!jwtPair) {
      history.push("/login");
    }
  })();

  return (
    <Layout className={styles["layout"]}>
      <Sider
        trigger={isCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        collapsedWidth={50}
        collapsible
        collapsed={isCollapsed}
        onCollapse={onCollapse}
      >
        <div className={styles['layout__logo']} >
          <LogoSvg />
        </div>
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
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
        <AdmHeader />
        <Content style={{ margin: "0 16px" }}>
          <div className={styles['page-content']}>
            <AdmRoutes />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}></Footer>
      </Layout>
    </Layout>
  );
};

export default memo(AdminPage);
