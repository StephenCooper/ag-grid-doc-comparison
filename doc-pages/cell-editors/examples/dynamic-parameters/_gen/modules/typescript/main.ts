import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import {
  CellValueChangedEvent,
  Grid,
  GridOptions,
  ICellEditorParams,
  ModuleRegistry,
} from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { RichSelectModule } from '@ag-grid-enterprise/rich-select';
import { GenderCellRenderer } from './genderCellRenderer';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  RichSelectModule,
  MenuModule,
  ColumnsToolPanelModule,
]);

const cellCellEditorParams = (params: ICellEditorParams) => {
  const selectedCountry = params.data.country;
  const allowedCities = countyToCityMap(selectedCountry);

  return {
    values: allowedCities,
    formatValue: (value: any) => `${value} (${selectedCountry})`,
  };
};

const gridOptions: GridOptions = {
  columnDefs: [
    { field: 'name' },
    {
      field: 'gender',
      cellRenderer: GenderCellRenderer,
      cellEditor: 'agRichSelectCellEditor',
      cellEditorPopup: true,
      cellEditorParams: {
        values: ['Male', 'Female'],
        cellRenderer: GenderCellRenderer,
        cellEditorPopup: true,
      },
    },
    {
      field: 'country',
      cellEditor: 'agRichSelectCellEditor',
      cellEditorPopup: true,
      cellEditorParams: {
        cellHeight: 50,
        values: ['Ireland', 'USA'],
      },
    },
    {
      field: 'city',
      cellEditor: 'agRichSelectCellEditor',
      cellEditorPopup: true,
      cellEditorParams: cellCellEditorParams,
    },
    {
      field: 'address',
      cellEditor: 'agLargeTextCellEditor',
      cellEditorPopup: true,
      minWidth: 550,
    },
  ],
  defaultColDef: {
    flex: 1,
    minWidth: 130,
    editable: true,
    resizable: true,
  },
  rowData: getData(),
  onCellValueChanged: onCellValueChanged,
};

function countyToCityMap(match: string): string[] {
  const map: { [key: string]: string[] } = {
    Ireland: ['Dublin', 'Cork', 'Galway'],
    USA: ['New York', 'Los Angeles', 'Chicago', 'Houston'],
  };

  return map[match];
}

function onCellValueChanged(params: CellValueChangedEvent) {
  const colId = params.column.getId();

  if (colId === 'country') {
    const selectedCountry = params.data.country;
    const selectedCity = params.data.city;
    const allowedCities = countyToCityMap(selectedCountry);
    const cityMismatch = allowedCities.indexOf(selectedCity) < 0;

    if (cityMismatch) {
      params.node.setDataValue('city', null);
    }
  }
}

// setup the grid after the page has finished loading
const gridDiv = document.querySelector<HTMLElement>('#myGrid')!;
new Grid(gridDiv, gridOptions);
