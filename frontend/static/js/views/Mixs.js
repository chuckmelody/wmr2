import AbstractView from "./AbstractView.js";

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
                  <div class="col-sm-12 col-md-8">
                    <div>
                    <ul id="wmr-mixcloud-playlist">
                    Playlist
                    </ul>
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
