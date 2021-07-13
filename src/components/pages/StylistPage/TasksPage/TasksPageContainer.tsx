import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TypeRootState } from "redux/ReduxStore";
import { tasksThunks } from "redux/slicers/tasksPageSlice";
import TasksPage from "./TasksPage";

const BlocksPageContainer: React.FC = () => {
  const dispatch = useDispatch();
  const tasksState = useSelector((state: TypeRootState) => ({
    tasks: state.tasksPage.tasks,
  }));

  useEffect(() => {
    dispatch(tasksThunks.getTasks());
  }, [dispatch]);

  return (
    <>
      <TasksPage tasks={tasksState.tasks} />
    </>
  );
};

export default memo(BlocksPageContainer);
