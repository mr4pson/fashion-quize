import classnames from "classnames";
import { memo } from "react";
import { Page, paths, QUESTION_NUMBER, QUIZE_TYPE } from "routes/constants";
import { sexs } from "./constants";
import styles from "./SexPage.module.scss";
import { Link } from "react-router-dom";

const SexPage: React.FC = () => {
  return (
    <div className={styles["sex-page"]}>
      <div className={styles["sex-page__title"]}>Выберите ваш пол</div>
      <div className={styles["sex-page__body"]}>
        {sexs.map((sex) => (
          <Link key={sex.path} to={paths[Page.QUIZE_ROUTE].replace(QUIZE_TYPE, sex.path).replace(QUESTION_NUMBER, '1')}>
            <div
              className={classnames(
                styles["sex-page__item"],
                styles[sex.path]
              )}
            >
              <div className={styles["sex-item__wrapper"]}>
                <div className={styles["sex-item__icon"]}>{sex.icon}</div>
                <div className={styles["sex-item__title"]}>{sex.label}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default memo(SexPage);
