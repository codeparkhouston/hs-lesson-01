function videoController(name, options, checkpoints){

  var videoData = {
    get playbackRate() {
      return helperGetter('videoData', 'playbackRate');
    },
    set playbackRate(value) {
      helperSetter('videoData', 'playbackRate', value);
    },
    get checkpoint() {
      var identifier = helperGetter('videoData', 'checkpoint');
      return _.findWhere(checkpoints, {identifier: identifier});
    },
    set checkpoint(value) {
      if(_.findWhere(checkpoints, {identifier: value})){
        helperSetter('videoData', 'checkpoint', value);
      }
    },
    get nextCheckpoint() {
      var identifier = helperGetter('videoData', 'checkpoint');
      var currentIndex = _.findIndex(checkpoints, {identifier: identifier});
      if(_.isObject(checkpoints[currentIndex + 1])){
        return checkpoints[currentIndex + 1];
      } else if (currentIndex == checkpoints.length - 1) {
        return _.first(checkpoints);
      } else {
        videoData.checkpoint = _.first(checkpoints).identifier;
        return _.first(checkpoints);
      }
    }
  };


  initializeVideoData();
  var videoStuff = {};

  var videoIframe = initializeIframe(name);
  var checklistElement = makeSteps();
  initializeCheckpoint();

  var player;

  videoStuff.setupPlayer = onYouTubeIframeAPIReady;

  return videoStuff;

  function initializeCheckpoint(){
    if(location.hash.length){
      videoData.checkpoint = location.hash.replace('#', '');
    } else if(videoData.checkpoint){
      location.hash = '#' + videoData.checkpoint.identifier;
    }
  }


  function initializeIframe(name){
    var instructionsIframe = document.getElementById(name)
    instructionsIframe.src = "https://www.youtube.com/embed/" + options.videoId + "?enablejsapi=1&origin=" + location.origin;

    return instructions;
  }


  function initializeVideoData(){
    var defaultSettings = {
      playbackRate: 1.5,
      checkpoint: _.first(checkpoints).identifier
    };

    if(_.isNull(localStorage.getItem('videoData'))){
      localStorage.setItem('videoData', JSON.stringify(defaultSettings));  
    }
  }

  function helperGetter(dataName, dataKey){
    var stored = JSON.parse(localStorage.getItem(dataName));
    return stored[dataKey];
  }

  function helperSetter(dataName, dataKey, value){
    var stored = JSON.parse(localStorage.getItem(dataName));
    if(stored[dataKey] != value){
      stored[dataKey] = value;
      localStorage.setItem(dataName, JSON.stringify(stored));
    }
  }

  function onYouTubeIframeAPIReady() {
    player = new YT.Player('instructions', {
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange,
        'onPlaybackRateChange': onPlaybackRateChange
      }
    });
  }

  function makeSteps(){
    var listElement = document.getElementById('checklist');
    _.each(checkpoints, _.partial(makeStep, listElement));
    updateStepsActive(videoData.checkpoint.identifier, listElement);

    return listElement;
  }

  function makeStep(listElement, checkpoint, count){
    var stepElement = document.createElement('a');
    stepElement.href = '#' + checkpoint.identifier;
    stepElement.dataset.identifier = checkpoint.identifier;
    stepElement.dataset.fromTop = 42 * count;
    stepElement.className = 'list-group-item';
    stepElement.innerText = checkpoint.name;
    stepElement.addEventListener('click', _.partial(setCurrent, checkpoint.identifier));
    listElement.appendChild(stepElement);
  }

  function setCurrent(identifier, clickEvent){
    var actives;
    clickEvent.preventDefault();

    if(videoData.checkpoint == identifier){
      return;
    }
    updateStepsActive(this);
    videoData.checkpoint = identifier;
    play(videoData.checkpoint);
    history.pushState({checkpoint: videoData.checkpoint}, videoData.checkpoint.name, '#' + videoData.checkpoint.identifier);
  }

  function updateStepsActive(stepElement, checklistElement){
    if(!_.isElement(stepElement)){
      stepElement = checklistElement.querySelector('a.list-group-item[href="#' + stepElement + '"]')
    }
    actives = stepElement.parentNode.getElementsByClassName('active');
    _.each(actives, function(active){
      active.classList.remove('active');
    });
    stepElement.classList.add('active');
    stepElement.parentNode.scrollTop = stepElement.dataset.fromTop;
  }

  function onPlayerReady(){
    cueCurrent();
  }

  function onPlaybackRateChange(){
    videoData.playbackRate = player.getPlaybackRate();
  }

  function cueCurrent(){
    cue(videoData.checkpoint);
  }

  function cueNext(){
    cue(videoData.nextCheckpoint);
    updateStepsActive(videoData.nextCheckpoint.identifier);
  }

  function cue(checkpoint){
    player.cueVideoById({videoId: options.videoId, startSeconds: checkpoint.start, endSeconds: checkpoint.end});
    player.setPlaybackRate(videoData.playbackRate);
  }

  function play(checkpoint){
    player.loadVideoById({videoId: options.videoId, startSeconds: checkpoint.start, endSeconds: checkpoint.end});
    setPlaying();
    player.setPlaybackRate(videoData.playbackRate);
  }

  function setPlayNext(){
    videoIframe.parentNode.classList.add('play-next');
    videoIframe.parentNode.addEventListener('click', player.playVideo.bind(player));
  }

  function setPlaying(){
    videoIframe.parentNode.classList.remove('play-next');
    videoIframe.parentNode.removeEventListener('click', player.playVideo.bind(player));
  }

  function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && player.getCurrentTime() >= videoData.checkpoint.end) {
      setPlaying();
      videoData.checkpoint = videoData.nextCheckpoint.identifier;
      history.pushState({checkpoint: videoData.checkpoint}, videoData.checkpoint.name, '#' + videoData.checkpoint.identifier);
    }
    if (event.data == YT.PlayerState.PAUSED && player.getCurrentTime() >= videoData.checkpoint.end) {
      var nextCheckpoint = videoData.nextCheckpoint;
      if(!_.isUndefined(nextCheckpoint)){
        cueNext();
        setPlayNext();
      }
    }
  }
}
