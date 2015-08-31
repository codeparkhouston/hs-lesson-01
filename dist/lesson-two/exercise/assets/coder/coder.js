var sandbox = null;
// reinitializing sandbox may not be necessary.
function _initCodeBotSandbox() {
  if (sandbox !== null) {
    sandbox.terminate();
  }

  sandbox = new Worker('./assets/coder/worker.js');

  sandbox.addEventListener('message', function(e) {
    _initCodeBotSandbox();
    console.log(e.data.code + ' was run.');
  });

  sandbox.addEventListener('error', function(e) {
    _initCodeBotSandbox();
    console.log(e.message);
  });
}

function runCode(){
  sandbox.postMessage(editor.getValue());
}

_initCodeBotSandbox();
editor.runCode = runCode;