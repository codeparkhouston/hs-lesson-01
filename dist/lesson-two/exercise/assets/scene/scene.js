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

  sceneMethods.startMouseWatch = startMouseWatch;
  sceneMethods.stopMouseWatch = stopMouseWatch;

  setBody(sceneElement);
  startMouseWatch();

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

  function startMouseWatch(){
    _.each(scene.robots, watchMouse);
  }

  function watchMouse(robot){
    if(_.isFunction(robot.watchMouse)){
      sceneElement.addEventListener('mousemove', robot.watchMouse);      
    }
  }

  function stopMouseWatch(){
    _.each(scene.robots, watchMouse);
  }

  function removeWatchMouse(robot){
    if(_.isFunction(robot.watchMouse)){
      sceneElement.removeEventListener('mousemove', robot.watchMouse);      
    }
  }

}