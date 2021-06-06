import { memo } from "react";
import styles from "./CompletePage.module.scss";

type Props = {
  answers: Object | {};
};

const CompletePage: React.FC<Props> = (props) => {
  return (
    <div className={styles["complete-page"]}>
      {/* <Header /> */}
      <div className="container">
        <div className={styles["complete-page__body"]}>
          <h1 className={styles["complete-page__title"]}>
            Поздравляем, вы успешно прошли опрос.
          </h1>
          <div className={styles["complete-page__desc"]}>
            Предоставленная вами информация строго конфиденциальна, не подлежит
            передаче третьим лицам и используется только для работы над вашим
            стилем.
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(CompletePage);
