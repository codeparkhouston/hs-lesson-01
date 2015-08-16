function Position(body) {
  var bodySize = body.getSize();
  var bodyElement = body.getElement();
  var previous = {};
  var position = {
    x: bodySize.width/2,
    y: bodySize.height/2,
    angle: 0,
    scale: 1
  };

  bodyElement.addEventListener('transitionend', function(transitionEvent){
    var changeEventData = {
      box: bodyElement.getBoundingClientRect(),
      elapsedTime: transitionEvent.elapsedTime,
      propertyName: transitionEvent.propertyName
    };
    emitChange('moved', changeEventData);
  });

  Object.defineProperty(this, 'x', {
    get: function() {
      return position.x;
    },
    set: function(value) {
      previous.x = position.x;
      position.x = value;
      emitChange('xyChange');
    }
  });

  Object.defineProperty(this, 'y', {
    get: function() {
      return position.y;
    },
    set: function(value) {
      previous.y = position.y;
      position.y = value;
      emitChange('xyChange');
    }
  });

  Object.defineProperty(this, 'scale', {
    get: function() {
      return position.scale;
    },
    set: function(value) {
      position.scale = value;
      emitChange('orientationChange');
    }
  });

  Object.defineProperty(this, 'angle', {
    get: function() {
      return position.angle;
    },
    set: function(value) {
      position.angle = value;
      emitChange('orientationChange');
    }
  });

  this.get = function(){
    return _.clone(position);
  }

  bodyElement.addEventListener('xyChange', _.debounce(orient, 100).bind(this));
  bodyElement.addEventListener('orientationChange', _.debounce(body.animateMove, 100));

  function emitChange(changeType, changedProperties){
    var changeEventData = {
      position: position
    };

    changeEventData = _.assign(changeEventData, changedProperties)

    var changeEvent = new CustomEvent(changeType, {detail: changeEventData});
    bodyElement.dispatchEvent(changeEvent);
  }

  function orient(){
    this.angle = calculateAngle(previous, position);
    this.scale = calculateScale(previous, position);
  }

  function getDirection(distance) {
    return Math.sign(distance);
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