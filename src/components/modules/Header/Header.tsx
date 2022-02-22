import classNames from "classnames";
import { memo, useEffect, useState } from "react";
import { HashLink as Link } from "react-router-hash-link";
import { Page, paths } from "routes/constants";

import { ReactComponent as FbIcon } from "./../../../assets/icons/ic-fb.svg";
import { ReactComponent as InstIcon } from "./../../../assets/icons/ic-inst.svg";
import { ReactComponent as Logo } from "./../../../assets/icons/logo.svg";
import { ReactComponent as MenuIcon } from "./../../../assets/icons/menu.svg";
import { ReactComponent as LoginIcon } from "./../../../assets/icons/login.svg";
import { ReactComponent as CloseIcon } from "./../../../assets/icons/close.svg";
import styles from "./Header.module.scss";
import { Button } from "antd";
import { mobileNavItems } from "./constants";

function Header(): JSX.Element {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isNavMobileActive, setIsNavMobileActive] = useState<boolean>(false);

  useEffect(() => {
    const onScroll = () => setIsActive(!!window.pageYOffset);

    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavMobileToggle = () => setIsNavMobileActive((prev) => !prev);

  const getClassNames = (isActive: boolean) => {
    return classNames({
      [styles["header"]]: true,
      [styles["header--active"]]: isActive,
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
    <div className={getClassNames(isActive)}>
      <div className="container">
        <div className={styles["header__content"]}>
          <button
            onClick={handleNavMobileToggle}
            className={styles["header__menu-btn"]}
          >
            <MenuIcon />
          </button>
          <Link to={paths[Page.HOME]}>
            <Logo className={styles["header__logo"]} />
          </Link>
          <div className={styles["header__actions"]}>
            <div className={styles["header__links"]}>
              <a href="https://instagram.com/eyelish.ru" target="_blank">
                <InstIcon className={styles["header__link"]} />
              </a>
              <FbIcon className={styles["header__link"]} />
            </div>
            <div className={styles["header__login-btn"]}>
              <Link to={paths[Page.LOGIN]}>
                <Button className={styles["login-btn--desktop"]}>Войти</Button>
                <button className={styles["login-btn--mobile"]}>
                  <LoginIcon />
                </button>
              </Link>
            </div>
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
              {mobileNavItems.map((mobileNavItem, index) => (
                <li
                  key={index}
                  onClick={handleMobileItemClick}
                  className={styles["nav-mobile__link"]}
                >
                  <Link to={mobileNavItem.path}>{mobileNavItem.label}</Link>
                </li>
              ))}
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
}

export default memo(Header);
