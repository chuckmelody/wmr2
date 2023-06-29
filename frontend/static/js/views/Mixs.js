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
                <div class="py-1 playlist-modal" id="playlist-modal">
                   ${wmrTabListCon()}
                </div>
             </div>
          </div>
          <div class="col-sm-12 col-md-4">
             <div class="mt-4 p-4 pt-2 wmrNowPlayDp" id="wmrNowPlayDp">
             <div class="row pt-2">
             <div class="d-flex justify-content-between align-items-center px-4">
             <div id="wmr-logo" class="fw-bold position-relative">
                                    <sup id="wmr-logo-td">™</sup>
                                    <h1 class="text-wmr2">Baracoda
                                        
                                        
                                    </h1>

                                </div>
             <div>
             <span class="wmrM700">Media Controller</span> <span class="text-wmr"><h5 class="text-wmr2">DJM-700</h5></span>
             </div>
             </div>
             </div>
                <div class="wmrNowPlayDpInner my-0 p-2 pb-3 mb-4">
                   <div class="row mt-3">
                      <div class="wmrMixEffectCon d-flex justify-content-center gap-2 px-4">
                         <div class="col-sm-6">
                            <div class="card border-0 wmrMixEffectCd">
                               <div class="card-head py-1">
                                  Aplitude Range
                               </div>
                               <div class="card-body p-1">
                                  <div class="d-flex justify-content-between align-content-center px-2">
                                     <div>
                                        <img class="img-fluid" id="wmrMixerTops" src="./static/img/mixdesk/Knob_mid_064.png" alt="Tops Knob">
                                        <div class="pb-2">HIGH</div>
                                        <div class="d-flex justify-content-between align-items-center gap-2">
                                        <button class="btn btn-dark min-btn">-</button> 
                                        <button class="btn btn-dark plus-btn">+</button>
                                        </div>
                                     </div>
                                     <div>
                                        <img class="img-fluid" id="wmrMixerMid" src="./static/img/mixdesk/Knob_mid_064.png" alt="Mid Range Knob">
                                        <div class="pb-2">MID</div>
                                        <div class="d-flex justify-content-between align-items-center gap-2">
                                        <button class="btn btn-dark min-btn">-</button> 
                                        <button class="btn btn-dark plus-btn">+</button>
                                        </div>
                                     </div>
                                     <div>
                                        <img class="img-fluid" id="wmrMixerBass" src="./static/img/mixdesk/Knob_mid_064.png" alt="Bass Knob">
                                        <div class="pb-2">LOW</div>
                                        <div class="d-flex justify-content-between align-items-center gap-2">
                                        <button class="btn btn-dark min-btn">-</button> 
                                        <button class="btn btn-dark plus-btn">+</button>
                                        </div>
                                     </div>
                                  </div>
                               </div>
                            </div>
                         </div>
                         <div class="col-sm-2">
                         <div class="card border-0 wmrMixEffectCd">
                          <div class="card-head py-1">
                                Cut
                          </div>
                          <div class="card-body p-1">
                          <div class="wmrcut d-flex flex-column gap-2 justify-content-between align-content-center py-2 ">
                          <button type="button" class="btn btn-dark plus-btn btn-block btn-small text-secondary">High</button>
                          <button type="button" class="btn btn-dark plus-btn btn-block btn-small text-secondary">Mid</button>
                          <button type="button" class="btn btn-dark plus-btn btn-block btn-small text-secondary">Low</button>
                          </div> 
                              </div>
                         </div>
                         </div>
                         <div class="col-sm-4">
                            <div class="card border-0 wmrMixEffectCd">
                               <div class="card-head py-1">
                                  Main
                               </div>
                               <div class="card-body p-1">
                                  <div class="d-flex justify-content-between gap-2 align-content-center px-2">
                                     
                                     <div>
                                        <img class="img-fluid" id="wmrMixerMid" src="./static/img/mixdesk/Knob_mid_064.png" alt="Mid Range Knob">
                                        <div class="pb-2">PITCH</div>
                                        <div class="d-flex justify-content-between align-items-center gap-2">
                                        <button class="btn btn-dark min-btn">-</button> 
                                        <button class="btn btn-dark plus-btn">+</button>
                                        </div>
                                     </div>
                                     <div>
                                        <img class="img-fluid" id="wmrMixerBass" src="./static/img/mixdesk/Knob_mid_064.png" alt="Bass Knob">
                                        <div class="pb-2">MASTER</div>
                                        <div class="d-flex justify-content-between align-items-center gap-2">
                                        <button class="btn btn-dark min-btn">-</button> 
                                        <button class="btn btn-dark plus-btn">+</button>
                                        </div>
                                     </div>
                                  </div>
                               </div>
                            </div>
                            
                         </div>
                      </div>
                      <div class="row m-0 my-2">
                      <div class="d-flex justify-content-between wmrMixEffectCd wmrMixTabSelectCon gap-2 py-2 mx-1" style="max-width: 98.5%">
                      <button class="btn btn-dark plus-btn text-secondary" id="wmrMixerPlayListBtn">Playlist</button>
                      <button class="btn btn-dark plus-btn text-secondary" id="wmrMixerDetailsBtn">Details</button>
                      <button class="btn btn-dark plus-btn text-secondary" id="wmrMixerFavoritesBtn">Favorites</button>
                      <button class="btn btn-dark plus-btn text-secondary" id="wmrMixerHistoryBtn">History</button>
                      
                      <button class="btn btn-dark plus-btn text-secondary" id="wmrMixerStatsBtn">Stats</button>
                      <button class="btn btn-dark plus-btn text-secondary" id="wmrMixerPlayerBtn">Player</button>
                      </div>
                      </div>
                      <div class="row w-100 m-0">
                         <div class="wmr-mix-channalCon d-flex justify-content-center gap-2 text-center px-1">
                            <div class="wmrVolDarkBG" id="wmrMeterConCh1">
                               <span class="bg-black p-1 px-2 rounded-1" >0</span>
                               <div class="my-0">
                                  <canvas class="m-0" id="wmCh1" width="25" height="205" data-val="0">No canvas</canvas>
                               </div>
                            </div>
                            <div class="wmrVolDarkBG">
                               <button class="btn btn-dark wmrMute" id="wmrCh1Mute">Mute</button>
                               <div class="wmr-channel my-3">
                                  <div class="wmrVolLeftCon wmr-channel-inner">
                                     <input class="slider" id="wmrVolLeftRange" type="range" min="0" step="1" max="10" value="0">
                                  </div>
                               </div>
                               <span>MIC</span>
                            </div>
                            <div class="wmrVolDarkBG" id="wmrMeterConCh2">
                               <span class="bg-black p-1 px-2 rounded-1">0</span>
                               <div class="my-0">
                                  <canvas class="m-0" id="wmCh2" width="25" height="205" data-val="0">No canvas</canvas>
                               </div>
                            </div>
                            <div class="wmrVolDarkBG">
                               <button class="btn btn-dark wmrMute" id="wmrCh2Mute">Mute</button>
                               <div class="wmr-channel my-3">
                                  <div class="wmrVolMiddleCon wmr-channel-inner">
                                     <input class="slider" id="wmrVolMiddleRange" type="range" min="0" step="1" max="10" value="0">
                                  </div>
                               </div>
                               <span>JINGLES</span>
                            </div>
                            <div class="wmrVolDarkBG" id="wmrMeterConCh3">
                               <span class="bg-black p-1 px-2 rounded-1">0</span>
                               <div class="my-0">
                                  <canvas class="m-0" id="wmCh3" width="25" height="205" data-val="0">No canvas</canvas>
                               </div>
                            </div>
                            <div class="wmrVolDarkBG">
                               <button class="btn btn-dark wmrMute" id="wmrCh3Mute">Mute</button>
                               <div class="wmr-channel my-3">
                                  <div class="wmrVolRightCon wmr-channel-inner3">
                                     <input class="slider" id="wmrVolRightRange" type="range" min="0" step="10" max="100" value="0">
                                  </div>
                               </div>
                               <span>MIXCLOUD</span>
                            </div>
                         </div>
                      </div>
                      <div class="row">
                         
                      </div>
                   </div>
                </div>
             </div>
          </div>
          <div class="col-sm-12 col-md-4">
          
          <div class="mt-4 p-4 pt-2 wmrNowPlayDp" id="wmrNowPlayDp">
          <div class="row pt-2">
             <div class="d-flex justify-content-between align-items-center px-4">
             <div id="wmr-logo" class="fw-bold position-relative">
                                    <sup id="wmr-logo-td">™</sup>
                                    <h1 class="text-wmr2">Baracoda
                                        
                                        
                                    </h1>

                                </div>
             <div>
             <span class="wmrM700">Media Displayer</span> <span class="text-wmr"><h5 class="text-wmr2">DJD-700</h5></span>
             </div>
             </div>
             </div>
             <div class="wmrNowPlayDpInner my-0 p-2 pb-3 mb-4">
             <!-- Galleries -->
