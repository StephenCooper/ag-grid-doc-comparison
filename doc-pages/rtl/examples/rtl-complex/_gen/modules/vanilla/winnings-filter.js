class WinningsFilter {
  init(params) {
    var uniqueId = Math.random();
    this.filterChangedCallback = params.filterChangedCallback;
    this.eGui = document.createElement("div");
    this.eGui.innerHTML =
      '<div style="padding: 4px;">' +
      '<div style="font-weight: bold;">Example Custom Filter</div>' +
      '<div><label><input type="radio" name="filter"' +
      uniqueId +
      ' id="cbNoFilter">No filter</input></label></div>' +
      '<div><label><input type="radio" name="filter"' +
      uniqueId +
      ' id="cbPositive">Positive</input></label></div>' +
      '<div><label><input type="radio" name="filter"' +
      uniqueId +
      ' id="cbNegative">Negative</input></label></div>' +
      '<div><label><input type="radio" name="filter"' +
      uniqueId +
      ' id="cbGreater50">&gt; &pound;50,000</label></div>' +
      '<div><label><input type="radio" name="filter"' +
      uniqueId +
      ' id="cbGreater90">&gt; &pound;90,000</label></div>' +
      "</div>";
    this.cbNoFilter = this.eGui.querySelector("#cbNoFilter");
    this.cbPositive = this.eGui.querySelector("#cbPositive");
    this.cbNegative = this.eGui.querySelector("#cbNegative");
    this.cbGreater50 = this.eGui.querySelector("#cbGreater50");
    this.cbGreater90 = this.eGui.querySelector("#cbGreater90");
    this.cbNoFilter.checked = true; // initialise the first to checked
    this.cbNoFilter.onclick = this.filterChangedCallback;
    this.cbPositive.onclick = this.filterChangedCallback;
    this.cbNegative.onclick = this.filterChangedCallback;
    this.cbGreater50.onclick = this.filterChangedCallback;
    this.cbGreater90.onclick = this.filterChangedCallback;
    this.params = params;
  }

  getGui() {
    return this.eGui;
  }

  doesFilterPass(params) {
    var { api, colDef, column, columnApi, context } = this.params;
    var { node } = params;

    var value = this.params.valueGetter({
      api,
      colDef,
      column,
      columnApi,
      context,
      data: node.data,
      getValue: (field) => node.data[field],
      node,
    });

    if (this.cbNoFilter.checked) {
      return true;
    } else if (this.cbPositive.checked) {
      return value >= 0;
    } else if (this.cbNegative.checked) {
      return value < 0;
    } else if (this.cbGreater50.checked) {
      return value >= 50000;
    } else if (this.cbGreater90.checked) {
      return value >= 90000;
    } else {
      console.error("invalid checkbox selection");
    }
    return true;
  }

  isFilterActive() {
    return !this.cbNoFilter.checked;
  }

  // lazy, the example doesn't use getModel() and setModel()
  getModel() {}

  setModel() {}
}
