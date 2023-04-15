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
                            house
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

document.addEventListener("DOMContentLoaded", function () {
  const mixcloudButton = document.querySelector("#wmr-mixcloud-btn");

  mixcloudButton.addEventListener("click", function () {
    const wmrtabsListContainer = document.querySelector("#contentb");
    wmrtabsListContainer.innerHTML = wmrTabListCon();
    console.log(wmrtabsListContainer);
  });
});

// document.addEventListener("DOMContentLoaded", function (e) {
//   // // code to execute after the DOM content is loaded
//   // // Call the function and insert the returned HTML into a container element on the page
//   const container = document.querySelector("#playlist-modal");
//   // container.innerHTML = wmrTabListCon();
//   // console.log(wmrTabListCon());
//   console.log(container);
// });
