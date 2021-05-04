    let audio, volumeslider, seeking=false, seekto, dir, playlist, ext, canvasbackground, png, agent;
    let is_shuffle, shuffle_index, shuffle_order, shuffle_icon, repeatSong_icon;

    
    function initAudioPlayer() {
    dir = "audio/";
    playlist = ["bensound-rumble","bensound-acousticbreeze","bensound-extremeaction", "bensound-creativeminds",
    "bensound-anewbeginning","bensound-happyrock(1)"];
    playlist_index = 0;
    cdir = "wave-images/";
    canvasbackground=["01rumble.waveimage","02acousticbreeze.waveimage","03extremeaction.waveimage","04creativeminds.waveimage",
    "05anewbegining.waveimage","06happyrock.waveimage","07blankcanvas"];
   // canvasbackground_index = playlist_index;
    png = ".png";
    let canvasbg = new Image();
    canvasbg.src = cdir+canvasbackground[6]+png;
    console.log(canvasbg);
    console.log(canvasbg.src);

    is_shuffle = false;
    shuffle_index = 0;
    shuffle_order = [];

    agent = navigator.userAgent.toLowerCase();
    if(agent.indexOf('firefox') != -1 || (agent.indexOf('opera') != -1)  || (agent.indexOf('chrome')) != -1) {
    ext = ".mp3";
    }
    // Set object references
   // let intFrameWidth = clientWidth;
    let player = document.getElementById("audio-container");
    let audiocontainer = document.getElementById("audio-container").clientWidth;
    console.log("audio container: " + audiocontainer);
    let timebox = document.getElementById("timebox");
    let playsong1 = document.getElementById("playsong-1");
    let playsong2 = document.getElementById("playsong-2");
    let playsong3 = document.getElementById("playsong-3");
    let playbtn = document.getElementById("playpause");
    let stopbtn = document.getElementById("stop");
    let nextbtn = document.getElementById("next");
    let prevbtn = document.getElementById("prev");
    let mutebtn = document.getElementById("on-off");
    let volumeslider = document.getElementById("volume");
    let curtimetext = document.getElementById("current-time");
    let durtimetext = document.getElementById("duration-time");
    let playlist_status = document.getElementById("songName");
    let closePlayer = document.getElementById("close-player");  
    let audioPlayer = document.getElementById("audio-container");
    let repeatSong = document.getElementById("repeat-song");
    repeatSong_icon = repeatSong.getElementsByTagName("i")[0];
    let seekslider = document.getElementById("seekslider");
    let volumeUp = document.getElementById("up-volume");
    let volumeDown = document.getElementById("down-volume");
    let shufflebtn = document.getElementById("shuffle");
    shuffle_icon = shufflebtn.getElementsByTagName("i")[0];
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
  

    
    //audio object
    audio = new Audio();
    audio.src = dir+playlist[0]+ext;
    audio.loop = false;
    playlist_status.innerHTML = "Muzika Audio-Player";
    //playlist_status.innerHTML = playlist[playlist_index];
    //playlist_status.innerHTML = "Track "+(playlist_index+1)+" - "+ playlist[playlist_index]+ext;
   // canvasbackground.src = cdir+canvasbackground[canvasbackground_index]+png;
  //  canvasbackground.src = cdir+canvasbackground[0]+png;
    canvas.width = canvas.clientWidth;
 //   console.log(canvasbackground);

if(audio) {
    window.addEventListener('keydown', function (spacebar) {
      let key = spacebar.which || spacebar.keyCode;
       if (key === 32) { // spacebar
        spacebar.preventDefault();
        audio.play() ? playPause() : audio.paused();
         }
    });
}   
//    
//conditional (ternary) operator.
//takes three operands: 
//1. condition followed by ?
//2.expression to execute code if true
//3.expression to execute code if false
  if (audio) {
      window.addEventListener('keydown', function (skipevent) {
      let key = skipevent.which || skipevent.keyCode;
       if (key === 39) { // right arrow
        skipevent.preventDefault();
        audio.play() ?  switchTrack(event) : audio.play();
      }
  });
}             

  if (audio) {
      window.addEventListener('keydown', function (prevevent) {
      let key = prevevent.which || prevevent.keyCode;
       if (key === 37) { // left arrow
        prevevent.preventDefault();
        audio.play() ?  prevTrack() : audio.play();
      }
  });
}

ctx.mozImageSmoothingEnabled    = false;
ctx.oImageSmoothingEnabled      = false;
ctx.webkitImageSmoothingEnabled = false;
ctx.msImageSmoothingEnabled     = false;
ctx.imageSmoothingEnabled       = false;

    
    playsong1.addEventListener("click", playPause); 
    playsong2.addEventListener("click", playPause); 
    playsong3.addEventListener("click", playPause); 
    shufflebtn.addEventListener("click", shuffle);
    playbtn.addEventListener("click", playPause);
    nextbtn.addEventListener("click", switchTrack);
    prevbtn.addEventListener("click", prevTrack);
    stopbtn.addEventListener("click", stop);
    mutebtn.addEventListener("click", mute);
    seekslider.addEventListener("mousedown", function(event) { seeking=true; seek(event); });
  //  seekslider.addEventListener("mousemove", function(event) { seek(event); });
    seekslider.addEventListener("mouseup", function() { seeking=false; });
    volumeslider.addEventListener("mousemove", setvolume);
    audio.addEventListener("timeupdate", function(){ seektimeupdate(); });
    audio.addEventListener("ended", function(){ switchTrack(); });
    closePlayer.addEventListener("click", closePlayerFunc);
    repeatSong.addEventListener("click", repeatSongFunc);
    volumeUp.addEventListener("click", volumeUpFunc);
    volumeDown.addEventListener("click", volumeDownFunc);
//     document.body.onkeydown = function(e){
//         if(e.keycode == 32) {
//             playPause();
//     }
// }
    // Functions

    // Playback Functions

     // function drawimg() {
     //     ctx.drawImage(canvaswaveimage,0,0,canvas.width,canvas.height);
     //     }

    function playPause() {
        if (audio.src.endsWith("null")) {
            audio.src = dir+playlist[playlist_index]+ext;
           
        }
        if(audio.paused) {
            playbtn.innerHTML = "<i class = 'fa fa-pause'></i>"; 
            document.getElementById("songName").innerHTML = playlist[playlist_index];
            document.getElementById("glow").classList.remove('disable-animation');
            audio.play();
            canvasAnimateValue = true;
            audioPlayer.style.display = "grid";
        } else {
            audio.pause();
            playbtn.innerHTML = "<i class = 'fa fa-play'></i>"; 
            document.getElementById("glow").classList.add("disable-animation");    
        }
    }

    function stop() {
        //playlist_index = 0;
        audio.pause();
        audio.currentTime = 0;
        audio.src = null;
        shuffle_index = 0;
        //ctx.globalAlpha = 0.1;   
        playbtn.innerHTML = "<i class = 'fa fa-play'></i>"; 
        document.getElementById("glow").classList.add("disable-animation");
        document.getElementById("songName").textContent = "Muzika Audio-Player";
        seekslider.value = 0; 
        curtimetext.innerHTML = "00:00";
        durtimetext.innerHTML = "00:00";
       }

    function switchTrack(event) {
        if (is_shuffle) {
            shuffle_index++;
            if (shuffle_index >= (shuffle_order.length)) {
                shuffle_index = 0;
            }
            playlist_index = shuffle_order[shuffle_index];
        } else {
            if(playlist_index == (playlist.length -1)) {
               playlist_index = 0;             
            } else {
               playlist_index++;
            }
        }
        playlist_status.innerHTML = playlist[playlist_index];
        audio.src = dir+playlist[playlist_index]+ext;
        audio.play();
        //console.log(durtimetext, (audio));
        playbtn.innerHTML = "<i class = 'fa fa-pause'></i>"; 
        //playlist_status.innerHTML = "track "+(playlist_index+1)+" -"+ playlist[playlist_index]+ext;   
     }

   function prevTrack() {
    if (is_shuffle) {
        shuffle_index--;
        if (shuffle_index < 0) {
            shuffle_index = (shuffle_order.length - 1);
        }
        playlist_index = shuffle_order[shuffle_index];
    } else {
        if(playlist_index == 0) {
           playlist_index = (playlist.length -1);
        } else {
           playlist_index--;
        }
    }
    playlist_status.innerHTML = playlist[playlist_index];
    audio.src = dir+playlist[playlist_index]+ext;
    audio.play();
    playbtn.innerHTML = "<i class = 'fa fa-pause'></i>";  
    }  

    //repeat and shuffle functions
    function repeatSongFunc() {
        if(!audio.loop) {
        audio.loop = true;
        repeatSong_icon.classList.add("active");
           } else {
        audio.loop = false;
        repeatSong_icon.classList.remove("active");
      }
    }

    function shuffle() {
      if (!is_shuffle) { 
        is_shuffle = true;
        shuffle_icon.classList.add("active");
        shuffle_index = 0;   
        create_shuffle_order();
      } else {
        is_shuffle = false;      
        shuffle_icon.classList.remove("active");
      }
    }

    function create_shuffle_order() {
        const start = 0;
        const end = playlist.length;

        shuffle_order = [];
        for (let i = start; i < end; i++ ) {
          shuffle_order.push(i);
        }

        // Fisher Yates Algorithm
        let idx = shuffle_order.length;
        while (idx > 0) {
          const randomIdx = Math.floor(Math.random() * idx);
          idx -= 1;

          // Swap the two elements
          const tmp = shuffle_order[idx];
          shuffle_order[idx] = shuffle_order[randomIdx];
          shuffle_order[randomIdx] = tmp;
        }
        console.log(shuffle_order);
}
//sound control functions and initialization.
   audio.volume = 1;
    const volumeBtnMap = {
        up: 'fa fa-volume-up',
        down: 'fa fa-volume-down',
        mute: 'fas fa-volume-mute'
    }

    function setvolume () {
        audio.volume = volume.value / 100;
    }

    function volumeUpFunc() {
        if(audio.volume <= 0.9){
            audio.volume += 0.1;
            audio.muted = false;
        }else if(volume > 0.9){
            audio.volume = 1;
        }
        changeOnOffBtn();
    }

    function volumeDownFunc() {
        const volume = audio.volume;
        if(volume > 0.2){
        audio.volume -= 0.1;
        audio.muted = false;
        console.log('new decr vol is', audio.volume);
        } else if (volume > 0) {
            audio.volume = 0;
        }
        changeOnOffBtn();
    }

      function changeOnOffBtn() {
        const volume = audio.volume;
        const btn = document.getElementById('mute');
        if(volume > 0 && volume <= 0.5) {
            btn.className = 'fa fa-volume-down';
            } else if (volume > 0.5) {
            btn.className = 'fa fa-volume-up';
        } else {
            btn.className = 'fas fa-volume-mute';
        }
    }
  
    function mute() {
        const volume = audio.volume;
        const btn = document.getElementById('mute');
        if(audio.muted) {
            audio.muted = false;
            changeOnOffBtn();
        } else {
            audio.muted = true;
            btn.className = 'fas fa-volume-mute';
        }
    }

//audio time tracking
  function seektimeupdate() {
        let nt = audio.currentTime * (100 / audio.duration);
        if (isNaN(nt)) return;
        seekslider.value = nt;
        let curmins = Math.floor (audio.currentTime / 60);
        let cursecs = Math.floor (audio.currentTime - curmins * 60);
        let durmins = Math.floor (audio.duration / 60);
        let dursecs = Math.floor (audio.duration - durmins * 60);
        if(cursecs < 10){ cursecs = "0"+cursecs; }
        if(dursecs < 10){ dursecs = "0"+dursecs; }
        if(curmins < 10){ curmins = "0"+curmins; }
        if(durmins < 10){ durmins = "0"+durmins; }
        curtimetext.innerHTML = curmins+":"+cursecs;
        durtimetext.innerHTML = durmins+":"+dursecs;
    }


    function seek(event) {
         if(seeking) {
            let seek = {x:0, y:0,}
             seek.x = (event.clientX - player.offsetLeft) * (100 / seekslider.clientWidth);
             seek.ctx = (seek.x/100) * audio.duration;
             seekto = seek.ctx;
             audio.currentTime = seekto;
             console.log(seekslider.value);
             console.log(seekto);
             console.log(audio.currentTime);
             console.log(player.offsetLeft);
             console.log(seekslider.clientWidth);
     }
 }

//canvas section
    ctx.x = 0;
    let mouse = {
      x: 0,
      y: 0,  
}

window.addEventListener('load',function(){
        sizecanvas();
});

 window.addEventListener('resize', function() {
        sizecanvas();
});

  canvas.addEventListener('mousedown', function(event) {
    if (seeking = true){
        mouse.x = (event.x - player.offsetLeft) * (100 / canvas.width);
        ctx.x = (mouse.x / 100) * audio.duration;
        seekto = ctx.x;
        audio.currentTime = seekto;
        canvasAnimate();
    }
  });

  //   canvas.addEventListener('mousemove', function(event) {
  // });

  function sizecanvas() {
    if(window.innerWidth >= 1469) { 
        canvas.width = 1469 
        canvas.clientWidth = canvas.width;
    } else {
        canvas.width = canvas.clientWidth;
    }
  }

  function drawbg(){
      canvasbackground_index = playlist_index;
      canvasbg.src = cdir+canvasbackground[canvasbackground_index]+png;
      ctx.drawImage(canvasbg,0,0,canvas.width, canvas.height);
      ctx.globalAlpha = 0.85;
    }

function stopCanvasbg(){
      canvasbackground_index = (canvasbackground.length -1);
        console.log(canvasbackground_index);
        canvasbg.src = canvasbackground_index;
        ctx.drawImage(canvasbg,0,0,canvas.width, canvas.height);
        }


function ctxupdate() {
    ct = audio.currentTime * (100 / audio.duration);
     //if (isNaN(ctx.x)) return;
     ctx.x = (ct/100) * canvas.width;
     seekto = ctx.x;
    }

function draw() {
    ctx.fillStyle = "rgb(250,250,250)";
    ctx.strokeStyle = "rgb(0,0,0)";
    ctx.strokeRect(ctx.x,0, 2,90);
    ctx.fillRect(ctx.x, 0, 2, 90);
    ctx.x = ct;
  //ctx.x = audio.currentTime * (100 / audio.duration);    
}

  function canvasAnimate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    requestAnimationFrame(canvasAnimate);
    drawbg();
    ctxupdate();
    draw();
  }
canvasAnimate();

// Close Player Function
  function closePlayerFunc() {
       audio.pause();
       audioPlayer.style.display = "none";
     }
}  
window.addEventListener('load', initAudioPlayer);

      








// console.log("canvas.width: " + canvas.width);
// console.log("clientWidth: " + canvas.clientWidth);
// console.log(".innerWidth: " + window.innerWidth);