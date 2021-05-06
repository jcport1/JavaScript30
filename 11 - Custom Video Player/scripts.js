//Step 1: Get our Elements 

const player = document.querySelector(".player")
const video = player.querySelector('.viewer')
const progress = player.querySelector('.progress')
const progressBar = player.querySelector('.progress__filled')
const toggle = player.querySelector('.toggle')
const skipButtons = player.querySelectorAll('[data-skip]')
const ranges = player.querySelectorAll('.player__slider')


//Step 2: Build our functions 

function togglePlay(){
    //paused is a property of video
    //no play property but we do have a play method
    if (video.paused){
        video.play();
    } else {
        video.pause()
    }
}

function updateButton(){

    const icon = this.paused ? '►' : '❚ ❚';

    toggle.textContent = icon;

}

function skip(){
    //each skip button has a data value
    //we can see this data object by calling this.dataset
    //to access just the value we call this.dataset.skip
    console.log(this.dataset)
    //we can use this value to modify the currenTime property of video 
    video.currentTime += parseFloat(this.dataset.skip)
}

function handleRangeUpdate(){
    //property which this.name will be updated
    //name attributes of players match respective properties of video
    video[this.name] = this.value
}

function handleProgress(){
    const percent = (video.currentTime / video.duration) * 100
    progressBar.style.flexBasis = `${percent}%`
}
let mousedown = false 

function scrub(e){
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration 
    video.currentTime = scrubTime 
}
//Step 3: Hook up the event listeners 
video.addEventListener('click', togglePlay)
video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)
video.addEventListener('timeupdate', handleProgress)
toggle.addEventListener('click', togglePlay)
skipButtons.forEach(button => button.addEventListener('click', skip))
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate))
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate))
progress.addEventListener('click', scrub)
//drag scrub
progress.addEventListener('mousemove', (e) => mousedown && scrub(e))
progress.addEventListener('mousedown', () => mousedown = true)
progress.addEventListener('mouseup', () => mousedown = false)





