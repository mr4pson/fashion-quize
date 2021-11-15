import React from "react";

import { getQuizeRoutes } from "./routes";
import QuizeRoute from "./QuizeRoute";

const QuizeRoutes: React.FC = () => {

  return (
    <>
      {getQuizeRoutes().map((route) => (
        <QuizeRoute key={route.type} exact={route.exact} path={route.path} isPrivate={false}>
          {route.component}
        </QuizeRoute>
      ))}
    </>
  );
};

export default QuizeRoutes;
