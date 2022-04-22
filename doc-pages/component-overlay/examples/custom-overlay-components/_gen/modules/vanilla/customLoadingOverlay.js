class CustomLoadingOverlay {
  init(params) {
    this.eGui = document.createElement('div');
    this.eGui.innerHTML =
      '<div class="ag-overlay-loading-center" style="background-color: lightsteelblue;">' +
      '   <i class="fas fa-hourglass-half"> ' +
      params.loadingMessage +
      ' </i>' +
      '</div>';
  }

  getGui() {
    return this.eGui;
  }

  refresh(params) {
    return false;
  }
}
