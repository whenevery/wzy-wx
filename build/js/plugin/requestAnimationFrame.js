window.requestAnimationFrame = window.requestAnimationFrame || function(func){
  setTimeout(func , 1000/60);
};