import { TCompilation } from "components/pages/StylistPage/CompilationsPage/types";
import React, { memo } from "react";
import IncreasePageButton from "../common/IncreasePageButton";
import PageHeader from "../common/PageHeader";
import ImageSlider from "../ImageSlider";
import CompilationCard from "./CompilationCard";
import CompilationCardSkeleton from "./CompilationCardSkeleton";
import styles from "./CompilationsPage.module.scss";
import { COMPILATION_CARD_SKELETON_NUMBER } from "./constants";

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
  return (
    <>
      <div className={styles["compilations-page"]}>
        <PageHeader
          title={"Список подборок"}
          elementsNumberLabel={'Выберитие понравившиеся луки из подборки. Подтвердите свой выбор с помощью кнопки «Подтвердить выбор».'}
        />
        <div className={styles["compilations-page__body"]}>
          {props.compilations?.map((compilation, index) => (
            <CompilationCard
              key={`compilation-card-${index}`}
              compilation={compilation}
            />
          ))}
          {props.compilations?.length === 0 && !props.loading && (
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
      {Object.keys(props.activeCompilation).length ? (
        <ImageSlider
          activeLookIndex={props.activeLookIndex}
          compilation={props.activeCompilation}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default memo(CompilationsPage);
