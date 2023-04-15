import AbstractView from "./AbstractView.js";
import wmrTabListCon from "./Module/TabsListCon.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Mix");
  }

  async getHtml() {
    return `
      <section>
        <div class="container-fluid">
          <div class="row">
            <div class="col-sm-12 col-md-4">
              <div class="playlist">
                <div class="py-5" id="playlist-modal">
                ${wmrTabListCon()}
                </div>
              </div>
            </div>
            <div class="col-sm-12 col-md-4">
              <div class="row">
                <div class="py-5" id="contentb">
                  house
                </div>
              </div>
            </div>
            <div class="col-sm-12 col-md-4">
              Right bar
            </div>
          </div>
        </div>
      </section>
    `;
  }
}

window.onload = function () {
  // Your JavaScript code goes here
  const wmrMixcloudBtn = document.getElementById("wmr-mixcloud-btn");
  console.log(wmrMixcloudBtn);

  const playlistItems = document.getElementById("playlist-items");

  // Populate the playlist
  const populatePlaylist = async () => {
    const tracklistData = await getTracklist();
    tracklistData.forEach((track) => {
      // Create a playlist item element
      const playlistItem = document.createElement("li");
      playlistItem.className = "list-group-item";
      playlistItem.innerText = track.name;

      // Add an event listener to the playlist item that loads and plays the track
      playlistItem.addEventListener("click", async () => {
        await loadTrack(track);
        playTrack();
      });

      // Append the playlist item to the playlist items container
      playlistItems.appendChild(playlistItem);
    });
  };

  const loadTrack = async (track) => {
    // Set the track title in the player UI
    const titleElem = document.getElementById("wmr-foot-player-title");
    titleElem.innerText = track.name;

    // Load the track into the player
    await audio.load(track.url);

    // Update the track information on the player UI
    updateTrackInfo(track);
  };

  const playTrack = () => {
    audio.play();
  };

  // Code that fetches the tracklist from the server
  const getTracklist = async () => {
    const response = await fetch("http://localhost:3000/songs");
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to fetch tracklist data");
    }
  };

  if (location.pathname === "/mixs") {
    populatePlaylist();
  }
};
