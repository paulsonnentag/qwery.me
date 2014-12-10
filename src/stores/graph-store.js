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

  onAddNode: function (node, type, parent) {
    var graph = this.graph;

    node.id = _.uniqueId();

    if (!parent) {
      graph.pivot = node;
      graph.nodes = [node];
      graph.links = [];

    } else {
      graph.nodes.push(node);
      graph.links.push({
        source: node,
        target: parent,
        type: type
      });
    }

    this.trigger(graph);
  }
});
