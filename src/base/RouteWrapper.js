import React from "react";
import { Route, Switch } from "react-router-dom";

import ScrollToTop from "utils/components/ScrollToTop";
import { routingComponent } from "utils/constant/routingComponent";

const RouteWrapper = () => {
  return (
    <>
      <ScrollToTop>
        <Switch>
          {routingComponent.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              component={route.component}
              exact
            />
          ))}
        </Switch>
      </ScrollToTop>
    </>
  );
};

export default RouteWrapper;
