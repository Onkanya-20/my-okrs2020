import React from 'react';
import { Route } from 'react-router-dom';
import routeUrlProvider, {
  EXAMPLE,
  HOME as HOME_PATH
} from 'constants/route-paths';
import Home from './pages/Home';
import ExampleRouter from './pages/Example/Router';

const Router = () => {
  return (
    <div>
      <Route
        exact
        path={routeUrlProvider.getForRoute(HOME_PATH)}
        component={Home}
      />
      <Route
        path={routeUrlProvider.getForRoute(EXAMPLE)}
        component={ExampleRouter}
      />
    </div>
  );
};

export default Router;
