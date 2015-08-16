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

  Object.defineProperty(this, 'x', {
    get: function() {
      return position.x;
    },
    set: function(value) {
      previous.x = position.x;
      position.x = value;
      emitChange('destinationChange');
    }
  });

  Object.defineProperty(this, 'y', {
    get: function() {
      return position.y;
    },
    set: function(value) {
      previous.y = position.y;
      position.y = value;
      emitChange('destinationChange');
    }
  });

  Object.defineProperty(this, 'stepX', {
    get: function() {
      return position.stepX;
    },
    set: function(value) {
      position.stepX = value;
      emitChange('stepChange');
    }
  });

  Object.defineProperty(this, 'stepY', {
    get: function() {
      return position.stepY;
    },
    set: function(value) {
      position.stepY = value;
      emitChange('stepChange');
    }
  });

  Object.defineProperty(this, 'scale', {
    get: function() {
      return position.scale;
    },
    set: function(value) {
      position.scale = value;
      emitChange('stepMove', this.getStep());
    }
  });

  Object.defineProperty(this, 'angle', {
    get: function() {
      return position.angle;
    },
    set: function(value) {
      position.angle = value;
      emitChange('stepMove', this.getStep());
    }
  });

  this.get = function(){
    return _.clone(position);
  }

  this.getStep = function(){

    var step = {
      x: position.stepX,
      y: position.stepY,
      angle: position.angle,
      scale: position.scale
    }

    return step;
  }

  this.emitChange = emitChange;

  bodyElement.addEventListener('destinationChange', waitToDo(tween.bind(this)));
  bodyElement.addEventListener('stepChange', waitToDo(orient.bind(this)));
  bodyElement.addEventListener('stepMove', waitToDo(move));
  bodyElement.addEventListener('transitionend', waitToDo(emitChange.bind(this, 'moving')));

  function emitChange(changeType, changedProperties){
    var changeEventData = {
      position: body.getPosition(),
      box: bodyElement.getBoundingClientRect()
    };

    changeEventData = _.assign(changeEventData, changedProperties)

    var changeEvent = new CustomEvent(changeType, {detail: changeEventData});
    bodyElement.dispatchEvent(changeEvent);
  }

  function tween(){
    var position = this;
    var movement = new Tween(animator)
      .from(previous.x, previous.y)
      .to(position.x, position.y)
      .by(function(stepX, stepY){
        position.stepX = stepX;
        position.stepY = stepY;
        position.emitChange('moving');
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