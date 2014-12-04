'use strict';

var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');
var data = require('../stores/data');
var Graph = require('../ui/graph.jsx');
var Node = require('../ui/node.jsx');

module.exports = React.createClass({
  mixins: [Router.Navigation],

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
    return (
      <svg width={1000} height={1000}>
        <Graph width={1000} height={1000}
          nodes={this.state.domains}>
          <Node bind="nodes" onSelect={this.selectDomain}/>
        </Graph>
      </svg>
    );
  }
});