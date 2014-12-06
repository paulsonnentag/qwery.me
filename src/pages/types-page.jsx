'use strict';

var React = require('react');
var Router = require('react-router');
var data = require('../stores/data');
var Graph = require('../ui/graph.jsx');
var Node = require('../ui/node.jsx');
var ContainerSizeMixin = require('../mixins/container-size-mixin');
var actions = require('../actions');

module.exports = React.createClass({
  mixins: [Router.Navigation, ContainerSizeMixin],

  getInitialState: function () {
    return {
      types: []
    }
  },

  componentDidMount: function () {
    var self = this;
    var domain = self.props.params.splat;

    data.getJSON('/data/' + domain + '/types.json').then(function (types) {
      self.setState({types: types});
    });
  },

  selectType: function (type) {
    actions.addNode({
      name: type.name,
      type: type.id
    });

    this.transitionTo('query', {});
  },

  render: function () {
    var container = this.state.container;

    return (
      <svg className="page" ref="container">
      {
        container ?
          <Graph width={container.width} height={container.height}
            nodes={this.state.types}>
            <Node bind="nodes" onSelect={this.selectType}/>
          </Graph>
          :
          null
      }
      </svg>
    );
  }
});