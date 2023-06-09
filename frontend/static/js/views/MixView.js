import AbstractView from "./AbstractView.js";
import wmrTabListCon from "./Module/TabsListCon.js";
export default class MixView extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("MixView");
  }

  async getHtml() {
    return `
      <section>
        <div class="container-fluid" id="test">
          <div class="row">
            <div class="col-sm-12 col-md-4">
              <div class="playlist">
                <div class="py-5" id="playlist-modal">
                  Lords house
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
