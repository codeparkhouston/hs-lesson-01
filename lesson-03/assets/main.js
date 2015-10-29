var listNode = document.getElementById('list');
var getTemplate;

function show(list){
  showList(list, 'item-template', listNode, bookDataFormatter);
  return 'Your list is now showing!';
}

function showList(list, templateName, mountNode, dataFormatter){
  var listHTML = '';
  dataFormatter = dataFormatter || _dataFormatter;

  _initialize();
  _show();
  return;

  function _show(){
    var html = _getListHTML(list);
    mountNode.innerHTML = html;

    _animateAll(mountNode);

    return this;
  }

  function _initialize(){
    var changeDOM = {
      update: _update,
      add: _add,
      delete: _delete
    };

    Array.observe(list, function(changes){
      changes.forEach(function(change){
        _show();
      });
    });
  }

  function _update(change){
    var element = mountNode.childNodes.item(change.name);
    var updatedElement = _getItemDOM(change.object[change.name]);
    updatedElement.classList.remove('template');
    mountNode.replaceChild(updatedElement, element);
  }

  function _add(change){
    var element = _getItemDOM(change.object[change.name]);
    mountNode.appendChild(element);
    _animate(element);
  }

  function _delete(change){
    var element = mountNode.childNodes.item(change.name);
    element.remove();
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

  function _getListHTML(list){
    listHTML = '';
    list.forEach(_buildListHTML);
    return listHTML;
  }

  function _getItemDOM(listItemData){
    var itemHTML = _getItemHTML(listItemData);
    var placeholder = document.createElement('div');
    placeholder.innerHTML = itemHTML;
    return placeholder.childNodes.item(0);
  }

  function _buildListHTML(listItemData){
    listHTML += _getItemHTML(listItemData);
  }

  function _getItemHTML(listItemData){
    var itemHTML = getTemplateByName(templateName)(dataFormatter(listItemData));
    return itemHTML;
  }

  function _dataFormatter(data){
    return data;
  }
}

function bookDataFormatter(data){
  return {name: data};
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
