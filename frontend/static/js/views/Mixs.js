import AbstractView from "./AbstractView.js";
import { wmrTabListCon } from "./Module/TabsListCon.js";

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

  async afterRender() {
    const mixcloudButton = document.querySelector("#wmr-mixcloud-btn");
    const wmrtabsListContainer = document.querySelector("#contentb");
    console.log("render run");
    mixcloudButton.addEventListener("click", function () {
      console.log("render run");
      wmrtabsListContainer.innerHTML = wmrTabListCon();
    });
  }
}
