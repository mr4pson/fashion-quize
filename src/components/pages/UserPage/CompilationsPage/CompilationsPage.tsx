import { Button, Card, Image, Modal, Table } from "antd";
import classNames from "classnames";
import { getImageUrl } from "common/helpers/common-helpers";
import { TCompilation } from "components/pages/StylistPage/CompilationsPage/types";
import React, { memo } from "react";
import { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useAppDispatch } from "redux/ReduxStore";
import { compilationsThunks } from "redux/slicers/compilationsPageSlice";
import styles from "./CompilationsPage.module.scss";
import {
  checkIfRateIsAccessible,
  getColumns,
  initialSelectedLooks,
} from "./constants";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

type TProps = {
  compilations: TCompilation[];
  loading: boolean;
  visible: boolean;
  setVisible: any;
  selectedLooks: boolean[];
  setSelectedLooks: any;
  currentCompilation: TCompilation | undefined;
  setCurrentCompilation: any;
};

const CompilationsPage: React.FC<TProps> = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const dataSource = props.compilations?.map((compilation) => ({
    ...compilation,
    key: compilation.id,
    status: compilation.task.status,
    user: compilation.task.user,
  }));

  const showModal = (id: number): void => {
    props.setSelectedLooks(initialSelectedLooks);
    props.setVisible(true);

    const compilation = props.compilations.find(
      (compilation) => compilation.id === id
    );
    props.setCurrentCompilation(compilation);
  };

  const columns = getColumns(styles, showModal);

  const handleCancel = () => {
    props.setVisible(false);
  };

  const getClassNames = (isSelected) => {
    return classNames({
      [styles["rating__item"]]: true,
      [styles["rating__item--active"]]: isSelected,
    });
  };

  const getMobileLookClassNames = (isSelected) => {
    return classNames({
      [styles["mobile-look"]]: true,
      [styles["mobile-look--selected"]]: isSelected,
    });
  };

  const handleChangeSelectedLooks = (index) => {
    const selLooks = [...props.selectedLooks];
    selLooks[index] = !selLooks[index];
    props.setSelectedLooks(selLooks);
  };

  const checkIfNoneIsSelected = (): boolean => {
    return !!props.selectedLooks.find((selLook) => selLook);
  };

  const handleSendLookRatings = async () => {
    const looks = props.currentCompilation?.looks.map((look, index) => ({
      id: look.id,
      selected: props.selectedLooks[index],
    }));
    const payload = {
      taskId: props.currentCompilation?.task.id,
      looks: JSON.stringify(looks),
    };

    setIsLoading(true);
    await dispatch(compilationsThunks.rateCompilation(payload));
    setIsLoading(false);
    dispatch(compilationsThunks.getUserCompilations());
    props.setVisible(false);
  };

  return (
    <>
      <Card
        loading={props.loading}
        title={
          <div className={styles["header"]}>
            <h2 className={styles["title"]}>Список Подборок</h2>
          </div>
        }
        bordered={false}
      >
        <div className={styles["mobile-compilations"]}>
          {props.compilations?.map((compilation) => (
            <div
              key={"compilation" + compilation.id}
              className={styles["compilation"]}
            >
              <div className={styles["compilation__head"]}>
                <div className={styles["compilation__id"]}>
                  {compilation.id}
                </div>
                <div className={styles["compilation__status"]}>
                  {compilation.task.status.title}
                </div>
                {/* <div className={styles["compilation__task"]}><b>ID задачи:</b> {task.id}</div> */}
              </div>
              <div className={styles["compilation__looks"]}>
                {compilation.looks?.length &&
                  compilation.looks.map((look) => (
                    <div
                      className={getMobileLookClassNames(look.selected)}
                      key={look.id}
                    >
                      {look.selected === true && (
                        <CheckCircleOutlined
                          className={styles["mobile-look__selected-icon"]}
                        />
                      )}
                      {look.selected === false && (
                        <CloseCircleOutlined
                          className={
                            styles["mobile-look__not-selected-icon"]
                          }
                        />
                      )}
                      {look.items.map((item) => (
                        <div
                          className={styles["mobile-look-item"]}
                          key={item.id}
                        >
                          <Image
                            className={styles["mobile-look-item__photo"]}
                            width={86}
                            height={75}
                            src={getImageUrl(item.photo)}
                          />
                          <div className={styles["mobile-look-item__name"]}>
                            {item.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
              </div>
              {checkIfRateIsAccessible(compilation.task.status.title) && (
                <div className={styles["compilation__rate"]}>
                  <Button
                    className={styles["compilation__rate-btn"]}
                    type="primary"
                    onClick={() => showModal(compilation.id)}
                  >
                    Выбрать подборки
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
        <PerfectScrollbar className={styles["desktop-compilations"]}>
          <Table columns={columns} dataSource={dataSource} />
        </PerfectScrollbar>
      </Card>
      <Modal
        title="Выберите понравившиеся подборки"
        visible={props.visible}
        okText={!checkIfNoneIsSelected() ? "Ни один не понравился" : "Выбрать"}
        cancelText="Отменить"
        onOk={handleSendLookRatings}
        confirmLoading={isLoading}
        onCancel={handleCancel}
        className="rating-modal"
      >
        <div className={styles["rating"]}>
          {props.selectedLooks.map((isSelected, index) => (
            <div
              key={"rating" + index}
              className={getClassNames(isSelected)}
              onClick={() => handleChangeSelectedLooks(index)}
            >
              {index + 1}
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
};

export default memo(CompilationsPage);
