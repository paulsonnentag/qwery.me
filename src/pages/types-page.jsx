'use strict';

var React = require('react');
var Router = require('react-router');
var data = require('../stores/data');
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
    var domain = self.props.params.splat;

    data.getJSON('/data/' + domain + '/types.json').then(function (types) {
      self.setState({types: types});
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