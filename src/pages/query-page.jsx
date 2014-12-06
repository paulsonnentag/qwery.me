'use strict';

var React = require('react');
var Reflux = require('reflux');
var graphStore = require('../stores/graph-store');
var Graph = require('../ui/graph.jsx');
var PropertyList = require('../ui/property-list.jsx');
var Node = require('../ui/node.jsx');
var data = require('../stores/data');
var getElementSizeMixin = require('../mixins/element-size-mixin');

module.exports = React.createClass({
  mixins: [Reflux.connect(graphStore, 'graph'), getElementSizeMixin(['page'])],

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
    var page = this.state.size.page;

    return (
      <svg className="page" ref="page">
        <PropertyList width={500} height={500} properties={this.state.properties}></PropertyList>
        {
          page ?
            <Graph width={page.width} height={page.height}
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
