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
    robot.addEventListener('moved', checkRobot);
  }

  function checkRobot(moveEvent){
    console.info('hellO!');
    console.info(moveEvent.detail.box.left);
    console.info(moveEvent.detail.box.right);
    console.info(moveEvent.detail.propertyName);
  }

}