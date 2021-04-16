
function playSound(e){

    //use an attribute selector to select corresponding audio data-key when event is fired
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`)
    const key = document.querySelector(`div[data-key="${e.keyCode}"]`)
    if (!audio) return; //if no audio stops the function from running all together 
    audio.currentTime = 0; //rewinds to the beginning if sound hit again
    audio.play();
    //add class of playing to the key div
    key.classList.add('playing'); 
  }
  
    function removeTransition(e){
  
      if (e.propertyName !== 'transform') return; 
      this.classList.remove('playing')
    }
  
    const keys = document.querySelectorAll('.key'); 
    //in JS you can't add event listeners to an array of keys, you must loop through each individual
    //element in the array and explicity add an event listener
    keys.forEach(key => key.addEventListener('transitionend', removeTransition
    )); 
    window.addEventListener('keydown', playSound)