import { Modal, Tabs } from "antd";
import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";

import { EQuize } from "common/types/types";
import { TRootState, useAppDispatch } from "redux/ReduxStore";
import { questionsThunks } from "redux/slicers/questionsPageSlice";
import { AdmPage, paths } from "../routes/constants";
import QuestionsPage from "./QuestionsPage";

const { TabPane } = Tabs;

const QuestionsPageContainer: FC = () => {
  const history = useHistory();
  const { quizeType } = useParams() as any;

  const dispatch = useAppDispatch();
  const { questions, loading } = useSelector((state: TRootState) => state.questionsPage);

  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [questionId, setQuestionId] = useState<number | null>(null);
  const [curQuizeType, setCurQuizeType] = useState<EQuize>(quizeType);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleDelete = () => {
    setConfirmLoading(true);

    dispatch(questionsThunks.removeQuestion(questionId!, quizeType));

    setVisible(false);
    setConfirmLoading(false);
  };

  const onQuestionRemove = (id: number) => {
    setQuestionId(id);
    showModal();
  };

  useEffect(() => {
    dispatch(questionsThunks.getQuestionsByQuizeType(quizeType));
    return () => {
      dispatch(questionsThunks.clearQuestions());
    };
  }, [dispatch, quizeType]);

  const handleQuizeTypeChange = (tabKey) => {
    setCurQuizeType(tabKey);
    history.push(`${paths[AdmPage.QUESTIONS]}/${tabKey}`);
  };

  return (
    <>
      <Tabs defaultActiveKey={quizeType} onChange={handleQuizeTypeChange}>
        <TabPane tab="Опрос для мужчин" key={EQuize.FOR_MEN}>
          <QuestionsPage
            questions={questions}
            loading={loading}
            onQuestionRemove={onQuestionRemove}
            quizeType={curQuizeType}
          />
        </TabPane>
        <TabPane tab="Опрос для женщин" key={EQuize.FOR_WOMEN}>
          <QuestionsPage
            questions={questions}
            loading={loading}
            onQuestionRemove={onQuestionRemove}
            quizeType={curQuizeType}
          />
        </TabPane>
      </Tabs>
      <Modal
        title="Удаление вопроса"
        visible={visible}
        okText="Удалить"
        cancelText="Отменить"
        onOk={handleDelete}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>Вы точно хотите удалить вопрос №{questionId}?</p>
      </Modal>
    </>
  );
};

export default QuestionsPageContainer;
