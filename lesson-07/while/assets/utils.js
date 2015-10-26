var messages = [];

show(messages);

function showMessage(message){
  _.delay(function(){
    messages.push(message);
  }, 1000);
}