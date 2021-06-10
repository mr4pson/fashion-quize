import { Modal, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunks } from "redux/reducers/questionsPageReducer";
import { TypeAppState } from "redux/ReduxStore";
import QuestionsPage from "./QuestionsPage";
import { QuizeTypes } from "common/types/type";
import { useHistory, useParams } from "react-router";
import { AdmPage, paths } from "../routes/constants";

const { TabPane } = Tabs;

const QuestionsPageContainer: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { quizeType } = useParams() as any;

  const questionState = useSelector((state: TypeAppState) => ({
    questions: state.questionsPage.questions,
  }));
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [questionId, setQuestionId] = React.useState<number | null>(null);
  const [curQuizeType, setCurQuizeType] = useState<QuizeTypes>(quizeType);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleDelete = async () => {
    setConfirmLoading(true);

    await dispatch(thunks.removeQuestion(questionId!, quizeType));

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
