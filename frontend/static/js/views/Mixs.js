import AbstractView from "./AbstractView.js";
import wmrTabListCon from "./Module/TabsListCon.js";
import MixView from "./MixView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Mix");
  }

  async render() {
    const html = await this.getHtml();
    this.container.innerHTML = html;
    await this.afterRender();
    return;
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
    const playlistModal = document.querySelector("#playlist-modal");
    playlistModal.innerHTML = "";
    playlistModal.appendChild(document.createElement("h1")).textContent =
      "In Gods Name";

    console.log(playlistModal);
  }
}
const mixView = new MixView();
mixView.render();
