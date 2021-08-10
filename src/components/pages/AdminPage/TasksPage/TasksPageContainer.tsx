import { FC, useEffect } from "react";
import { useSelector } from "react-redux";

import { TRootState, useAppDispatch } from "redux/ReduxStore";
import { tasksThunks } from "redux/slicers/tasksPageSlice";
import TasksPage from "./TasksPage";

const TasksPageContainer: FC = () => {
  const dispatch = useAppDispatch();
  const { loading, tasks } = useSelector((state: TRootState) => state.tasksPage);

  useEffect(() => {
    dispatch(tasksThunks.getTasks());

    return () => dispatch(tasksThunks.clearTasks());
  }, [dispatch]);

  return <TasksPage tasks={tasks} loading={loading} />;
};

export default TasksPageContainer;
