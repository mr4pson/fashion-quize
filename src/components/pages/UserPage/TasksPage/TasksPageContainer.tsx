import { Modal } from "antd";
import Footer from "components/modules/Footer";
import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { TRootState, useAppDispatch } from "redux/ReduxStore";
import { tasksThunks } from "redux/slicers/tasksPageSlice";
import TasksPage from "./TasksPage";

const TasksPageContainer: FC = () => {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [taskId, setTaskId] = useState<number | null>(null);

  const dispatch = useAppDispatch();
  const { isIncreasePageBtnVisible, visibleTasks, loading } = useSelector(
    (state: TRootState) => state.tasksPage
  );

  const showModal = (): void => {
    setVisible(true);
  };

  const onTaskCancel = (id: number): void => {
    setTaskId(id);
    showModal();
  };

  const handleCancel = (): void => {
    setVisible(false);
  };

  const handleDelete = (): void => {
    setConfirmLoading(true);

    dispatch(tasksThunks.cancelTask(taskId!));

    setVisible(false);
    setConfirmLoading(false);
  };

  const handleIncreaseTaskPage = (): void => {

    dispatch(tasksThunks.increaseTaskPage());
  }

  useEffect(() => {
    dispatch(tasksThunks.getUserTasks());

    return () => {
      dispatch(tasksThunks.clearTasks());
      dispatch(tasksThunks.resetPageNumber());
    };
  }, [dispatch]);

  return (
    <>
      <TasksPage
        loading={loading}
        tasks={visibleTasks}
        isIncreasePageBtnVisible={isIncreasePageBtnVisible}
        onTaskCancel={onTaskCancel}
        increaseTaskPage={handleIncreaseTaskPage}
      />
      <Modal
        title="Отмена задачи"
        okText="Подтвердить"
        cancelText="Отменить"
        visible={visible}
        confirmLoading={confirmLoading}
        onOk={handleDelete}
        onCancel={handleCancel}
      >
        <p>Вы точно хотите отменить задачу №{taskId}?</p>
      </Modal>
    </>
  );
};

export default TasksPageContainer;
