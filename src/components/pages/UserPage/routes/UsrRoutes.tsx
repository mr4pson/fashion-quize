import React from "react";

import { getUserRoutes } from "./routes";
import UsrRoute from "./UsrRoute";

const UsrRoutes: React.FC = () => {

  return (
    <>
      {getUserRoutes().map((route) => (
        <UsrRoute key={route.type} exact={route.exact} path={route.path} isPrivate={false}>
          {route.component}
        </UsrRoute>
      ))}
    </>
  );
};

export default UsrRoutes;
