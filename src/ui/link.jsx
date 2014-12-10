'use strict';

var React = require('react');

module.exports = React.createClass({
  render: function () {
    return (
      <line className="link"
            x1={this.props.source.x} y1={this.props.source.y}
            x2={this.props.target.x} y2={this.props.target.y} />
    );
  }
});