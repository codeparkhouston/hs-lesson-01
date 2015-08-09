var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutationRecord) {
    console.info('Robot changed!');
  });
});

observer.observe(robotEl, { attributes : true, attributeFilter : ['style'] });
