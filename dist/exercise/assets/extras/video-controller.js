var checkpoints = [
  {
    identifier: 'opening-the-console',
    name: 'Opening the Console',
    start: 0,
    end: 64
  }, {
    identifier: 'first-line-of-code',
    name: 'First Line of Code',
    start: 64,
    end: 105
  }, {
    identifier: 'move-the-robot',
    name: 'Move the Robot',
    start: 105,
    end: 153
  }, {
    identifier: 'a-closer-look',
    name: 'A Closer Look',
    start: 153,
    end: 211
  }, {
    identifier: 'robot-error',
    name: 'What Else Can Our Robot Do?',
    start: 211,
    end: 258
  }, {
    identifier: 'robot-more-control',
    name: 'Move the Robot with More Control',
    start: 258,
    end: 322
  }, {
    identifier: 'robot-arguments',
    name: 'Giving the Robot More Information',
    start: 323,
    end: 374
  }, {
    identifier: 'robot-name',
    name: 'Name the Robot',
    start: 374,
    end: 415
  }, {
    identifier: 'robot-change',
    name: 'Change the Robot Picture',
    start: 415,
    end: 449
  }, {
    identifier: 'robot-other',
    name: 'Try to Tell the Robot to Do These!',
    start: 449,
    end: 462
  }, {
    identifier: 'conclusion',
    name: 'See You in Class!',
    start: 462,
    end: 479
  }
];
var defaultSettings = {
  playbackRate: 1.5,
  checkpoint: _.first(checkpoints).identifier
};

if(_.isNull(localStorage.getItem('videoData'))){
  localStorage.setItem('videoData', JSON.stringify(defaultSettings));  
}

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

if(location.hash.length){
  videoData.checkpoint = location.hash.replace('#', '');
}

makeSteps();

var player;


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
  updateStepsActive(videoData.checkpoint.identifier);
}

function makeStep(listElement, checkpoint, count){
  var stepElement = document.createElement('a');
  stepElement.href = '#' + checkpoint.identifier;
  stepElement.dataset.identifier = checkpoint.identifier;
  stepElement.dataset.fromTop = 42 * count;
  stepElement.className = 'list-group-item';
  stepElement.innerText = (count + 1) + '. ' + checkpoint.name;
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

function updateStepsActive(stepElement){
  if(!_.isElement(stepElement)){
    stepElement = document.querySelector('a.list-group-item[href="#' + stepElement + '"]')
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
  player.cueVideoById({videoId: '2s9doCDVQhc', startSeconds: checkpoint.start, endSeconds: checkpoint.end});
  player.setPlaybackRate(videoData.playbackRate);
}

function play(checkpoint){
  player.loadVideoById({videoId: '2s9doCDVQhc', startSeconds: checkpoint.start, endSeconds: checkpoint.end});
  setPlaying();
  player.setPlaybackRate(videoData.playbackRate);
}

function setPlayNext(){
  var iframe = player.getIframe();
  iframe.parentNode.classList.add('play-next');
  iframe.parentNode.addEventListener('click', player.playVideo.bind(player));
}

function setPlaying(){
  var iframe = player.getIframe();
  iframe.parentNode.classList.remove('play-next');
  iframe.parentNode.removeEventListener('click', player.playVideo.bind(player));
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
