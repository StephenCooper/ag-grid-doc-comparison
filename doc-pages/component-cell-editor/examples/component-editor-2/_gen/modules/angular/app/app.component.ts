import {
  CellEditingStartedEvent,
  CellEditingStoppedEvent,
  ColDef,
  GridReadyEvent,
  ICellRendererComp,
  ICellRendererParams,
  KeyCreatorParams,
  RowEditingStartedEvent,
  RowEditingStoppedEvent,
} from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { Component } from '@angular/core';
import { GenderRenderer } from './gender-renderer.component';
import { MoodEditor } from './mood-editor.component';
import { MoodRenderer } from './mood-renderer.component';
import { NumericEditor } from './numeric-editor.component';
// Required feature modules are registered in app.module.ts

@Component({
  selector: 'my-app',
  template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [rowData]="rowData"
    [defaultColDef]="defaultColDef"
    (rowEditingStarted)="onRowEditingStarted($event)"
    (rowEditingStopped)="onRowEditingStopped($event)"
    (cellEditingStarted)="onCellEditingStarted($event)"
    (cellEditingStopped)="onCellEditingStopped($event)"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular> `,
})
export class AppComponent {
  public columnDefs: ColDef[] = [
    {
      field: 'first_name',
      headerName: 'First Name',
      width: 120,
      editable: true,
    },
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
        maxLength: '300',
        cols: '50',
        rows: '6',
      },
    },
  ];
  public rowData: any[] | null = getData();
  public defaultColDef: ColDef = {
    editable: true,
    sortable: true,
    flex: 1,
    minWidth: 100,
    filter: true,
    resizable: true,
  };

  onRowEditingStarted(event: RowEditingStartedEvent) {
    console.log('never called - not doing row editing');
  }

  onRowEditingStopped(event: RowEditingStoppedEvent) {
    console.log('never called - not doing row editing');
  }

  onCellEditingStarted(event: CellEditingStartedEvent) {
    console.log('cellEditingStarted');
  }

  onCellEditingStopped(event: CellEditingStoppedEvent) {
    console.log('cellEditingStopped');
  }

  onGridReady(params: GridReadyEvent) {}
}

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
