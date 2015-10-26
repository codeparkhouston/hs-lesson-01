var objectNode = document.getElementById('card');
var getTemplate;

function show(object){
  return showCard(object, 'item-template', objectNode);
}

function showCard(object, templateName, mountNode, dataFormatter){
  var objectHTML = '';
  dataFormatter = dataFormatter || _dataFormatter;

  _initialize();
  _show();
  return mountNode.childNodes[0];

  function _show(){
    var html = _getItemHTML(object);
    mountNode.innerHTML = html;

    _animateAll(mountNode);

    return this;
  }

  function _initialize(){
    Object.observe(object, function(changes){
      changes.forEach(function(change){
        _update(change);
      });
    });
  }

  function _update(change){
    var element = mountNode.childNodes.item(0);
    var updatedElement = _getItemDOM(change.object);
    updatedElement.classList.remove('template');
    mountNode.replaceChild(updatedElement, element);
  }

  function _animateAll(mountNode){
    var justAddedElements = mountNode.getElementsByClassName('template');
    Array.prototype.forEach.call(justAddedElements, function(element){
      _animate(element);
    });
  }

  function _animate(element){
    _.defer(element.classList.remove.bind(element.classList, 'template'));
  }

  function _getItemDOM(listItemData){
    var itemHTML = _getItemHTML(listItemData);
    var placeholder = document.createElement('div');
    placeholder.innerHTML = itemHTML;
    return placeholder.childNodes.item(0);
  }

  function _getItemHTML(objectItemData){
    var itemHTML = getTemplateByName(templateName)(dataFormatter(objectItemData));
    return itemHTML;
  }

  function _dataFormatter(data){
    return data;
  }
}

getTemplate = _.memoize(function(templateName){
  var templateNode = document.getElementById(templateName).cloneNode(true);
  var templateString;

  templateNode.id = null;
  templateString = templateNode.outerHTML;
  return _.template(templateString);
});

function getTemplateByName(templateName){
  return getTemplate(templateName);
}
