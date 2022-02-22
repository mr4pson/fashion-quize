import { Button } from "antd";
import { FC } from "react";
import { HashLink as Link } from "react-router-hash-link";

import { getLinkToQiuze } from "components/pages/HomePage/helper";
import { Page, paths } from "routes/constants";
import { ReactComponent as FbIcon } from "./../../../assets/icons/ic-fb.svg";
import { ReactComponent as InstIcon } from "./../../../assets/icons/ic-inst.svg";
import { ReactComponent as Logo } from "./../../../assets/icons/logo.svg";
import s from "./Footer.module.scss";
import { mobileNavItems } from "./constants";

const Footer: FC = () => {
  return (
    <div className={s["footer"]}>
      <div className="container">
        <div className={s["footer__logo-wraper"]}>
          <Link to={paths[Page.HOME]}>
            <Logo className={s["footer__logo"]} />
          </Link>
        </div>
        <div className={s["footer__center"]}>
          <div className={s["footer__info"]}>
            <div className={s["footer__col"]}>
              <div className={s["footer__connect-item"]}>Eyelish@mail.ru</div>
              <div className={s["footer__connect-item"]}>
                +7 (993) 201-34-53
              </div>
              <div className={s["footer__social-links"]}>
                <a href="https://instagram.com/eyelish.ru" target="_blank">
                  <InstIcon className={s["footer__social-link"]} />
                </a>
                <Link to={""}>
                  <FbIcon className={s["footer__social-link"]} />
                </Link>
              </div>
            </div>
            <ul className={s["footer__col"]}>
              {mobileNavItems.map((mobileNavItem, index) => (
                <li
                  key={index}
                  className={s["footer__nav-item"]}
                >
                  <Link to={mobileNavItem.path}>{mobileNavItem.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className={s["recieve-compilation"]}>
            <h3 className={s["recieve-compilation__title"]}>
              Получите подборку образов
            </h3>
            <div className={s["recieve-compilation__desc"]}>
              Заполните анкету и получите первую подборку образов от вашего
              онлайн стилиста
            </div>
            <Link to={getLinkToQiuze()}>
              <Button className={s["recieve-compilation__btn"]} type="primary">
                Заполнить анкету
              </Button>
            </Link>
          </div>
        </div>
        <div className={s["footer__copyright"]}>
          ©Eyelish 2021. Все права защищены.
        </div>
      </div>
    </div>
  );
};

export default Footer;
