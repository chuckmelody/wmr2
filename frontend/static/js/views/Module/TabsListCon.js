const wmrTabListCon = () => {
  return `
  <div class="container mt-3">
  <ul class="nav nav-tabs" id="myTab" role="tablist">
    <li class="nav-item" role="presentation">
      <button class="nav-link active" id="playlist-tab" data-bs-toggle="tab" data-bs-target="#playlist" type="button" role="tab" aria-controls="playlist" aria-selected="true">Playlist</button>
    </li>
    <li class="nav-item" role="presentation">
      <button class="nav-link" id="favorites-tab" data-bs-toggle="tab" data-bs-target="#favorites" type="button" role="tab" aria-controls="favorites" aria-selected="false">Favorites</button>
    </li>
    <li class="nav-item" role="presentation">
      <button class="nav-link" id="history-tab" data-bs-toggle="tab" data-bs-target="#history" type="button" role="tab" aria-controls="history" aria-selected="false">History</button>
    </li>
    <li class="nav-item" role="presentation">
      <button class="nav-link" id="stata-tab" data-bs-toggle="tab" data-bs-target="#stats" type="button" role="tab" aria-controls="stats" aria-selected="false">Stats</button>
    </li>
  </ul>
  <div class="tab-content" id="myTabContent">
    <div class="tab-pane fade show active" id="playlist" role="tabpanel" aria-labelledby="playlist-tab">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Playlist</h5>
          <ul id="playlist-items" class="list-group">
          </ul>
        </div>
      </div>
    </div>
    <div class="tab-pane fade" id="favorites" role="tabpanel" aria-labelledby="favorites-tab">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Favorites</h5>
          <ul id="favorites-items" class="list-group">
          </ul>
        </div>
      </div>
    </div>
    <div class="tab-pane fade" id="history" role="tabpanel" aria-labelledby="history-tab">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">History</h5>
          <ul id="history-items" class="list-group">
          </ul>
        </div>
      </div>
    </div>
    <div class="tab-pane fade" id="stats" role="tabpanel" aria-labelledby="stats-tab">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Stats</h5>
          <ul id="stats-items" class="list-group">
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
    `;
};

export default wmrTabListCon;
