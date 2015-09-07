
self.onmessage = function (msg) {
  var canRun;
  if(msg.data.type == 'runCode'){
    canRun = runCode(msg.data.code);

    if(canRun){
      self.postMessage({
        code: msg.data.code,
        result: 'yay!'
      });
    }
  }
};

self.onerror = function(){

};

function runCode (code) {
  eval(code);
  return typeof watchMouse == 'function';
}
