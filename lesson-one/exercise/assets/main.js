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

var robotElement = document.getElementById('robot');
var sceneElement = document.getElementById('scene');

var scene = new Scene(sceneElement);
var robot = new Robot(robotElement);
var animator = new Animator();

animator.startLoop();

videoController('instructions', {videoId: '2s9doCDVQhc', checkpoints: checkpoints});