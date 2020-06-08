import React from 'react';
import PropTypes from 'prop-types';
import routeUrlProvider, {
  EXAMPLE_TODO_LIST,
  EXAMPLE_COUNTER,
  EXAMPLE_GITHUB_USER_LIST,
  EXAMPLE_FINAL_FORM,
  EXAMPLE_PATTERN_HOC,
  EXAMPLE_PATTERN_RENDER_PROPS
} from 'constants/route-paths';
import { Route } from 'react-router-dom';
import Counter from './pages/Counter';
import UserList from './pages/UserList';
import Todo from './pages/Todo';
import FinalForm from './pages/FinalForm';
import Example from './index';
import Pattern_HOC from './pages/Pattern/Hoc';
import PatternRenderProps from './pages/Pattern/RenderProps';

const RouterPropTypes = {
  match: PropTypes.object
};

const Router = ({ match }) => {
  return (
    <>
      <Route exact path={`${match.path}`} component={Example} />
      <Route
        exact
        path={`${match.path}${routeUrlProvider.getForRoute(EXAMPLE_TODO_LIST)}`}
        component={Todo}
      />
      <Route
        exact
        path={`${match.path}${routeUrlProvider.getForRoute(
          EXAMPLE_GITHUB_USER_LIST
        )}`}
        component={UserList}
      />
      <Route
        exact
        path={`${match.path}${routeUrlProvider.getForRoute(EXAMPLE_COUNTER)}`}
        component={Counter}
      />
      <Route
        exact
        path={`${match.path}${routeUrlProvider.getForRoute(
          EXAMPLE_FINAL_FORM
        )}`}
        component={FinalForm}
      />
      <Route
        exact
        path={`${match.path}${routeUrlProvider.getForRoute(
          EXAMPLE_PATTERN_HOC
        )}`}
        component={Pattern_HOC}
      />
      <Route
        exact
        path={`${match.path}${routeUrlProvider.getForRoute(
          EXAMPLE_PATTERN_RENDER_PROPS
        )}`}
        component={PatternRenderProps}
      />
    </>
  );
};

Router.propTypes = RouterPropTypes;

export default Router;
