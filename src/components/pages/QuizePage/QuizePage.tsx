import classNames from "classnames";
import { EQuize } from "common/types/types";
import Footer from "components/modules/Footer";
import Header from "components/modules/Header";
import { FC, memo, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { TRootState, useAppDispatch } from "redux/ReduxStore";
import { quizeThunks } from "redux/slicers/quizePageSlice";
import { checkIfHeaderVisible, getPrevQuestionLink } from "./helper";
import QuizeHeader from "./QuizeHeader";
import { TQuizeHeaderConfig } from "./QuizeHeader/types";
import styles from "./QuizePage.module.scss";
import { paths, QzPage } from "./routes/constants";
import QuizeRoutes from "./routes/QuizeRoutes";

type TProps = {};

const QuizePage: FC<TProps> = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { blocks } = useSelector((state: TRootState) => state.quizePage);

  const pathSections = location.pathname.split("/");
  const quizeType = pathSections[2] as EQuize;
  const sectionNumber = Number.isNaN(+pathSections[3])
    ? undefined
    : +pathSections[3];
  const currentBlock = sectionNumber ? blocks[sectionNumber - 1] : undefined;

  useEffect(() => {
    if (quizeType && currentBlock) {
      dispatch(quizeThunks.getQuestionBlocksByQuizeType(quizeType));
      return;
    }
    dispatch(quizeThunks.getQuestionBlocksByQuizeType(EQuize.FOR_WOMEN));
  }, [dispatch, quizeType]);

  useEffect(() => {
    if (currentBlock) {
      dispatch(quizeThunks.setCurrentBlock(currentBlock));
    }
  }, [dispatch, blocks, currentBlock]);

  useEffect(() => {
    return () => {
      dispatch(quizeThunks.clearAnswers());
    };
  }, [dispatch]);

  const getQuizeHeaderConfig = (): TQuizeHeaderConfig => {
    let config = {} as TQuizeHeaderConfig;
    switch (location.pathname) {
      case paths[QzPage.BASE]:
        config = {
          title: "Ваши данные",
          description: "Укажите ваши основные идентификационные данные",
          backUrl: undefined,
          currentSectionNumber: 1,
          sectionLength: blocks?.length + 2,
        };
        break;
      case paths[QzPage.SEX]:
        config = {
          title: "Выберите ваш пол",
          description: undefined,
          backUrl: paths[QzPage.BASE],
          currentSectionNumber: 2,
          sectionLength: blocks?.length + 2,
        };
        break;
      default:
        config = {
          title: currentBlock?.title,
          description: undefined,
          backUrl:
            sectionNumber === 1
              ? paths[QzPage.SEX]
              : getPrevQuestionLink(sectionNumber ?? 0, quizeType),
          currentSectionNumber: (sectionNumber ?? 0) + 2,
          sectionLength: blocks?.length + 2,
        };
        break;
    }
    return config;
  };

  return (
    <>
      <Header />
      <div className={classNames(styles["quize-page"], "quize-page")}>
        <div className={classNames("container", styles["container"])}>
          <div className={styles["quize-page__blank"]}>
            {checkIfHeaderVisible(location) && (
              <QuizeHeader {...getQuizeHeaderConfig()} />
            )}
            <QuizeRoutes />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default memo(QuizePage);
