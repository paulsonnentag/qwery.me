'use strict';

var React = require('react');
var Router = require('react-router');
var freebase = require('../stores/freebase');
var Graph = require('../ui/graph.jsx');
var Node = require('../ui/node.jsx');
var actions = require('../actions');

module.exports = React.createClass({
  mixins: [Router.Navigation],

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
    actions.addNode({
      name: type.name,
      type: type.id
    });

    this.transitionTo('query', {});
  },

  render: function () {
    var graph = {
      types: {
        nodes: this.state.types,
        radius: 50
      }
    };

    return <svg width={1000} height={1000}>
      <Graph data={graph} width={1000} height={1000}>
        <Node group="types" onSelect={this.selectType}/>
      </Graph>
    </svg>;
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