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

  function Prev() {
    goToPrev()
    pause()
  }

  function Next() {
    goToNext();
    pause();
  }

  function indicate(e) {
    const target = e.target;
    if (target && target.classList.contains('indicator')) {
      pause()
      goToSlide(+target.dataset.slideTo);
    }
  }

  function pressKey(e) {
    if (e.code === 'ArrowLeft') goToPrev();
    if (e.code === 'ArrowRight') goToNext();
    if (e.code === 'Space') pausePlay();
  }

  function initListener() {
    indicatorContainer.addEventListener('click', indicate)
    pauseBtn.addEventListener('click', pausePlay);
    prevBtn.addEventListener('click', Prev);
    nextBtn.addEventListener('click', Next);
    document.addEventListener('keydown', pressKey)
  }
  function init() {
    initListener()
    timeId = setInterval(goToNext, interval);
  }

  init()

}())