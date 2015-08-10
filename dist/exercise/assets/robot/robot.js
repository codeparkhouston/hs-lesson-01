/**
 * # robot.js
 *
 * This file contains code all about the robot.
 */

var cecilEl = document.getElementById('cecil');
var cecil = new Robot(cecilEl);

function Robot(robotEl) {
  /**
   * `robotMethods` will hold onto what the robot can do.
   */
  var robotMethods = Object.create(null);
  robotMethods.getPosition = getPosition;
  robotMethods.getSize = getSize;
  robotMethods.moveTo = moveTo;
  robotMethods.move = move;
  robotMethods.moveRandom = moveRandom;
  robotMethods.change = change;
  robotMethods.reset = reset;
  robotMethods.name = name;
  robotMethods.flip = flip;
  robotMethods.getElement = getElement;

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

    if((!robotElement || typeof robotElement !== 'object')){
      throw new MissingInformationError(['the robot\' HTML element']);
    }

    robot.element = robotElement;
    robot.img = robot.element.getElementsByTagName('img')[0]
    robot.img.onload = setSizeAndPosition;
    // Force an image reload to make `setSizeAndPosition` run.
    robot.img.src = robot.img.src;
    robot.name = '';
  }


  function setSizeAndPosition(){
    robot.size = getSize();
    robot.position = new Position(robot);

    setDefaults()
  }

  /**
   * ## setDefaults
   * 
   * Remembers the initial information about the robot.
   * We can use `robot.defaults` later to be able to reset the robot to it's original state.
   */
  function setDefaults(){
    robot.size = getSize();
    robot.position = new Position(robot);

    robot.defaults = {}
    robot.defaults.src = robot.img.src;
    robot.defaults.position = getPosition();
  }

  /**
   * ## getPosition
   * 
   * Tells us where the robot is.
   * @return {Object} with an x and y for where the robot is.
   */
  function getPosition(){
    return robot.position.get();
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

    return robot.name + ' moved to ' + x + ', ' + y;
  }

  function move(direction, distance){

    var movers = {
      left: moveLeft,
      right: moveRight,
      down: moveDown,
      up: moveUp
    };

    try {
      checkParameters(arguments, [{name: 'direction', test: _.isFunction.bind(_, movers[direction])}, {name: 'distance', test: _.isNumber}], 'cecil.move("left", 100)')
    } catch(error){
      console.error(error.message);
      return;
    }


    return movers[direction](distance);

    function moveLeft(distance) {
      var currentPosition = getPosition();
      var newX = currentPosition.x + distance;

      return moveTo(newX, currentPosition.y);
    }

    function moveDown(distance) {
      var currentPosition = getPosition();
      var newY = currentPosition.y + distance;

      return moveTo(currentPosition.x, newY);
    }

    function moveRight(distance) {
      return moveLeft( - 1 * distance);
    }

    function moveUp(distance) {
      return moveDown( - 1 * distance);
    }
  }

  function moveRandom(){
    var robotSize = robot.size;
    var xBuffer = robotSize.width/2;
    var yBuffer = robotSize.height/2;

    var sceneSize = document.getElementById('scene').getBoundingClientRect();

    var randomXMax = sceneSize.width - 2 * xBuffer;
    var randomYMax = sceneSize.height - 2 * yBuffer;

    var randomX = Math.random() * randomXMax + xBuffer;
    var randomY = Math.random() * randomYMax + yBuffer;

    return moveTo(randomX, randomY);
  }

  function change(imageURL) {
    try {
      checkParameters(arguments, [{name: 'the image url', test: _.isString}], 'cecil.change("http://www.clipartlord.com/wp-content/uploads/2014/04/robot20.png")')
    } catch(error){
      console.error(error.message);
      return;
    }

    robot.img.src = imageURL;

    return 'Robot image set to ' + imageURL;
  }

  function reset() {
    robot.position.angle = robot.defaults.position.angle;
    robot.position.scale = robot.defaults.position.scale;
    robot.position.x = robot.defaults.position.x;
    robot.position.y = robot.defaults.position.y;

    change(robot.defaults.src);

    return 'Robot reset to original position and image';
  }

  function name(robotName) {
    try {
      checkParameters(arguments, [{name: 'the name', test: _.isString}], 'cecil.name("Cecil")')
    } catch(error){
      console.error(error.message);
      return;
    }

    robot.name = robotName;
    robot.element.dataset.name = robotName;

    return 'Robot got named ' + robotName;
  }

  function flip(){
    robot.element.classList.toggle('flip');

    return 'Robot flipped!';
  }

  function getElement(){
    return robot.element;
  }

  function checkParameters(parameters, expectedParameters, example){

    var missingParameters = _.reject(expectedParameters, function(expectedParameter, iteration){
      return expectedParameter.test(parameters[iteration]);
    });

    if(missingParameters.length){
      throw new MissingInformationError(_.pluck(missingParameters, 'name'), example);
    }
  }

  function MissingInformationError(parameters, example){
    this.name = 'MissingInformationError'
    this.message = 'This function needs information about ' + parameters.join(' , ') + '. For example, try: ' + example;
  }

  MissingInformationError.prototype = Object.create(Error.prototype);
  MissingInformationError.prototype.constructor = MissingInformationError;
}

