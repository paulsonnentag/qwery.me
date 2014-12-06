'use strict';

var React = require('react');
var Reflux = require('reflux');
var graphStore = require('../stores/graph-store');
var Graph = require('../ui/graph.jsx');
var PropertyList = require('../ui/property-list.jsx');
var Node = require('../ui/node.jsx');
var data = require('../stores/data');
var ContainerSizeMixin = require('../mixins/container-size-mixin');

module.exports = React.createClass({
  mixins: [Reflux.connect(graphStore, 'graph'), ContainerSizeMixin],

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
    var container = this.state.container;

    return (
      <svg className="page" ref="container">
        <PropertyList width={500} height={500} properties={this.state.properties}></PropertyList>
        {
          container ?
            <Graph width={container.width} height={container.height}
                   nodes={this.state.graph.nodes}>
              <Node bind="nodes" onSelect={this.selectNode}/>
            </Graph>
            :
            null
          }
      </svg>
    );
  }
});
