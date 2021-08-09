import { memo } from "react";
import { FC, useEffect } from "react";
import { useSelector } from "react-redux";

import { TRootState, useAppDispatch } from "redux/ReduxStore";
import { usersThunks } from "redux/slicers/usersPageSlice";
import UsersPage from "./UsersPage";

const UsersPageContainer: FC = () => {
  const dispatch = useAppDispatch();
  const { users, loading } = useSelector((state: TRootState) => state.usersPage);

  useEffect(() => {
    dispatch(usersThunks.getStylistUsers());

    return () => dispatch(usersThunks.clearUsers());
  }, [dispatch]);

  return <UsersPage users={users} loading={loading} />;
};

export default memo(UsersPageContainer);
