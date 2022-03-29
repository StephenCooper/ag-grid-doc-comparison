const gridOptions = {
  columnDefs: [
    { field: "athlete", minWidth: 200 },
    { field: "age" },
    { field: "country", minWidth: 200 },
    { field: "year" },
    { field: "date", minWidth: 180 },
    { field: "sport", minWidth: 200 },
    { field: "gold" },
    { field: "silver" },
    { field: "bronze" },
    { field: "total" },
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
      name: "Alert " + params.value,
      action: function () {
        window.alert("Alerting about " + params.value);
      },
      cssClasses: ["redFont", "bold"],
    },
    {
      // custom item
      name: "Always Disabled",
      disabled: true,
      tooltip:
        "Very long tooltip, did I mention that I am very long, well I am! Long!  Very Long!",
    },
    {
      name: "Country",
      subMenu: [
        {
          name: "Ireland",
          action: function () {
            console.log("Ireland was pressed");
          },
          icon: createFlagImg("ie"),
        },
        {
          name: "UK",
          action: function () {
            console.log("UK was pressed");
          },
          icon: createFlagImg("gb"),
        },
        {
          name: "France",
          action: function () {
            console.log("France was pressed");
          },
          icon: createFlagImg("fr"),
        },
      ],
    },
    {
      name: "Person",
      subMenu: [
        {
          name: "Niall",
          action: function () {
            console.log("Niall was pressed");
          },
        },
        {
          name: "Sean",
          action: function () {
            console.log("Sean was pressed");
          },
        },
        {
          name: "John",
          action: function () {
            console.log("John was pressed");
          },
        },
        {
          name: "Alberto",
          action: function () {
            console.log("Alberto was pressed");
          },
        },
        {
          name: "Tony",
          action: function () {
            console.log("Tony was pressed");
          },
        },
        {
          name: "Andrew",
          action: function () {
            console.log("Andrew was pressed");
          },
        },
        {
          name: "Kev",
          action: function () {
            console.log("Kev was pressed");
          },
        },
        {
          name: "Will",
          action: function () {
            console.log("Will was pressed");
          },
        },
        {
          name: "Armaan",
          action: function () {
            console.log("Armaan was pressed");
          },
        },
      ],
    }, // built in separator
    "separator",
    {
      // custom item
      name: "Windows",
      shortcut: "Alt + W",
      action: function () {
        console.log("Windows Item Selected");
      },
      icon: '<img src="https://www.ag-grid.com/example-assets/skills/windows.png" />',
    },
    {
      // custom item
      name: "Mac",
      shortcut: "Alt + M",
      action: function () {
        console.log("Mac Item Selected");
      },
      icon: '<img src="https://www.ag-grid.com/example-assets/skills/mac.png"/>',
    }, // built in separator
    "separator",
    {
      // custom item
      name: "Checked",
      checked: true,
      action: function () {
        console.log("Checked Selected");
      },
      icon: '<img src="https://www.ag-grid.com/example-assets/skills/mac.png"/>',
    }, // built in copy item
    "copy",
    "separator",
    "chartRange",
  ];

  return result;
}

// setup the grid after the page has finished loading
document.addEventListener("DOMContentLoaded", function () {
  var gridDiv = document.querySelector("#myGrid");
  new agGrid.Grid(gridDiv, gridOptions);

  fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
    .then((response) => response.json())
    .then((data) => gridOptions.api.setRowData(data));
});
