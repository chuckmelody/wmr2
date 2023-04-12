import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Settings");
  }

  async getHtml() {
    return `
    <section>
            <div class="container-fluid">
                <h1>Settings</h1>
                <p>Manage your privacy and configuration.</p>
                <p>Manage your privacy and configuration.</p>
                <p>Manage your privacy and configuration.</p>
                <p>Manage your privacy and configuration.</p>
                <p>Manage your privacy and configuration.</p>
                <p>Manage your privacy and configuration.</p>
                <p>Manage your privacy and configuration.</p>
                <p>Manage your privacy and configuration.</p>
                <p>Manage your privacy and configuration.</p>
                <p>Manage your privacy and configuration.</p>
                <p>Manage your privacy and configuration.</p>
                <p>Manage your privacy and configuration.</p>
                <p>Manage your privacy and configuration.</p>
            </div>
            </section>
        `;
  }
}
