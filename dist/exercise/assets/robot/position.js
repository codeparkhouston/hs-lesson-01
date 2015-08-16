function Position(body, defaultPosition) {
  var position = {
    x: body.size.width/2,
    y: body.size.height/2,
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

  body.element.addEventListener('xyChange', _.debounce(orient, 100).bind(this));
  body.element.addEventListener('orientationChange', _.debounce(move, 100));

  function emitChange(changeType, changedProperties){
    var changeEventData = {
      position: position
    };

    changeEventData = _.assign(changeEventData, changedProperties)

    var changeEvent = new CustomEvent(changeType, {detail: changeEventData});
    body.element.dispatchEvent(changeEvent);
  }

  function orient(){
    this.angle = calculateAngle(position);
    this.scale = calculateScale(position);
  }

  function move(){
    var transform = getTransform(position);
    var changeEventData = {};
    body.element.style.left = position.x - body.size.width/2 + 'px';
    body.element.style.top = position.y - body.size.height/2 + 'px';
    body.img.style.transform = transform;

    _.delay(function(){
      changeEventData.box = body.element.getBoundingClientRect();
      emitChange('move', changeEventData);
    }, 100);

  }

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
    return distance / Math.abs(distance);
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