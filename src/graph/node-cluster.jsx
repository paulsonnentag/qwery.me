'use strict';

var React = require('react');
var d3 = require('d3');
var _ = require('lodash');
var Node = require('./node.jsx');

module.exports = React.createClass({
  getDefaultProps: function () {
    return {
      gravity: 0.07,
      charge: -150,
      radius: 50,
      items: [],
      onSelect: _.noop
    };
  },

  getInitialState: function () {
    return {
      nodes: []
    };
  },

  componentDidMount: function () {
    _.bindAll(this, ['updateNodes']);

    this.layout = d3.layout.force()
      .on('tick', this.updateNodes);
  },

  componentWillReceiveProps: function (props) {
    this.layout
      .gravity(props.gravity)
      .charge(props.charge)
      .size([props.width, props.height])
      .nodes(_.extend([], props.items))
      .start()
  },

  componentWillUnmount: function () {
    this.layout.stop();
  },

  updateNodes: function () {
    var nodes = this.layout.nodes();
    this.resolveCollisions(nodes);
    this.setState({nodes: nodes})
  },

  resolveCollisions: function (nodes) {
    var self = this;
    var qTree = d3.geom.quadtree(nodes);

    _.each(nodes, function (node) {
      qTree.visit(self.collide(node))
    });
  },

  collide: function collide(node) {
    var self = this;
    var r = (node.radius || self.props.radius) + 16,
      nx1 = node.x - r,
      nx2 = node.x + r,
      ny1 = node.y - r,
      ny2 = node.y + r;
    return function (quad, x1, y1, x2, y2) {
      if (quad.point && (quad.point !== node)) {
        var x = node.x - quad.point.x,
          y = node.y - quad.point.y,
          l = Math.sqrt(x * x + y * y),
          r = (node.radius || self.props.radius) + (quad.point.radius || self.props.radius);
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
  },

  render: function () {
    var self = this;

    return <g>
      { _.map(this.state.nodes, function (node) {
        return <Node
          name={node.name}
          x={node.x}
          y={node.y}
          radius={self.props.radius}
          key={node.id}
          onClick={_.partial(self.props.onSelect, node)} />
      })}
    </g>;
  }
});


