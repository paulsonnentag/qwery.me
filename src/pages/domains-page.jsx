'use strict';

var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');
var freebase = require('../stores/freebase');
var Graph = require('../ui/graph.jsx');
var Node = require('../ui/node.jsx');

module.exports = React.createClass({
  mixins: [Router.Navigation],

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

  selectDomain: function (domain) {
    this.transitionTo('domain', {splat: domain.id.slice(1)});
  },

  render: function () {
    var graph = {
      domains: {
        radius: 50,
        nodes: this.state.domains
      }
    };

    return <svg width={1000} height={1000}>
      <Graph data={graph} width={1000} height={1000}>
        <Node group="domains" onSelect={this.selectDomain}/>
      </Graph>
    </svg>;
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