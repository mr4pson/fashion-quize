import React, { memo } from "react";
import { Redirect, Route, useLocation } from "react-router-dom";

import { paths, QzPage } from "./constants";

type Props = {
  path: string;
  exact?: boolean;
  children: React.ReactNode;
  isPrivate?: boolean;
};

const QuizeRoute: React.FC<Props> = ({ path, exact, children }) => {
  const location = useLocation();

  function hasRedirect(): boolean {
    return `${location.pathname}` === paths[QzPage.EMPTY];
  }

  if (hasRedirect()) {
    return (
      // TODO change to diff default
      <Redirect
        to={{
          pathname: paths[QzPage.BASE],
        }}
      />
    );
  }

  return (
    <Route path={path} exact={exact}>
      {children}
    </Route>
  );
};

export default memo(QuizeRoute);
