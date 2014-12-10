'use strict';

var _ = require('lodash');

module.exports = function (refs) {

  return {
    getInitialState: function () {
      return {
        size: {}
      }
    },

    _updateElementSizes: function () {
      this.setState({
        size: _.reduce(refs, this._addElementSize, {}, this)
      });
    },

    _addElementSize: function (size, name) {
      var element;
      var ref = this.refs[name];

      if (ref) {
        element = this.refs[name].getDOMNode();

        size[name] = {
          height: element.clientHeight,
          width: element.clientWidth
        };
      }

      return size;
    },

    componentDidMount: function () {
      this._updateElementSizes();

      this._resizeCallback = _(this._updateElementSizes).bind(this).debounce(100).value();

      window.addEventListener('resize', this._resizeCallback, false);
    },

    componentWillUnmount: function () {
      window.removeEventListener('resize', this._resizeCallback, false);
    }
  }
};