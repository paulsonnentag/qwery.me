'use strict';

var _ = require('lodash');
var d3 = require('d3');
var freebase = require('./freebase.js');

var radius = 40;
var width = 1000;
var height = 800;

//TODO: remove global vars
var data = [];
var updateColor = true;

var graph = d3.select('#graph')
  .attr('width', width)
  .attr('height', height);

var force = d3.layout.force()
  .gravity(0.07)
  .charge(-120)
  .size([width, height])
  .on('tick', updateNodes);

function updateNodes() {
  var qTree = d3.geom.quadtree(data);

  _.each(data, function (node) {
    qTree.visit(collide(node))
  });

  var nodes = graph.selectAll('g.node')
    .attr('transform', function (d) {
      return 'translate(' + d.x + ',' + d.y + ')';
    });

  if (updateColor) {
    nodes
      .select('circle')
      .style('fill', getColorOfPosition)
  }
}


function collide(node) {
  var r = (node.radius || radius) + 16,
    nx1 = node.x - r,
    nx2 = node.x + r,
    ny1 = node.y - r,
    ny2 = node.y + r;
  return function (quad, x1, y1, x2, y2) {
    if (quad.point && (quad.point !== node)) {
      var x = node.x - quad.point.x,
        y = node.y - quad.point.y,
        l = Math.sqrt(x * x + y * y),
        r = (node.radius || radius) + (quad.point.radius || radius);
      if (l < r) {
        l = (l - r) / l * .5;
        node.x -= x *= l;
        node.y -= y *= l;
        quad.point.x += x;
        quad.point.y += y;
      }
    }
    return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
  };
}

function addNodes(nodes, params) {
  var node = nodes.enter()
    .append('g')
    .attr('class', 'node');

  node
    .append('circle')
    .attr('r', radius)
    .style('fill', params.fill || '#000')

  node
    .append('text')
    .attr('text-anchor', 'middle')
    .attr('dy', 5)
    .text(function (d) {
      return _.escape(d.name);
    });
}


function selectNodes(d) {
  var nodes = graph.selectAll('g.node').data(d, function (node) {
    return node.id;
  });

  data = d;

  nodes.exit().remove();

  return nodes;
}

function displayDomains(domains) {
  var nodes = selectNodes(domains);

  force.nodes(domains).start();

  addNodes(nodes, {
    color: getColorOfPosition
  });
}

function getColorOfPosition(point) {
  var distanceX = point.x - width / 2;
  var distanceY = point.y - height / 2;
  var distance = Math.sqrt((distanceX * distanceX + distanceY * distanceY));
  var lightness = 100 - Math.round(Math.min(Math.max((distance / (height / 2)) * 40 + 10, 0), 100));
  var hue = Math.round((Math.atan2(distanceX, distanceY) / Math.PI) * 180);

  return 'hsl(' + hue + ', 75%, ' + lightness + '%)'
}


function displayTypes(color, types) {
  var nodes = selectNodes(types);

  addNodes(nodes, {
    fill: color
  });

  force.nodes(types).start();
}

freebase.getDomains().then(function (domains) {

  displayDomains(domains);

  graph.selectAll('.node').on('click', function (entry) {
    updateColor = false;

    var color = getColorOfPosition(entry);
    freebase.getTypes(entry.id).then(_.partial(displayTypes, color));
  });
});
