import Dashboard from "./views/Dashboard.js";
import Posts from "./views/Posts.js";
import PostView from "./views/PostView.js";
import Settings from "./views/Settings.js";
import Mixs from "./views/Mixs.js";

const pathToRegex = (path) =>
  new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = (match) => {
  const values = match.result.slice(1);
  const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(
    (result) => result[1]
  );

  return Object.fromEntries(
    keys.map((key, i) => {
      return [key, values[i]];
    })
  );
};

const navigateTo = (url) => {
  history.pushState(null, null, url);
  router();
};

const router = async () => {
  const routes = [
    { path: "/", view: Dashboard },
    { path: "/posts", view: Posts },
    { path: "/posts/:id", view: PostView },
    { path: "/settings", view: Settings },
    { path: "/mixs", view: Mixs },
  ];

  // Test each route for potential match
  const potentialMatches = routes.map((route) => {
    return {
      route: route,
      result: location.pathname.match(pathToRegex(route.path)),
    };
  });

  let match = potentialMatches.find(
    (potentialMatch) => potentialMatch.result !== null
  );

  if (!match) {
    match = {
      route: routes[0],
      result: [location.pathname],
    };
  }

  const view = new match.route.view(getParams(match));

  document.querySelector("#app").innerHTML = await view.getHtml();
  // Get all the buttons
  const buttons = document.querySelectorAll("#wmr-header-menu .headerMenu");
  const mixcloudButton = document.querySelector("#wmr-mixcloud-btn");
  const playerButton = document.querySelector("#player-button-mobile");
  const playerDiv = document.querySelector("#player-div");
  const playerClose = document.querySelector("#player-close");
  const mixcloudBtnConRow = document.querySelector("#wmr-player-btns-con");
  const audio = Mixcloud.PlayerWidget(
    document.getElementById("wmr-audio-iframe")
  );

  //console.log(audio);

  openplayer(
    buttons,
    mixcloudButton,
    playerButton,
    playerDiv,
    playerClose,
    mixcloudBtnConRow,
    audio
  );
};

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });

  router();
});

function openplayer(
  buttons,
  mixcloudButton,
  playerButton,
  playerDiv,
  playerClose,
  mixcloudBtnConRow,
  audio
) {
  return new Promise((resolve, reject) => {
    // open player
    mixcloudButton.addEventListener("click", function () {
      mixcloudPlayer(mixcloudBtnConRow);
      playerDiv.classList.toggle("hidden");
      if (!playerDiv.classList.contains("hidden")) {
        let playBtn = playerDiv.querySelector("#wmr-mixcloud-play");
        let pauseBtn = playerDiv.querySelector("#wmr-mixcloud-pause");
        let stopBtn = playerDiv.querySelector("#wmr-mixcloud-stop");
        let seekLeftBtn = playerDiv.querySelector("#wmr-mixcloud-seek-left");
        let prev = playerDiv.querySelector("#wmr-mixcloud-double-left");
        let nowPlayImg = playerDiv.querySelector("#mixcloud-cover-image");
        let nowPlayTitle = playerDiv.querySelector("#wmr-foot-player-title");
        let nowPlayArtist = playerDiv.querySelector("#wmr-foot-player-artist");
        let currentTime = playerDiv.querySelector(
          "#wmr-foot-player-currentTime"
        );
        let wmrduration = playerDiv.querySelector("#wmr-foot-player-duration");
        let next = playerDiv.querySelector("#wmr-mixcloud-double-right");
        let seekRightBtn = playerDiv.querySelector("#wmr-mixcloud-bar-right");
        let repeat = playerDiv.querySelector("#wmr-mixcloud-repeat");
        let repeatOn = playerDiv.querySelector("#wmr-mixcloud-repeat-on");
        let muteOff = playerDiv.querySelector("#wmr-mixcloud-volume");
        let muteOn = playerDiv.querySelector("#wmr-mixcloud-volume-off");
        let progressBar = playerDiv.querySelector(".wmr-footer-progress-bar");
        let seekBar = playerDiv.querySelector(".wmr-footer-seek-bar");
        document.addEventListener("DOMContentLoaded", function () {
          let wmrPlaylist = document.querySelector("ul#wmr-mixcloud-playlist");
          if (wmrPlaylist) {
            wmrPlaylist.textContent = "";
            wmrPlaylist.innerHTML = `<li class="text-white">Chuck</li>`;
            console.log(wmrPlaylist);
          } else {
            console.log("not there");
          }
        });

        let isPlaying = false;
        //let progressIntervalId = null;

        audio.ready.then(function () {
          // Put code that interacts with the widget here
          // run your function here
          playerbtnControl(
            isPlaying,
            playBtn,
            pauseBtn,
            stopBtn,
            audio,
            progressBar,
            seekBar
            //progressIntervalId
          );
          playerStopbtn(stopBtn, pauseBtn, playBtn, audio);
          volueMuteControl(muteOff, muteOn);
          repeatControl(repeat, repeatOn);
          wnrDuration(audio, wmrduration, currentTime, progressBar, seekBar);

          // console.log("playerDiv is visible and runing playerBtnControl");
          // console.log(audio);
        });
      }
    });

    // function wmrPlaylist() {
    //   let wmrPlaylist = document.querySelector("#wmr-mixcloud-playlist");
    //   console.log(wmrPlaylist);
    //   // wmrPlaylist.innerHTML = `
    //   // <h1>Chuck</h1>
    //   // `;
    // }

    // audio.events.pause.on(pauseListener);
    // function pauseListener() {
    //   // This will be called whenever the widget is paused
    //   isPlaying = false;
    // }

    // audio.events.ended.on(endedListener);
    // function endedListener() {
    //   // This will be called whenever the widget is paused
    //   isPlaying = false;
    // }

    playerButton.addEventListener("click", function () {
      playerDiv.classList.toggle("hidden");
    });

    playerClose.addEventListener("click", function () {
      playerDiv.classList.toggle("hidden");
    });

    // Loop through the buttons and add a click event listener to each one
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        // Remove the active class from all buttons
        buttons.forEach((btn) => {
          btn.classList.remove("btn-active");
        });
        // Add the active class to the clicked button
        button.classList.add("btn-active");
      });
    });

    resolve();
  });
}

