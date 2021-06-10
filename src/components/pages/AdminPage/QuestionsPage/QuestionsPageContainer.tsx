import { Modal } from "antd";
import React, { useEffect } from "react";
import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunks } from "redux/reducers/questionsPageReducer";
import { TypeAppState } from "redux/ReduxStore";
import QuestionsPage from "./QuestionsPage";

const QuestionsPageContainer: React.FC = () => {
  const dispatch = useDispatch();

  const questionState = useSelector((state: TypeAppState) => ({
    questions: state.questionsPage.questions,
  }));
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [questionId, setQuestionId] = React.useState<number | null>(null);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleDelete = async () => {
    setConfirmLoading(true);

    await dispatch(thunks.removeQuestion(questionId!));

    setVisible(false);
    setConfirmLoading(false);
  };

  const onQuestionRemove = (id: number) => {
    setQuestionId(id);
    showModal();
  }

  useEffect(() => {
    dispatch(thunks.getQuestions());
  }, [dispatch]);

  return (
    <>
      <QuestionsPage questions={questionState.questions} onQuestionRemove={onQuestionRemove} />
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

