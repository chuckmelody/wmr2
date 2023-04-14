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
                
                  <div class="col-sm-12 col-md-4">
                    <div>
                      <div class="playlist">
                        <div class="py-5" id="playlist-modal">
                            <ul id="playlist-tracks">
                            Tracks
                              <!-- Tracks in the playlist will be added here -->
                            </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-12 col-md-4">
                Left Bar
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
