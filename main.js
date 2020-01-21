// Select all Elements

const player = document.querySelector(' .player');
const viewer = player.querySelector(' .viewer');
const progress = player.querySelector(' .progress');
const progressBar = player.querySelector(' .progress__filled');
const toggle = player.querySelector('.toggle');
const skipButons = player.querySelectorAll(' [data-skip]');
const ranges = player.querySelectorAll(' .player__slider');

// Functions we use 

function playVideo(){
    const method = viewer.paused ? 'play' : 'pause';
    viewer[method]();
}

function updateButton(e){
   const icon = this.paused ?  '❚❚' : '►' ;
   console.log(icon);
   toggle.textContent = icon ;
}

function skip(){
    viewer.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
    viewer[this.name] = this.value;
    console.log(viewer[this.name]);
  }

function handleProgress() {
    const percent = (viewer.currentTime / viewer.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
  }
  
function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * viewer.duration;
    viewer.currentTime = scrubTime;
  }

// EventListeners

player.addEventListener('click', playVideo);
viewer.addEventListener('play', updateButton);
viewer.addEventListener('pause', updateButton);
toggle.addEventListener('click', playVideo);

viewer.addEventListener('timeupdate', handleProgress);

skipButons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);


