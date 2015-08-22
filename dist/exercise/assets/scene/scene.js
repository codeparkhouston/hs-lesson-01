/**
 * # scene.js
 *
 * This file contains code all about the scene.
 */
'use strict';

var sceneElement = document.getElementById('scene');

function Scene(sceneElement){

  var sceneMethods = Object.create(null);
  var mazeBounds = [];
  var scene = {};

  sceneMethods.addMaze = addMaze;



  setBody(sceneElement);
  listenToRobots();



  return sceneMethods;


  function setBody(sceneElement){
    scene.element = sceneElement;
    scene.robots = sceneElement.getElementsByClassName('robot');
  }

  function addRobot(){

  }

  function getRobots(){

  }

  function addMaze(){
    var sceneSize = scene.element.getBoundingClientRect();
    var blockSize = 100;
    var mazeSize = {
      width: Math.floor(sceneSize.width/blockSize) - 2,
      height: Math.floor(sceneSize.height/blockSize) - 2
    };

    scene.element.classList.add('maze');

    maze = new Maze(mazeSize.width, mazeSize.height).generate().display()
    setTimeout(function(){
      mazeBounds = maze.getBounds();
    }, 1000);
  }

  function listenToRobots(){
    _.each(scene.robots, listenToRobot);
  }

  function listenToRobot(robot){
    robot.addEventListener('moving', checkRobot);
  }

  function isBetween(compare, boundOne, boundTwo){
    return boundOne <= compare && compare <= boundTwo;
  }

  function hasOverlap(boxOne, boxTwo){
    var horizontal = [
      [boxOne.left, boxTwo.left, boxTwo.right],
      [boxOne.right, boxTwo.left, boxTwo.right],
      [boxTwo.left, boxOne.left, boxOne.right],
      [boxTwo.right, boxOne.left, boxOne.right]
    ];

    var vertical = [
      [boxOne.top, boxTwo.top, boxTwo.bottom],
      [boxOne.bottom, boxTwo.top, boxTwo.bottom],
      [boxTwo.top, boxOne.top, boxOne.bottom],
      [boxTwo.bottom, boxOne.top, boxOne.bottom]
    ];

    var hasHorizontalOverlap = _.find(horizontal, function(check){
      return isBetween.apply(isBetween, check);
    });
    var hasVerticalOverlap = _.find(vertical, function(check){
      return isBetween.apply(isBetween, check);
    });
    return !(_.isUndefined(hasHorizontalOverlap) || _.isUndefined(hasVerticalOverlap));
  }

  function checkRobot(moveEvent){
    var overlapsMaze = _.find(mazeBounds, function(mazeBound){
      return hasOverlap(moveEvent.detail.box, mazeBound);
    });
    var positions = {
      lion: moveEvent.detail.box,
      mazeBox: overlapsMaze
    };
    if(!_.isUndefined(overlapsMaze)){
      console.info('overlapsMaze');
      console.info(positions);
      
    }
    // this is where checking maze collision can happen
    // console.info('moved to', moveEvent.detail.position.x, moveEvent.detail.position.y);
    // console.info('moved to', moveEvent.detail.box.left, moveEvent.detail.box.top);
  }

}