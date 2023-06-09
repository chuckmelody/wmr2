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
                <div class="py-5 playlist-modal" id="playlist-modal">
                ${wmrTabListCon()}
                </div>
              </div>
            </div>
            <div class="col-sm-12 col-md-4 mt-5 px-5" id="wmrNowPlayDp">

            <div class="d-flex justify-content-between text-center mb-1">
            
            
            </div>



            <div class="row d-flex justify-content-between text-center">
            <div class="col-sm-12 col-md-4 wmrVolDarkBG py-4">
            
              <div class="wmrFadScaleLeft">
              <div class="wmrVolLeftCon">
                   <input class="slider" id="wmrVolLeftRange" type="range" min="0" max="10" value="0">
                </div>
              
              </div>
            </div>
            <div class="col-sm-12 col-md-4">
              <div>
              Center
              </div>
            </div>
            <div class="col-sm-12 col-md-4 wmrVolDarkBG py-4">
            
              <div Class="wmrFadScaleRight">
              <div class="wmrVolRightCon">
                   <input class="slider" id="wmrVolRightRange" type="range" min="0" max="10" value="0">
                </div>
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
