import React, { memo } from "react";
import { Redirect, Route, useLocation } from 'react-router-dom';
import { AdmPage, paths } from "./constants";

type Props = {
  path: string;
  exact?: boolean;
  children: React.ReactNode;
  isPrivate?: boolean;
};

const AdmRoute: React.FC<Props> = ({ path, exact, children }) => {
  const location = useLocation();

  function hasRedirect(): boolean {
    return `${location.pathname}` === paths[AdmPage.BASE];
  }

  if (hasRedirect()) {
    return (
      <Redirect
        to={{
          pathname: paths[AdmPage.BLOCKS],
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

export default memo(AdmRoute);
