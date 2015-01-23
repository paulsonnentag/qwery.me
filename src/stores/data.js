'use strict';

var d3 = require('d3');
var when = require('when');

module.exports = {
  getJSON: getJSON
};

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