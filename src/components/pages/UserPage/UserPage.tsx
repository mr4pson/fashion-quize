import React, { memo } from "react";
import { useHistory } from "react-router";

import { getUserInfo } from "common/helpers/common-helpers";
import { userType } from "common/types/type";
import styles from "./UserPage.module.scss";
import { getJwtPair } from "common/helpers/auth-helpers";
import UserRoutes from "./routes/UsrRoutes";
import Header from "./Header";

const UserPage: React.FC = () => {
  const history = useHistory();

  (async () => {
    const jwtPair = await getJwtPair();
    const userInfo = await getUserInfo();
    if (!jwtPair || userInfo?.role !== userType.USER) {
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

export default memo(UserPage);
