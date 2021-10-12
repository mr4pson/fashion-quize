import React, { memo } from "react";
import { Redirect, Route, useLocation } from "react-router-dom";

import { paths, UsrPage } from "./consts";

type Props = {
  path: string;
  exact?: boolean;
  children: React.ReactNode;
  isPrivate?: boolean;
};

const StylistRoute: React.FC<Props> = ({ path, exact, children }) => {
  const location = useLocation();

  function hasRedirect(): boolean {
    return `${location.pathname}` === paths[UsrPage.BASE];
  }

  if (hasRedirect()) {
    return (
      // TODO change to diff default
      <Redirect
        to={{
          pathname: paths[UsrPage.TASKS],
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

export default memo(StylistRoute);
