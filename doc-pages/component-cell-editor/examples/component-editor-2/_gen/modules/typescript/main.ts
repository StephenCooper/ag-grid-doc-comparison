import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import {
  CellEditingStartedEvent,
  CellEditingStoppedEvent,
  ColDef,
  Grid,
  GridOptions,
  ICellRendererComp,
  ICellRendererParams,
  KeyCreatorParams,
  ModuleRegistry,
  RowEditingStartedEvent,
  RowEditingStoppedEvent,
} from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { RichSelectModule } from '@ag-grid-enterprise/rich-select';
import { GenderRenderer } from './genderRenderer';
import { MoodEditor } from './moodEditor';
import { MoodRenderer } from './moodRenderer';
import { NumericEditor } from './numericEditor';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, RichSelectModule]);

class CountryCellRenderer implements ICellRendererComp {
  eGui!: HTMLElement;

  init(params: ICellRendererParams) {
    this.eGui = document.createElement('div');
    this.eGui.innerHTML = `${params.value.name}`;
  }

  getGui() {
    return this.eGui;
  }

  refresh(params: ICellRendererParams): boolean {
    return false;
  }
}

const columnDefs: ColDef[] = [
  { field: 'first_name', headerName: 'First Name', width: 120, editable: true },
  { field: 'last_name', headerName: 'Last Name', width: 120, editable: true },
  {
    field: 'gender',
    width: 100,
    editable: true,
    cellRenderer: GenderRenderer,
    cellEditor: 'agRichSelectCellEditor',
    cellEditorPopup: true,
    cellEditorParams: {
      cellRenderer: GenderRenderer,
      values: ['Male', 'Female'],
    },
  },
  {
    field: 'age',
    width: 80,
    editable: true,
    cellEditor: NumericEditor,
    cellEditorPopup: true,
  },
  {
    field: 'mood',
    width: 100,
    cellRenderer: MoodRenderer,
    cellEditor: MoodEditor,
    cellEditorPopup: true,
    editable: true,
  },
  {
    field: 'country',
    width: 110,
    cellEditor: 'agRichSelectCellEditor',
    cellEditorPopup: true,
    cellRenderer: CountryCellRenderer,
    keyCreator: (params: KeyCreatorParams) => {
      return params.value.name;
    },
    cellEditorParams: {
      cellRenderer: CountryCellRenderer,
      values: [
        { name: 'Ireland', code: 'IE' },
        { name: 'UK', code: 'UK' },
        { name: 'France', code: 'FR' },
      ],
    },
    editable: true,
  },
  {
    field: 'address',
    editable: true,
    cellEditor: 'agLargeTextCellEditor',
    cellEditorPopup: true,
    cellEditorParams: {
      maxLength: '300', // override the editor defaults
      cols: '50',
      rows: '6',
    },
  },
];

const gridOptions: GridOptions = {
  columnDefs: columnDefs,
  rowData: getData(),
  defaultColDef: {
    editable: true,
    sortable: true,
    flex: 1,
    minWidth: 100,
    filter: true,
    resizable: true,
  },
  onRowEditingStarted: (event: RowEditingStartedEvent) => {
    console.log('never called - not doing row editing');
  },
  onRowEditingStopped: (event: RowEditingStoppedEvent) => {
    console.log('never called - not doing row editing');
  },
  onCellEditingStarted: (event: CellEditingStartedEvent) => {
    console.log('cellEditingStarted');
  },
  onCellEditingStopped: (event: CellEditingStoppedEvent) => {
    console.log('cellEditingStopped');
  },
};

// setup the grid after the page has finished loading
const gridDiv = document.querySelector<HTMLElement>('#myGrid')!;
new Grid(gridDiv, gridOptions);
