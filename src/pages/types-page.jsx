'use strict';

var React = require('react');
var freebase = require('../stores/freebase');
var NodeCluster = require('../graph/node-cluster.jsx');
var Node = require('../graph/node.jsx');

module.exports = React.createClass({

  getInitialState: function () {
      return {
        types: []
      }
  },

  componentDidMount: function () {
    var self = this;

    queryTypes(self.props.params.splat).then(function (response) {
      self.setState({types: response.result});
    });
  },

  selectType: function (type) {
    console.log(type);
  },

  render: function () {
    return <svg width="1000" height="1000">
      <NodeCluster width={1000} height={1000}
        items={this.state.types}
        onSelect={this.selectType}
        Type={Node}/>
    </svg>
  }
});

function queryTypes(domain) {
  return freebase.query([{
    "domain": '/' + domain,
    "id": null,
    "type": "/type/type",
    "name": null
  }]);
}