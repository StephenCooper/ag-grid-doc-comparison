import {
  CellEditingStartedEvent,
  CellEditingStoppedEvent,
  Grid,
  GridOptions,
  ICellRendererParams,
  RowEditingStartedEvent,
  RowEditingStoppedEvent,
} from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { GenderRenderer } from './genderRenderer';
import { MoodRenderer } from './moodRenderer';

const rowData = [
  { value: 14, type: 'age' },
  { value: 'female', type: 'gender' },
  { value: 'Happy', type: 'mood' },
  { value: 21, type: 'age' },
  { value: 'male', type: 'gender' },
  { value: 'Sad', type: 'mood' },
];

const gridOptions: GridOptions = {
  columnDefs: [
    { field: 'value' },
    {
      headerName: 'Rendered Value',
      field: 'value',
      cellRendererSelector: function (params: ICellRendererParams) {
        const moodDetails = {
          component: MoodRenderer,
        };

        const genderDetails = {
          component: GenderRenderer,
          params: { values: ['Male', 'Female'] },
        };

        if (params.data.type === 'gender') return genderDetails;
        else if (params.data.type === 'mood') return moodDetails;
        else return undefined;
      },
    },
    { field: 'type' },
  ],
  defaultColDef: {
    flex: 1,
  },
  rowData: rowData,
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
