import Dashboard from "./views/Dashboard.js";
import Posts from "./views/Posts.js";
import PostView from "./views/PostView.js";
import Settings from "./views/Settings.js";
import Mixs from "./views/Mixs.js";
import MixView from "./views/MixView.js";
import Audio from "./views/Audio.js";
import vumeter from "./assets/vumeter.js";

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
    { path: "/mixs/:id", view: MixView },
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
let playerElements;
let trackData = [];
let TrackIndex = 83;
let wmrAutoPlay = "true";

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
    const progress = document.getElementById("progress");
    const progressContainer = document.getElementById("progress-container");
    const seekLeftBtn = playerDiv.querySelector("#wmr-mixcloud-seek-left");
    const seekLeftBtnOn = playerDiv.querySelector("#wmr-mixcloud-seek-left-on");
    const seekRightBtn = playerDiv.querySelector("#wmr-mixcloud-seek-right");
    const seekRightBtnOn = playerDiv.querySelector(
      "#wmr-mixcloud-seek-right-on"
    );
    const muteOff = document.getElementById("wmr-mixcloud-volume-off");
    const muteOn = document.getElementById("wmr-mixcloud-volume");
    const repeat = document.getElementById("wmr-mixcloud-repeat");
    const repeatOn = document.getElementById("wmr-mixcloud-repeat-on");
    const next = playerDiv.querySelector("#wmr-mixcloud-double-right");
    const prev = playerDiv.querySelector("#wmr-mixcloud-double-left");
    const leftVolSilde = document.querySelector("#leftVolSilde");
    const wmrVolNum = document.querySelector("#wmrVolNum");

    // Add event listeners for player controls
    playBtn.addEventListener("click", () => {
      audio.play();
      playBtn.classList.add("d-none");
      pauseBtn.classList.remove("d-none");
    });

    pauseBtn.addEventListener("click", () => {
      audio.pause();
      playBtn.classList.remove("d-none");
      pauseBtn.classList.add("d-none");
    });

    stopBtn.addEventListener("click", () => {
      playBtn.classList.remove("d-none");
      pauseBtn.classList.add("d-none");
      audio.pause();
      audio.seek(0);
      progress.style.width = 0;

      stopBtn.disabled = true;
    });

    prev.addEventListener("click", () => {
      console.log(TrackIndex);
      TrackIndex--;
      console.log(TrackIndex);
      if (TrackIndex < 0) {
        TrackIndex = trackData.length + TrackIndex;
      }

      audio.pause();
      audio.seek(0);
      loadTrack(TrackIndex, wmrAutoPlay, pauseBtn, playBtn);

      // progress.style.width = 0; call progress function or add to on load
    });

    next.addEventListener("click", () => {
      TrackIndex++;

      audio.pause();
      audio.seek(0);
      if (TrackIndex >= trackData.length) {
        TrackIndex = 0;
      }
      loadTrack(TrackIndex, wmrAutoPlay, pauseBtn, playBtn);
      console.log(TrackIndex);

      // progress.style.width = 0; call progress function or add to on load
    });

    console.log(prev);

    // Define the seek intervals in milliseconds
    const seekInterval = 200;
    const seekStep = 10;

    // Declare variables to store the interval IDs
    let seekLeftIntervalId = null;
    let seekRightIntervalId = null;

    // Define the functions to seek left and right
    const seekLeft = async () => {
      const currentPosition = await audio.getPosition();
      const newPosition = Math.max(0, currentPosition - seekStep); // subtract seekStep seconds
      await audio.seek(newPosition);
    };

    const seekRight = async () => {
      const currentPosition = await audio.getPosition();
      const duration = await audio.getDuration();
      const newPosition = Math.min(duration, currentPosition + 20); // add 10 seconds
      await audio.seek(newPosition);
    };

    // Attach event listeners to the seek buttons
    seekLeftBtn.addEventListener("mousedown", () => {
      seekLeftBtn.classList.add("d-none");
      seekLeftBtnOn.classList.remove("d-none");
      seekLeftIntervalId = setInterval(seekLeft, seekInterval);
    });

    seekLeftBtnOn.addEventListener("mouseup", () => {
      seekLeftBtnOn.classList.add("d-none");
      seekLeftBtn.classList.remove("d-none");
      clearInterval(seekLeftIntervalId);
    });

    seekRightBtn.addEventListener("mousedown", () => {
      seekRightBtn.classList.add("d-none");
      seekRightBtnOn.classList.remove("d-none");
      seekRightIntervalId = setInterval(seekRight, seekInterval);
    });

    seekRightBtnOn.addEventListener("mouseup", () => {
      seekRightBtnOn.classList.add("d-none");
      seekRightBtn.classList.remove("d-none");
      clearInterval(seekRightIntervalId);
    });

    // Code that gets Vol Attributes
    // leftVolSilde.oninput = function () {
    //   wmrVolNum.innerHTML = leftVolSilde.value;
    // };

    // console.log(wmrVolNum);

    // muteOff.addEventListener("click", () => {
    //   audio.setVolume(0);
    // });

    // muteOn.addEventListener("click", () => {
    //   audio.setVolume(1);
    // });

    // repeat.addEventListener("click", () => {
    //   audio.setLoop(true);
    // });

    // repeatOn.addEventListener("click", () => {
    //   audio.setLoop(false);
    // });

    //Not running
    // Update progress bar and seek bar as track plays
    audio.events.progress.on((position, duration) => {
      const progressPercent = (position / duration) * 100;
      progress.style.width = `${progressPercent}%`;
    });

    // Click on progress bar
    progressContainer.addEventListener("click", setProgress);

    // Set progress bar
    function setProgress(e) {
      const width = this.clientWidth;
      const clickX = e.offsetX;

      audio.getDuration().then(function (duration) {
        // "position" is the current duration
        const positionGet = (clickX / width) * duration;
        audio.seek(positionGet);
      });
    }

    audio.events.ended.on(() => {
      progress.style.width = "0%";
      seek.value = 0;
      playBtn.classList.remove("d-none");
      pauseBtn.classList.add("d-none");
    });

    // Create an AudioContext object
    const audioContext = new AudioContext();
    // Create a GainNode to control the volume
    const volumeControl = audioContext.createGain();
    volumeControl.connect(audioContext.destination);
    // Connect the Mixcloud audio element to the volume control
    const source = audioContext.createMediaElementSource(audio);
    source.connect(volumeControl);
    // Listen for changes to the volume range input
    const volumeRange = document.getElementById("wmrVolRightRange");
    volumeRange.addEventListener("input", () => {
      // Set the volume to the current value of the range input (between 0 and 1)
      volumeControl.gain.value = volumeRange.value;
    });
  });

  // Return the Mixcloud Player Widget
  return audio;
}

