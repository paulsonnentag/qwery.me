'use strict';

var _ = require('lodash');
var React = require('react/addons');
var Reflux = require('reflux');
var graphStore = require('../stores/graph-store');
var actions = require('../actions');
var data = require('../stores/data');
var getElementSizeMixin = require('../mixins/element-size-mixin');

var Graph = require('../ui/graph.jsx');
var Node = require('../ui/node.jsx');
var Link = require('../ui/link.jsx');

module.exports = React.createClass({
  mixins: [
    Reflux.connect(graphStore, 'graph'),
    getElementSizeMixin(['page'])
  ],

  getInitialState: function () {
    return {
      graph: graphStore.graph,
      selectedNode: null
    };
  },

  componentDidMount: function () {

    function getNode (node) {
      node.id = _.uniqueId();
      return node;
    }

    var movie = getNode({name: 'Movie', type: 'Movie'});
    var actor1 = getNode({name: 'Person', type: 'Person'});
    var actor2 = getNode({name: 'Person', type: 'Person'});

    actions.addNode(movie);
    actions.addNode(actor1);
    actions.addNode(actor2);

    actions.addLink(actor1, 'ACTS_IN', movie);
    actions.addLink(actor2, 'ACTS_IN', movie);
  },

  selectNode: function (node) {
    var self = this;

    this.setState({
      selectedNode: node,
      properties: []
    });
  },

  unselectNode: function () {
    this.setState({
      selectedNode: null
    });
  },

  render: function () {
    var page = this.state.size.page;

    return (
      <div className="query-page" ref="page">
      {
        page ?
          <Graph width={page.width} height={page.height}
                 nodes={this.state.graph.nodes}
                 links={this.state.graph.links}
                 gravity={0}
                 charge={-1000}>
          </Graph>
          :
          null
      }
      </div>
    );
  }
});