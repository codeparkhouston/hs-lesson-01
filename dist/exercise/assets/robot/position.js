function Position(body) {
  var bodyElement = body.getElement();
  var bodySize = body.getSize();
  var bodyImage = body.getImage();
  var wait = 0;
  var waitToDo = _.partial(_.debounce, _, wait);
  var position = body.getPosition();
  position.angle = 0;
  position.scale = 1;
  var previous = _.clone(position);
  var destinations = [];
  var destinationsHistory = [];
  destinations.push(_.pick(position, 'x', 'y'));
  destinationsHistory.push(_.pick(position, 'x', 'y'));
  var state = 'paused';

  var positionModel = {
    get coordinates() {
      return _.pick(position, 'x', 'y');
    },
    set coordinates(value) {
      if(!_.isEqual(_.last(destinations), value)){
        destinations.push(value);
        destinationsHistory.push(value);
        emitChange('destinationCheck', value);
      }
    },

    get x() {
      return position.x;
    },
    set x(value) {
      previous.x = position.x;
      position.x = value;
      // emitChange('destinationChange');
    },

    get y() {
      return position.y;
    },
    set y(value) {
      previous.y = position.y;
      position.y = value;
      emitChange('destinationChange');
    },

    get stepX() {
      return position.stepX;
    },
    set stepX(value) {
      position.stepX = value;
      emitChange('stepChange');
    },

    get stepY() {
      return position.stepY;
    },
    set stepY(value) {
      position.stepY = value;
      emitChange('stepChange');
    },

    get scale() {
      return position.scale;
    },
    set scale(value) {
      position.scale = value;
      emitChange('stepMove', positionModel.getStep());
    },

    get angle() {
      return position.angle;
    },
    set angle(value) {
      position.angle = value;
      emitChange('stepMove', positionModel.getStep());
    }
  };

  positionModel.get = function(){
    return _.clone(position);
  }

  positionModel.getStep = function(){

    var step = {
      x: position.stepX,
      y: position.stepY,
      angle: position.angle,
      scale: position.scale
    }

    return step;
  }

  positionModel.emitChange = emitChange;

  positionTween = tween.bind(positionModel);
  positionOrient = waitToDo(orient.bind(positionModel));
  positionMove = waitToDo(move);

  positionPlot = storeDestinations;

  positionModel.unset = function(){
    bodyElement.removeEventListener('destinationCheck', positionPlot);
    bodyElement.removeEventListener('destinationChange', positionTween);
    bodyElement.removeEventListener('stepChange', positionOrient);
    bodyElement.removeEventListener('stepMove', positionMove);
  }

  bodyElement.addEventListener('destinationCheck', positionPlot);
  bodyElement.addEventListener('destinationChange', positionTween);
  bodyElement.addEventListener('stepChange', positionOrient);
  bodyElement.addEventListener('stepMove', positionMove);


  return positionModel;

  function emitChange(changeType, changedProperties){
    var changeEventData = {
      position: body.getPosition(),
      box: bodyElement.getBoundingClientRect()
    };

    changeEventData = _.assign(changeEventData, changedProperties)

    var changeEvent = new CustomEvent(changeType, {detail: changeEventData});
    bodyElement.dispatchEvent(changeEvent);
  }

  function storeDestinations(){
    var currentPosition = positionModel.get();
    var destinationIndex = _.findIndex(destinations, _.pick(currentPosition, 'x', 'y'));
    if(destinationIndex >= 0 && destinations.length > 1 &&  destinationIndex != destinations.length - 1 && state !== 'moving'){
      positionModel.x = destinations[destinationIndex + 1].x;
      positionModel.y = destinations[destinationIndex + 1].y;
      destinations.shift();
    }
  }

  function tween(){
    state = 'moving';
    var position = this;
    var movement = new Tween(animator)
      .from(previous.x, previous.y)
      .to(position.x, position.y)
      .by(function(stepX, stepY, end){
        position.stepX = stepX;
        position.stepY = stepY;
        position.emitChange('moving');
        if(end === true){
          state = 'paused';
          position.emitChange('destinationCheck');
        }
      });

    return movement;
  }

  function move(stepEvent){
    if(_.isFunction(body.animateMove)){
      return body.animateMove(stepEvent.detail);
    }

    return animateMove(stepEvent.detail);      
  }

  function orient(){
    this.angle = calculateAngle(previous, position);
    this.scale = calculateScale(previous, position);
  }

  function getDirection(distance) {
    return Math.sign(distance);
  }

  function animateMove(toPosition){
    var transform = getTransform(toPosition);

    bodyElement.style.left = toPosition.x - bodySize.width/2 + 'px';
    bodyElement.style.top = toPosition.y - bodySize.height/2 + 'px';
    bodyImage.style.transform = transform;

    var trailElement = bodyElement.cloneNode(true);
    trailElement.className = 'trail';
    trailElement.removeAttribute('id');
    sceneElement.appendChild(trailElement);
  }

  function getTransform(toPosition) {
    var transform = '';

    if(_.isNumber(toPosition.angle)) {
      transform += 'rotate(' + toPosition.angle + 'deg)';
    }
    if(_.isNumber(toPosition.scale) && toPosition.scale !== 0) {
      transform += ' scaleX(' + toPosition.scale + ')';
    }
    return transform;
  }

  function calculateAngle(previous, destination) {
    var xDist = destination.x - previous.x;
    var yDist = previous.y - destination.y;

    if(xDist == 0){
      return getDirection(yDist) * 90;
    }

    return Math.atan(yDist/xDist) / Math.PI * 180;
  }

  function calculateScale(previous, destination) {
    var xDist = destination.x - previous.x;

    return getDirection(xDist);
  }

}