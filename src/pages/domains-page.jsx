'use strict';

var React = require('react');
var Router = require('react-router');
var data = require('../stores/data');
var Graph = require('../ui/graph.jsx');
var Node = require('../ui/node.jsx');
var ContainerSizeMixin = require('../mixins/container-size-mixin');

module.exports = React.createClass({
  mixins: [Router.Navigation, ContainerSizeMixin],

  getInitialState: function () {
    return {
      domains: []
    }
  },

  componentDidMount: function () {
    var self = this;

    data.getJSON('/data/domains.json').then(function (domains) {
      self.setState({domains: domains});
    });
  },

  selectDomain: function (domain) {
    this.transitionTo('domain', {splat: domain.id.slice(1)});
  },

  render: function () {
    var container = this.state.container;

    return (
      <svg ref="container" className="page">
      {
        container ?
          <Graph width={container.width} height={container.height}
            nodes={this.state.domains}>
            <Node bind="nodes" onSelect={this.selectDomain}/>
          </Graph>
          :
          null
      }
      </svg>
    );
  }
});