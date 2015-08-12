/**
 * # robot.js
 *
 * This file contains code all about the robot.
 */
'use strict';

var cecilEl = document.getElementById('cecil');
var sceneEl = document.getElementById('scene');
var cecil = new Robot(cecilEl, sceneEl);

function Robot(robotElement, sceneElement) {
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
   * `setBody` gives the robot a body that is the HTML element passed in as `robotElement`
   */
  setBody(robotElement);

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

    if(doParametersFail(arguments, 'setBody')){
      return;
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

    if(!robot.defaults){    
      setDefaults();
    }
  }

  /**
   * ## setDefaults
   * 
   * Remembers the initial information about the robot.
   * We can use `robot.defaults` later to be able to reset the robot to it's original state.
   */
  function setDefaults(){
    robot.defaults = {}
    robot.defaults.src = robot.img.getAttribute('src');
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
      width: boundingRectangle.width,
      height: boundingRectangle.height
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

    if(doParametersFail(arguments, 'move')){
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
    // Use the robot size to calculate where the center of the robot is
    // relative to the edge.
    var robotSize = robot.size;
    var xRobotCenter = robotSize.width/2;
    var yRobotCenter = robotSize.height/2;

    // Get the size of the "scene" that the robot is in.
    var sceneSize = sceneElement.getBoundingClientRect();

    var maxRandomX = sceneSize.width - robotSize.width;
    var maxRandomY = sceneSize.height - robotSize.height;

    // ```Math.random()``` returns a random number in between 0 and 1.
    // Multiplying it by the scene dimension scales the random number.
    // In this case, the random number will be between 0 and scene width
    // and height minus the robot width and height -- max random x and
    // max random y.
    // 
    // Adding the robot center helps offsets the position so that
    // it's the position for the center of the robot.
    var randomX = Math.random() * maxRandomX + xRobotCenter;
    var randomY = Math.random() * maxRandomY + yRobotCenter;

    // Use the previously defined ```moveTo``` to do the moving.
    return moveTo(randomX, randomY);
  }

  function change(imageURL) {
    if(doParametersFail(arguments, 'change')){
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
    if(doParametersFail(arguments, 'name')){
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

  function doParametersFail(parameters, functionName){

    var checkDirection = _.flow(_.indexOf.bind(this, ['left','right','up','down']), _.partialRight(_.gt, -1));
    var expectedParameters = {
      move: [{
          name: 'direction',
          test: checkDirection
        },{
          name: 'distance',
          test: _.isNumber
      }],
      change: [{
        name: 'the image url',
        test: _.isString
      }],
      name: [{
        name: 'the name',
        test: _.isString
      }],
      setBody: [{
        name: 'the robot\' HTML element',
        test: _.isElement
      }]
    };


    var examples = {
      move: 'cecil.move("left", 100)',
      change: 'cecil.change("http://www.clipartlord.com/wp-content/uploads/2014/04/robot20.png")',
      name: 'cecil.name("Cecil")',
      setBody: 'var robot = new Robot(document.getElementById("cecil"))'
    };

    try {
      checkParameters.call(this, parameters, expectedParameters[functionName], examples[functionName]);
    } catch(error){
      console.error(error.message);
      return true;
    }

    return false;
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

