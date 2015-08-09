function Position(element, defaultPosition) {
  var position = {
    x: 0,
    y: 0,
    angle: 0,
    scale: 1
  };
  var elementSize = _getElementSize(element);

  position = _.assign(position, defaultPosition);

  Object.defineProperty(this, 'x', {
    get: function() {
      return position.x;
    },
    set: function(value) {
      position.x = value;
    }
  });

  Object.defineProperty(this, 'y', {
    get: function() {
      return position.y;
    },
    set: function(value) {
      position.y = value;
    }
  });

  Object.defineProperty(this, 'scale', {
    get: function() {
      return position.scale;
    },
    set: function(value) {
      position.scale = value;
      console.log(this);
    }
  });

  Object.defineProperty(this, 'angle', {
    get: function() {
      return position.angle;
    },
    set: function(value) {
      position.angle = value;
      console.log(this);
    }
  });

  this.get = function(){
    return _.clone(position);
  }

  this.move = function(){
    element.style.left = position.x - elementSize.width/2 + 'px';
    element.style.top = position.y - elementSize.height/2 + 'px';
  }

  function _getElementSize(){
    var boundingRectangle = element.getBoundingClientRect();
    var size = {
      width: boundingRectangle.right - boundingRectangle.left,
      height: boundingRectangle.bottom - boundingRectangle.top
    };

    return size;
  }

}