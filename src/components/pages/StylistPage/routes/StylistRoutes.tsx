import React, { memo } from "react";
// import { useUser } from 'core/app';
import StylistRoute from "./StylistRoute";
import { getStylistRoutes } from "./routes";

const AdmRoutes: React.FC = () => {
  // const { account } = useUser();

  return (
    <>
      {getStylistRoutes().map((route) => (
        <StylistRoute
          key={route.type}
          exact={route.exact}
          path={route.path}
          isPrivate={false}
        >
          {route.component}
        </StylistRoute>
      ))}
    </>
  );
};

export default memo(AdmRoutes);
