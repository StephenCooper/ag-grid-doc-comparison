class CustomNoRowsOverlay {
  init(params) {
    this.eGui = document.createElement('div');
    this.eGui.innerHTML = `
            <div class="ag-overlay-loading-center" style="background-color: lightcoral;">   
                <i class="far fa-frown"> ${params.noRowsMessageFunc()} </i>
            </div>
        `;
  }

  getGui() {
    return this.eGui;
  }

  refresh(params) {
    return false;
  }
}
