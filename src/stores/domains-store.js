'use strict';

var Reflux = require('reflux');
var freebase = require('./freebase');

module.exports = Reflux.createStore({
  domains: [],

  init: function () {
    var self = this;

    queryDomains().then(function (response) {
      self.domains = response.result;
      self.trigger(response.result);
    });
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