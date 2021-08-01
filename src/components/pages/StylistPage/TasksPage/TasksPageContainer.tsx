import { FC, useEffect } from "react";
import { useSelector } from "react-redux";

import { TypeRootState, useAppDispatch } from "redux/ReduxStore";
import { tasksThunks } from "redux/slicers/tasksPageSlice";
import TasksPage from "./TasksPage";

const TasksPageContainer: FC = () => {
  const dispatch = useAppDispatch();
  const { tasks, loading } = useSelector(
    (state: TypeRootState) => state.tasksPage
  );

  useEffect(() => {
    dispatch(tasksThunks.getTasks());

    return () => dispatch(tasksThunks.clearTasks());
  }, [dispatch]);

  return <TasksPage tasks={tasks} loading={loading}/>;
};

export default TasksPageContainer;
