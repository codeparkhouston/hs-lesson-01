function Tween(animator){
  this.animator = animator;
  return this;
}

Tween.prototype.from = function from(x, y){
  this.from = {
    x: x,
    y: y
  };
  this.current = {
    x: x,
    y: y
  };

  return this;
}

Tween.prototype.to = function to(x, y){
  this.to = {
    x: x,
    y: y
  };

  return this;
}

Tween.prototype.by = function by(stepFunction){
  var tween = this;
  return this.animator.add(stepToAdd, 'tweening of ' + stepFunction.name);

  function stepToAdd(progress, deltaT){
    var deltaPosition = calcDelta(tween.from, tween.to, deltaT);

    tween.current.x = tween.current.x + deltaPosition.x;
    tween.current.y = tween.current.y + deltaPosition.y;

    if(tween.isDestinationReached()){
      stepFunction(tween.to.x, tween.to.y, true);
      return false;
    }
    stepFunction(tween.current.x, tween.current.y);

    return true;
  }

  // default linear easing.
  function calcDelta(origin, destination, deltaT, fullT){
    var fullT = fullT || 100;
    var stepProportion = deltaT/fullT;

    var deltaX = stepProportion * (destination.x - origin.x);
    var deltaY = stepProportion * (destination.y - origin.y);

    return {
      x: deltaX,
      y: deltaY
    };
  }
}

Tween.prototype.isDestinationReached = function isDestinationReached(){

  return calcIsReached(this, 'x') && calcIsReached(this, 'y');

  function calcIsReached(tween, xOrY){
    return (tween.to[xOrY] - tween.current[xOrY]) * Math.sign(tween.to[xOrY] - tween.from[xOrY]) <= 0;
  }
}