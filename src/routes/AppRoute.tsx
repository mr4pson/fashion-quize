import React, { memo } from "react";
import { Route } from "react-router-dom";

type Props = {
  path: string;
  exact?: boolean;
  children: React.ReactNode;
  isPrivate?: boolean;
};

const AppRoute: React.FC<Props> = ({ path, exact, children }) => {
  return (
    <Route path={path} exact={exact}>
      {children}
    </Route>
  );
};

export default memo(AppRoute);
