class ColourCellRenderer {
  init(params) {
    this.eGui = document.createElement("div");
    if (params.value === "(Select All)") {
      this.eGui.innerText = params.value;
    } else {
      this.eGui.innerText = params.valueFormatted;
      this.eGui.style.color = this.removeSpaces(params.valueFormatted);
    }
  }

  removeSpaces(str) {
    return str ? str.replace(/\s/g, "") : str;
  }

  getGui() {
    return this.eGui;
  }

  refresh() {
    return false;
  }
}
