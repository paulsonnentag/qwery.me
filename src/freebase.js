'use strict';

var Promise = require('bluebird');
var _ = require('lodash');
var getJSON = Promise.promisify(d3.json);

module.exports = {
  query: query,
  getDomains: getDomains,
  getTypes: getTypes
};

function query(query) {
  var q = JSON.stringify(query);
  return getJSON('https://www.googleapis.com/freebase/v1/mqlread?query=' + encodeURIComponent(q))
}

function getDomains() {
  return query([{
    "id": null,
    "name": null,
    "type": "/type/domain",
    "!/freebase/domain_category/domains": {
      "id": "/category/commons"
    }
  }]).then(getResult);
}

function getTypes(domain) {
  return query([{
    "domain": domain,
    "id": null,
    "type": "/type/type",
    "name": null
  }]).then(getResult);
}

function getResult (response) {
  return response.result;
}