<div class="container px-2 mt-4">
<div class="card border-0 rounded-1">
<div class="card-header wmrHeaderCol rounded-0 wmr-Grey fw-bolder text-uppercase py-1 text-start">
Chuck
</div>
<div class="card-body p-1" id="wmrDJDBodyRight">
  <div class="row">
    <div class="col">
      <h2 class="mt-4">10 Most Played Songs</h2>
      <div id="mostPlayedGallery" class="image-gallery"></div>
    </div>
  </div>
  <div class="row">
    <div class="col">
      <h2 class="mt-4">10 Random Songs</h2>
      <div id="randomSongsGallery" class="image-gallery"></div>
    </div>
  </div>
  <div class="row">
    <div class="col">
      <h2 class="mt-4">10 Random Genres</h2>
      <div id="randomGenresGallery" class="image-gallery"></div>
    </div>
  </div>
</div>
</div>
</div>

<!-- Lightbox Modal -->
<div id="lightboxModal" class="modal">
  <div class="modal-content">
    <span class="close">&times;</span>
    <img id="lightboxImage" src="" alt="Enlarged Image">
  </div>
</div>

<!-- Social Sharing Buttons -->
<div class="social-sharing">
  <button id="shareSongButton" class="btn btn-primary">Share Song</button>
  <button id="shareGalleryButton" class="btn btn-secondary">Share Gallery</button>
</div>

<!-- Related Songs Section -->
<div id="relatedSongsSection">
  <h3>Related Songs</h3>
  <div id="relatedSongsGallery" class="image-gallery"></div>
</div>

             </div>
          </div>
        </div>
       </div>
    </div>
 </section>
    `;
  }
}
