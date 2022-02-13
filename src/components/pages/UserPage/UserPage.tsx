import { FC } from "react";
import { useHistory } from "react-router";

import { getJwtPair } from "common/helpers/auth-helpers";
import { getUserInfo } from "common/helpers/common-helpers";
import { ETheme, EUser } from "common/types/types";
import { Footer } from "components/modules";
import Header from "./Header";
import UserRoutes from "./routes/UsrRoutes";
import styles from "./UserPage.module.scss";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { TRootState } from "redux/ReduxStore";

const UserPage: FC = () => {
  const history = useHistory();

  const { theme } = useSelector((state: TRootState) => state.theme);

  (async () => {
    const jwtPair = await getJwtPair();
    const userInfo = await getUserInfo();
    if (!jwtPair || userInfo?.role !== EUser.USER) {
      history.push("/login");
    }
  })();

  const getUserPageBodyClassNames = (theme: ETheme) => {
    return classNames({
      [styles["user-page__body"]]: true,
      [styles["user-page__body--dark"]]: theme === ETheme.DARK,
    });
  };

  return (
    <div className={styles["user-page"]}>
      <Header />
      <div className={getUserPageBodyClassNames(theme)}>
        <div className="container">
          <UserRoutes />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserPage;
