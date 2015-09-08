/**
 * # scene.js
 *
 * This file contains code all about the scene.
 */
'use strict';

var sceneElement = document.getElementById('scene');

function Scene(sceneElement){

  var sceneMethods = Object.create(null);
  var scene = {};

  setBody(sceneElement);

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

  function refreshRobots(){
    _.each(scene.robots, refreshRobot);
  }

  function refreshRobot(robot){
    robot.src = robot.src;
  }

}