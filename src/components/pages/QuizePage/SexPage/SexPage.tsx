import { Button } from "antd";
import { memo, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useAppDispatch } from "redux/ReduxStore";
import { setSex } from "redux/slicers/quizePageSlice";
import {
  paths,
  SECTION_NUMBER,
  QUIZE_TYPE,
  QzPage,
} from "../routes/constants";
import { sexsDefault } from "./constants";
import { checkIfSubmitDisable, getSexItemClassNames } from "./helpers";
import styles from "./SexPage.module.scss";
import { ISex } from "./types";

const SexPage: React.FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [sexs, setSexs] = useState<ISex[]>(sexsDefault);

  const handleSexChoice = (sex: ISex): void => {
    setSexs((prev) => {
      const sexs = [...prev];

      sexs.forEach((sex) => {
        sex.isActive = false;
      });

      const currentSex = sexs.find(
        (sexIn) => sex.label === sexIn.label
      ) as ISex;
      currentSex.isActive = true;

      return sexs;
    });
  };

  const handleSubmit = (): void => {
    const activeSex = sexs.find((sex) => sex.isActive) as ISex;

    dispatch(setSex(activeSex.value));

    history.push(
      paths[QzPage.ROUTE]
        .replace(QUIZE_TYPE, activeSex.path)
        .replace(SECTION_NUMBER, "1")
    );
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    return () => {
      setSexs(sexsDefault);
    }
  });

  return (
    <div className={styles["sex-page"]}>
      <div className={styles["sex-page__body"]}>
        {sexs.map((sex) => (
          <div
            className={getSexItemClassNames(sex, styles)}
            key={sex.path}
            onClick={() => handleSexChoice(sex)}
          >
            <div className={styles["sex-item"]}>
              <div className={styles["sex-item__icon"]}>{sex.icon}</div>
              <div className={styles["sex-item__title"]}>{sex.label}</div>
            </div>
          </div>
        ))}
      </div>
      <Button
        htmlType="submit"
        className={styles["sex-page__submit-btn"]}
        disabled={checkIfSubmitDisable(sexs)}
        onClick={handleSubmit}
      >
        Продолжить
      </Button>
    </div>
  );
};

export default memo(SexPage);
