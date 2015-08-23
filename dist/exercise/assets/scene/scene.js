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
  var maze;

  sceneMethods.addMaze = addMaze;
  sceneMethods.clearMaze = clearMaze;
  sceneMethods.setMaze = setMaze;
  sceneMethods.toggleRecordingMode = toggleRecordingMode;

  setBody(sceneElement);
  listenToRobots();

  return sceneMethods;


  function setMaze(){
    if(maze){
      clearMaze();      
    }
    addMaze();
  }


  function setBody(sceneElement){
    scene.element = sceneElement;
    scene.robots = sceneElement.getElementsByClassName('robot');
  }

  function toggleRecordingMode(){
    scene.element.parentNode.classList.toggle('record-mode');
  }

  function addMaze(){
    var sceneSize = scene.element.getBoundingClientRect();
    var blockSize = 100;
    var mazeSize = {
      width: Math.floor(sceneSize.width/blockSize) - 2,
      height: Math.floor(sceneSize.height/blockSize) - 2
    };

    scene.element.classList.add('maze');
    maze = new Maze(mazeSize.width, mazeSize.height).generate().display();

    var changeEvent = new CustomEvent('mazed');

    setTimeout(function(){
      mazeBounds = maze.getBounds();
      scene.element.dispatchEvent(changeEvent);
    }, 1000);
  }

  function clearMaze(){
    maze.clear();
  }

  function refreshRobots(){
    _.each(scene.robots, refreshRobot);
  }

  function refreshRobot(robot){
    robot.src = robot.src;
  }

  function listenToRobots(){
    _.each(scene.robots, listenToRobot);
  }

  function listenToRobot(robot){
    robot.addEventListener('moving', checkRobot);
  }

  function trailRobots(){
    _.each(scene.robots, trailRobot);
  }

  function trailRobot(robot){
    var trailElement = robot.cloneNode(true);
    trailElement.className = 'trail';
    trailElement.removeAttribute('id');
    sceneElement.appendChild(trailElement);
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
    if(mazeBounds.length> 0){
      trailRobots();

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
    }
  }
}