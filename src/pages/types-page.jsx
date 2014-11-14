'use strict';

var React = require('react');

module.exports = React.createClass({
  render: function () {
    return <h1>Domain: {this.props.params.id}</h1>
  }
});