import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import {
  CellValueChangedEvent,
  ColDef,
  ColGroupDef,
  Grid,
  GridOptions,
  ICellRendererParams,
  ISetFilterParams,
  ValueFormatterParams,
  ValueSetterParams,
} from "ag-grid-community";
import { ColourCellRenderer } from "./colourCellRenderer";

const carMappings = {
  tyt: "Toyota",
  frd: "Ford",
  prs: "Porsche",
  nss: "Nissan",
};

const colourMappings = {
  cb: "Cadet Blue",
  bw: "Burlywood",
  fg: "Forest Green",
};

function extractValues(mappings: Record<string, string>) {
  return Object.keys(mappings);
}

const carBrands = extractValues(carMappings);
const colours = extractValues(colourMappings);

const gridOptions: GridOptions = {
  columnDefs: [
    {
      field: "make",
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: carBrands,
      },
      filterParams: {
        valueFormatter: function (params: ValueFormatterParams) {
          return lookupValue(carMappings, params.value);
        },
      },
      valueFormatter: function (params) {
        return lookupValue(carMappings, params.value);
      },
    },
    {
      field: "exteriorColour",
      minWidth: 150,
      cellEditor: "agRichSelectCellEditor",
      cellEditorPopup: true,
      cellEditorParams: {
        values: colours,
        cellRenderer: ColourCellRenderer,
      },
      filter: "agSetColumnFilter",
      filterParams: {
        values: colours,
        valueFormatter: function (params) {
          return lookupValue(colourMappings, params.value);
        },
        cellRenderer: ColourCellRenderer,
      } as ISetFilterParams,
      valueFormatter: function (params) {
        return lookupValue(colourMappings, params.value);
      },
      valueParser: function (params) {
        return lookupKey(colourMappings, params.newValue);
      },
      cellRenderer: ColourCellRenderer,
    },
    {
      field: "interiorColour",
      minWidth: 150,
      cellEditor: "agTextCellEditor",
      cellEditorParams: {
        useFormatter: true,
      },
      filter: "agSetColumnFilter",
      filterParams: {
        values: colours,
        valueFormatter: function (params: ValueFormatterParams) {
          return lookupValue(colourMappings, params.value);
        },
        cellRenderer: ColourCellRenderer,
      },
      valueFormatter: function (params) {
        return lookupValue(colourMappings, params.value);
      },
      valueParser: function (params) {
        return lookupKey(colourMappings, params.newValue);
      },
      cellRenderer: ColourCellRenderer,
    },
    {
      headerName: "Retail Price",
      field: "price",
      minWidth: 140,
      colId: "retailPrice",
      valueGetter: function (params) {
        return params.data.price;
      },
      valueFormatter: currencyFormatter,
      valueSetter: numberValueSetter,
    },
    {
      headerName: "Retail Price (incl Taxes)",
      minWidth: 205,
      editable: false,
      valueGetter: function (params) {
        // example of chaining value getters
        return params.getValue("retailPrice") * 1.2;
      },
      valueFormatter: currencyFormatter,
    },
  ],
  defaultColDef: {
    flex: 1,
    filter: true,
    editable: true,
  },
  rowData: getData(),
  onCellValueChanged: onCellValueChanged,
};

function onCellValueChanged(params: CellValueChangedEvent) {
  // notice that the data always contains the keys rather than values after editing
  console.log("onCellValueChanged: ", params);
}

function lookupValue(mappings: Record<string, string>, key: string) {
  return mappings[key];
}

function lookupKey(mappings: Record<string, string>, name: string) {
  const keys = Object.keys(mappings);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];

    if (mappings[key] === name) {
      return key;
    }
  }
}

function currencyFormatter(params: ValueFormatterParams) {
  const value = Math.floor(params.value);

  if (isNaN(value)) {
    return "";
  }

  return "£" + value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

function numberValueSetter(params: ValueSetterParams) {
  if (isNaN(parseFloat(params.newValue)) || !isFinite(params.newValue)) {
    return false; // don't set invalid numbers!
  }

  params.data.price = params.newValue;

  return true;
}

// wait for the document to be loaded, otherwise
// AG Grid will not find the div in the document.
// lookup the container we want the Grid to use
const eGridDiv = document.querySelector<HTMLElement>("#myGrid")!;

// create the grid passing in the div to use together with the columns & data we want to use
new Grid(eGridDiv, gridOptions);
