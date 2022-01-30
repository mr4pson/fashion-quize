import { Button } from "antd";
import { FC } from "react";
import { Link } from "react-router-dom";

import { getLinkToQiuze } from "components/pages/HomePage/helper";
import { Page, paths } from "routes/constants";
import { ReactComponent as FbIcon } from "./../../../assets/icons/ic-fb.svg";
import { ReactComponent as InstIcon } from "./../../../assets/icons/ic-inst.svg";
import { ReactComponent as Logo } from "./../../../assets/icons/logo.svg";
import s from "./Footer.module.scss";

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
              <div className={s["footer__connect-item"]}>+7 (900) 999-99-99</div>
              <div className={s["footer__social-links"]}>
                <Link to={""}>
                  <InstIcon className={s["footer__social-link"]} />
                </Link>
                <Link to={""}>
                  <FbIcon className={s["footer__social-link"]} />
                </Link>
              </div>
            </div>
            <div className={s["footer__col"]}>
              <div className={s["footer__nav-item"]}>Главная</div>
              <div className={s["footer__nav-item"]}>Как мы работаем?</div>
              <div className={s["footer__nav-item"]}>Вопросы & ответы</div>
            </div>
          </div>
          <div className={s["recieve-compilation"]}>
            <h3 className={s["recieve-compilation__title"]}>Получите подборку образов</h3>
            <div className={s["recieve-compilation__desc"]}>
              Заполните анкету и получите первую подборку образов от вашего онлайн стилиста
            </div>
            <Link to={getLinkToQiuze()}>
              <Button className={s["recieve-compilation__btn"]} type="primary">
                Заполнить анкету
              </Button>
            </Link>
          </div>
        </div>
        <div className={s["footer__copyright"]}>©Eyelish 2021. Все права защищены.</div>
      </div>
    </div>
  );
};

export default Footer;
