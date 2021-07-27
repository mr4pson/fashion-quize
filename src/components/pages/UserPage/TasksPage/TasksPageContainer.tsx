import { Modal } from "antd";
import React, { memo, useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TypeRootState } from "redux/ReduxStore";
import { tasksThunks } from "redux/slicers/tasksPageSlice";
import TasksPage from "./TasksPage";

const TasksPageContainer: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [taskId, setTaskId] = useState<number | null>(null);

  const dispatch = useDispatch();
  const { tasks, loading } = useSelector((state: TypeRootState) => ({
    tasks: state.tasksPage.tasks,
    loading: state.tasksPage.loading,
  }));


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
        okText="Удалить"
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

export default memo(TasksPageContainer);
