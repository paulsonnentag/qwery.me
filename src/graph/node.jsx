'use strict';

var React = require('react');
var TextRect = require('./text-rect.jsx');

module.exports = React.createClass({
  render: function () {
    return <g key={this.props.key}
              className="node"
              onClick={this.props.onClick}
              transform={'translate(' + this.props.x + ',' + this.props.y + ')'}>
      <circle r={this.props.radius} fill="red" />
      <TextRect maxLength={10} lineHeight="1.2em">{this.props.name}</TextRect>
    </g>
  }
});