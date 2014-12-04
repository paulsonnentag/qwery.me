'use strict';

var React = require('react');
var Reflux = require('reflux');
var graphStore = require('../stores/graph-store');
var Graph = require('../ui/graph.jsx');
var Node = require('../ui/node.jsx');

module.exports = React.createClass({
  mixins: [Reflux.connect(graphStore, 'graph')],

  getInitialState: function () {
    return {
      graph: graphStore.graph
    };
  },

  render: function () {
    return (
    <div>
      <h1>Query</h1>
      <svg width={1000} height={1000}>
        <Graph width={1000} height={1000}
               nodes={this.state.graph.nodes}>
          <Node bind="nodes"/>
        </Graph>
      </svg>
    </div>);
  }
});
