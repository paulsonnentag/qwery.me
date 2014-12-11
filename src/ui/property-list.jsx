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

  componentDidMount: function () {
    _.bindAll(this, ['selectProperty']);
  },

  selectProperty: function (property, evt) {
    evt.stopPropagation();
    (this.props.onSelect || _.noop)(property, evt);
  },

  render: function () {
    var self = this;
    var props = this.props;
    var start = {
      x: 0,
      y: props.height / 2
    };

    var spaceY = (this.props.height) / props.properties.length;

    return (
      <g>
          {_.map(this.props.properties, function (property, i) {

            var end = {
              x: props.width - 175,
              y: i * spaceY + (spaceY / 2)
            };

            return (
              <g className="property">
                <path d={diagonal([start, end])}/>
                <text dx={5}
                      x={end.x} y={end.y}
                      onClick={_.partial(self.selectProperty, property)}>{property.name}</text>
              </g>
            );
          })}
      </g>);
  }
});