const wmrTabListCon = () => {
  return `
  <div class="container mt-3">
  <ul class="nav nav-tabs gap-3 d-flex justify-content-between" id="myTab" role="tablist">
    <li class="nav-item liBtnAl" role="presentation">
      <button class="nav-link active" id="playlist-tab" data-bs-toggle="tab" data-bs-target="#playlist" type="button" role="tab" aria-controls="playlist" aria-selected="true">Playlist</button>
    </li>
    <li class="nav-item liBtnAl" role="presentation">
      <button class="nav-link" id="display-tab" data-bs-toggle="tab" data-bs-target="#display" type="button" role="tab" aria-controls="dispaly" aria-selected="false">Display</button>
    </li>
    <li class="nav-item liBtnAl" role="presentation">
      <button class="nav-link" id="favorites-tab" data-bs-toggle="tab" data-bs-target="#favorites" type="button" role="tab" aria-controls="favorites" aria-selected="false">Favorites</button>
    </li>
    <li class="nav-item liBtnAl" role="presentation">
      <button class="nav-link" id="history-tab" data-bs-toggle="tab" data-bs-target="#history" type="button" role="tab" aria-controls="history" aria-selected="false">History</button>
    </li>
    <li class="nav-item liBtnAl" role="presentation">
      <button class="nav-link" id="stata-tab" data-bs-toggle="tab" data-bs-target="#stats" type="button" role="tab" aria-controls="stats" aria-selected="false">Stats</button>
    </li>
  </ul>
  <div class="tab-content" id="myTabContent">
    <div class="tab-pane fade show active" id="playlist" role="tabpanel" aria-labelledby="playlist-tab">
      <div class="card bg-transparent">
        <div class="card-body p-0">
          <h5 class="card-title">Playlist</h5>
          <ul id="playlist-items" class="list-group wmr-plistUL">
          </ul>
        </div>
      </div>
    </div>
    <hr class="my-1">
    <div class="tab-pane fade" id="display" role="tabpanel" aria-labelledby="display-tab">
      <div class="card bg-transparent border-0">
      <div class="card-header bg-transparent border-0">
      <div class="d-flex justify-content-between align-items-center">
        <div>
        <h5 class="card-title wmrDisplayTitle mb-0">Display</h5>
        </div>
        <div>
        <img class="text-wmr2" src="/static/img/wmr/icons/play-fill-sm.svg"> <span class="wmr-Grey" id="wmrdisplayCount">348</span>
        </div>
      </div>
      
      </div>
        <div class="card-body p-3">
          
          <div class="d-flex justify-content-center align-items-center position-relative" id="wmrNowPlayCon">
            <div id="wmrNowPlayConInner">
            <img src="./static/img/wmr/covers/des.jpg" alt="Mix Image ">
            </div>
            <div id="wmrNowPlayConOuter" class="w-100">
                <img class="img-fluid" src="./static/img/wmr/covers/TabScreenFrame400.png" alt="Tab Screen">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="tab-pane fade" id="favorites" role="tabpanel" aria-labelledby="favorites-tab">
      <div class="card bg-transparent">
        <div class="card-body">
          <h5 class="card-title">Favorites</h5>
          <ul id="favorites-items" class="list-group">
          </ul>
        </div>
      </div>
    </div>
    <div class="tab-pane fade" id="history" role="tabpanel" aria-labelledby="history-tab">
      <div class="card bg-transparent">
        <div class="card-body">
          <h5 class="card-title">History</h5>
          <ul id="history-items" class="list-group">
          </ul>
        </div>
      </div>
    </div>
    <div class="tab-pane fade" id="stats" role="tabpanel" aria-labelledby="stats-tab">
      <div class="card bg-transparent">
        <div class="card-body">
          <h5 class="card-title">Stats</h5>
          <div class="container">
    <div class="row mt-5">
      <div class="col-lg-6">
        <div class="card">
          <div class="card-header">
            <h5 class="card-title">Play Count</h5>
          </div>
          <div class="card-body">
            <canvas id="playCountChart"></canvas>
          </div>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="card">
          <div class="card-header">
            <h5 class="card-title">Favorite Count</h5>
          </div>
          <div class="card-body">
            <canvas id="favoriteCountChart"></canvas>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-lg-6">
        <div class="card">
          <div class="card-header">
            <h5 class="card-title">Comment Count</h5>
          </div>
          <div class="card-body">
            <canvas id="commentCountChart"></canvas>
          </div>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="card">
          <div class="card-header">
            <h5 class="card-title">Listener Count</h5>
          </div>
          <div class="card-body">
            <canvas id="listenerCountChart"></canvas>
          </div>
        </div>
      </div>
    </div>
  </div>
        </div>
      </div>
    </div>
  </div>
</div>
    `;
};

export default wmrTabListCon;
