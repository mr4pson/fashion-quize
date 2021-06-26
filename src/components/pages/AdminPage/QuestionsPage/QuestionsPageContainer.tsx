import { Modal, Tabs } from "antd";
import { QuizeTypes } from "common/types/type";
import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { thunks } from "redux/reducers/questionsPageSlice";
import { TypeRootState } from "redux/ReduxStore";
import { AdmPage, paths } from "../routes/constants";
import QuestionsPage from "./QuestionsPage";

const { TabPane } = Tabs;

const QuestionsPageContainer: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { quizeType } = useParams() as any;

  const questionState = useSelector((state: TypeRootState) => ({
    questions: state.questionsPage.questions,
  }));
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [questionId, setQuestionId] = useState<number | null>(null);
  const [curQuizeType, setCurQuizeType] = useState<QuizeTypes>(quizeType);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleDelete = () => {
    setConfirmLoading(true);

    dispatch(thunks.removeQuestion(questionId!, quizeType));

    setVisible(false);
    setConfirmLoading(false);
  };

  const onQuestionRemove = (id: number) => {
    setQuestionId(id);
    showModal();
  };

  useEffect(() => {
    dispatch(thunks.getQuestionsByQuizeType(quizeType));
  }, [dispatch, quizeType]);

  const handleQuizeTypeChange = (tabKey) => {
    setCurQuizeType(tabKey);
    history.push(`${paths[AdmPage.QUESTIONS]}/${tabKey}`);
  };

  return (
    <>
      <Tabs defaultActiveKey={quizeType} onChange={handleQuizeTypeChange}>
        <TabPane tab="Опрос для мужчин" key={QuizeTypes.FOR_MEN}>
          <QuestionsPage
            questions={questionState.questions}
            onQuestionRemove={onQuestionRemove}
            quizeType={curQuizeType}
          />
        </TabPane>
        <TabPane tab="Опрос для женщин" key={QuizeTypes.FOR_WOMEN}>
          <QuestionsPage
            questions={questionState.questions}
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

export default memo(QuestionsPageContainer);
