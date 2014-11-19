'use strict';

var React = window.React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var Routes = Router.Routes;
var DefaultRoute = Router.DefaultRoute;

var DomainsPage = require('./pages/domains-page.jsx');
var TypesPage = require('./pages/types-page.jsx');
var QueryPage = require('./pages/query-page.jsx');

React.render(
  <Routes location="history">
    <DefaultRoute handler={DomainsPage} />
    <Route name="domain" path="domain/*" handler={TypesPage}/>
    <Route name="query" handler={QueryPage} />
  </Routes>,
  document.body
);