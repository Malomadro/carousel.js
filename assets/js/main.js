(function () {
  const container = document.querySelector('.carousel')
  const slides = container.querySelectorAll('.carousel-slide')
  const indicatorContainer = container.querySelector('#indicators-container')
  const indicators = container.querySelectorAll('.carousel-indicator')
  const pauseBtn = container.querySelector('#pause')
  const prevBtn = container.querySelector('#prev')
  const nextBtn = container.querySelector('#next')

  const SLIDE_COUNT = slides.length;
  const FA_PAUSE = '<i class="fa-regular fa-circle-pause"></i>';
  const FA_PLAY = '<i class="fa-regular fa-circle-play"></i>';

  let timeId = null;
  let slideNol = 0;
  let isPlay = true;
  let interval = 3000;
  let swipeStartX = null;
  let swipeEndX = null;

  function goToSlide(n) {
    slides[slideNol].classList.toggle('active');
    indicators[slideNol].classList.toggle('active');
    slideNol = (n + SLIDE_COUNT) % SLIDE_COUNT;
    slides[slideNol].classList.toggle('active');
    indicators[slideNol].classList.toggle('active');
  }

  function goToPrev() {
    goToSlide(slideNol - 1)
  }

  function goToNext() {
    goToSlide(slideNol + 1)
  }

  function pause() {
    pauseBtn.innerHTML = FA_PLAY;
    isPlay = false
    clearInterval(timeId)
  }

  function play() {
    pauseBtn.innerHTML = FA_PAUSE;
    isPlay = true;
    timeId = setInterval(goToNext, interval)
  }

  function pausePlay() {
    if (isPlay) {
      pause()
    } else {
      play()
    }
  }

  function prev() {
    goToPrev()
    pause()
  }

  function next() {
    goToNext();
    pause();
  }

  function indicate(e) {
    const target = e.target;
    if (target && target.classList.contains('carousel-indicator')) {
      pause()
      goToSlide(+target.dataset.slideTo);
    }
  }

  function pressKey(e) {
    if (e.code === 'ArrowLeft') goToPrev();
    if (e.code === 'ArrowRight') goToNext();
    if (e.code === 'Space') pausePlay();
  }


  function swipeStart(e) {
    if (e instanceof MouseEvent){
      swipeStartX = e.pageX;

      return;
    }

    if (e instanceof TouchEvent ) {
      swipeStartX = e.changedTouches[0].pageX;
    }
  }

  function swipeEnd(e) {
    if (e instanceof MouseEvent){
      swipeEndX = e.pageX;
    }else if (e instanceof TouchEvent ) {
      swipeEndX = e.changedTouches[0].pageX;
    }

    if (swipeEndX - swipeStartX > -100) prev();
    if (swipeEndX - swipeStartX < 100) next()
  }

  function initListener() {
    container.addEventListener('touchstart', swipeStart)
    container.addEventListener('mousedown', swipeStart)
    container.addEventListener('touchend', swipeEnd)
    container.addEventListener('mouseup', swipeEnd)
    indicatorContainer.addEventListener('click', indicate)
    pauseBtn.addEventListener('click', pausePlay);
    prevBtn.addEventListener('click', prev);
    nextBtn.addEventListener('click', next);
    document.addEventListener('keydown', pressKey)
  }
  function init() {
    initListener()
    timeId = setInterval(goToNext, interval);
  }

  init()

}())