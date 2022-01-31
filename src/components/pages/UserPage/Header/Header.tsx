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
import { ReactComponent as FbIcon } from "./../../../../assets/icons/ic-fb.svg";
import { ReactComponent as InstIcon } from "./../../../../assets/icons/ic-inst.svg";
import { ReactComponent as UserIcon } from "./../../../../assets/icons/ic-user.svg";
import { ReactComponent as Logo } from "./../../../../assets/icons/logo.svg";
import { ReactComponent as MenuIcon } from "./../../../../assets/icons/menu.svg";

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
          <button className={styles["header__menu-btn"]}>
            <MenuIcon />
          </button>
          <Link to={paths[UsrPage.TASKS]}>
            <Logo className={styles["header__logo"]} />
          </Link>
          <div className={styles["header__actions"]}>
            <nav className={styles["header__nav"]}>
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
            </nav>
            <div className={styles["header__links"]}>
              <InstIcon className={styles["header__link"]} />
              <FbIcon className={styles["header__link"]} />
            </div>
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
                  <div className={styles["user-info__avatar"]}>
                    <UserIcon />
                  </div>
                </div>
              </Dropdown>
            </span>
          </div>
          {/* <div
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
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default memo(Header);