function wnrDuration(audio, wmrduration, currentTime, progressBar, seekBar) {
  let wmrGetDuration = "";
  let wmrGetcurrentTime = "";
  return new Promise((resolve, reject) => {
    audio.getDuration().then(function (duration) {
      wmrGetDuration = secondsToString(duration);
      wmrduration.innerText = wmrGetDuration;
    });

    setInterval(function () {
      audio.getPosition().then(function (position) {
        wmrGetcurrentTime = updateTimeSpan(parseInt(position));
        currentTime.innerText = wmrGetcurrentTime;
      });
    }, 1000);

    resolve();
  });
}

function secondsToString(seconds) {
  var numyears = Math.floor(seconds / 31536000);
  var numdays = Math.floor((seconds % 31536000) / 86400);
  var numhours = Math.floor(((seconds % 31536000) % 86400) / 3600);
  var numminutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60);
  var numseconds = (((seconds % 31536000) % 86400) % 3600) % 60;
  return numhours + ":" + numminutes + ":" + numseconds + " ";
}

function updateTimeSpan(seconds) {
  const hours = Math.floor(seconds / 3600);
  const remainingSeconds = seconds % 3600;
  const minutes = Math.floor(remainingSeconds / 60);
  const finalSeconds = remainingSeconds % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${finalSeconds.toString().padStart(2, "0")}`;
}

function seekControl(audio, progressBar, seekBar) {
  return new Promise((resolve, reject) => {
    // Create a function to update the seek bar and progress bar
    // audio.getPosition().then(function (position) {
    //   console.log(position);
    //   // Calculate the progress as a percentage of the current position
    //   const progress = (position / audio.currentDuration) * 100;
    //   // Update the value of the progress bar
    //   progressBar.style.width = progress + "%";
    //   // Update the value of the seek bar
    //   seekBar.value = position;
    // });

    // Attach an event listener to the seek bar
    // seekBar.addEventListener("input", function () {
    //   audio.seek(seekBar.value).then(function (allowed) {
    //     if (!allowed) {
    //       seekBar.value = audio.position;
    //     }
    //   });
    // });
    resolve();
  });
}

function repeatControl(repeat, repeatOn) {
  return new Promise((resolve, reject) => {
    // Attach event listener to volume button
    repeat.addEventListener("click", () => {
      repeat.classList.add("d-none");
      repeatOn.classList.remove("d-none");
    });

    // Attach event listener to pause button
    repeatOn.addEventListener("click", () => {
      repeatOn.classList.add("d-none");
      repeat.classList.remove("d-none");
    });
    resolve();
  });
}

function volueMuteControl(muteOff, muteOn) {
  return new Promise((resolve, reject) => {
    // Attach event listener to volume button
    muteOff.addEventListener("click", () => {
      muteOff.classList.add("d-none");
      muteOn.classList.remove("d-none");
    });

    // Attach event listener to pause button
    muteOn.addEventListener("click", () => {
      muteOn.classList.add("d-none");
      muteOff.classList.remove("d-none");
    });
    resolve();
  });
}

function playerbtnControl(
  isPlaying,
  playBtn,
  pauseBtn,
  stopBtn,
  audio,
  progressBar,
  seekBar
) {
  let progressIntervalId = "0";
  return new Promise((resolve, reject) => {
    // Attach event listener to play button

    playBtn.addEventListener("click", () => {
      // Add event listeners for the player widget

      audio.play();
      audio.events.play.on(() => {
        isPlaying = true;
        //console.log(isPlaying + "Playing");
      });

      // Start updating the progress bar and store the interval ID
      // progressIntervalId = startProgressUpdate(audio, progressBar, seekBar);

      playBtn.classList.add("d-none");
      pauseBtn.classList.remove("d-none");
      // Play button click event
      // Enable the stop button
      stopBtn.disabled = false;
    });

    // Attach event listener to pause button
    pauseBtn.addEventListener("click", () => {
      audio.pause();

      audio.events.pause.on(() => {
        isPlaying = false;
        // console.log(isPlaying + "Paused");
        // stopProgressUpdate(progressIntervalId); // Pass the interval ID to stopProgressUpdate
      });

      pauseBtn.classList.add("d-none");
      playBtn.classList.remove("d-none");
    });

    audio.events.ended.on(() => {
      isPlaying = false;
      //console.log(isPlaying + "Ended");
    });

    resolve();
  });
}

// Start updating the progress bar
// Start updating the progress bar

// function startProgressUpdate(audio, progressBar, seekBar, progressIntervalId) {
//   progressIntervalId = setInterval(function () {
//     // console.log(progressIntervalId);
//     seekControl(audio, progressBar, seekBar);
//   }, 1000);
// }

// Stop updating the progress bar
// function stopProgressUpdate(progressIntervalId) {
//   console.log(progressIntervalId);
//   console.log("gogo");
//   clearInterval(progressIntervalId);
// }

function playerStopbtn(stopBtn, pauseBtn, playBtn, audio) {
  return new Promise((resolve, reject) => {
    // Stop button click event
    stopBtn.addEventListener("click", async () => {
      // Check if the audio is playing before allowing the stop button to be clicked
      if (!audio.paused) {
        // Pause the player
        await audio.pause().then(function () {
          // Change play pause button
          pauseBtn.classList.add("d-none");
          playBtn.classList.remove("d-none");

          stopBtn.disabled = true;
        });
      }
    });

    resolve();
  });
}

function loadSong(mix) {
  //console.log(mix.tags[0].name);
  //const mixTagDisplay = mix.tags[0].name;
  //props.wmrGenreDPlay.innerText = `${mix.name}`;
  //props.mixTitle.innerHTML = `${mix.name}`;
  //props.mixTitlebase.innerHTML = `${mix.name}`;
  //props.mixTagbase.innerHTML = `${mixTagDisplay}`;
  //props.mixTagbasePlayer.innerHTML = `${mixTagDisplay}`;
  //props.playCount.innerHTML = `${mix.play_count}`;
  //props.playCountplayer.innerHTML = `${mix.play_count}`;
  // props.wmraudio.setAttribute(
  //   "src",
  //   `https://www.mixcloud.com/widget/iframe/?hide_cover=1&autoplay=${autoplaySet}&feed=` +
  //     mix.key
  // );
  //props.wmraudio.setAttribute("data-duration", `${mix.audio_length}`);
  //props.mixImage.style.backgroundImage = `url('${mix.pictures.extra_large}')`;
  //props.audio.events.ended.on(endedListener);
  // props.seekbar.setAttribute("value", 0);
  //props.seekbar.setAttribute("min", 0);
  // props.seekbar.setAttribute("max", 0);
  // getDurationFn();
  //getPositionFn();
  //toggleAudio();
  // getmixsongs(wmrMixArray);
}

