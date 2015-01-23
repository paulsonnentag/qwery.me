'use strict';

var React = require('react/addons');
var d3 = require('d3');
var _ = require('lodash');

var Link = require('./link.jsx');
var Node = require('./node.jsx');

var graphLayoutMixin = require('../mixins/graph-layout-mixin');

module.exports  = React.createClass({
  mixins: [graphLayoutMixin],

  render: function () {

    return (
      <div className="graph">
        <svg width={this.props.width} height={this.props.height}>
          {
            _.map(this.state.links, function (props) {
              return <Link {...props}/>;
            })
          }
        </svg>
        {
          _.map(this.state.nodes, function (props) {
            return <Node {...props}/>;
          })
        }
      </div>
    );
  }
});
