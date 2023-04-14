import Dashboard from "./views/Dashboard.js";
import Posts from "./views/Posts.js";
import PostView from "./views/PostView.js";
import Settings from "./views/Settings.js";
import Mixs from "./views/Mixs.js";
import Audio from "./views/Audio.js";

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
    { path: "/audio", view: Audio },
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

let state = {
  isPlaying: false,
};

let currentTrackIndex = 86;
let currentTrack = null;

function openplayer(
  buttons,
  mixcloudButton,
  playerButton,
  playerDiv,
  playerClose,
  mixcloudBtnConRow,
  audio
) {
  // open player
  mixcloudButton.addEventListener("click", function () {
    mixcloudPlayer(mixcloudBtnConRow);
    playerDiv.classList.toggle("hidden");
    if (!playerDiv.classList.contains("hidden")) {
      let playBtn = playerDiv.querySelector("#wmr-mixcloud-play");
      let pauseBtn = playerDiv.querySelector("#wmr-mixcloud-pause");
      let stopBtn = playerDiv.querySelector("#wmr-mixcloud-stop");
      let seekLeftBtn = playerDiv.querySelector("#wmr-mixcloud-seek-left");

      let currentTime = playerDiv.querySelector("#wmr-foot-player-currentTime");
      let wmrduration = playerDiv.querySelector("#wmr-foot-player-duration");
      // let next = playerDiv.querySelector("#wmr-mixcloud-double-right");
      let seekRightBtn = playerDiv.querySelector("#wmr-mixcloud-bar-right");
      let repeat = playerDiv.querySelector("#wmr-mixcloud-repeat");
      let repeatOn = playerDiv.querySelector("#wmr-mixcloud-repeat-on");
      let muteOff = playerDiv.querySelector("#wmr-mixcloud-volume");
      let muteOn = playerDiv.querySelector("#wmr-mixcloud-volume-off");
      let progressBar = playerDiv.querySelector(".wmr-footer-progress-bar");
      let seekBar = playerDiv.querySelector(".wmr-footer-seek-bar");

      audio.ready.then(function () {
        // Put code that interacts with the widget here
        // run your function here
        playerbtnControl(
          playBtn,
          pauseBtn,
          stopBtn,
          audio,
          progressBar,
          seekBar
        );
        playerStopbtn(stopBtn, pauseBtn, playBtn, audio);
        volueMuteControl(muteOff, muteOn);
        repeatControl(repeat, repeatOn);
        wnrDuration(audio, wmrduration, currentTime, progressBar, seekBar);

        getTracklist().then((tracklist) => {
          currentTrack = tracklist[currentTrackIndex];
          audio.load(currentTrack.url);
          wmrPlaylist(tracklist);
          wmrCurrentPlay(currentTrack);
          wmrPreviousTrack(tracklist);
          wmrNextTrack(tracklist);
        });
      });
    }
  });

  // Get the tracklist from the JSON server
  const getTracklist = async () => {
    const response = await fetch("http://localhost:3000/songs");
    if (!response.ok) {
      throw new Error("Failed to fetch tracklist");
    }
    const data = await response.json();
    return data;
  };

  // Initialize the player with the first track from the tracklist

  function wmrPreviousTrack(tracklist) {
    // Add event listener to the previous track button
    const prev = playerDiv.querySelector("#wmr-mixcloud-double-left");
    prev.addEventListener("click", () => {
      playPrevTrack(tracklist);
    });
  }

  function playPrevTrack(tracklist) {
    let playBtn = playerDiv.querySelector("#wmr-mixcloud-play");
    let pauseBtn = playerDiv.querySelector("#wmr-mixcloud-pause");
    currentTrackIndex--;
    if (currentTrackIndex < 0) {
      currentTrackIndex = tracklist.length - 1;
    }
    currentTrack = tracklist[currentTrackIndex];
    console.log(currentTrackIndex);

    // Reset the audio player
    audio.pause();
    audio.currentTime = 0;
    audio.load(currentTrack.url, true);

    playBtn.click();
    wmrCurrentPlay(currentTrack);
  }

  function wmrNextTrack(tracklist) {
    // Add event listener to the next track button
    const next = playerDiv.querySelector("#wmr-mixcloud-double-right");
    console.log(tracklist);
    next.addEventListener("click", () => {
      playNextTrack(tracklist);
    });
  }

  function playNextTrack(tracklist) {
    let playBtn = playerDiv.querySelector("#wmr-mixcloud-play");
    let pauseBtn = playerDiv.querySelector("#wmr-mixcloud-pause");
    currentTrackIndex++;
    if (currentTrackIndex >= tracklist.length) {
      currentTrackIndex = 0;
    }
    currentTrack = tracklist[currentTrackIndex];
    console.log(currentTrackIndex);

    // Reset the audio player
    audio.pause();
    audio.currentTime = 0;
    audio.load(currentTrack.url, true);

    playBtn.click();
    wmrCurrentPlay(currentTrack);
  }

  function wmrCurrentPlay(track) {
    let nowPlayImg = playerDiv.querySelector("#wmr-player-center-info-con");
    let nowPlayTitle = playerDiv.querySelector("#wmr-foot-player-title");
    let nowPlayArtist = playerDiv.querySelector("#wmr-foot-player-artist");
    nowPlayTitle.innerText = track.name;
    nowPlayImg.innerHTML = "";
    nowPlayImg.innerHTML = `<img src=${track.pictures.medium} class="img-fluid" alt=${track.name}>`;
  }

  function wmrPlaylist(tracklist) {
    setTimeout(function () {
      let wmrPlaylist = document.querySelector("#playlist-tracks");
      console.log(wmrPlaylist);
      wmrPlaylist.innerHTML =
        tracklist &&
        tracklist
          .map((item, itemIndex) => {
            return `
<li class="Playlist-item item mb-3" itemIndex=${itemIndex}>
  <div class="thumbnail">
    <img loading="lazy" itemIndex=${itemIndex} class="img-fluid "src=${item.pictures.medium} alt=${item.name} />
      
  </div>
  <div class="wmrPlaylistdetails">
    <p class="wmr-playlist-Title mb-0 text-white text-start">${item.name}</p>
    <p class="wmr-playlist-By mb-0 text-light text-start fs-7">By: Chuck Melody</p>
  </div>
  <div class="ms-auto">
    <p class="mb-0 text-white"><img class="img-fluid" src="../static/img/wmr/three-dots-vertical.svg" /></p>
  </div>
</li>
`;
          })
          .join("");

      console.log(tracklist);
    }, 500);
  }

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
}

