'use strict';

var Reflux = require('reflux');
var actions = require('../actions/graph-actions');
var _ = require('lodash');

var person1 = {type: "Person", id: "1", properties: [{type:"String", "label": "Name", "value": "Brad Pit", "name": "name"}]};
var person2 = {type: "Person", id: "2"};
var movie = {type: "Movie", id: "3", properties: [{type:"Number", "label": "Runtime", "value": 200, "name": "runtime"}]};

module.exports = Reflux.createStore({

  graph: {
    nodes: [person1, person2, movie],
    links: [
      {source: person1, label: "ACTS_IN", target: movie },
      {source: person2, label: "ACTS_IN", target: movie }
    ],
    pivot: movie
  },

  init: function () {
    this.listenToMany(actions);
  },

  onAddNode: function (type, properties) {
    var graph = this.graph;
    var node = {
      id: _.uniqueId(),
      type: type,
      properties: properties || {}
    };

    if (!graph.pivot) {
      graph.pivot = node;
    }

    graph.nodes.push(node);

    this.trigger(graph);

    return node;
  },

  onAddLink: function (source, label, target, properties) {
    var graph = this.graph;

    graph.links.push({
      source: source,
      target: target,
      label: label,
      properties: properties || {}
    });

    this.trigger(graph);
  },

  onSelectNode: function (nodeId) {
    var graph = this.graph;

    if (nodeId === null) {
      graph.selectedNode = null;

    } else {
      graph.selectedNode = _.find(graph.nodes, {id: nodeId});
    }

    this.trigger(graph);
  }
});
