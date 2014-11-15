'use strict';

var React = require('react');
var Reflux = require('reflux');
var domainsStore = require('../stores/domains-store');


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

  render: function () {
    return <div>
      <h1>Domains</h1>
      <p>{JSON.stringify(this.state.domains)}</p>
    </div>
  }
});