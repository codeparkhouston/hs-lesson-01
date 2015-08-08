/**
 * # robot.js
 *
 * This file contains code related to the robot.
 */

var robotEl = document.getElementById('robot');
var cecil = new Robot(robotEl);

function Robot(robotEl) {

  var robotMethods = {
    getRobotElement: getRobotElement,
    getPosition: getPosition,
    getRobotSize: getRobotSize,
    name: name,
    flip: flip,
    move: move,
    moveTo: moveTo,
    watch: watch,
    reset: reset,
    changeRobot: changeRobot
  };

  var robot = {};

  _setRobotElement(robotEl);

  return robotMethods;


  // Functions are defined below

  function getRobotElement(){
    return robot.dom;
  }

  function getRobotSize(){
    var boundingRectangle = robot.dom.getBoundingClientRect();
    var size = {
      width: boundingRectangle.right - boundingRectangle.left,
      height: boundingRectangle.bottom - boundingRectangle.top
    };

    return size;
  }

  function getPosition(){
    var robotSize = getRobotSize();
    var boundingRectangle = robot.dom.getBoundingClientRect();

    var center = {
      x: (robotSize.width)/2 + boundingRectangle.left,
      y: (robotSize.height)/2 + boundingRectangle.top
    };

    return center;
  }

  function flip(){
    robot.dom.classList.toggle('flip');
  }

  function move(direction, distance){

    var movers = {
      left: _moveLeft,
      right: _moveRight,
      down: _moveDown,
      up: _moveUp
    };

    return function(){
      movers[direction](distance);
      return 'moved ' + distance + ' ' + direction;
    }();

    function _moveLeft (distance) {
      var currentLeft = robot.position.get().x;
      moveToX(currentLeft + distance);
    }

    function _moveDown (distance) {
      var currentTop = robot.position.get().y;
      moveToY(currentTop + distance);
    }

    function _moveRight (distance) {
      _moveLeft( -1 * distance);
    }

    function _moveUp (distance) {
      _moveDown( -1 * distance);
    }
  }

  function watch(x, y){
    var angle = _calcAngle({x: x, y: y});
    var scale = _calcScale({x: x, y: y});
    orient(angle, scale);
  }

  function moveTo(x, y){
    var angle = _calcAngle({x: x, y: y});
    var scale = _calcScale({x: x, y: y});
    moveToX(x);
    moveToY(y);
    orient(angle, scale);
  }

  function moveToX(x) {
    robot.position.x = x;
  }

  function moveToY(y) {
    robot.position.y = y;
  }

  function orient(angle, scale) {
    robot.position.angle = angle;
    robot.position.scale = scale;
  }

  function name(robotName) {
    robot.dom.dataset.name = robotName;
  }

  function changeRobot(imageURL) {
    robot.img.src = imageURL;
  }

  function reset() {
    var defaults = _getRobotDefaults();
    moveTo(defaults.position.x, defaults.position.y);
    orient(defaults.position.angle, defaults.position.scale);
    changeRobot(defaults.src);
  }

  // These functions can only be used within this Robot function.
  // They are "Private" functions.
  function _setRobotElement(){
    robot.dom = robotEl;
    robot.position = new Position(robot.dom);

    robot.img = robot.dom.getElementsByTagName('img')[0]
    robot.img.onload = _setRobotDefaults;
  }

  function _setRobotDefaults(){
    robot.defaults = {}
    robot.defaults.src = robot.img.src;
    robot.defaults.size = getRobotSize();
    robot.defaults.position = robot.position.get();
  }

  // returns a copy of the robot's default settings
  function _getRobotDefaults(){
    return Object.create(robot.defaults);
  }

  function _getDirection(distance) {
    return distance/Math.abs(distance);
  }

  function _isNumber(number) {
    return typeof number == 'number' && number.toString() !== 'NaN'
  }

  function _calcAngle(destination) {
    var currentPosition = robot.position.get();
    var xDist = destination.x - currentPosition.x;
    var yDist = currentPosition.y - destination.y;

    if(xDist == 0){
      return _getDirection(yDist) * 90;
    }

    return Math.atan(yDist/xDist) / Math.PI * 180;
  }

  function _calcScale(destination) {
    var currentPosition = robot.position.get();
    var xDist = destination.x - currentPosition.x;

    return _getDirection(xDist);
  }

}

