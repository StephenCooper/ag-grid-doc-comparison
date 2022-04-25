const gridOptions = {
  columnDefs: [
    { field: 'athlete', minWidth: 200 },
    { field: 'age' },
    { field: 'country', minWidth: 200 },
    { field: 'year' },
    { field: 'date', minWidth: 180 },
    { field: 'sport', minWidth: 200 },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' },
  ],
  defaultColDef: {
    flex: 1,
    minWidth: 100,
    resizable: true,
  },
  enableRangeSelection: true,
  allowContextMenuWithControlKey: true,
  getContextMenuItems: getContextMenuItems,
};

function createFlagImg(flag) {
  return (
    '<img border="0" width="15" height="10" src="https://flags.fmcdn.net/data/flags/mini/' +
    flag +
    '.png"/>'
  );
}

function getContextMenuItems(params) {
  var result = [
    {
      // custom item
      name: 'Alert ' + params.value,
      action: () => {
        window.alert('Alerting about ' + params.value);
      },
      cssClasses: ['redFont', 'bold'],
    },
    {
      // custom item
      name: 'Always Disabled',
      disabled: true,
      tooltip:
        'Very long tooltip, did I mention that I am very long, well I am! Long!  Very Long!',
    },
    {
      name: 'Country',
      subMenu: [
        {
          name: 'Ireland',
          action: () => {
            console.log('Ireland was pressed');
          },
          icon: createFlagImg('ie'),
        },
        {
          name: 'UK',
          action: () => {
            console.log('UK was pressed');
          },
          icon: createFlagImg('gb'),
        },
        {
          name: 'France',
          action: () => {
            console.log('France was pressed');
          },
          icon: createFlagImg('fr'),
        },
      ],
    },
    {
      name: 'Person',
      subMenu: [
        {
          name: 'Niall',
          action: () => {
            console.log('Niall was pressed');
          },
        },
        {
          name: 'Sean',
          action: () => {
            console.log('Sean was pressed');
          },
        },
        {
          name: 'John',
          action: () => {
            console.log('John was pressed');
          },
        },
        {
          name: 'Alberto',
          action: () => {
            console.log('Alberto was pressed');
          },
        },
        {
          name: 'Tony',
          action: () => {
            console.log('Tony was pressed');
          },
        },
        {
          name: 'Andrew',
          action: () => {
            console.log('Andrew was pressed');
          },
        },
        {
          name: 'Kev',
          action: () => {
            console.log('Kev was pressed');
          },
        },
        {
          name: 'Will',
          action: () => {
            console.log('Will was pressed');
          },
        },
        {
          name: 'Armaan',
          action: () => {
            console.log('Armaan was pressed');
          },
        },
      ],
    }, // built in separator
    'separator',
    {
      // custom item
      name: 'Windows',
      shortcut: 'Alt + W',
      action: () => {
        console.log('Windows Item Selected');
      },
      icon:
        '<img src="https://www.ag-grid.com/example-assets/skills/windows.png" />',
    },
    {
      // custom item
      name: 'Mac',
      shortcut: 'Alt + M',
      action: () => {
        console.log('Mac Item Selected');
      },
      icon:
        '<img src="https://www.ag-grid.com/example-assets/skills/mac.png"/>',
    }, // built in separator
    'separator',
    {
      // custom item
      name: 'Checked',
      checked: true,
      action: () => {
        console.log('Checked Selected');
      },
      icon:
        '<img src="https://www.ag-grid.com/example-assets/skills/mac.png"/>',
    }, // built in copy item
    'copy',
    'separator',
    'chartRange',
  ];

  return result;
}

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function () {
  var gridDiv = document.querySelector('#myGrid');
  new agGrid.Grid(gridDiv, gridOptions);

  fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
    .then((response) => response.json())
    .then((data) => gridOptions.api.setRowData(data));
});
