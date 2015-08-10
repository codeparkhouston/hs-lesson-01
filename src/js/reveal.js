var Reveal = require('reveal');
window.jQuery = window.$ =  require('jquery');
require('bootstrap');


// Full list of configuration options available here: 
// https://github.com/hakimel/reveal.js#configuration 
Reveal.initialize({
  controls: true,
  progress: true,
  history: true,
  center: true,
  // default/cube/page/concave/zoom/linear/fade/none 
  transition: 'none'
});


var codes = document.querySelectorAll('pre code:not([data-manual-highlight])');
_.each(codes, function(code){
  Prism.highlightElement(code);
});

Reveal.addEventListener( 'slidechanged', function( slideChangeEvent ) {
  funkyToolTipBusiness( slideChangeEvent );
});

function funkyToolTipBusiness(slideChangeEvent){

  if(slideChangeEvent.currentSlide.dataset.assignPopovers){

    document.addEventListener('click', triggerOrHideToolip);

    if(slideChangeEvent.currentSlide.querySelectorAll('.tipped').length){
      showToolTips();
      return;
    }

    if(slideChangeEvent.currentSlide.querySelectorAll('.tip').length){
      $(slideChangeEvent.currentSlide.querySelectorAll('.tip')).each(function(iter, element){
        addToolTip(element, element.getAttribute('title'), slideChangeEvent.currentSlide.dataset.assignPopovers)
      });
      $('[data-toggle="tooltip"]').tooltip();
    }

  }else{
    $('[data-toggle="tooltip"]').tooltip('hide');
    document.removeEventListener('click', triggerOrHideToolip);
  }
}

function triggerOrHideToolip(clickEvent){
  if(!clickEvent.srcElement.classList.contains('tipped')){
    $('[data-toggle="tooltip"]').tooltip('hide');
  } else {
    $(clickEvent.srcElement).tooltip('show');
  }
}


function showToolTips(){
  $('[data-toggle="tooltip"]').each(function(iter, element){
    setTimeout(function(){
      $(element).tooltip('show');
    }, 1000)
  });
}

function addToolTip(element, label, popoverName){

  element.dataset.toggle = 'tooltip';
  element.dataset.container = '.present[data-assign-popovers='+popoverName+']';
  element.title = element.title || label;
  element.dataset.placement = element.dataset.placement || 'top';
  element.dataset.trigger = element.dataset.trigger || '';
  element.className += ' tipped';
}