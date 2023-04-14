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
};

window.addEventListener("popstate", router);

let audio = Mixcloud.PlayerWidget(document.getElementById("wmr-audio-iframe"));
let currentTrackIndex = 90;
let currentTrack = "";
let progressIntervalId = null;

// Get all the buttons
const buttons = document.querySelectorAll("#wmr-header-menu .headerMenu");
const mixcloudButton = document.querySelector("#wmr-mixcloud-btn");
const playerButton = document.querySelector("#player-button-mobile");
const playerDiv = document.querySelector("#player-div");
const playerClose = document.querySelector("#player-close");
const mixcloudBtnConRow = document.querySelector("#wmr-player-btns-con");
const currentTime = playerDiv.querySelector("#wmr-foot-player-currentTime");
const wmrduration = playerDiv.querySelector("#wmr-foot-player-duration");
const next = playerDiv.querySelector("#wmr-mixcloud-double-right");
const seekRightBtn = playerDiv.querySelector("#wmr-mixcloud-bar-right");

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
    if (e.target.id === "wmr-mixcloud-btn") {
      initializePlayer();
    }
  });

  router();
});

// // Get the tracks from the JSON server
// const getTracklist = async () => {
//   const response = await fetch("http://localhost:3000/songs");
//   if (!response.ok) {
//     throw new Error("Failed to fetch tracklist");
//   }
//   const data = await response.json();
//   return data;
// };

function initializePlayer() {
  // Initialize the Mixcloud Player Widget
  const audio = Mixcloud.PlayerWidget(
    document.getElementById("wmr-audio-iframe")
  );

  // Wait for the audio to be ready before interacting with it
  audio.ready.then(() => {
    // Add event listeners to player controls
    const playBtn = document.getElementById("wmr-mixcloud-play");
    const pauseBtn = document.getElementById("wmr-mixcloud-pause");
    const stopBtn = document.getElementById("wmr-mixcloud-stop");
    const progressBar = document.getElementById("wmr-footer-progress");
    const seekBar = document.getElementById("wmr-mixcloud-seek-bar");
    const muteOff = document.getElementById("wmr-mixcloud-volume-off");
    const muteOn = document.getElementById("wmr-mixcloud-volume");
    const repeat = document.getElementById("wmr-mixcloud-repeat");
    const repeatOn = document.getElementById("wmr-mixcloud-repeat-on");

    // Add event listeners for player controls
    playBtn.addEventListener("click", () => {
      audio.play();
    });

    pauseBtn.addEventListener("click", () => {
      audio.pause();
    });

    stopBtn.addEventListener("click", () => {
      audio.seek(0);
      audio.pause();
    });

    muteOff.addEventListener("click", () => {
      audio.setVolume(0);
    });

    muteOn.addEventListener("click", () => {
      audio.setVolume(1);
    });

    repeat.addEventListener("click", () => {
      audio.setLoop(true);
    });

    repeatOn.addEventListener("click", () => {
      audio.setLoop(false);
    });

    // // Update progress bar and seek bar as track plays
    audio.events.progress.on(() => {
      // const currentTime = audio.getPosition();
      // const duration = audio.getDuration();
      // const progress = (currentTime / duration) * 100;
      // progressBar.style.width = progress + "%";
      // seekBar.value = currentTime;

      console.log(progressBar);
    });
  });

  // Return the Mixcloud Player Widget
  return audio;
}

function getTracklist() {
  // Code that fetches the tracklist from the server
}

function loadTrack(track) {
  // Code that loads a track into the player
}

function playTrack() {
  // Code that plays the current track
}

function pauseTrack() {
  // Code that pauses the current track
}

function stopTrack() {
  // Code that stops the current track
}

function togglePlayPause() {
  // Code that toggles between playing and pausing the current track
}

function toggleMute() {
  // Code that toggles between muting and unmuting the player
}

function toggleRepeat() {
  // Code that toggles between repeating and not repeating the current track
}

function updateTrackInfo(track) {
  // Code that updates the track information on the player UI
}

function playNextTrack(tracklist) {
  // Code that loads and plays the next track in the tracklist
}

function playPrevTrack(tracklist) {
  // Code that loads and plays the previous track in the tracklist
}

// End

// Open player
openplayer(
  buttons,
  mixcloudButton,
  playerButton,
  playerDiv,
  playerClose,
  mixcloudBtnConRow
);

function openplayer(
  buttons,
  mixcloudButton,
  playerButton,
  playerDiv,
  playerClose,
  mixcloudBtnConRow
) {
  // open player
  mixcloudButton.addEventListener("click", function () {
    mixcloudPlayer(mixcloudBtnConRow);
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
