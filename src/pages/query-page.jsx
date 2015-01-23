'use strict';

var _ = require('lodash');
var React = require('react/addons');
var Reflux = require('reflux');
var graphStore = require('../stores/graph-store');
var actions = require('../actions/graph-actions');
var data = require('../stores/data');
var getElementSizeMixin = require('../mixins/element-size-mixin');
var graphLayoutMixin = require('../mixins/graph-layout-mixin');
var Graph = require('../ui/graph.jsx');

module.exports = React.createClass({
  mixins: [
    Reflux.connect(graphStore, 'graph'),
    getElementSizeMixin(['page'])
  ],

  getInitialState: function () {
    return {
      graph: graphStore.graph
    };
  },

  render: function () {
    var page = this.state.size.page;
    var graph = this.state.graph;

    var transforms = [
      graphLayoutMixin.transforms.collisionDetection,
      graphLayoutMixin.transforms.centerNode(graph.selectedNode || graph.pivot)
    ];

    return (
      <div className="query-page" ref="page">
      {
        page ?
          <Graph width={page.width} height={page.height}
                 graph={graph}
                 gravity={0}
                 charge={-1000}
                 transforms={transforms}>
          </Graph>
          :
          null
      }
      </div>
    );
  }
});