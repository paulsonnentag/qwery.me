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

  updateNodes: function () {
    //resolveCollisions(this.layout.nodes);
    this.setState({nodes: this.layout.nodes()})
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