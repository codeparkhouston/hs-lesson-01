var robotElement = document.getElementById('robot');
var sceneElement = document.getElementById('scene');

var scene = new Scene(sceneElement);
var robot = new Robot(robotElement);
var animator = new Animator();

animator.startLoop();

scene.addMaze();

robot.solve = solve;