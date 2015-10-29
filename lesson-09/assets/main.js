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
    _observe(object);

    _.each(object, function(value, key){
      if(_.isObject(value) || _.isArray(value)){
        _observe(value);
      }
    });
  }

  function _observe(thingToWatch){
    thingToWatch.constructor.observe(thingToWatch, function(changes){
      changes.forEach(function(change){
        _update(object);
      });
    });
  }

  function _update(change){
    var element = mountNode.childNodes.item(0);
    var updatedElement = _getItemDOM(change);
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

  templateNode.setAttribute('id', '');
  templateString = htmlUnescape(templateNode.outerHTML);
  return _.template(templateString, {variable: 'character'});
});

function getTemplateByName(templateName){
  return getTemplate(templateName);
}

function htmlUnescape(value){
  return String(value)
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
}
