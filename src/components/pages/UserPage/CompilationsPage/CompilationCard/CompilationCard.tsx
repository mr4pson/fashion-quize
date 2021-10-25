import { Button } from "antd";
import classNames from "classnames";
import { TCompilation } from "components/pages/StylistPage/CompilationsPage/types";
import moment from "moment";
import { memo } from "react";
import styles from "./CompilationCard.module.scss";
import { getCompilationCardBodyClassNames } from "./constants";
import { checkIfRateIsAccessible } from "./helper";
import Look from "./Look";

type Props = {
  compilation: TCompilation;
  showModal: (id: number) => void;
};

const CompilationCard: React.FC<Props> = ({ compilation, showModal }) => {
  return (
    <div className={styles["compilation-card"]}>
      <div className={styles["compilation-card__header"]}>
        <div className={styles["compilation-card__info"]}>
          <div className={styles["compilation-card__number"]}>
            {compilation.id}
          </div>
          <div className={styles["compilation-card__params"]}>
            <div className={styles["compilation-card__type"]}>
              Подборка задачи №{compilation.task.id}
            </div>
            <div className={styles["compilation-card__date"]}>
              {moment(compilation.createdAt).format("DD.MM.YYYY")}
            </div>
          </div>
        </div>
        <div
          className={classNames(
            styles["compilation-card__status"],
            styles["compilation-card__status--on-way"]
          )}
        >
          {compilation.task.status.title}
        </div>
      </div>
      <div
        className={getCompilationCardBodyClassNames(
          !checkIfRateIsAccessible(compilation.task.status.title),
          styles
        )}
      >
        <div className={styles["compilation-card__looks"]}>
          {compilation.looks?.length &&
            compilation.looks.map((look, index) => (
              <Look
                key={`look-${index}`}
                compilation={compilation}
                look={look}
                index={index}
              />
            ))}
        </div>
        {checkIfRateIsAccessible(compilation.task.status.title) && (
          <Button
            className={styles["compilation-card__rate-btn"]}
            type="link"
            onClick={() => showModal(compilation.id)}
          >
            Выбрать подборки
          </Button>
        )}
      </div>
    </div>
  );
};

export default memo(CompilationCard);
