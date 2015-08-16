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

  function listenToRobots(){
    _.each(scene.robots, listenToRobot);
  }

  function listenToRobot(robot){
    robot.addEventListener('moving', checkRobot);
  }

  function checkRobot(moveEvent){
    // this is where checking maze collision can happen
    // console.info('moved to', moveEvent.detail.position.x, moveEvent.detail.position.y);
    // console.info('moved to', moveEvent.detail.box.left, moveEvent.detail.box.top);
  }

}