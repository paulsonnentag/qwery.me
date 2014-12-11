'use strict';

var Reflux = require('reflux');
var actions = require('../actions');
var _ = require('lodash');

module.exports = Reflux.createStore({

  graph: {
    nodes: [],
    links: [],
    pivot: null
  },

  init: function () {
    this.listenToMany(actions);
  },

  onAddNode: function (node, type, parentId) {
    var graph = this.graph;

    node.id = _.isUndefined(node.id) ? _.uniqueId() : node.id;

    if (!parentId) {
      graph.pivot = node;
      graph.nodes = [node];
      graph.links = [];

    } else {
      graph.nodes.push(node);
      graph.links.push({
        source: node,
        target: _.find(graph.nodes, {id: parentId}),
        type: type
      });
    }

    this.trigger(graph);
  }
});
