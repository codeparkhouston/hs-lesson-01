function Position(body, defaultPosition) {
  var position = {
    x: 0,
    y: 0,
    angle: 0,
    scale: 1
  };
  var previous = {};

  position = _.assign(position, defaultPosition);


  Object.defineProperty(this, 'x', {
    get: function() {
      return position.x;
    },
    set: function(value) {
      previous.x = position.x;
      position.x = value;
      this.emitChange('xyChange', ['x']);
    }
  });

  Object.defineProperty(this, 'y', {
    get: function() {
      return position.y;
    },
    set: function(value) {
      previous.y = position.y;
      position.y = value;
      this.emitChange('xyChange', ['y']);
    }
  });

  Object.defineProperty(this, 'scale', {
    get: function() {
      return position.scale;
    },
    set: function(value) {
      position.scale = value;
      this.emitChange('orientationChange', ['scale']);
    }
  });

  Object.defineProperty(this, 'angle', {
    get: function() {
      return position.angle;
    },
    set: function(value) {
      position.angle = value;
      this.emitChange('orientationChange', ['angle']);
    }
  });

  this.emitChange = function(changeType, changedProperties){
    var changeEventData = {
      position: position,
      changed: changedProperties
    };
    var changeEvent = new Event(changeType, changeEventData);
    body.element.dispatchEvent(changeEvent);
  }

  this.get = function(){
    return _.clone(position);
  }

  this.orient = function(){
    this.angle = calculateAngle(position);
    this.scale = calculateScale(position);
  }

  this.move = function(){
    var transform = getTransform(position);
    body.element.style.left = position.x - body.size.width/2 + 'px';
    body.element.style.top = position.y - body.size.height/2 + 'px';
    body.img.style.transform = transform;
  }

  body.element.addEventListener('xyChange', _.debounce(this.orient, 100).bind(this));
  body.element.addEventListener('orientationChange', _.debounce(this.move, 100).bind(this));

  function getTransform(position) {
    var transform = '';

    if(isNumber(position.angle)) {
      transform += 'rotate(' + position.angle + 'deg)';
    }
    if(isNumber(position.scale)) {
      transform += ' scaleX(' + position.scale + ')';
    }
    return transform;
  }

  function getDirection(distance) {
    return distance/Math.abs(distance);
  }

  function isNumber(number) {
    return typeof number == 'number' && number.toString() !== 'NaN'
  }

  function calculateAngle(destination) {
    var xDist = destination.x - previous.x;
    var yDist = previous.y - destination.y;

    if(xDist == 0){
      return getDirection(yDist) * 90;
    }

    return Math.atan(yDist/xDist) / Math.PI * 180;
  }

  function calculateScale(destination) {
    var xDist = destination.x - previous.x;

    return getDirection(xDist);
  }

}