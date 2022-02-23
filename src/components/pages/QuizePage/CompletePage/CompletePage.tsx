import { memo } from "react";
import styles from "./CompletePage.module.scss";
import { Link } from "react-router-dom";
import { Page, paths } from "routes/constants";

type Props = {
  name: string;
  email: string;
};

const CompletePage: React.FC<Props> = (props) => {
  return (
    <div className={styles["complete-page"]}>
      {/* <Header /> */}
      <div className="container">
        <div className={styles["complete-page__body"]}>
          <h1 className={styles["complete-page__title"]}>
            Поздравляем, {props.name}! После прохождения опроса вы были успешно
            зарегистрированы в eyelish.ru.
          </h1>
          <div className={styles["complete-page__desc"]}>
            На вашу почту <b>{props.email}</b> отправлено письмо с паролем от
            личного кабинета. Вы можете <Link to={paths[Page.LOGIN]}><b>пройти авторизацию</b></Link>, воспользовавшись
            данными в этом письме. Предоставленная вами информация строго
            конфиденциальна, не подлежит передаче третьим лицам и используется
            только для работы над вашим стилем.
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(CompletePage);
