'use strict';

var d3 = require('d3');
var when = require('when');

module.exports = {
  query: query
};

function query(query) {
  var q = JSON.stringify(query);
  return getJSON('https://www.googleapis.com/freebase/v1/mqlread?query=' + encodeURIComponent(q))
}

function getJSON(url) {
  var deferred = when.defer();

  d3.json(url, function (err, data) {
    if (err) {
      deferred.reject(err);

    } else {
      deferred.resolve(data);
    }
  });

  return deferred.promise;
}