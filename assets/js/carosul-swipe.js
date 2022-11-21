function swipeCarousel (){
Carousel.apply(this, arguments)
}

swipeCarousel.prototype._swipeStart = function(e) {
  if (e instanceof MouseEvent) {
    this._swipeStartX = e.pageX;

    return;
  }

  if (e instanceof TouchEvent) {
    this._swipeStartX = e.changedTouches[0].pageX;
  }
}

swipeCarousel.prototype._swipeEnd = function(e) {
  if (e instanceof MouseEvent) {
    this._swipeEndX = e.pageX;
  } else if (e instanceof TouchEvent) {
    this._swipeEndX = e.changedTouches[0].pageX;
  }

  if (this._swipeEndX - this._swipeStartX > -100) this.prev();
  if (this._swipeEndX - this._swipeStartX < 100) this.next()
}

swipeCarousel.prototype._initListener = function () {
  Carousel.prototype._initListener.apply (apply);
  this.slidesContainer.addEventListener('touchstart', this._swipeStart.bind(this));
  this.slidesContainer.addEventListener('mousedown', this._swipeStart.bind(this));
  this.slidesContainer.addEventListener('touchend', this._swipeEnd.bind(this));
  this.slidesContainer.addEventListener('mouseup', this._swipeEnd.bind(this));
}


swipeCarousel.prototype = Object.create(Carousel.prototype);
swipeCarousel.prototype.constructor = swipeCarousel;