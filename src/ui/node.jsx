'use strict';

var React = require('react');
var TextRect = require('./text-rect.jsx');
var _ = require('lodash');

module.exports = React.createClass({

  selectNode: function (evt) {
    evt.stopPropagation();
    (this.props.onSelect || _.noop)(this.props);
  },

  render: function () {
    return (
      <g key={this.props.id}
        className="node"
        onClick={this.selectNode}
        transform={'translate(' + this.props.x + ',' + this.props.y + ')'}>
        <circle r={this.props.radius} />
        <TextRect maxLength={10} lineHeight="1.2em">{this.props.name}</TextRect>
      </g>
    );
  }
});