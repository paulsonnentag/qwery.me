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
    getElementSizeMixin(['graph', 'properties'])
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
    var graph = this.state.size.graph;

    var transforms = [
      Graph.transforms.centerNode(this.state.graph.pivot),
      Graph.transforms.collisionDetection
    ];

    return (
      <div onClick={this.unselectNode}>
        <svg className="layout-full-size" ref="graph">
        {
          graph ?
            <Graph width={graph.width} height={graph.height}
              nodes={this.state.graph.nodes}
              links={this.state.graph.links}
              gravity={0}
              charge={-1000}
              transforms={transforms}>
              <Link bind="links" />
              <Node bind="nodes" onSelect={this.selectNode}/>
            </Graph>
            :
            null
        }
        </svg>
      </div>
    );
  }
});