import { Card, Descriptions } from "antd";
import { getUserInfo } from "common/helpers/common-helpers";
import useWindowDimensions from "common/hooks/useWindowDimensions";
import moment from "moment";
import React, { memo } from "react";
import styles from "./ProfilePage.module.scss";

const ProfilePage: React.FC = () => {
  const userInfo = getUserInfo();

  const { width } = useWindowDimensions();

  const getDescriptionCols = (): number => {
    return width < 550 ? 1 : 2;
  }

  return (
    <Card title="Профиль Пользователя" bordered={false}>
      <div className={styles["profile-page"]}>
        <Descriptions size="default" column={getDescriptionCols()}>
          <Descriptions.Item label="Email">{userInfo?.login}</Descriptions.Item>
          <Descriptions.Item label="ФИО">{userInfo?.name}</Descriptions.Item>
          <Descriptions.Item label="Возраст">{userInfo?.age}</Descriptions.Item>
          <Descriptions.Item label="Город">{userInfo?.city}</Descriptions.Item>
          <Descriptions.Item label="Дата регистрации">
            {moment(userInfo?.createdAt).format("DD.MM.yyyy")}
          </Descriptions.Item>
        </Descriptions>
      </div>
    </Card>
  );
};

export default memo(ProfilePage);
