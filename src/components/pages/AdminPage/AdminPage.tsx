import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { FC, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";

import { getJwtPair } from "common/helpers/auth-helpers";
import { getUserInfo } from "common/helpers/common-helpers";
import { EUser } from "common/types/types";
import { ReactComponent as LogoSvg } from "../../../images/logo.svg";
import AdmHeader from "./AdmHeader";
import styles from "./AdminPage.module.scss";
import { getSelectedKey, menuItems } from "./consts";
import AdmRoutes from "./routes/AdmRoutes";

const { Content, Footer, Sider } = Layout;

const AdminPage: FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [selectedKey, setSelectedKey] = useState("1");

  const history = useHistory();
  const location = useLocation();

  const onCollapse = (collapsed: boolean) => {
    setIsCollapsed(collapsed);
  };

  (async () => {
    const jwtPair = await getJwtPair();
    const userInfo = await getUserInfo();
    if (!jwtPair || userInfo?.role !== EUser.ADMIN) {
      history.push("/login");
    }
  })();

  useEffect(() => {
    const takedKey = getSelectedKey(location.pathname);

    setSelectedKey(takedKey);
  }, [location.pathname]);

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
        <Menu theme="dark" defaultSelectedKeys={[selectedKey]} mode="inline">
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
          <div className={styles["page-content"]}>
            <AdmRoutes />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}></Footer>
      </Layout>
    </Layout>
  );
};

export default AdminPage;
