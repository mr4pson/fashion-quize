import Dropdown from "antd/lib/dropdown";
import Menu from "antd/lib/menu";
import classNames from "classnames";
import { getUserInfo } from "common/helpers/common-helpers";
import { useAuth } from "hooks/useAuth";
import React, { memo, useState } from "react";
import { useHistory } from "react-router";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { TRootState } from "redux/ReduxStore";

import { paths, UsrPage } from "../routes/consts";
import { menuItems } from "./constants";
import styles from "./Header.module.scss";
import { TypeMenuItem } from "./types";
import { ReactComponent as FbIcon } from "./../../../../assets/icons/ic-fb.svg";
import { ReactComponent as InstIcon } from "./../../../../assets/icons/ic-inst.svg";
import { ReactComponent as UserIcon } from "./../../../../assets/icons/ic-user.svg";
import { ReactComponent as Logo } from "./../../../../assets/icons/logo.svg";
import { ReactComponent as MenuIcon } from "./../../../../assets/icons/menu.svg";
import { ReactComponent as CloseIcon } from "./../../../../assets/icons/close.svg";
import { ETheme } from "common/types/types";

const Header: React.FC = () => {
  const history = useHistory();
  const { logout } = useAuth(history);
  const location = useLocation();
  const userInfo = getUserInfo();

  const [isNavMobileActive, setIsNavMobileActive] = useState<boolean>(false);
  
  const { theme } = useSelector((state: TRootState) => state.theme);

  const checkIfMenuItemActive = (menuItem: TypeMenuItem) => {
    return location.pathname.indexOf(menuItem.path) !== -1;
  };

  const handleNavMobileToggle = () => setIsNavMobileActive((prev) => !prev);

  const getClassNames = (theme: ETheme) => {
    return classNames({
      [styles["header"]]: true,
      [styles["header--dark"]]: theme === ETheme.DARK,
    });
  };

  const getNavMobileClassNames = (isActive: boolean) => {
    return classNames({
      [styles["nav-mobile"]]: true,
      [styles["nav-mobile--active"]]: isActive,
    });
  };

  const getNavMobileBGClassNames = (isActive: boolean) => {
    return classNames({
      [styles["nav-mobile-bg"]]: true,
      [styles["nav-mobile-bg--active"]]: isActive,
    });
  };

  const handleMobileItemClick = () => {
    handleNavMobileToggle();
  };

  return (
    <div className={getClassNames(theme)}>
      <div className="container">
        <div className={styles["header__content"]}>
          <div className={styles["header__menu-btn-wrap"]}>
            <button
              onClick={handleNavMobileToggle}
              className={styles["header__menu-btn"]}
            >
              <MenuIcon />
            </button>
          </div>
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
                      <div className={styles["logout-wrap"]}>
                        <button onClick={logout}>Выйти</button>
                      </div>
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
        </div>
        <div
          onClick={handleNavMobileToggle}
          className={getNavMobileBGClassNames(isNavMobileActive)}
        ></div>
        <div className={getNavMobileClassNames(isNavMobileActive)}>
          <div className={styles["nav-mobile__content"]}>
            <button
              onClick={handleNavMobileToggle}
              className={styles["nav-mobile__close-btn"]}
            >
              <CloseIcon />
            </button>
            <ul className={styles["nav-mobile__links"]}>
              {menuItems.map((menuItem, index) => (
                <li
                  key={index}
                  onClick={handleMobileItemClick}
                  className={styles["nav-mobile__link"]}
                >
                  <Link to={menuItem.path}>{menuItem.title}</Link>
                </li>
              ))}
              <li onClick={logout} className={styles["nav-mobile__link"]}>
                <div>Выйти</div>
              </li>
            </ul>
            <div className={styles["nav-mobile__bottom"]}>
              <div className={styles["nav-mobile__contact"]}>
                Eyelish@mail.ru
              </div>
              <div className={styles["nav-mobile__contact"]}>
                +7 (993) 201-34-53
              </div>
              <div className={styles["nav-mobile__social-links"]}>
                <InstIcon className={styles["nav-mobile__social-link"]} />
                <FbIcon className={styles["nav-mobile__social-link"]} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Header);
