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
      <div key={this.props.id}
        className="node-container"
        onClick={this.selectNode}
        style={{WebkitTransform: 'translate(' + this.props.x + 'px, ' + this.props.y + 'px)'}}>
        <div className="node">
          <div className="label">{this.props.name}</div>
          <div className="inner-node">
          </div>
        </div>
      </div>
    );
  }
});