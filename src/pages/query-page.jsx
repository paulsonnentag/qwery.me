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
    var graph = {
      query: {
        radius: 50,
        nodes: this.state.graph.nodes
      }
    };

    return <div>
      <h1>Query</h1>
      <svg width={1000} height={1000}>
        <Graph data={graph} width={1000} height={1000}>
          <Node group="query"/>
        </Graph>
      </svg>
    </div>;
  }
});