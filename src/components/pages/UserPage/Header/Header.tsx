import { Button } from "antd";
import Dropdown from "antd/lib/dropdown";
import Menu from "antd/lib/menu";
import classNames from "classnames";
import { getUserInfo } from "common/helpers/common-helpers";
import { useAuth } from "hooks/useAuth";
import React, { memo, useState } from "react";
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
  const [expanded, setExpanded] = useState(false);

  const checkIfMenuItemActive = (menuItem: TypeMenuItem) => {
    return location.pathname.indexOf(menuItem.path) !== -1;
  };

  const handleExpandMobileMenu = () => {
    setExpanded((prevState) => !prevState);
  };

  const getMobileMenuClassNames = () => {
    return classNames({
      [styles["mobile-menu"]]: true,
      [styles["mobile-menu--expanded"]]: expanded,
    });
  };

  const getMobileMenuBackdropClassNames = () => {
    return classNames({
      [styles["mobile-menu-backdrop"]]: true,
      [styles["mobile-menu-backdrop--active"]]: expanded,
    });
  };

  return (
    <div className={styles["header"]}>
      <div className="container">
        <div className={styles["header__content"]}>
          <Link to={paths[UsrPage.TASKS]}>
            <div className={styles["header__logo"]}>Eyelish</div>
          </Link>
          <button
            className={styles["navbar-toggle"]}
            onClick={handleExpandMobileMenu}
          ></button>
          <nav className={styles["nav"]}>
            {menuItems.map((item, index) => (
              <span key={index}>
                <Link
                  className={
                    checkIfMenuItemActive(item) ? styles["active"] : ""
                  }
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
                  <div className={styles["user-info__name"]}>
                    {userInfo?.name}
                  </div>
                  <div className={styles["user-info__photo"]}></div>
                </div>
              </Dropdown>
            </span>
          </nav>
          <div
            onClick={handleExpandMobileMenu}
            className={getMobileMenuBackdropClassNames()}
          ></div>
          <div className={getMobileMenuClassNames()}>
            <div className={styles["mobile-menu__inner"]}>
              <ul className={styles["menu-list"]}>
                <li className={styles["user-info"]}>
                  <div className={styles["user-info__name"]}>
                    {userInfo?.name}
                  </div>
                  <div className={styles["user-info__photo"]}></div>
                </li>
                {menuItems.map((item, index) => (
                  <li key={`mob-${index}`}>
                    <Link
                      className={
                        checkIfMenuItemActive(item) ? styles["active"] : ""
                      }
                      to={item.path}
                      onClick={handleExpandMobileMenu}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
                <li>
                  <Button type="link" onClick={logout}>
                    Выйти
                  </Button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div className={styles["header"]}>
    //   <Link
    //     className={styles["logo"]}
    //     style={{
    //       backgroundImage:
    //         "url('https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg')",
    //     }}
    //     to={paths[UsrPage.PROFILE]}
    //   >
    //     Eyelish
    //   </Link>

    // </div>
  );
};

export default memo(Header);
