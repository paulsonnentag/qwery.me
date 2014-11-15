'use strict';

var React = require('react');

module.exports = React.createClass({
  render: function () {
   return <g key={this.props.key} className="node"
             transform={'translate('+ this.props.x + ',' + this.props.y + ')'}>
     <circle r={this.props.radius} fill="red" />
     <text>{this.props.name}</text>
   </g>
  }
});