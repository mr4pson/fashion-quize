import { Modal } from "antd";
import { TCompilation } from "components/pages/StylistPage/CompilationsPage/types";
import React, { memo, useState } from "react";
import { useAppDispatch } from "redux/ReduxStore";
import { compilationsThunks } from "redux/slicers/compilationsPageSlice";
import IncreasePageButton from "../common/IncreasePageButton";
import PageHeader from "../common/PageHeader";
import ImageSlider from "../ImageSlider";
import CompilationCard from "./CompilationCard";
import CompilationCardSkeleton from "./CompilationCardSkeleton";
import styles from "./CompilationsPage.module.scss";
import {
  COMPILATION_CARD_SKELETON_NUMBER,
  initialSelectedLooks,
} from "./constants";
import { getRatingClassNames } from "./helpers";

type TProps = {
  compilations: TCompilation[];
  loading: boolean;
  visible: boolean;
  selectedLooks: boolean[];
  isIncreasePageBtnVisible: boolean;
  currentCompilation: TCompilation | undefined;
  activeCompilation: TCompilation;
  activeLookIndex: number;
  increaseCompilationPage: () => void;
  setVisible: (visibility) => void;
  setSelectedLooks: (selectedLooks: boolean[]) => void;
  setCurrentCompilation: (compilation: TCompilation | undefined) => void;
};

const CompilationsPage: React.FC<TProps> = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const showModal = (id: number): void => {
    props.setSelectedLooks(initialSelectedLooks);
    props.setVisible(true);

    const compilation = props.compilations.find(
      (compilation) => compilation.id === id
    );
    props.setCurrentCompilation(compilation);
  };

  const handleCancel = (): void => {
    props.setVisible(false);
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
      <div className={styles["compilations-page"]}>
        <PageHeader title={"Список подборок"} />
        <div className={styles["compilations-page__body"]}>
          {props.compilations?.map((compilation, index) => (
            <CompilationCard
              key={`compilation-card-${index}`}
              compilation={compilation}
              showModal={showModal}
            />
          ))}
          {props.compilations.length === 0 && !props.loading && (
            <div className={styles["tasks-page__no-data"]}>
              Список подборок пуст
            </div>
          )}
          {props.loading &&
            [...Array(COMPILATION_CARD_SKELETON_NUMBER)].map((num, index) => (
              <CompilationCardSkeleton key={`skeleton-${index}`} />
            ))}
          {props.isIncreasePageBtnVisible && (
            <IncreasePageButton onClick={props.increaseCompilationPage} />
          )}
        </div>
      </div>
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
              className={getRatingClassNames(isSelected, styles)}
              onClick={() => handleChangeSelectedLooks(index)}
            >
              {index + 1}
            </div>
          ))}
        </div>
      </Modal>
      {Object.keys(props.activeCompilation).length ? (
        <ImageSlider
          activeLookIndex={props.activeLookIndex}
          compilation={props.activeCompilation}
        />
      ) : <></>}
    </>
  );
};

export default memo(CompilationsPage);
