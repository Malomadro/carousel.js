class Carousel {
  constructor(p) {
    const setting = { ...{ containerID: '#carousel', slideID: '.carousel-slide', interval: 5000 }, ...p };
    this.container = document.querySelector(setting.containerID);
    this.slidesContainer = this.container.querySelector('.carousel-slides__container');
    this.slides = this.slidesContainer.querySelectorAll(setting.slideID);
    this.interval = setting.interval;
  }
  _initProps() {
    this.isPlay = true;
    this.slideNol = 0;
    this.SLIDE_COUNT = this.slides.length;
    this.FA_PAUSE = '<i class="fa-regular fa-circle-pause"></i>';
    this.FA_PLAY = '<i class="fa-regular fa-circle-play"></i>';
    this.FA_PREV = '<i class="fa-solid fa-arrow-left"></i>';
    this.FA_NEXT = '<i class="fa-solid fa-arrow-right"></i>';
  }

  _initControls() {
    const controls = document.createElement('div');
    const PREV = `<span class="carousel-control" id="prev">${this.FA_PREV}</span>`
    const PAUSE = `<span class="carousel-control" id="pause">${this.isPlay ? this.FA_PAUSE : this.FA_PLAY}</span>`;
    const NEXT = `<span class="carousel-control" id="next">${this.FA_NEXT}</span>`

    controls.setAttribute('class', 'carousel-controls__container');
    controls.innerHTML = PREV + PAUSE + NEXT;

    this.container.append(controls);
    this.pauseBtn = this.container.querySelector('#pause')
    this.prevBtn = this.container.querySelector('#prev')
    this.nextBtn = this.container.querySelector('#next')
  }

  _initIndicators() {
    const indicators = document.createElement('div');

    for (let i = 0; i < this.SLIDE_COUNT; i++) {
      const indicator = document.createElement('div');
      indicator.setAttribute('class', i !== 0 ? 'carousel-indicator' : 'carousel-indicator active');
      indicator.dataset.slideTo = `${i}`;
      indicators.append(indicator)
    }

    indicators.setAttribute('class', 'carousel-indicators__container');

    this.container.append(indicators);
    this.indicatorContainer = this.container.querySelector('.carousel-indicators__container')
    this.indicators = this.container.querySelectorAll('.carousel-indicator')
  }

  _goToSlide(n) {
    this.slides[this.slideNol].classList.toggle('active');
    this.indicators[this.slideNol].classList.toggle('active');
    this.slideNol = (n + this.SLIDE_COUNT) % this.SLIDE_COUNT;
    this.slides[this.slideNol].classList.toggle('active');
    this.indicators[this.slideNol].classList.toggle('active');
  }

  _goToPrev() {
    this._goToSlide(this.slideNol - 1)
  }

  _goToNext() {
    this._goToSlide(this.slideNol + 1)
  }

  _tick(flag = true) {
    if (!flag) return;
    this.timeId = setInterval(this._goToNext.bind(this), this.interval);
  }

  pause() {
    this.pauseBtn.innerHTML = this.FA_PLAY;
    this.isPlay = false;
    clearInterval(this.timeId);
  }

  play() {
    this.pauseBtn.innerHTML = this.FA_PAUSE;
    this.isPlay = true;
    this._tick();
  }

  pausePlay() {
    this.isPlay ? this.pause() : this.play();
  }

  prev() {
    this._goToPrev()
    this.pause()
  }

  next() {
    this._goToNext();
    this.pause();
  }

  _indicate(e) {
    const target = e.target;
    if (target && target.classList.contains('carousel-indicator')) {
      this.pause()
      this._goToSlide(+target.dataset.slideTo);
    }
  }

  _pressKey(e) {
    if (e.code === 'ArrowLeft') this._goToPrev();
    if (e.code === 'ArrowRight') this._goToNext();
    if (e.code === 'Space') this.pausePlay();
  }

  _initListener() {
    this.indicatorContainer.addEventListener('click', this._indicate.bind(this));
    this.pauseBtn.addEventListener('click', this.pausePlay.bind(this));
    this.prevBtn.addEventListener('click', this.prev.bind(this));
    this.nextBtn.addEventListener('click', this.next.bind(this));
    this.slidesContainer.addEventListener('mouseenter', this.pause.bind(this));
    this.slidesContainer.addEventListener('mouseleave', this.play.bind(this));
    document.addEventListener('keydown', this._pressKey.bind(this));
  }

  init() {
    this._initProps();
    this._initControls();
    this._initIndicators();
    this._initListener();
    this._tick(this.isPlay)
  }
}

export default Carousel;