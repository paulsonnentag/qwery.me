'use strict';

var React = require('react');
var d3 = require('d3');
var _ = require('lodash');

var diagonal = d3.svg.diagonal()
  .source(function(d) { return {x:d[0].y, y:d[0].x}; })
  .target(function(d) { return {x:d[1].y, y:d[1].x}; })
  .projection(function(d) { return [d.y, d.x]; });

module.exports = React.createClass({

  getDefaultProps: function () {
    return {
      properties: []
    }
  },

  render: function () {
    var props = this.props;
    var start = {
      x: 0,
      y: props.width / 2
    };

    var spaceY = this.props.height / props.properties.length;

    return (
      <g>
          {_.map(this.props.properties, function (property, i) {

            var end = {
              x: props.width,
              y: i * spaceY
            };

            return (
              <g className="property">
                <path d={diagonal([start, end])}/>
                <text dx={5} x={end.x} y={end.y}>{property.name}</text>
              </g>
            )
          })}
      </g>);
  }
});