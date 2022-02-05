import { Button, Form } from "antd";
import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";

import { EQuize } from "common/types/types";
import { Footer, Header } from "components/modules";
import { TRootState, useAppDispatch } from "redux/ReduxStore";
import { quizeThunks, setSex, setStateAnswers } from "redux/slicers/quizePageSlice";
import { checkIfHeaderVisible, getNextQuestionLink, getPrevQuestionLink } from "./helper";
import QuizeHeader from "./QuizeHeader";
import { TQuizeHeaderConfig } from "./QuizeHeader/types";
import s from "./QuizePage.module.scss";
import { paths, QUIZE_TYPE, QzPage, SECTION_NUMBER } from "./routes/constants";
import QuizeRoutes from "./routes/QuizeRoutes";

const QuizePage: FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { pathname } = useLocation();
  const { blocks, answers, baseFields, sex } = useSelector((state: TRootState) => state.quizePage);

  const pathSections = pathname.split("/");
  const quizeType = pathSections[2] as EQuize;
  const sectionNumber = Number.isNaN(+pathSections[3]) ? 0 : +pathSections[3];
  const currentBlock = sectionNumber ? blocks[sectionNumber - 1] : undefined;

  const getQuizeHeaderConfig = (): TQuizeHeaderConfig => {
    let config = {} as TQuizeHeaderConfig;
    switch (pathname) {
      case paths[QzPage.BASE]:
        config = {
          title: "Ваши данные",
          description: "Укажите ваши основные идентификационные данные.",
          backUrl: undefined,
          currentSectionNumber: 1,
          sectionLength: blocks?.length + 2,
        };
        break;
      case paths[QzPage.SEX]:
        config = {
          title: "Выберите ваш пол",
          description: "Укажите для кого нашим стилистам необходимо подобрать образы.",
          backUrl: paths[QzPage.BASE],
          currentSectionNumber: 2,
          sectionLength: blocks?.length + 2,
        };
        break;
      default:
        config = {
          title: currentBlock?.title,
          description: undefined,
          backUrl: sectionNumber === 1 ? paths[QzPage.SEX] : getPrevQuestionLink(sectionNumber ?? 0, quizeType),
          currentSectionNumber: (sectionNumber ?? 0) + 2,
          sectionLength: blocks?.length + 2,
        };
        break;
    }
    return config;
  };

  useEffect(() => {
    if (quizeType && currentBlock) {
      dispatch(quizeThunks.getQuestionBlocksByQuizeType(quizeType));
    } else {
      dispatch(quizeThunks.getQuestionBlocksByQuizeType(EQuize.FOR_WOMEN));
    }
  }, [dispatch, quizeType]);

  useEffect(() => {
    if (currentBlock) dispatch(quizeThunks.setCurrentBlock(currentBlock));
  }, [dispatch, blocks, currentBlock]);

  useEffect(() => {
    return () => {
      dispatch(quizeThunks.clearAnswers());
    };
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const onFinish = async (form) => {
    switch (pathname) {
      case paths[QzPage.BASE]:
        const response: any = await dispatch(quizeThunks.checkEmail(form.email));
        if (!response || !response.status) return;
        dispatch(quizeThunks.setBaseFields(form));
        history.push(paths[QzPage.SEX]);
        break;

      case paths[QzPage.SEX]:
        dispatch(setSex(form.sex.type));
        history.push(paths[QzPage.ROUTE].replace(QUIZE_TYPE, form.sex.path).replace(SECTION_NUMBER, "1"));
        break;

      default:
        const currentAnswers = { ...answers, ...form };
        dispatch(setStateAnswers(currentAnswers));
        if (+sectionNumber === blocks.length) {
          const payload = { ...baseFields, sex, data: JSON.stringify(currentAnswers) };
          await dispatch(quizeThunks.registrateUser(payload));
          dispatch(quizeThunks.clearAnswers());
          history.push(paths[QzPage.COMPLETE]);
          return;
        }
        history.push(getNextQuestionLink(+sectionNumber, quizeType));
        break;
    }
  };

  return (
    <>
      <Header />
      <div className={s["quize-page"]}>
        <div className={s["quize-page__ctr"]}>
          {checkIfHeaderVisible(pathname) && <QuizeHeader {...getQuizeHeaderConfig()} />}
          <div className={s["quize-form"]}>
            <Form onFinish={onFinish} labelAlign="left">
              <div className={s["quize-form__body"]}>
                <QuizeRoutes />
              </div>
              <div className={s["quize-form__btn"]}>
                <Button type="primary" size="large" htmlType="submit">
                  Далее
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default QuizePage;
