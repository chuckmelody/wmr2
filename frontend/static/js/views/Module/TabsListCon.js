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
            <div class="wmrNowPlayImage-container">
            <img src="./static/img/wmr/covers/des.jpg" alt="Mix Image">
            </div>
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
    <div class="tab-pane fade text-dark" id="stats" role="tabpanel" aria-labelledby="stats-tab">
      <div class="card bg-transparent">
        <div class="card-body">
        <div class="d-flex justify-content-between align-items-center gap-3">
        <div class="ms-2">
        <h5 class="card-title text-wmr2">Mixcloud Statistics</h5>
        </div>
              <div class="me-2 d-flex justify-contents-center align-items-center gap-2">
              <div>
              <button type="button" class="btn btn-outline-wmr">Shows <span>420</span></button> 
              </div>
              <div>
              <button type="button" class="btn btn-outline-wmr">Playlists <span>48</span></button> 
              </div>
              </div>
              </div>
          
          <div class="container-fluid px-0">
          
    <div class="row mt-4">
    <div class="col-lg-12">
    <div class="card bg-dark">
      <div class="card-header wmrHeaderCol">
        <h5 class="card-title wmrMixEffectCd mb-0 wmrTextWhite">Current Mix</h5>
      </div>
      <div class="card-body wmr-bg-image text-secondary">
        <div class="row">
          <div class="d-flex justify-content-between align-items-center">
            <div class="d-flex align-items-center">
              <img class="img-fluid" id="wmrStatImg" src="/static/img/wmr/covers/des.jpg">
              <div class="d-flex flex-column">
              <div class="ms-3 text-wmr2">Reggae Mi Reggae Vol 12</div>
              <div class="ms-3 fs-6">By: Chuck Melody</div>
              </div>
            </div>
            <div class="text-end">
              <span class="bi bi-play me-2 text-wmr2"></span>
              <span class="wmrStatsPlayed text-wmr2">465</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
    </div>
    <div class="row mt-2">
      <div class="col-lg-12">

      </div>
    </div>

    <div class="row my-3 px-2 ">
          <div class="col-lg-12">


          <div>
          <img class="img-fluid" src="static/img/wmr/covers/Gospel_728x90.webp" alt="wmrBanner">
          </div>

          
          </div>
          </div>

    

    <div class="row mt-1 wmr-bg-image py-4 px-2 mx-1">

      <div class="col-lg-6">
        <div class="card wmrTotalPlayCardColor">
          <div class="card-header">
          <div class="card-icon">
          <i class="bi bi-play-circle"></i>
          </div>
            <h5 class="card-title wmrTextWhite">Total plays</h5>
          </div>
          <div class="card-body wmrTextWhite">
            <h1 class="display-4">1000
            </h1>
          </div>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="card wmrFavoritesCardColor">
          <div class="card-header">
          <div class="card-icon">
          <i class="bi bi-heart-fill"></i>
          </div>
            <h5 class="card-title wmrTextWhite">Favorites</h5>
          </div>
          <div class="card-body wmrTextWhite">
          <h1 class="display-4">374
          </h1>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-4 wmr-bg-image py-4 px-2 mx-1">
    
      <div class="col-lg-6">
        <div class="card wmrFollowerCardColor">
          <div class="card-header">
          <div class="card-icon">
          <i class="bi bi-person-circle"></i>
          </div>
            <h5 class="card-title wmrTextWhite">Followers</h5>
          </div>
          <div class="card-body wmrTextWhite">
          <h1 class="display-4">1800
            </h1>
          </div>
        </div>
      </div>
      <div class="col-lg-6">
      <div class="card wmrCommentCardColor">
        <div class="card-header">
          <div class="card-icon">
          <i class="bi bi-chat-dots"></i>
          </div>
          <h5 class="card-title wmrTextWhite">Comment</h5>
        </div>
        <div class="card-body wmrTextWhite">
          <h1 class="display-4">540</h1>
        </div>
      </div>
    </div>
    
    </div>
    <div class="row mt-5">
    <div class="col-lg-6">
      <div class="card wmrFollowerCardColor d-none">
        <div class="card-header">
        <div class="card-icon">
        <i class="bi bi-person-circle"></i>
        </div>
          <h5 class="card-title wmrTextWhite">Followers</h5>
        </div>
        <div class="card-body wmrTextWhite">
        <h1 class="display-4">1800
          </h1>
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
