'use strict';

var React = require('react');
var Reflux = require('reflux');
var graphStore = require('../stores/graph-store');
var actions = require('../actions');
var data = require('../stores/data');
var getElementSizeMixin = require('../mixins/element-size-mixin');

var Graph = require('../ui/graph.jsx');
var PropertyList = require('../ui/property-list.jsx');
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
    var artist = {name: 'Artist', type: '/music/artist'};
    var album = {name: 'Album', type: '/music/album'};
    var genre = {name: 'Genre', type: '/music/genre'};
    var subgenre = {name: 'Subgenres', type: '/music/genre'};

    actions.addNode(artist);
    actions.addNode(album, '/music/artist/album', artist);
    actions.addNode(genre, '/music/artist/genre', artist);
    actions.addNode(subgenre, '/music/genre/subgenre', genre);
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
    var graph = this.state.size.graph;
    var properties = this.state.size.properties;

    var transforms = [
      this.state.selectedNode ?
        Graph.transforms.selectNode(this.state.selectedNode)
        :
        Graph.transforms.centerNode(this.state.graph.pivot),

      Graph.transforms.collisionDetection
    ];

    return (
       <div className="layout-full-size">
         <svg className="layout-center-column" ref="properties">
         {
           properties ?
             <PropertyList width={properties.width} height={properties.height}
                           properties={this.state.properties}></PropertyList>
             :
             null
         }
         </svg>
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
