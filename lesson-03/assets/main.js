function show(character){
  character.draw = function(){
    var image = document.createElement('img');
    var name = document.createElement('h3');

    image.src = character.image;
    name.innerText = character.name;
    document.body.innerHTML = image.outerHTML;
    document.body.appendChild(name);
  }
}
