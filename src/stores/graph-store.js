'use strict';

var Reflux = require('reflux');
var actions = require('../actions');
var _ = require('lodash');

module.exports = Reflux.createStore({

  graph: {
    nodes: [{name: 'Artist', type: '/music/artist', id: _.uniqueId()}],
    links: [],
    pivot: null
  },

  init: function () {

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
