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
        size: this._getElementSizes()
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

    _getElementSizes: function () {
      return _.reduce(refs, this._addElementSize, {}, this)
    },

    _hasSizeChanged: function (size, ref) {
      var oldSize = this.state.size[ref];
      return oldSize.width !== size.width || oldSize.height !== size.height;
    },

    componentDidMount: function () {
      this._updateElementSizes();

      this._resizeCallback = _(this._updateElementSizes).bind(this).debounce(10).value();

      window.addEventListener('resize', this._resizeCallback, false);
    },

    componentDidUpdate: function () {
      var size = this._getElementSizes();

      if (_.some(size, this._hasSizeChanged, this)) {
        this.setState({size: size});
      }
    },

    componentWillUnmount: function () {
      window.removeEventListener('resize', this._resizeCallback, false);
    }
  }
};
