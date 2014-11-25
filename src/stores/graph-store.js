'use strict';

var Reflux = require('reflux');
var actions = require('../actions');
var _ = require('lodash');

module.exports = Reflux.createStore({
  init: function () {
    this.graph = {
      nodes: [],
      links: [],
      pivot: null
    };

    this.listenToMany(actions);
  },

  onAddNode: function (node, type, parentId) {
    var graph = this.graph;

    node.id = _.uniqueId();

    graph.nodes.push(node);

    if (!this.pivot) {
      this.pivot = node;
    }

    if (type && parentId) {
      graph.links.push({
        source: node,
        target: _.find(graph.nodes, {id: parentId}),
        type: type
      });
    }

    this.trigger(graph);
  }
});
