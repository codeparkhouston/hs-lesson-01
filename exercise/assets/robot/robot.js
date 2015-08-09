/**
 * # robot.js
 *
 * This file contains code all about the robot.
 */

var robotEl = document.getElementById('robot');
var cecil = new Robot(robotEl);

function Robot(robotEl) {
  /**
   * `robotMethods` will hold onto what the robot can do.
   */
  var robotMethods = {
    getPosition: getPosition,
    getSize: getSize,
    moveTo: moveTo,
    move: move,
    moveRandom: moveRandom,
    change: change,
    reset: reset,
    name: name,
    flip: flip,
    getElement: getElement
  };

  /**
   * We are going to use `robot` to hold onto some private information about our robot.
   */
  var robot = {};

  /**
   * `setBody` gives the robot a body that is the HTML element passed in as `robotEl`
   */
  setBody(robotEl);

  /**
   * Give `robotMethods` out to the coder use elsewhere, as in the `console`.
   */
  return robotMethods;


  /**
   * # Functions
   */


  /**
   * ## setBody
   * 
   * Gives the robot a body.
   * 
   * @param {DOMElement} robotElement The HTML Element that the robot's capabilities should be attached to.
   */
  function setBody(robotElement){
    robot.element = robotElement;
    robot.size = getSize();
    robot.img = robot.element.getElementsByTagName('img')[0]
    robot.img.onload = setDefaults;
    robot.position = new Position(robot);
  }

  /**
   * ## setDefaults
   * 
   * Remembers the initial information about the robot.
   * We can use `robot.defaults` later to be able to reset the robot to it's original state.
   */
  function setDefaults(){
    robot.defaults = {}
    robot.defaults.src = robot.img.src;
    robot.defaults.position = getPosition();
    robot.defaults.position.scale = 1;
    robot.defaults.position.rotate = 0;
  }

  /**
   * ## getPosition
   * 
   * Tells us where the robot is.
   * @return {Object} with an x and y for where the robot is.
   */
  function getPosition(){
    var robotSize = robot.size;
    var boundingRectangle = robot.element.getBoundingClientRect();

    var center = {
      x: (robotSize.width)/2 + boundingRectangle.left,
      y: (robotSize.height)/2 + boundingRectangle.top
    };

    return center;
  }

  function getSize(){
    var boundingRectangle = robot.element.getBoundingClientRect();
    var size = {
      width: boundingRectangle.right - boundingRectangle.left,
      height: boundingRectangle.bottom - boundingRectangle.top
    };

    return size;
  }

  function moveTo(x, y){
    robot.position.x = x;
    robot.position.y = y;
  }

  function move(direction, distance){

    var movers = {
      left: moveLeft,
      right: moveRight,
      down: moveDown,
      up: moveUp
    };

    return function(){
      movers[direction](distance);
      return 'moved ' + distance + ' ' + direction;
    }();

    function moveLeft(distance) {
      var currentPosition = getPosition();
      var newX = currentPosition.x + distance;

      moveTo(newX, currentPosition.y);
    }

    function moveDown(distance) {
      var currentPosition = getPosition();
      var newY = currentPosition.y + distance;

      moveTo(currentPosition.x, newY);
    }

    function moveRight(distance) {
      moveLeft( - 1 * distance);
    }

    function moveUp(distance) {
      moveDown( - 1 * distance);
    }
  }

  function moveRandom(){
    var robotSize = robot.size;
    var xBuffer = robotSize.width/2;
    var yBuffer = robotSize.height/2;

    var randomXMax = window.innerWidth - 2 * xBuffer;
    var randomYMax = window.innerHeight - 2 * yBuffer;

    var randomX = Math.random() * randomXMax + xBuffer;
    var randomY = Math.random() * randomYMax + yBuffer;

    moveTo(randomX, randomY);
  }

  function change(imageURL) {
    robot.img.src = imageURL;
  }

  function reset() {
    moveTo(robot.defaults.position.x, robot.defaults.position.y);
    transform(robot.defaults.position.angle, robot.defaults.position.scale);
    change(robot.defaults.src);
  }

  function name(robotName) {
    robot.element.dataset.name = robotName;
  }

  function flip(){
    robot.element.classList.toggle('flip');
  }

  function getElement(){
    return robot.element;
  }
}

