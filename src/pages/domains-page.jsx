'use strict';

var React = require('react');
var Reflux = require('reflux');
var freebase = require('../stores/freebase');
var NodeCluster = require('../graph/node-cluster.jsx');
var Node = require('../graph/node.jsx');

module.exports = React.createClass({
  mixins: [Reflux.ListenerMixin],

  getInitialState: function () {
    return {
      domains: []
    }
  },

  componentDidMount: function () {
    var self = this;

    queryDomains().then(function (response) {
      self.setState({domains: response.result});
    });
  },

  selectDomain: function (node) {
    console.log(node);
  },

  render: function () {
    return <svg width="1000" height="1000">
      <NodeCluster width={800} height={800}
                   items={this.state.domains}
                   onSelect={this.selectDomain}
                   Type={Node}/>
    </svg>
  }
});

function queryDomains () {
  return freebase.query([{
    "id": null,
    "name": null,
    "type": "/type/domain",
    "!/freebase/domain_category/domains": {
      "id": "/category/commons"
    }
  }]);
}