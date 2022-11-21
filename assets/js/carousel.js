function Carousel() {
  this.container = document.querySelector('.carousel')
  this.slidesContainer = this.container.querySelector('.carousel-slides__container')
  this.slides = this.slidesContainer.querySelectorAll('.carousel-slide')
  this.indicatorContainer = this.container.querySelector('#indicators-container')
  this.indicators = this.container.querySelectorAll('.carousel-indicator')
  this.pauseBtn = this.container.querySelector('#pause')
  this.prevBtn = this.container.querySelector('#prev')
  this.nextBtn = this.container.querySelector('#next')
}

Carousel.prototype = {
  _initProps(){
    this.SLIDE_COUNT = this.slides.length;
    this.FA_PAUSE = '<i class="fa-regular fa-circle-pause"></i>';
    this.FA_PLAY = '<i class="fa-regular fa-circle-play"></i>';
  
    this.timeId = null;
    this.slideNol = 0;
    this.isPlay = true;
    this.interval = 3000;
    this._swipeStartX = null;
    this._swipeEndX = null;
  },


  _goToSlide(n) {
    this.slides[this.slideNol].classList.toggle('active');
    this.indicators[this.slideNol].classList.toggle('active');
    this.slideNol = (n + this.SLIDE_COUNT) % this.SLIDE_COUNT;
    this.slides[this.slideNol].classList.toggle('active');
    this.indicators[this.slideNol].classList.toggle('active');
  },

  _goToPrev() {
    this._goToSlide(this.slideNol - 1)
  },

  _goToNext() {
    this._goToSlide(this.slideNol + 1)
  },

  pause() {
    console.log(this.isPlay);
    this.pauseBtn.innerHTML = this.FA_PLAY;
    this.isPlay = false;
    clearInterval(this.timeId);
  },

  play() {
    console.log(this.isPlay);
    this.pauseBtn.innerHTML = this.FA_PAUSE;
    this.isPlay = true;
    this.timeId = setInterval(this._goToNext.bind(this), this.interval)
  },

  pausePlay() {
    this.isPlay ? this.pause() : this.play();

  },

  prev() {
    this._goToPrev()
    this.pause()
  },

  next() {
    this._goToNext();
    this.pause();
  },

  _indicate(e) {
    const target = e.target;
    if (target && target.classList.contains('carousel-indicator')) {
      this.pause()
      this._goToSlide(+target.dataset.slideTo);
    }
  },

  _pressKey(e) {
    if (e.code === 'ArrowLeft') this._goToPrev();
    if (e.code === 'ArrowRight') this._goToNext();
    if (e.code === 'Space') this.pausePlay();
  },



  _initListener() {

    this.indicatorContainer.addEventListener('click', this._indicate.bind(this));
    this.pauseBtn.addEventListener('click', this.pausePlay.bind(this));
    this.prevBtn.addEventListener('click', this.prev.bind(this));
    this.nextBtn.addEventListener('click', this.next.bind(this));
    document.addEventListener('keydown', this._pressKey.bind(this));
  },
  init() {
    this._initProps();
    this._initListener();
    this.timeId = setInterval(this._goToNext.bind(this), this.interval);
  }

}
Carousel.prototype.conctructor = Carousel;