// Initialize an empty array to store the track data

// Define a function to handle popstate events
function handlePopState(event) {
  // Retrieve the saved state data from the event object
  const savedState = event.state;

  // Call your function with the saved state data
  getPlayList(savedState);
}

// Attach the handlePopState function to the popstate event
window.addEventListener("popstate", handlePopState);

// Call your function and save its state
function callFunctionAndSaveState() {
  // Call your function and retrieve the function state
  const functionState = getPlayList();

  // Save the function state in the browser history
  history.pushState(functionState, null, null);
}

function getPlayList() {
  setTimeout(function () {
    const playlistItems = document.querySelector("#playlist-items");
    const wmrVolLeftRange = document.getElementById("wmrVolLeftRange");
    const wmCh1 = document.getElementById("wmCh1");

    playerElements = {
      titleElem: document.getElementById("wmr-foot-player-title"),
      artistElem: document.getElementById("wmr-foot-player-artist"),
      coverImageElem: document.getElementById("mixcloud-cover-image"),
      durationElem: document.getElementById("wmr-foot-player-duration"),
    };

    // Define a function to fetch the data
    async function fetchData() {
      const response = await fetch("http://localhost:3000/songs");
      const data = await response.json();
      return data;
    }

    // Use the fetchData() function to fetch data and display it on each page navigation
    window.addEventListener("popstate", async function () {
      const data = await fetchData();
      trackData = [...data]; // Push the data to the trackData array
      // Do something with the data, such as displaying it on the page

      loadMixPlaylist(trackData, playlistItems);
      //loadTrack(trackData[0], playerElements);
    });

    // Call the fetchData() function to fetch data and display it on the initial page load
    (async function () {
      const data = await fetchData();
      trackData = [...data]; // Push the data to the trackData array
      // Do something with the data, such as displaying it on the page
      loadMixPlaylist(trackData, playlistItems);
      loadTrack(TrackIndex);
      mixerChannels(wmrVolLeftRange, wmCh1);
    })();
  }, 100);
}

