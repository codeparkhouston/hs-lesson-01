var robotEl = document.getElementById('robot');
var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutationRecord) {
    console.info('Robot changed!');
  });
});

var cecil = new Robot(robotEl);

function Robot(robotEl) {

  var robotMethods = {
    getPosition: getPosition,
    getRobotSize: getRobotSize,
    name: name,
    move: move,
    moveTo: moveTo,
    reset: reset,
    changeRobot: changeRobot
  };

  var robot = {};

  setRobotElement(robotEl);

  observer.observe(robot.dom, { attributes : true, attributeFilter : ['style'] });
  return robotMethods;


  function setRobotElement(){
    robot.dom = robotEl;
    robot.img = robot.dom.getElementsByTagName('img')[0]
    robot.img.onload = setRobotDefaults;
  }

  function setRobotDefaults(){
    robot.defaults = {}
    robot.defaults.src = robot.img.src;
    robot.defaults.size = getRobotSize();
    robot.defaults.position = {
      scale: 1,
      rotate: 0,
      x: robot.defaults.size.width/2,
      y: robot.defaults.size.height/2
    };
  }

  function getRobotDefaults(){
    return Object.create(robot.defaults);
  }

  function getRobotElement(){
    return robot.dom;
  }

  function getRobotSize(){
    var boundingRectangle = robot.dom.getBoundingClientRect();
    var size = {
      width: boundingRectangle.right - boundingRectangle.left,
      height: boundingRectangle.bottom - boundingRectangle.top
    };

    return size;
  }

  function getPosition(){
    var robotSize = getRobotSize();
    var boundingRectangle = robot.dom.getBoundingClientRect();

    var center = {
      x: (robotSize.width)/2 + boundingRectangle.left,
      y: (robotSize.height)/2 + boundingRectangle.top
    };

    return center;
  }


  function move(direction, distance){

    var movers = {
      left: moveLeft,
      right: moveRight,
      down: moveDown,
      up: moveUp
    };

    return function(){
      movers[direction](distance);
      return 'moved ' + distance + ' ' + direction;
    }();

    function moveLeft (distance) {
      var currentLeft = getPosition().x;
      moveToX(currentLeft + distance);
    }

    function moveDown (distance) {
      var currentTop = getPosition().y;
      moveToY(currentTop + distance);
    }

    function moveRight (distance) {
      moveLeft( - 1 * distance);
    }

    function moveUp (distance) {
      moveDown( - 1 * distance);
    }
  }

  function moveTo(x, y){
    var angle = calcAngle({x: x, y: y});
    var scale = calcScale({x: x, y: y});
    moveToX(x);
    moveToY(y);
    orient(angle, scale);
  }

  function moveToX(x) {
    var robotSize = getRobotSize();
    robot.dom.style.left = x - robotSize.width/2 + 'px';
  }

  function moveToY(y) {
    var robotSize = getRobotSize();
    robot.dom.style.top = y - robotSize.height/2 + 'px';
  }

  function orient(angle, scale) {
    robot.position = robot.position || {};
    var transform = '';

    if(_isNumber(angle)) {
      transform += 'rotate(' + angle + 'deg)';
    }
    if(_isNumber(scale)) {
      transform += ' scaleX(' + scale + ')';
    }
    robot.position.angle = angle;
    robot.position.scale = scale;
    robot.img.style.transform = transform;
  }

  function _getSign(distance) {
    return distance/Math.abs(distance);
  }

  function _isNumber(number) {
    return typeof number == 'number' && number.toString() !== 'NaN'
  }

  function calcAngle(destination) {
    var currentPosition = getPosition();
    var xDist = destination.x - currentPosition.x;
    var yDist = currentPosition.y - destination.y;

    if(xDist == 0){
      return _getSign(yDist) * 90;
    }

    return Math.atan(yDist/xDist) / Math.PI * 180;
  }

  function calcScale(destination) {
    var currentPosition = getPosition();
    var xDist = destination.x - currentPosition.x;

    return _getSign(xDist);
  }

  function name(robotName) {
    robot.dom.dataset.name = robotName;
  }

  function changeRobot(imageURL) {
    robot.img.src = imageURL;
  }

  function reset() {
    var defaults = getRobotDefaults();
    moveTo(defaults.position.x, defaults.position.y);
    orient(defaults.position.angle, defaults.position.scale);
    changeRobot(defaults.src);
  }
}

function makeScene() {

}
