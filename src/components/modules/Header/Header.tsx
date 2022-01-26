import classNames from "classnames";
import { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Page, paths } from "routes/constants";

import { BMixin, Button } from "..";
import { ReactComponent as FbIcon } from "./../../../assets/icons/ic-fb.svg";
import { ReactComponent as InstIcon } from "./../../../assets/icons/ic-inst.svg";
import { ReactComponent as Logo } from "./../../../assets/icons/logo.svg";
import styles from "./Header.module.scss";

function Header(): JSX.Element {
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    const onScroll = () => setIsActive(!!window.pageYOffset);

    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const getClassNames = (isActive: boolean) => {
    return classNames({
      [styles["header"]]: true,
      [styles["header--active"]]: isActive,
    });
  };

  return (
    <div className={getClassNames(isActive)}>
      <div className="container">
        <div className={styles["header__content"]}>
          <Link to={paths[Page.HOME]}>
            <Logo className={styles["header__logo"]} />
          </Link>
          <div className={styles["header__actions"]}>
            <div className={styles["header__links"]}>
              <InstIcon className={styles["header__link"]} />
              <FbIcon className={styles["header__link"]} />
            </div>
            <div className={styles["header__login-btn"]}>
              <Link to={paths[Page.LOGIN]}>
                <Button mixin={[BMixin.FLEX, BMixin.SECONDARY]}>Войти</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Header);
