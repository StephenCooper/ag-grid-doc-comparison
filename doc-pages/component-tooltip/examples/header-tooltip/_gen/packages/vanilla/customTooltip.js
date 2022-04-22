class CustomTooltip {
  init(params) {
    const eGui = (this.eGui = document.createElement('div'));
    const isHeader = params.rowIndex === undefined;
    const isGroupedHeader = isHeader && !!params.colDef.children;
    let str;
    let valueToDisplay;

    eGui.classList.add('custom-tooltip');

    if (isHeader) {
      str = '<p>Group Name: ' + params.value + '</p>';
      if (isGroupedHeader) {
        str += '<hr>';
        params.colDef.children.forEach(function (header, idx) {
          str += '<p>Child ' + (idx + 1) + ' - ' + header.headerName + '</p>';
        });
      }
      eGui.innerHTML = str;
    } else {
      valueToDisplay = params.value.value ? params.value.value : '- Missing -';

      eGui.innerHTML =
        "<p>Athlete's name:</p>" +
        '<p><span class"name">' +
        valueToDisplay +
        '</span></p>';
    }
  }

  getGui() {
    return this.eGui;
  }
}
