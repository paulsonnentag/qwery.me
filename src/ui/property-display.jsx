'use strict';

var React = require('react');
var _ = require('lodash');

module.exports = React.createClass({

  render: function () {
    return (
      <dl key={this.props.id}
          className="property-list">
        {
          _.map(this.props.properties, function (property) {
            return [
              <dt className="label">{property.label}</dt>,
              <dd className="value">{property.value}</dd>
            ];
          })
        }
      </dl>
    );
  }
});