var robotElement = document.getElementById('robot');
var sceneElement = document.getElementById('scene');

var scene = new Scene(sceneElement);
var robot = new Robot(robotElement);
var animator = new Animator();

animator.startLoop();

sceneElement.addEventListener('mousemove', handleMouseMove);

function handleMouseMove(mouseEvent){
  // The robot's position -- we can update the direction and angle
  var robotPosition = robot.getPosition();
  // We only need the mouse position. We can leave out all other information about
  // the how the mouse moves and only tell watchMouse the x and y of the mouse.
  var mousePosition = _.pick(mouseEvent, 'x', 'y');

  // This is where watchMouse gets called.
  watchMouse(robotPosition, mousePosition);
}
