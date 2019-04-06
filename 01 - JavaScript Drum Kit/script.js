var domReady = function(callback) {
    document.readyState === "interactive" || document.readyState === "complete" ? callback() : document.addEventListener("DOMContentLoaded", callback);
};

function playAudio(keyCode) {
    const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
    if(audio) {
        audio.pause();
        audio.currentTime = 0;
        audio.play();
    }
}

function buttonAnimation({stop = false} = {}) {
    return function(keyCode) {
        const buttonClasses = (document.querySelector(`.keys [data-key="${keyCode}"]`) || {}).classList;
        if (buttonClasses) {
            stop ? buttonClasses.remove('playing') : buttonClasses.add('playing');
        }
    }
}

domReady(function () {

    // Get all relevant keys.
    const keyCodes = [...document.querySelectorAll('.key')]
        .map(el => parseInt(el.getAttribute('data-key'), 10));

    // Listen for key press events.
    document.addEventListener('keypress', ({ which: keyCode }) => {
        if (keyCodes.includes(keyCode)) {
            buttonAnimation()(keyCode)
            playAudio(keyCode)
        }
    })

    // Listen for key up events.
    document.addEventListener('keyup', ({ which: keyCode }) => {
        if(keyCodes.includes(keyCode)) {
            buttonAnimation({stop: true})(keyCode)
        }
    })
})