function loadMixPlaylist(mixs, playlistItems) {
  console.log(playlistItems);
  // Code that loads a track into the player
  playlistItems.innerHTML =
    mixs &&
    mixs.map((mix, itemIndex) => {
      return `
    <li class="Playlist-item item d-flex align-items-center justifiy-content-center" data-index=${itemIndex}>
      <div class="thumbnail">
        <img loading="lazy" data-index=${itemIndex} class="img-fluid "src=${mix.pictures.medium_mobile} alt=${mix.name} />

      </div>
      <div class="wmrPlaylistdetails">
        <p class="wmr-playlist-Title mb-0 fw-bold text-start">${mix.name}</p>
        <p class="wmr-playlist-By mb-0 text-secondary text-start fs-7">By: Chuck Melody</p>
      </div>
      <div class="ms-auto">
        <p class="mb-0 text-white"><img class="img-fluid" src="../static/img/wmr/three-dots-vertical.svg" /></p>
      </div>
    </li>
    `;
    });
  loadplaylistPlay(playlistItems, mixs);
}

function loadplaylistPlay(playlistItems, mixs) {
  // Code that loads a track into the player

  playlistItems.addEventListener("click", function (e) {
    let wmrPlaylistIndex = e.srcElement.dataset.index;
    loadTrack(wmrPlaylistIndex, wmrAutoPlay);
    TrackIndex = wmrPlaylistIndex;
    console.log(TrackIndex);
  });
}
// Re do send fetch to array
const loadTrack = async (trackIndex, wmrAutoPlay, pauseBtn, playBtn) => {
  // Get the player elements

  const { titleElem, artistElem, coverImageElem, durationElem } =
    playerElements;
  // Get the track from the tracks array
  const track = trackData[trackIndex];
  titleElem.innerText = track.name;

  if (wmrAutoPlay === "true") {
    // Load the track into the player
    await audio.load(track.url, wmrAutoPlay);
    console.log("Auto play is true");
  } else {
    // Load the track into the player
    await audio.load(track.url);
    console.log("Auto play not true");
  }

  // Update the track information on the player UI
  updateTrackInfo(track);
  // Set the cover image
  playerElements.coverImageElem.src = track.pictures.medium;
};

// Define a function to update the track information on the player UI
const updateTrackInfo = (track) => {
  playerElements.artistElem.innerText = track.user.name;
  playerElements.durationElem.innerText = formatDuration(track.audio_length);
  playerElements.coverImageElem.src = track.pictures.medium;
  // playerElements.titleElem = track.name;
};

// Define a helper function to format duration in hours, minutes, and seconds
const formatDuration = (duration) => {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = Math.floor(duration % 60);

  let formattedDuration = "";
  if (hours > 0) {
    formattedDuration += `${hours}:`;
  }
  formattedDuration += `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  return formattedDuration;
};

function mixerChannels(wmrVolLeftRange, wmCh1) {
  //Code that Gets Vol Contol Inputs
  vumeter(wmCh1, {
    boxCount: 15,
    boxGapFraction: 0.25,
    max: 10,
  });
  console.log(wmrVolLeftRange);
  wmrVolLeftRange.oninput = function (e) {
    console.log(this.value);
    wmCh1.setAttribute("data-val", this.value);
  };
  console.log(wmrVolLeftRange);
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

// function updateTrackInfo(track) {
//   // Code that updates the track information on the player UI
// }

// Function to play the previous track
const playPreviousTrack = async (TrackIndex) => {
  // Decrement the track index
  TrackIndex--;
  if (TrackIndex < 0) {
    TrackIndex = trackData.length + TrackIndex;
    console.log(TrackIndex);
  }
};

function playNextTrack(tracklist) {
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
    callFunctionAndSaveState();
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
           <button class="pad-button d-none" id="wmr-mixcloud-seek-left-on">
           <img class="img-fluid pad-image" src="/static/img/wmr/pad_on.png">
           <span class="pad-text" id="wmr-mixcloud-seek-left-img"><img
              src="/static/img/wmr/icons/arrow-bar-left-on.svg"></span>
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
        <img class="img-fluid pad-image2 rounded-1 mixcloud-cover-image" src="/static/img/wmr/covers/des.jpg" id="mixcloud-cover-image">
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
           <button class="pad-button" id="wmr-mixcloud-seek-right">
           <img class="pad-image" src="/static/img/wmr/pad_off.png">
           <span class="pad-text"><img
              src="/static/img/wmr/icons/arrow-bar-right.svg"></span>
           </button>
           <button class="pad-button d-none" id="wmr-mixcloud-seek-right-on">
           <img class="img-fluid pad-image" src="/static/img/wmr/pad_on.png">
           <span class="pad-text" id="wmr-mixcloud-seek-right-img""><img
              src="/static/img/wmr/icons/arrow-bar-right-on.svg"></span>
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
