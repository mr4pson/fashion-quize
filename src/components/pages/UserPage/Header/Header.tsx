import { Button } from "antd";
import Dropdown from "antd/lib/dropdown";
import Menu from "antd/lib/menu";
import { getUserInfo } from "common/helpers/common-helpers";
import { useAuth } from "hooks/useAuth";
import React, { memo } from "react";
import { useHistory } from "react-router";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { paths, UsrPage } from "../routes/consts";
import { menuItems } from "./constants";
import styles from "./Header.module.scss";
import { TypeMenuItem } from "./types";

const Header: React.FC = () => {
  const history = useHistory();
  const { logout } = useAuth(history);
  const location = useLocation();
  const userInfo = getUserInfo();

  const checkIfMenuItemActive = (menuItem: TypeMenuItem) => {
    return location.pathname.indexOf(menuItem.path) !== -1;
  };

  return (
    <div className={styles["header"]}>
      <button className={styles["navbar-toggle"]}></button>
      <Link
        className={styles["logo"]}
        style={{
          backgroundImage:
            "url('https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg')",
        }}
        to={paths[UsrPage.PROFILE]}
      >
        Eyelish
      </Link>
      <nav className={styles["nav"]}>
        {menuItems.map((item, index) => (
          <span key={index}>
            <Link
              className={checkIfMenuItemActive(item) ? styles["active"] : ""}
              to={item.path}
            >
              {item.title}
            </Link>
          </span>
        ))}
        <span>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key={1}>
                  <Button type="link" onClick={logout}>
                    Выйти
                  </Button>
                </Menu.Item>
              </Menu>
            }
            placement="bottomCenter"
          >
            <div className={styles["user-info"]}>
              <div className={styles["user-info__name"]}>{userInfo?.name}</div>
              <div className={styles["user-info__photo"]}></div>
            </div>
          </Dropdown>
        </span>
      </nav>
    </div>
  );
};

export default memo(Header);
