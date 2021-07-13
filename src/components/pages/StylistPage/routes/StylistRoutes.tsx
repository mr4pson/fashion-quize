import React from "react";

import { getStylistRoutes } from "./routes";
// import { useUser } from 'core/app';
import StylistRoute from "./StylistRoute";

const StylistRoutes: React.FC = () => {
  // const { account } = useUser();

  return (
    <>
      {getStylistRoutes().map((route) => (
        <StylistRoute key={route.type} exact={route.exact} path={route.path} isPrivate={false}>
          {route.component}
        </StylistRoute>
      ))}
    </>
  );
};

export default StylistRoutes;
