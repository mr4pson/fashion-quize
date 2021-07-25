import { FC, useEffect } from "react";
import { useSelector } from "react-redux";

import { TypeRootState, useAppDispatch } from "redux/ReduxStore";
import { tasksThunks } from "redux/slicers/tasksPageSlice";
import TasksPage from "./TasksPage";

const TasksPageContainer: FC = () => {
  const dispatch = useAppDispatch();
  const tasks = useSelector((state: TypeRootState) => state.tasksPage.tasks);

  useEffect(() => {
    dispatch(tasksThunks.getTasks());

    return () => dispatch(tasksThunks.clearTasks());
  }, [dispatch]);

  return <TasksPage tasks={tasks} />;
};

export default TasksPageContainer;
