import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { LinksPage } from './LinksPage';
import { CreatePage } from './CreatePage';
import { DetailPage } from './DetailPage';
import { AuthPage } from './AuthPage';


export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/links" exact component={LinksPage} />
        <Route path="/create" exact component={CreatePage} />
        <Route path="/detail/:id" component={DetailPage} />
        <Redirect to="/create" />
      </Switch>
    );
  }

  return (
    <Switch>
        <Route path="/" component={AuthPage} />
        <Redirect to="/" />
    </Switch>
  );
};
