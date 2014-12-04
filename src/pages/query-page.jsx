'use strict';

var React = require('react');
var Reflux = require('reflux');
var graphStore = require('../stores/graph-store');
var Graph = require('../ui/graph.jsx');
var PropertyList = require('../ui/property-list.jsx');
var Node = require('../ui/node.jsx');
var data = require('../stores/data');

module.exports = React.createClass({
  mixins: [Reflux.connect(graphStore, 'graph')],

  getInitialState: function () {
    return {
      graph: graphStore.graph,
      selectedNode: null
    };
  },

  selectNode: function (node) {
    var self = this;

    this.setState({
      selectedNode: node,
      properties: []
    });

    data.getJSON('/data/' + node.type + '.json').then(function (type) {
      self.setState({properties: type.properties});
    });
  },

  render: function () {
    return (
      <div>
        <h1>Query</h1>
        <svg width={1000} height={1000}>
          <Graph width={1000} height={1000}
            nodes={this.state.graph.nodes}>
            <Node bind="nodes" onSelect={this.selectNode}/>
          </Graph>
          <PropertyList properties={this.state.properties} width={500} height={500}></PropertyList>
        </svg>
      </div>
    );
  }
});
