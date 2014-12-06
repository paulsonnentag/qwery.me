'use strict';

var _ = require('lodash');

module.exports = {

  updateContainerSize: function () {
    var container = this.refs.container.getDOMNode();

    this.setState({container: {
      height: container.clientHeight,
      width: container.clientWidth
    }});
  },

  componentDidMount: function () {
    var self = this;

    this.updateContainerSize();

    this._resizeCallback = _(this.updateContainerSize)
      .bind(this)
      .debounce(100)
      .value();

    window.addEventListener('resize', this._resizeCallback, false);
  },

  componentWillUnmount: function () {
    window.removeEventListener('resize', this._resizeCallback, false);
  }
};