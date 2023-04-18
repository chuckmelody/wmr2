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
            <div class="py-5" id="contentb">
              <div id="wmrNowPlayDp" class="row row-cols-3 row-cols-md-3 g-3 mx-auto">
                <div class="col">
                  <img src="https://via.placeholder.com/150" class="img-fluid" alt="Placeholder">
                </div>
                <div class="col">
                  <img src="https://via.placeholder.com/150" class="img-fluid" alt="Placeholder">
                </div>
                <div class="col">
                  <img src="https://via.placeholder.com/150" class="img-fluid" alt="Placeholder">
                </div>

                <div id="wmrSliderVolConleft">
                <div class="mb-3" id="wmrVolNum">0</div>
                <div class="col wmrFadScale">
                
                  <img src="./static/img/mixdesk/fader_slot.png" class="img-fluid" alt="faderFill">
                  <div class="vertical-range-container">
                    <input id="leftVolSilde" type="range" min="0" max="10" value="0" class="vertical-range">
                    
                  </div>
                </div>
                </div>


                <div class="col">
                  <img src="https://via.placeholder.com/150" class="img-fluid" alt="Placeholder">
                </div>
                <div class="col wmrFadScale">
                <img src="./static/img/mixdesk/fader_slot.png" class="img-fluid" alt="faderFill">
                </div>
              </div>
            </div>
          </div>
          
            <div class="col-12 col-md-4">
              <div class="px-4 pt-5 d-flex justify-content-center align-items-center position-relative" id="wmrNowPlayCon">
                <div id="wmrNowPlayConInner">
                <img src="./static/img/wmr/covers/des.jpg">
                  
                </div>
                <div id="wmrNowPlayConOuter" class="w-100">
                    <img img-fluid src="./static/img/wmr/covers/TabScreenFrame400.png">
                  </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    `;
  }
}

// async function getmixCategory() {
//   await fetch(`http://localhost:3000/songs`)
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Network Error");
//       }
//       return response.json();
//     })
//     .then((data) => {
//       console.log(data);
//     })
//     .catch((error) => {
//       console.error("The has been a problem", error);
//     });
// }

// getmixCategory();
