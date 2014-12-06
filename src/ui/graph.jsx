'use strict';

var React = require('react/addons');
var d3 = require('d3');
var _ = require('lodash');
var bindComponents = require('../utils/bind-components');

module.exports = React.createClass({
  getDefaultProps: function () {
    return {
      gravity: 0.07,
      charge: -150,
      radius: 50,
      nodes: [],
      links: []
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
      .nodes(nodes)
      .start();
  },

  componentWillUnmount: function () {
    this.layout.stop();
  },

  updateNodes: function () {
    var nodes = this.layout.nodes();

    this.resolveCollisions(nodes);
    this.setState({
      nodes: nodes
    });
  },

  resolveCollisions: function (nodes) {
    var qTree = d3.geom.quadtree(nodes);

    _.each(nodes, function (node) {
      qTree.visit(collide(node));
    });
  },

  render: function () {
    return (
      <g className="graph">{bindComponents(this.props.children, this.state)}</g>
    );
  }
});


function collide(node) {
  var r = node.radius + 16;
  var nx1 = node.x - r;
  var nx2 = node.x + r;
  var ny1 = node.y - r;
  var ny2 = node.y + r;

  return function (quad, x1, y1, x2, y2) {
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
  };
}