'use strict';

var React = require('react');
var tweenState = require('react-tween-state');
var d3 = require('d3');
var _ = require('lodash');

var diagonal = d3.svg.diagonal()
  .source(function(d) { return {x:d[0].y, y:d[0].x}; })
  .target(function(d) { return {x:d[1].y, y:d[1].x}; })
  .projection(function(d) { return [d.y, d.x]; });

module.exports = React.createClass({
  mixins: [tweenState.Mixin],

  getDefaultProps: function () {
    return {
      textWidth: 175,
      maxSpacing: 40,
      properties: []
    }
  },

  componentDidMount: function () {
    _.bindAll(this, ['selectProperty']);
  },

  componentWillReceiveProps: function (props) {

    if(this.props.properties !== props.properties) {
      this.tweenState('scale', {
        easing: tweenState.easingTypes.linear,
        delay: 200,
        duration: 500,
        beginValue: 0,
        endValue: 1
      });
    }
  },

  selectProperty: function (property, evt) {
    var position = {
      x: event.pageX,
      y: event.pageY
    };

    evt.stopPropagation();

    (this.props.onSelect || _.noop)(property, position);
  },

  getLayout: function () {
    var scale = this.getTweeningValue('scale');
    var n = this.props.properties.length;
    var width = this.props.width;
    var height = this.props.height;
    var maxSpacing = this.props.maxSpacing;
    var textLength = this.props.textWidth;
    var spacingY = Math.min((height / n) * scale, maxSpacing);
    var offsetY = (height - (spacingY * n)) / 2;

    return {
      width: (width - textLength) * scale,
      spacingY: spacingY,
      offsetY: offsetY
    }
  },

  render: function () {
    var self = this;
    var layout = this.getLayout();
    var start = {
      x: 0,
      y: this.props.height / 2
    };

    return (
      <g>
          {_.map(this.props.properties, function (property, i) {
            var end = {
              x: layout.width,
              y: i * layout.spacingY + layout.offsetY
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