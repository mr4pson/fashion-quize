import classnames from "classnames";
import { memo, useEffect } from "react";
import { Page, paths, QUESTION_NUMBER, QUIZE_TYPE } from "routes/constants";
import { sexs } from "./constants";
import styles from "./SexPage.module.scss";
import { useHistory } from "react-router";
import { Sex } from "./types";
import { useAppDispatch } from "redux/ReduxStore";
import { setSex } from "redux/slicers/quizePageSlice";

const SexPage: React.FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();  

  const handleSexChoice = (sex: Sex) => {
    dispatch(setSex(sex.value));
    history.push(paths[Page.QUIZE_ROUTE].replace(QUIZE_TYPE, sex.path).replace(QUESTION_NUMBER, '1'));
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <div className={styles["sex-page"]}>
      <div className={styles["sex-page__title"]}>Выберите ваш пол</div>
      <div className={styles["sex-page__body"]}>
        {sexs.map((sex) => (
          <div key={sex.path} onClick={() => handleSexChoice(sex)}>
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(SexPage);
