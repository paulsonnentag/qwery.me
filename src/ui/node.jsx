'use strict';

var React = require('react');
var _ = require('lodash');
var PropertyDisplay = require('./property-display.jsx');

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
          <div className="label">{this.props.type}</div>
            {
              _.isEmpty(this.props.properties) ?
                <div className="circle"/>
                :
                <PropertyDisplay properties={this.props.properties}/>
            }
        </div>
      </div>
    );
  }
});