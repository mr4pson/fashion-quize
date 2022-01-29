import { Button } from "antd";
import classNames from "classnames";
import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Page, paths } from "routes/constants";
import { ReactComponent as FbIcon } from "./../../../assets/icons/ic-fb.svg";
import { ReactComponent as InstIcon } from "./../../../assets/icons/ic-inst.svg";
import { ReactComponent as Logo } from "./../../../assets/icons/logo.svg";
import s from "./Header.module.scss";

const Header: FC = () => {
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    const onScroll = () => setIsActive(!!window.pageYOffset);

    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const getClassNames = (isActive: boolean) => {
    return classNames({
      [s["header"]]: true,
      [s["header--active"]]: isActive,
    });
  };

  return (
    <div className={getClassNames(isActive)}>
      <div className="container">
        <div className={s["header__content"]}>
          <Link to={paths[Page.HOME]}>
            <Logo className={s["header__logo"]} />
          </Link>
          <div className={s["header__actions"]}>
            <div className={s["header__links"]}>
              <InstIcon className={s["header__link"]} />
              <FbIcon className={s["header__link"]} />
            </div>
            <Link to={paths[Page.LOGIN]}>
              <Button className={s["header__login-btn"]}>Войти</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
