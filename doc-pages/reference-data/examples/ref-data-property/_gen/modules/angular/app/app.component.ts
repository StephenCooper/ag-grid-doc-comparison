import {
  CellValueChangedEvent,
  ColDef,
  GridReadyEvent,
  ValueFormatterParams,
  ValueSetterParams,
} from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine-dark.css';
import { Component } from '@angular/core';
import { ColourCellRenderer } from './colour-cell-renderer.component';
// Required feature modules are registered in app.module.ts

@Component({
  selector: 'my-app',
  template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    class="ag-theme-alpine-dark"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [rowData]="rowData"
    (cellValueChanged)="onCellValueChanged($event)"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular>`,
})
export class AppComponent {
  public columnDefs: ColDef[] = [
    {
      field: 'make',
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: carBrands,
      },
      filter: 'agSetColumnFilter',
      refData: carMappings,
    },
    {
      field: 'exteriorColour',
      minWidth: 150,
      cellEditor: 'agRichSelectCellEditor',
      cellEditorPopup: true,
      cellEditorParams: {
        values: colours,
        cellRenderer: ColourCellRenderer,
      },
      filter: 'agSetColumnFilter',
      filterParams: {
        cellRenderer: ColourCellRenderer,
      },
      refData: colourMappings,
      cellRenderer: ColourCellRenderer,
    },
    {
      field: 'interiorColour',
      minWidth: 150,
      filter: 'agSetColumnFilter',
      filterParams: {
        cellRenderer: ColourCellRenderer,
      },
      refData: colourMappings,
      cellRenderer: ColourCellRenderer,
    },
    {
      headerName: 'Retail Price',
      field: 'price',
      minWidth: 140,
      colId: 'retailPrice',
      valueGetter: function (params) {
        return params.data.price;
      },
      valueFormatter: currencyFormatter,
      valueSetter: numberValueSetter,
    },
    {
      headerName: 'Retail Price (incl Taxes)',
      minWidth: 205,
      editable: false,
      valueGetter: function (params) {
        // example of chaining value getters
        return params.getValue('retailPrice') * 1.2;
      },
      valueFormatter: currencyFormatter,
    },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    filter: true,
    editable: true,
  };
  public rowData: any[] | null = getData();

  onCellValueChanged(params: CellValueChangedEvent) {
    // notice that the data always contains the keys rather than values after editing
    console.log('onCellValueChanged: ', params);
  }

  onGridReady(params: GridReadyEvent) {}
}

const carMappings = {
  tyt: 'Toyota',
  frd: 'Ford',
  prs: 'Porsche',
  nss: 'Nissan',
};
const colourMappings = {
  cb: 'Cadet Blue',
  bw: 'Burlywood',
  fg: 'Forest Green',
};
function extractValues(mappings: Record<string, string>) {
  return Object.keys(mappings);
}
const carBrands = extractValues(carMappings);
const colours = extractValues(colourMappings);
function currencyFormatter(params: ValueFormatterParams) {
  const value = Math.floor(params.value);
  if (isNaN(value)) {
    return '';
  }
  return '£' + value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}
function numberValueSetter(params: ValueSetterParams) {
  if (isNaN(parseFloat(params.newValue)) || !isFinite(params.newValue)) {
    return false; // don't set invalid numbers!
  }
  params.data.price = params.newValue;
  return true;
}
function removeSpaces(str: string) {
  return str ? str.replace(/\s/g, '') : str;
}
