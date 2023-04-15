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
    // Add any additional content or event listeners here
    const thrh = document.querySelector("#playlist-modal");
    thrh.innerHTML = "";
    thrh.innerHTML = wmrTabListCon();
  }
}