function mixcloudPlayer(mixcloudBtnConRow) {
  mixcloudBtnConRow.innerHTML = "";
  mixcloudBtnConRow.innerHTML = `
  <div class="row" id="wmr-player-btns-con-row" style="max-width: 91%;">
  <div class="col d-flex justify-content-center align-items-center">
      <div class="row mx-0 flex-nowrap" id="wmr-player-image-con">
      
          <div class="col-md-4 p-0 text-center">
              <button class="pad-button wmr-mixcloud-play" id="wmr-mixcloud-play">
                  <img class="img-fluid pad-image" src="/static/img/wmr/pad_off.png">
                  <span class="pad-text" id="wmr-mixcloud-play-img"><img
                          src="/static/img/wmr/icons/play-fill.svg"></span>
              </button>
              <button class="pad-button wmr-mixcloud-pause d-none" id="wmr-mixcloud-pause">
                  <img class="img-fluid pad-image" src="/static/img/wmr/pad_on.png">
                  <span class="pad-text" id="wmr-mixcloud-pause-img"><img
                          src="/static/img/wmr/icons/pause-fill.svg"></span>
              </button>
          </div>
          <div class="col-md-4 p-0 text-center">
              <button class="pad-button" id="wmr-mixcloud-stop">
                  <img class="pad-image" src="/static/img/wmr/pad_off.png">
                  <span class="pad-text"><img
                          src="/static/img/wmr/icons/stop-fill.svg"></span>
              </button>
          </div>
          <div class="col-md-4 p-0 text-center">
              <button class="pad-button" id="wmr-mixcloud-seek-left">
                  <img class="pad-image" src="/static/img/wmr/pad_off.png">
                  <span class="pad-text"><img
                          src="/static/img/wmr/icons/arrow-bar-left.svg"></span>
              </button>
          </div>
          <div class="col-md-4 p-0 text-center">
              <button class="pad-button" id="wmr-mixcloud-double-left">
                  <img class="pad-image" src="/static/img/wmr/pad_off.png">
                  <span class="pad-text"><img
                          src="/static/img/wmr/icons/chevron-double-left.svg"></span>
              </button>
          </div>
      </div>
  </div>
  <div class="col d-flex justify-content-center align-items-center">
    <div class="d-flex justify-content-start align-items-center gap-2">
    <img class="img-fluid pad-image rounded-1 mixcloud-cover-image" src="/static/img/wmr/covers/des.jpg" id="mixcloud-cover-image">
    </div>
    <div class="d-flex justify-content-center align-items-start flex-column" id="wmr-foot-player-info">
    <div>
    <h4 id="wmr-foot-player-title">Soul hits Vol 32</h4>
    </div>
    <div id="wmr-foot-player-artist">
    By: Chuck Melody
    </div>
    <div class="d-flex justify-content-between gap-5">
    <div id="wmr-foot-player-currentTime">
    0:00
    </div>
    <div id="wmr-foot-player-duration">
    0:00
    </div>
    </div>
    </div>
  </div>
  <div class="col d-flex justify-content-end align-items-center">
      <div class="row mx-0 flex-nowrap position-relative">
          <div class="col-md-4 p-0 text-center">
              <button class="pad-button" id="wmr-mixcloud-double-right">
                  <img class="img-fluid pad-image" src="/static/img/wmr/pad_off.png">
                  <span class="pad-text"><img
                          src="/static/img/wmr/icons/chevron-double-right.svg"></span>
              </button>
          </div>


          <div class="col-md-4 p-0 text-center">
              <button class="pad-button" id="wmr-mixcloud-bar-right">
                  <img class="pad-image" src="/static/img/wmr/pad_off.png">
                  <span class="pad-text"><img
                          src="/static/img/wmr/icons/arrow-bar-right.svg"></span>
              </button>
          </div>
          <div class="col-md-4 p-0 text-center">
              <button class="pad-button" id="wmr-mixcloud-repeat">
                  <img class="pad-image" src="/static/img/wmr/pad_off.png">
                  <span class="pad-text"><img
                  src="/static/img/wmr/icons/arrow-repeat.svg"></span>
              </button>
              <button class="pad-button d-none" id="wmr-mixcloud-repeat-on">
                  <img class="pad-image" src="/static/img/wmr/pad_on.png">
                  <span class="pad-text"><img
                  src="/static/img/wmr/icons/arrow-repeat-on.svg"></span>
              </button>
          </div>
          <div class="col-md-4 p-0 text-center">
              <button class="pad-button" id="wmr-mixcloud-volume">
                  <img class="pad-image" src="/static/img/wmr/pad_off.png">
                  <span class="pad-text"><img
                  src="/static/img/wmr/icons/volume-up-fill.svg"></span>
              </button>
              <button class="pad-button d-none" id="wmr-mixcloud-volume-off">
                  <img class="pad-image" src="/static/img/wmr/pad_on.png">
                  <span class="pad-text"><img
                  src="/static/img/wmr/icons/volume-mute-fill.svg"></span>
              </button>
          </div>

          <div id="wmr-volume-input" class="p-2">
            <div id="wmr-volume-slider-con" class="vertical p-2">
            <span class="text-white" id="wmr-vol-val">
            0.5
            </span>
              <input type="range" class="form-range" min="0" max="100" value="50" id="wmr-volume-slider"/>
              <button class="text-white btn btn-sm btn-dark" id="wmr-vol-mute">Mute</button>
              </div>
            
          </div>


      </div>
  </div>
</div>
</div>

  `;
}
// Get Chucks Mixcloud from file
