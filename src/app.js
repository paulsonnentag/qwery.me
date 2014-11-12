'use strict';

var _ = require('lodash');
var d3 = require('d3');
var freebase = require('./freebase.js');

var radius = 40;
var width = 1000;
var height = 800;

var color = d3.scale.category20();

var graph = d3.select('#graph')
  .attr('width', width)
  .attr('height', height);


var force = d3.layout.force()
  .gravity(0.07)
  .charge(-120)
  .size([width, height])
  .on('tick', updateNodes);

function updateNodes () {
  graph.selectAll('g.node')
    .attr('transform', function(d) { return 'translate(' + d.x  + ','  + d.y + ')'; })
}

function addNodes (nodes, params) {
  var node = nodes.enter()
    .append('g')
    .attr('class', 'node');

  node
    .append('circle')
    .attr('r', radius)
    .style('fill', params.color);

  node
    .append('text')
    .attr('text-anchor', 'middle')
    .attr('dy', 5)
    .text(function (d) {
      return _.escape(d.name);
    });
}


function selectNodes (data) {
  var nodes = graph.selectAll('g.node').data(data, function (node) {
    return node.id;
  });

  nodes.exit().remove();

  return nodes;
}

function displayDomains (domains) {
  var nodes = selectNodes(domains);

  addNodes(nodes, {
    color: function(d, i) { return color(i); }
  });

  force.nodes(domains).start();
}

function displayTypes (color, types) {
  var nodes = selectNodes(types);

  addNodes(nodes, {
    color: color
  });

  force.nodes(types).start();
}





freebase.getDomains().then(function (domains) {

  displayDomains(domains);

  graph.selectAll('.node').on('click', function (data, i) {
    var c = color(i);
    freebase.getTypes(data.id).then(_.partial(displayTypes, c));
  });



});
