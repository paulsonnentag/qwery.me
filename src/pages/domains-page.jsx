'use strict';

var React = require('react');
var Reflux = require('reflux');
var domainsStore = require('../stores/domains-store');
var NodeCluster = require('../graph/node-cluster.jsx');
var Node = require('../graph/node.jsx');

module.exports = React.createClass({
  mixins: [Reflux.ListenerMixin],

  getInitialState: function () {
    return {
      domains: domainsStore.domains
    }
  },

  componentDidMount: function () {
    this.listenTo(domainsStore, this.onDomainsLoaded);
  },

  onDomainsLoaded: function (domains) {
    this.setState({domains: domains});
  },

  selectDomain: function (node) {
    console.log(node);
  },

  render: function () {
    return <svg width="800" height="800">
      <NodeCluster width={800} height={800}
                   items={this.state.domains}
                   onSelect={this.selectDomain}
                   Type={Node}/>
    </svg>
  }
});