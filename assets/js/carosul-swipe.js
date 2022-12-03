import Carousel from './carousel.js'

class SwipeCarousel extends Carousel {

  _initListener() {
    super._initListener();
    this.slidesContainer.addEventListener('touchstart', this._swipeStart.bind(this));
    this.slidesContainer.addEventListener('mousedown', this._swipeStart.bind(this));
    this.slidesContainer.addEventListener('touchend', this._swipeEnd.bind(this));
    this.slidesContainer.addEventListener('mouseup', this._swipeEnd.bind(this));
  }

  _swipeStart(e) {
    if (e instanceof MouseEvent) {
      this._swipeStartX = e.pageX;

      return;
    }

    if (e instanceof TouchEvent) {
      this._swipeStartX = e.changedTouches[0].pageX;
    }
  }

  _swipeEnd(e) {
    if (e instanceof MouseEvent) {
      this._swipeEndX = e.pageX;
    } else if (e instanceof TouchEvent) {
      this._swipeEndX = e.changedTouches[0].pageX;
    }

    if (this._swipeEndX - this._swipeStartX > -100) this.prev();
    if (this._swipeEndX - this._swipeStartX < 100) this.next()
  }
}

export default SwipeCarousel;