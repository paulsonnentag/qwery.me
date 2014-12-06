'use strict';

var React = require('react');
var Router = require('react-router');
var data = require('../stores/data');
var Graph = require('../ui/graph.jsx');
var Node = require('../ui/node.jsx');
var getElementSizeMixin = require('../mixins/element-size-mixin');
var actions = require('../actions');

module.exports = React.createClass({
  mixins: [Router.Navigation, getElementSizeMixin(['page'])],

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
    var page = this.state.size.page;

    return (
      <svg className="page" ref="page">
      {
        page ?
          <Graph width={page.width} height={page.height}
            nodes={this.state.types}>
            <Node bind="nodes" onSelect={this.selectType}/>
          </Graph>
          :
          null
      }
      </svg>
    );
  }
});