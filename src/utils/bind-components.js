'use strict';

var React = require('react/addons');
var _ = require('lodash');

module.exports = bindComponents;

function bindComponents (components, data) {
  if (!_.isArray(components)) {
    components = [components]
  }

  return _.map(components, _.partial(bindComponent, data));
}

function bindComponent (data, component) {
  var key = component.props.bind;

  if (!key) {
    return component
  }

  if (!data[key]) {
    return null
  }

  return _.map(data[key], _.partial(cloneComponent, component));
}

function cloneComponent (component, data) {
  return React.addons.cloneWithProps(component, data)
}