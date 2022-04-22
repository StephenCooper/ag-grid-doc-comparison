class CustomNumberFilter {
  init(params) {
    this.filterText = null;
    this.params = params;
    this.setupGui();
  }

  // not called by AG Grid, just for us to help setup
  setupGui() {
    this.gui = document.createElement('div');
    this.gui.innerHTML =
      '<div style="padding: 4px;">' +
      '<div style="font-weight: bold;">Greater than: </div>' +
      '<div><input style="margin: 4px 0px 4px 0px;" type="number" id="filterText" placeholder="Number of medals..."/></div>' +
      '</div>';

    this.onFilterChanged = () => {
      this.extractFilterText();
      this.params.filterChangedCallback();
    };

    this.eFilterText = this.gui.querySelector('#filterText');
    this.eFilterText.addEventListener('input', this.onFilterChanged);
  }

  extractFilterText() {
    this.filterText = this.eFilterText.value;
  }

  getGui() {
    return this.gui;
  }

  doesFilterPass(params) {
    if (!this.isFilterActive()) {
      return true;
    }

    var { api, colDef, column, columnApi, context, valueGetter } = this.params;
    var { node } = params;

    var value = valueGetter({
      api,
      colDef,
      column,
      columnApi,
      context,
      data: node.data,
      getValue: (field) => node.data[field],
      node,
    });

    var filterValue = this.filterText;

    if (!value) return false;
    return Number(value) > Number(filterValue);
  }

  isFilterActive() {
    return (
      this.filterText !== null &&
      this.filterText !== undefined &&
      this.filterText !== '' &&
      this.isNumeric(this.filterText)
    );
  }

  isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(parseFloat(n));
  }

  getModel() {
    return this.isFilterActive() ? Number(this.eFilterText.value) : null;
  }

  setModel(model) {
    this.eFilterText.value = model;
    this.extractFilterText();
  }

  myMethodForTakingValueFromFloatingFilter(value) {
    this.eFilterText.value = value;
    this.onFilterChanged();
  }

  destroy() {
    this.eFilterText.removeEventListener('input', this.onFilterChanged);
  }
}
