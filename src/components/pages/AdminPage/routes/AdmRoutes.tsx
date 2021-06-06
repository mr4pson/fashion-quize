import React, { memo } from "react";
// import { useUser } from 'core/app';
import AdmRoute from "./AdmRoute";
import { getAdmRoutes } from "./routes";

const AdmRoutes: React.FC = () => {
  // const { account } = useUser();

  return (
    <>
      {getAdmRoutes().map((route) => (
        <AdmRoute
          key={route.type}
          exact={route.exact}
          path={route.path}
          isPrivate={false}
        >
          {route.component}
        </AdmRoute>
      ))}
    </>
  );
};

export default memo(AdmRoutes);
