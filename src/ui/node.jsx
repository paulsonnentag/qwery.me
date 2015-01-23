'use strict';

var React = require('react');
var _ = require('lodash');

module.exports = React.createClass({

  selectNode: function (evt) {
    evt.stopPropagation();

    (this.props.onSelect || _.noop)(this.props.id);
  },

  render: function () {
    var classes = React.addons.classSet({
      'node-container': true,
      'selected': this.props.selected
    });

    return (
      <div key={this.props.id}
        className={classes}
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