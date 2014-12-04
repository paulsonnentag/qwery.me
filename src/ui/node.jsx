'use strict';

var React = require('react');
var TextRect = require('./text-rect.jsx');
var _ = require('lodash');

module.exports = React.createClass({
  
  handleClick: function () {
    (this.props.onSelect || _.noop)(this.props);
  },
  
  render: function () {
    return <g key={this.props.id}
              className="node"
              onClick={this.handleClick}
              transform={'translate(' + this.props.x + ',' + this.props.y + ')'}>
      <circle r={this.props.radius} fill="red" />
      <TextRect maxLength={10} lineHeight="1.2em">{this.props.name}</TextRect>
    </g>
  }
});