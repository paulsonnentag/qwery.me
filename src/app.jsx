'use strict';

var React = window.React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var Routes = Router.Routes;
var DefaultRoute = Router.DefaultRoute;

var QueryPage = require('./pages/query-page.jsx');

React.render(
  <QueryPage/>,
  document.body
);