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
      var currentPosition = getPosition();
      var newX = currentPosition.x + distance;

      moveTo(newX, currentPosition.y);
    }

    function _moveDown (distance) {
      var currentPosition = getPosition();
      var newY = currentPosition.y + distance;

      moveTo(currentPosition.x, newY);
    }

    function _moveRight (distance) {
      _moveLeft( - 1 * distance);
    }

    function _moveUp (distance) {
      _moveDown( - 1 * distance);
    }
  }

  function moveTo(x, y){
    _orient(x, y);
    _positionTo(x, y);
  }

  function _positionTo(x, y) {
    var robotSize = getRobotSize();
    robot.dom.style.left = x - robotSize.width/2 + 'px';
    robot.dom.style.top = y - robotSize.height/2 + 'px';
  }

  function _orient(x, y){
    var angle = _calcAngle({x: x, y: y});
    var scale = _calcScale({x: x, y: y});
    _transform(angle, scale);
  }

  function _transform(angle, scale) {
    robot.position = robot.position || {};
    var transform = '';

    if(_isNumber(angle)) {
      transform += 'rotate(' + angle + 'deg)';
    }
    if(_isNumber(scale)) {
      transform += ' scaleX(' + scale + ')';
    }
    robot.position.angle = angle;
    robot.position.scale = scale;
    robot.img.style.transform = transform;
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
    _transform(defaults.position.angle, defaults.position.scale);
    changeRobot(defaults.src);
  }

  // These functions can only be used within this Robot function.
  // They are "Private" functions.
  function _setRobotElement(){
    robot.dom = robotEl;
    robot.img = robot.dom.getElementsByTagName('img')[0]
    robot.img.onload = _setRobotDefaults;
  }

  function _setRobotDefaults(){
    robot.defaults = {}
    robot.defaults.src = robot.img.src;
    robot.defaults.size = getRobotSize();
    robot.defaults.position = {
      scale: 1,
      rotate: 0,
      x: robot.defaults.size.width/2,
      y: robot.defaults.size.height/2
    };
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
    var currentPosition = getPosition();
    var xDist = destination.x - currentPosition.x;
    var yDist = currentPosition.y - destination.y;

    if(xDist == 0){
      return _getDirection(yDist) * 90;
    }

    return Math.atan(yDist/xDist) / Math.PI * 180;
  }

  function _calcScale(destination) {
    var currentPosition = getPosition();
    var xDist = destination.x - currentPosition.x;

    return _getDirection(xDist);
  }

}

