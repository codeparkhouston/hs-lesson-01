
self.onmessage = function (msg) {
  runCode(msg.data);
  console.info(msg.data);
  self.postMessage({
    code: msg.data,
    result: 'yay!'
  });
};

self.onerror = function(){

};

function runCode (code) {
  eval(code);
  console.info(typeof watchMouse)
}
