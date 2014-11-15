'use strict';

var React = require('react');
var _ = require('lodash');

var SPLIT_REGEX = /\s/;

module.exports = React.createClass({
  render: function () {
    var props = this.props;
    var lines = getLines(props.maxLength, props.children);

    return <text textAnchor="middle" y={lines.length * -10}>
    {_.map(lines, function (line) {
      return <tspan x="0" dy={props.lineHeight}>{line}</tspan>
    })}
    </text>;
  }
});


function getLines (maxLength, text) {
  var words = text.split(SPLIT_REGEX);
  var firstWord = words.shift();

  return _.reduce(words, addWordToLines, [firstWord]);

  function addWordToLines (lines, word) {
    var prevLine = _.last(lines);

    if ((prevLine.length + 1 + word.length) <= maxLength) {
      lines[lines.length-1] += ' ' + word;

    } else {
      lines.push(word);
    }

    return lines;
  }
}
