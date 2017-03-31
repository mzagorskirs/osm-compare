'use strict';

module.exports = draggedHighwayWaterway;
var turfPoint = require('turf-point');
var turfDistance = require('turf-distance');
var threshold = 10;
function draggedHighwayWaterway(newVersion, oldVersion) {
  var result = {};

  if (!newVersion) {
    return result;
  }

  if (newVersion.properties &&
    (newVersion.properties.hasOwnProperty('highway') ||
    newVersion.properties.hasOwnProperty('waterway')) &&
    newVersion.properties['osm:type'] === 'way' &&
    newVersion.geometry &&
    newVersion.geometry.hasOwnProperty('coordinates') &&
    newVersion.geometry.coordinates.length > 1) {
    for (var i = 0; i < newVersion.geometry.coordinates.length - 1; i++) {
      var point1 = turfPoint(newVersion.geometry.coordinates[i]);
      var point2 = turfPoint(newVersion.geometry.coordinates[i + 1]);
      var distance = turfDistance(point1, point2, 'kilometers');
      if (distance > threshold) {
        result['result:dragged_highway_waterway'] = true;
      }
    }
  }
  return result;
}
