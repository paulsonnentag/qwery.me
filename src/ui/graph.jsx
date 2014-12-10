'use strict';

var React = require('react/addons');
var d3 = require('d3');
var _ = require('lodash');
var bindComponents = require('../utils/bind-components');

var transforms = {
  collisionDetection: function (layout, nodesTree, node) {
    var r = node.radius + 16;
    var nx1 = node.x - r;
    var nx2 = node.x + r;
    var ny1 = node.y - r;
    var ny2 = node.y + r;

    nodesTree.visit(function (quad, x1, y1, x2, y2) {
      if (quad.point && (quad.point !== node)) {
        var x = node.x - quad.point.x,
          y = node.y - quad.point.y,
          l = Math.sqrt(x * x + y * y),
          r = node.radius + quad.point.radius;
        if (l < r) {
          l = (l - r) / l * .5;
          node.x -= x *= l;
          node.y -= y *= l;
          quad.point.x += x;
          quad.point.y += y;
        }
      }
      return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
    });

    return node;
  },

  centerNode: function (centerNode) {
    return function (layout, nodesTree, node) {
      var size;

      if (centerNode && node.id === centerNode.id) {
        size = layout.size();
        node.x += ((size[0] / 2) - node.x) * layout.alpha();
        node.y += ((size[1] / 2) - node.y) * layout.alpha();
      }

      return node;
    }
  },

  selectNode: function (selectedNode) {
    var offset = 200 - selectedNode.radius;

    return function (layout, nodesTree, node) {
      var size = layout.size();
      var alpha = layout.alpha();
      var a;
      var limit;

      if (node.id === selectedNode.id) {
        node.x += (offset - node.x) * alpha;
        node.y += ((size[1] / 2) - node.y) * alpha;

      } else {
        // math stuff
        limit = 100;

        if (node.x > limit) {
          node.x += (limit - node.x) * alpha;
        }
      }

      return node;
    };
  }
};

var Graph = React.createClass({
  statics: {
    transforms: transforms
  },

  getDefaultProps: function () {
    return {
      gravity: 0.07,
      charge: -150,
      radius: 50,
      linkDistance: 175,
      nodes: [],
      links: [],
      transforms: [transforms.collisionDetection]
    };
  },

  getInitialState: function () {
    return {
      nodes: [],
      links: []
    };
  },

  componentDidMount: function () {
    _.bindAll(this, ['updateNodes']);

    this.layout = d3.layout.force()
      .on('tick', this.updateNodes);

    this.componentWillReceiveProps(this.props);
  },

  componentWillReceiveProps: function (props) {
    var nodes = _.map(props.nodes, setNodeDefaults);

    function setNodeDefaults (node) {
      node.radius = props.radius;
      return node;
    }

    this.layout
      .gravity(props.gravity)
      .charge(props.charge)
      .size([props.width, props.height])
      .linkDistance(props.linkDistance)
      .links(props.links)
      .nodes(nodes)
      .start();
  },

  componentWillUnmount: function () {
    this.layout.stop();
  },

  updateNodes: function () {
    var nodes = this.layout.nodes();

    nodes = applyTransforms(this.props.transforms, this.layout);
    this.layout.nodes(nodes);
    this.setState({
      nodes: nodes,
      links: this.layout.links()
    });
  },

  render: function () {
    return (
      <g>{bindComponents(this.props.children, this.state)}</g>
    );
  }
});

function applyTransforms (transforms, layout) {
  var nodes = layout.nodes();
  var nodesTree = d3.geom.quadtree(nodes);

  var fns = _.map(transforms, function (transform) {
    return _.partial(transform, layout, nodesTree)
  });

  return _.map(nodes, _.compose.apply(null, fns));
}

module.exports = Graph;