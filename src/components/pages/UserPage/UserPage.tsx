import React from "react";
import { useHistory } from "react-router";

import { getUserInfo } from "common/helpers/common-helpers";
import { userType } from "common/types/type";
import { getJwtPair } from "../AdminPage/helpers";
import styles from "./UserPage.module.scss";


const UserPage: React.FC = () => {
  const history = useHistory();

  (async () => {
    const jwtPair = await getJwtPair();
    const userInfo = await getUserInfo();
    if (!jwtPair || userInfo.role !== userType.USER) {
      // history.push("/login");
    }
  })();

  return (
    <div className={styles['user-page']}>
      <h1>User page</h1>
    </div>
  );
};

export default UserPage;