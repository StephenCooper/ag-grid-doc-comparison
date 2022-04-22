const gridOptions = {
  columnDefs: [
    { field: 'type' },
    {
      field: 'value',
      editable: true,
      cellEditorSelector: cellEditorSelector,
    },
  ],
  defaultColDef: {
    flex: 1,
  },
  rowData: getData(),

  onRowEditingStarted: onRowEditingStarted,
  onRowEditingStopped: onRowEditingStopped,
  onCellEditingStarted: onCellEditingStarted,
  onCellEditingStopped: onCellEditingStopped,
};

function onRowEditingStarted(event) {
  console.log('never called - not doing row editing');
}

function onRowEditingStopped(event) {
  console.log('never called - not doing row editing');
}

function onCellEditingStarted(event) {
  console.log('cellEditingStarted');
}

function onCellEditingStopped(event) {
  console.log('cellEditingStopped');
}

function cellEditorSelector(params) {
  if (params.data.type === 'age') {
    return {
      component: NumericCellEditor,
    };
  }

  if (params.data.type === 'gender') {
    return {
      component: 'agRichSelectCellEditor',
      params: {
        values: ['Male', 'Female'],
      },
      popup: true,
    };
  }

  if (params.data.type === 'mood') {
    return {
      component: MoodEditor,
      popup: true,
      popupPosition: 'under',
    };
  }

  return undefined;
}

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function () {
  var gridDiv = document.querySelector('#myGrid');
  new agGrid.Grid(gridDiv, gridOptions);
});
