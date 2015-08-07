var robotEl = document.getElementById('robot');
var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutationRecord) {
    console.info('Robot changed!');
  });
});

var myRobot = makeRobot(robotEl);

function makeRobot(robotEl) {

  var robotMethods = {
    setDOMNode: setRobotElement,
    getDOMNode: getRobotElement,
    getPosition: getPosition,
    getRobotSize: getRobotSize,
    setName: setName,
    move: move,
    reset: reset
  };

  var robotElement;
  var robotData;
  setRobotElement(robotEl);
  robotData = new RobotData();

  observer.observe(robotElement, { attributes : true, attributeFilter : ['style'] });
  robotMethods.robotData = robotData;
  return robotMethods;


  function setRobotElement(){
    robotElement = robotEl;
  }

  function RobotData() {
    Object.defineProperty(this, 'position', {
      get: function(){
        return getPosition();
      },
      set: function(value) {
        robotElement.style.left = value.x + 'px';
        robotElement.style.top = value.y + 'px';
      }
    });
  }

  function getRobotElement(){
    return robotElement;
  }

  function getRobotSize(){
    var boundingRectangle = robotElement.getBoundingClientRect();
    var size = {
      width: boundingRectangle.right - boundingRectangle.left,
      height: boundingRectangle.bottom - boundingRectangle.top
    };

    return size;
  }

  function getPosition(){
    var robotSize = getRobotSize();
    var boundingRectangle = robotElement.getBoundingClientRect();

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
      var currentLeft = _getPosition().x;
      robotElement.style.left = currentLeft + distance + 'px';
    }

    function moveDown (distance) {
      var currentLeft = _getPosition().y;
      robotElement.style.top = currentLeft + distance + 'px';
    }

    function moveRight (distance) {
      moveLeft( - 1 * distance);
    }

    function moveUp (distance) {
      moveDown( - 1 * distance);
    }

    function _getPosition() {
      var boundingRectangle = robotElement.getBoundingClientRect();
      var topLeftCorner = {
        x: boundingRectangle.left,
        y: boundingRectangle.top
      };

      return topLeftCorner;
    }
  }

  function moveTo(x, y){
    robotData.position = {
      x: x,
      y: y
    };
    // moveToX(x);
    // moveToY(y);
  }

  function moveToX(x) {
    var robotSize = getRobotSize();
    robotElement.style.left = x - robotSize.width/2;
  }

  function moveToY(y) {
    var robotSize = getRobotSize();
    robotElement.style.top = y - robotSize.height/2;
  }

  function setName(name) {
    robotElement.dataset.name = name;
  }

  function setImage() {

  }

  function reset() {
    moveTo(0, 0);
  }
}

function makeScene() {

}