function wnrDuration(audio, wmrduration, currentTime, progressBar, seekBar) {
  let wmrGetDuration = "";
  let wmrGetcurrentTime = "";
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
}

function secondsToString(seconds) {
  let numyears = Math.floor(seconds / 31536000);
  let numdays = Math.floor((seconds % 31536000) / 86400);
  let numhours = Math.floor(((seconds % 31536000) % 86400) / 3600);
  let numminutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60);
  let numseconds = (((seconds % 31536000) % 86400) % 3600) % 60;
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

function repeatControl(repeat, repeatOn) {
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
}

function volueMuteControl(muteOff, muteOn) {
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
}

function playerbtnControl(
  playBtn,
  pauseBtn,
  stopBtn,
  audio,
  progressBar,
  seekBar
) {
  // Attach event listener to play button

  playBtn.addEventListener("click", () => {
    // Add event listeners for the player widget

    audio.play();
    audio.events.play.on(() => {
      state.isPlaying = true;
    });

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
      state.isPlaying = false;
    });

    pauseBtn.classList.add("d-none");
    playBtn.classList.remove("d-none");
  });

  audio.events.ended.on(() => {
    state.isPlaying = false;
  });
}

function playerStopbtn(stopBtn, pauseBtn, playBtn, audio) {
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
}

function mixcloudPlayer(mixcloudBtnConRow) {
  mixcloudBtnConRow.innerHTML = "";
  mixcloudBtnConRow.innerHTML = `
  <div class="row" id="wmr-player-btns-con-row">
  <div class="col-md-4 d-flex justify-content-center align-items-center">
  <div class="row mx-0 flex-nowrap" id="wmr-player-left-Bt-con">
          <div class="col-md-3 p-0 text-center">
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
          <div class="col-md-3 p-0 text-center">
              <button class="pad-button" id="wmr-mixcloud-stop">
                  <img class="pad-image" src="/static/img/wmr/pad_off.png">
                  <span class="pad-text"><img
                          src="/static/img/wmr/icons/stop-fill.svg"></span>
              </button>
          </div>
          <div class="col-md-3 p-0 text-center">
              <button class="pad-button" id="wmr-mixcloud-seek-left">
                  <img class="pad-image" src="/static/img/wmr/pad_off.png">
                  <span class="pad-text"><img
                          src="/static/img/wmr/icons/arrow-bar-left.svg"></span>
              </button>
          </div>
          <div class="col-md-3 p-0 text-center">
              <button class="pad-button" id="wmr-mixcloud-double-left">
                  <img class="pad-image" src="/static/img/wmr/pad_off.png">
                  <span class="pad-text"><img
                          src="/static/img/wmr/icons/chevron-double-left.svg"></span>
              </button>
          </div>
  </div>
  </div>
  <div class="col-md-4 d-flex justify-content-center align-items-center">
  <div class="d-flex justify-content-center align-items-center gap-2" id="wmr-player-center-info-con">
  <img class="img-fluid pad-image rounded-1 mixcloud-cover-image" src="/static/img/wmr/covers/des.jpg" id="mixcloud-cover-image">
</div>

<div class="d-flex justify-content-center align-items-start flex-column" id="wmr-foot-player-info">

  <div>
    <h4 id="wmr-foot-player-title">Soul hits Vol 32</h4>
  </div>

  <div id="wmr-foot-player-artist">
    By: Chuck Melody
  </div>

  <div class="d-flex justify-content-between align-items-center w-100">
    <div id="wmr-foot-player-currentTime">
      0:00
    </div>

    <div id="wmr-foot-player-duration">
      0:00
    </div>
  </div>

</div>

  </div>



  <div class="col-md-4 d-flex justify-content-center align-items-center">
    <div class="row mx-0 flex-nowrap" id="wmr-player-right-Bt-con">
      <div class="col-md-3 p-0 text-center">
        <button class="pad-button" id="wmr-mixcloud-double-right">
            <img class="img-fluid pad-image" src="/static/img/wmr/pad_off.png">
            <span class="pad-text"><img
                    src="/static/img/wmr/icons/chevron-double-right.svg"></span>
        </button>
      </div>
          <div class="col-md-3 p-0 text-center">
              <button class="pad-button" id="wmr-mixcloud-bar-right">
                  <img class="pad-image" src="/static/img/wmr/pad_off.png">
                  <span class="pad-text"><img
                          src="/static/img/wmr/icons/arrow-bar-right.svg"></span>
              </button>
          </div>
          <div class="col-md-3 p-0 text-center">
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
          <div class="col-md-3 p-0 text-center">
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
  </div>
  </div>
</div>

  `;
}
