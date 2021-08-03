import { FC } from "react";
import { useHistory } from "react-router";

import { getJwtPair } from "common/helpers/auth-helpers";
import { getUserInfo } from "common/helpers/common-helpers";
import { EUser } from "common/types/types";
import Header from "./Header";
import UserRoutes from "./routes/UsrRoutes";
import styles from "./UserPage.module.scss";

const UserPage: FC = () => {
  const history = useHistory();

  (async () => {
    const jwtPair = await getJwtPair();
    const userInfo = await getUserInfo();
    if (!jwtPair || userInfo?.role !== EUser.USER) {
      history.push("/login");
    }
  })();

  return (
    <div className={styles["user-page"]}>
      <Header />
      <div className={styles["user-page__body"]}>
        <div className="container">
          <UserRoutes />
        </div>
      </div>
    </div>
  );
};

export default UserPage;
