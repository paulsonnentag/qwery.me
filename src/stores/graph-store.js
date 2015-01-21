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

    if (!graph.pivot) {
      graph.pivot = node;
    }

    graph.nodes.push(node);

    this.trigger(graph);
  },

  onAddLink: function (source, label, target, properties) {
    var graph = this.graph;

    graph.links.push({
      source: source,
      target: target,
      label: label,
      properties: properties
    });

    this.trigger(graph);
  }
});
