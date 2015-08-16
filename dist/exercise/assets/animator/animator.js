function Animator(){
  var framesHistory = [];
  var frameActions =[];
  var pause = true;
  var animationId;
  var lastTime;
  var start;

  var animatorMethods = {
    startLoop: startLoop,
    endLoop: endLoop,
    log: log,
    unlog: unlog,
    add: add,
    remove: remove,
    isRunning: isRunning
  };

  return animatorMethods;

  function isRunning(){
    return !pause;
  }

  function log(){
    return add(console.log.bind(console), 'console.log');
  }

  function unlog(){
    return remove(console.log.bind(console), 'console.log');
  }

  function add(animateFunction, functionName){
    var functionName = animateFunction.name || functionName;
    frameActions.push(animateFunction);

    return functionName + ' added to render.';
  }

  function remove(animateFunction, functionName){
    var animateIndex = frameActions.indexOf(animateFunction);
    var removedAction = frameActions.splice(animateIndex, 1);
    var functionName = removedAction[0].name || functionName;

    return functionName + ' removed from render.';
  }

  function endLoop(){
    if(!pause){
      pause = true;
      return 'Animation loop ended.';
    }

    return 'Animation loop already ended.';
  }

  function render(progress, deltaT){
    var frameResults = _.map(frameActions, function(frameAction){
      var continueFrame = frameAction(progress, deltaT);
      if(continueFrame === false){
        remove(frameAction);
      }
    });
  }

  function startLoop(){
    if(pause){
      pause = false;
      animationId = requestAnimationFrame(step, render);
    }
  }

  function step(now){
    var progress;

    if(pause){
      start = null;
      pause = true;
      cancelAnimationFrame(animationId);
      return;
    }

    if(!start){
      start = now;
      lastTime = now;
    }

    progress = now - start;
    deltaT = now - lastTime;

    render(progress, deltaT);
    animationId = requestAnimationFrame(step, render);

    lastTime = now;
  }

}