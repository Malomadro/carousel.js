const container = document.querySelector('.carousel')
const slides = container.querySelectorAll('.slide')
const indicatorContainer = container.querySelector('#indicators-container')
const indicators = container.querySelectorAll('.indicator')
const pauseBtn = container.querySelector('#pause')
const prevBtn = container.querySelector('#prev')
const nextBtn = container.querySelector('#next')



let timeId = null;
let slideNol = 0;
let isPlay= true;



function goToSlide(n) {
  slides[slideNol].classList.toggle ('active');
  indicators[slideNol].classList.toggle('active');
  slideNol = (n + slides.length) % slides.length;
  slides[slideNol].classList.toggle ('active');
  indicators[slideNol].classList.toggle('active');
}
function goToPrev(){
  goToSlide(slideNol -1)
}

function goToNext() {
  goToSlide(slideNol +1)
}

function pause() {
  pauseBtn.innerHTML = '<i class="fa-regular fa-circle-play"></i>';
  isPlay = false
  clearInterval(timeId)
  
}

function play() {
  pauseBtn.innerHTML = '<i class="fa-regular fa-circle-pause"></i>';
  isPlay = true;
  timeId = setInterval(goToNext, 2000)
  
}

function pausePlay() {
  if(isPlay){
    pause() 
  }else{
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

function indicate(e){
  const target = e.target;
  if (target && target.classList.contains('indicator')) {
    pause()
    goToSlide(+target.dataset.slideTo);
  }
}


function pressKey(e){
  if (e.code === 'ArrowLeft') goToPrev();
  if (e.code === 'ArrowRight') goToNext();
  if (e.code === 'Space') pausePlay();
}


pauseBtn.addEventListener('click', pausePlay);
prevBtn.addEventListener('click', Prev);
nextBtn.addEventListener('click', Next);
document.addEventListener('keydown', pressKey)
indicatorContainer.addEventListener('click', indicate)

timeId = setInterval(goToNext, 3000);



