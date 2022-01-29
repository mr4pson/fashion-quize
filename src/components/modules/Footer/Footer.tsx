import { memo } from "react";
import { Link } from "react-router-dom";
import { Page, paths } from "routes/constants";
import styles from "./Footer.module.scss";
import { ReactComponent as Logo } from "./../../../assets/icons/logo.svg";
import { getLinkToQiuze } from "components/pages/HomePage/helper";
import { BMixin, Button } from "../Button";
import { ReactComponent as FbIcon } from "./../../../assets/icons/ic-fb.svg";
import { ReactComponent as InstIcon } from "./../../../assets/icons/ic-inst.svg";

function Footer(): JSX.Element {
  return (
    <div className={styles["footer"]}>
      <div className="container">
        <div className={styles["footer__logo-wraper"]}>
          <Link to={paths[Page.HOME]}>
            <Logo className={styles["footer__logo"]} />
          </Link>
        </div>
        <div className={styles["footer__center"]}>
          <div className={styles["footer__info"]}>
            <div className={styles["footer__col"]}>
              <div className={styles["footer__connect-item"]}>Eyelish@mail.ru</div>
              <div className={styles["footer__connect-item"]}>+7 (900) 999-99-99</div>
              <div className={styles["footer__social-links"]}>
                <Link to={""}>
                  <InstIcon className={styles["footer__social-link"]} />
                </Link>
                <Link to={""}>
                  <FbIcon className={styles["footer__social-link"]} />
                </Link>
              </div>
            </div>
            <div className={styles["footer__col"]}>
              <div className={styles["footer__nav-item"]}>Главная</div>
              <div className={styles["footer__nav-item"]}>Как мы работаем?</div>
              <div className={styles["footer__nav-item"]}>Вопросы & ответы</div>
            </div>
          </div>
          <div className={styles["recieve-compilation"]}>
            <h3 className={styles["recieve-compilation__title"]}>
              Получите подборку образов
            </h3>
            <div className={styles["recieve-compilation__desc"]}>
              Заполните анкету и получите первую подборку образов от вашего
              онлайн стилиста
            </div>
            <div className={styles["recieve-compilation__btn"]}>
              <Link to={getLinkToQiuze()}>
                <Button mixin={[BMixin.FLEX, BMixin.PRIMARY]}>
                  Заполнить анкету
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className={styles["footer__copyright"]}>©Eyelish 2021. Все права защищены.</div>
      </div>
    </div>
  );
}

export default memo(Footer);
