// navigator.mediaDevices.getUserMedia({audio: true})


// Set the date we're counting down to
var countDownDate = new Date("Dec 21, 2025 3:00:00").getTime();
var timeRunnethDry = false

const clockTickingAudio = document.getElementById("clockTicking");
clockTickingAudio.loop = true;
const alarmAudio = document.getElementById("alarm");
const unboxAudio = document.getElementById("unboxSound");
const backgroundAudio = document.getElementById("backgroundAudio");
backgroundAudio.volume = 0.5
const lightAudio = document.getElementById("lights");

const darkness = document.getElementById("darkness");

const unboxVideo = document.getElementById("overlay");
// video.style.display = "none";
unboxVideo.loop = false;

const flagSpinGif = document.getElementById("underlay");


const unboxing = document.getElementById("unboxing");
const key = document.getElementById("key");

const blupVideo = document.getElementById("blup");
const blupHitbox = document.getElementById("blupBox");
const blupHitbox2 = document.getElementById("blupBox2");


const timer = document.getElementById("timer");

const timeSinceEnd = document.getElementById("timeSince");
timeSinceEnd.style.display = "none";

var red = false
const defaultColor = timer.style.color
const gifWidth = "30%"


function updateTime() {

    // Get today's date and time
    var date = new Date();
    var now = date.getTime();
    var diff = date.getTimezoneOffset();

    // Find the distance between now and the count down date
    var distance = countDownDate - (now + diff * 60 * 1000); // 

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);


    function idk(num) {
        if (num < 10) {
            return "0" + num
        } else {
            return num
        }
    }

    // Display the result in the element with id="demo"
    timer.innerHTML = idk(days) + ":" 
                    + idk(hours) + ":"
                    + idk(minutes) + ":" 
                    + idk(seconds);


    // If the count down is finished, write some text
    if (distance <= 0) {
        //clearInterval(x);
        timer.innerHTML = "00:00:00:00";

        function timerFlashRed() {
            if (red === false) {
                red = true
                timer.style.color = "red"
            } else {
                red = false
                timer.style.color = defaultColor
            }
        }

        timerFlashRed()
        setTimeout(() => {
            timerFlashRed()
        }, 500)

        timeSinceEnd.innerHTML = "Time since countdown ended: " 
            + idk( Math.abs( (days += 1) ) ) + ":" 
            + idk( Math.abs( (hours += 1) ) ) + ":"
            + idk( Math.abs( (minutes += 1) ) ) + ":"
            + idk( Math.abs( (seconds += 1) ) );


        if (timeRunnethDry === false) {
            timeRunnethDry = true;

            timeSinceEnd.style.display = "block";


            clockTickingAudio.pause();
            alarmAudio.play()


            var lightsOutDelay = 5000
            var lightsBackDelay = lightsOutDelay + 5000


            setTimeout(() => {
                alarmAudio.pause()

                lightAudio.play()
                setTimeout(() => {
                    darkness.style.display = "block"
                    unboxing.style.display = "block"
                }, 20);  // 70
            }, lightsOutDelay);


            setTimeout(() => {
                lightAudio.play()
                setTimeout(() => {
                    darkness.style.display = "none"
                }, 50);
            }, lightsBackDelay);


            // unbox();
            // unboxing.style.display = "block";
        }
    }
}



function preloadImage(url) {
    var img = new Image();
    img.src = url;
}



function playAudio() {
    clockTickingAudio.load();
    clockTickingAudio.play();
}

function playBackgroundAudio() {
    backgroundAudio.load();
    backgroundAudio.play();
}

playBackgroundAudio()

clockTickingAudio.load();
unboxVideo.load();
flagSpinGif.decode();
preloadImage("ezgif.com-effects.gif")


if (navigator.getAutoplayPolicy(clockTickingAudio) === "allowed") {
    proceed()
}

function proceed() {
    document.getElementById("autoplayPermission").style.display = "none"

    playBackgroundAudio()
    playAudio()

    localStorage.setItem("autoplayAcknowledged", true)

    dragElement(key);


    initBlupHitbox(blupHitbox)
    initBlupHitbox(blupHitbox2)


    // Update the count down every 1 second
    var x = setInterval(updateTime, 1000);
}


function unbox() {
    const delay1 = 0 // 500
    const delay2 = delay1 + 300
    const delay3 = delay2 + 1400

    setTimeout(() => {
        unboxVideo.play();
        unboxAudio.play();
    }, delay1);

    setTimeout(() => {
        flagSpinGif.style.width = gifWidth;
    }, delay2);

    setTimeout(() => {
        var num = 0;

        var y = setInterval(() => {
            const betweenlay = document.getElementById("betweenlay");
            if (betweenlay.style.opacity >= 1) {
                clearInterval(y);
            }
            betweenlay.style.opacity = num;
            num += 0.01;
        }, 10);
    }, delay3)
}


function initBlupHitbox(hitbox) {
    hitbox.addEventListener("mouseenter", () => {
        blupVideo.loop = true;
        blupVideo.play();
    });
    hitbox.addEventListener("mouseleave", () => {
       blupVideo.loop = false;
    });

}


function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elmnt.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        var dragHint = document.getElementById("dragHint")
        dragHint.style.display = "none"

        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;


        key.style.cursor = "grabbing"
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        /* stop moving when mouse button is released:*/

        var rect1 = document.getElementById("crateHitbox").getBoundingClientRect();
        var rect2 = document.getElementById("key").getBoundingClientRect();

        var overlap = !(rect1.right < rect2.left ||
            rect1.left > rect2.right ||
            rect1.bottom < rect2.top ||
            rect1.top > rect2.bottom);

        
        key.style.cursor = "grab"
        if (overlap) {
            unboxing.style.display = "none";
            unbox();
        }


        document.onmouseup = null;
        document.onmousemove = null;
    }
}