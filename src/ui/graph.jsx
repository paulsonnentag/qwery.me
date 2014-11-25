'use strict';

var React = require('react/addons');
var d3 = require('d3');
var _ = require('lodash');

module.exports = React.createClass({
  getDefaultProps: function () {
    return {
      gravity: 0.07,
      charge: -150,
      data: {}
    };
  },

  getInitialState: function () {
    return {
      nodeGroups: {}
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
      .nodes(this.getNodes(props.data))
      .start();
  },

  getNodes: function (graph) {
    var nodeIndex = getNodeIndex(this.layout.nodes());

    return _(graph)
      .map(getGroupsNodes)
      .flatten(true)
      .value();

    function getNodeIndex (nodes) {
      return _.reduce(nodes, function (index, node) {
        index[node.id] = node;
        return index;
      }, {});
    }

    function getGroupsNodes (group, groupId) {
      return _.map(group.nodes, function (node) {
        var prevNode = nodeIndex[node.id];

        if (prevNode) {
          return prevNode;
        }

        return _.extend({
          id: node.id,
          group: groupId,
          radius: group.radius,
          data: node
        });
      });
    }
  },

  componentWillUnmount: function () {
    this.layout.stop();
  },

  updateNodes: function () {
    var nodeGroups;
    var nodes = this.layout.nodes();

    this.resolveCollisions(nodes);
    nodeGroups = _.groupBy(nodes, 'group');
    this.setState({nodeGroups: nodeGroups});
  },

  resolveCollisions: function (nodes) {
    var self = this;
    var qTree = d3.geom.quadtree(nodes);

    _.each(nodes, function (node) {
      qTree.visit(self.collide(node));
    });
  },

  collide: function collide(node) {
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
  },

  render: function () {
    var self = this;
    var children = _.isArray(this.props.children) ? this.props.children : [this.props.children];

    return <g>{ _.map(children, function (protoNode) {
      var nodes = self.state.nodeGroups[protoNode.props.group];

      if (_.isUndefined(nodes)) {
        return <g/>;
      }

      return _.map(nodes, function (node) {
        return React.addons.cloneWithProps(protoNode, node);
      });
    })}</g>;
  }
});