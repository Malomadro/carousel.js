import SwipeCarousel from './carosul-swipe.js';

const slider = new SwipeCarousel({
  containerID: '#mycarousel',
  slideID: '.item',
  interval: 2000
})

slider.init()
