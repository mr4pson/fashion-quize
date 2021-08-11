import { Modal } from "antd";
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
  const { tasks, loading } = useSelector((state: TRootState) => state.tasksPage);

  const showModal = () => {
    setVisible(true);
  };

  const onTaskCancel = (id: number) => {
    setTaskId(id);
    showModal();
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleDelete = () => {
    setConfirmLoading(true);

    dispatch(tasksThunks.cancelTask(taskId!));

    setVisible(false);
    setConfirmLoading(false);
  };

  useEffect(() => {
    dispatch(tasksThunks.getUserTasks());

    return () => {
      dispatch(tasksThunks.clearTasks());
    };
  }, [dispatch]);

  return (
    <>
      <TasksPage loading={loading} tasks={tasks} onTaskCancel={onTaskCancel} />
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
