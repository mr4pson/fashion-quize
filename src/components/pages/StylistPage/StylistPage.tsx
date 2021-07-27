import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { FC, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";

import { getJwtPair } from "common/helpers/auth-helpers";
import { getUserInfo } from "common/helpers/common-helpers";
import { userType } from "common/types/type";

import { ReactComponent as LogoSvg } from "../../../images/logo.svg";
import { getSelectedKey, menuItems } from "./consts";
import StylistRoutes from "./routes/StylistRoutes";
import StylistHeader from "./StylistHeader";
import styles from "./StylistPage.module.scss";


const { Content, Footer, Sider } = Layout;

const StylistPage: FC = () => {
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
    if (!jwtPair || userInfo?.role !== userType.STYLIST) {
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
        <Menu theme="dark" mode="inline" selectedKeys={[selectedKey]}>
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
