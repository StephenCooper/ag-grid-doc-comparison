import {
  ColDef,
  GridReadyEvent,
  ICellEditorComp,
  ICellEditorParams,
} from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
// Required feature modules are registered in app.module.ts

@Component({
  selector: 'my-app',
  template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [rowData]="rowData"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular> `,
})
export class AppComponent {
  public columnDefs: ColDef[] = [
    { field: 'athlete' },
    {
      field: 'date',
      editable: true,
      cellEditor: DatePicker,
      cellEditorPopup: true,
    },
    { field: 'age', maxWidth: 110 },
    { field: 'country' },
    { field: 'year', maxWidth: 120 },
    { field: 'sport' },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 150,
  };
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onGridReady(params: GridReadyEvent) {
    this.http
      .get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .subscribe((data) => (this.rowData = data));
  }
}

class DatePicker implements ICellEditorComp {
  eInput!: HTMLInputElement;

  // gets called once before the renderer is used
  init(params: ICellEditorParams) {
    // create the cell
    this.eInput = document.createElement('input');
    this.eInput.value = params.value;
    this.eInput.classList.add('ag-input');
    this.eInput.style.height = '100%';

    // https://jqueryui.com/datepicker/
    $(this.eInput).datepicker({
      dateFormat: 'dd/mm/yy',
      onSelect: () => {
        this.eInput.focus();
      },
    });
  }

  // gets called once when grid ready to insert the element
  getGui() {
    return this.eInput;
  }

  // focus and select can be done after the gui is attached
  afterGuiAttached() {
    this.eInput.focus();
    this.eInput.select();
  }

  // returns the new value after editing
  getValue() {
    return this.eInput.value;
  }

  // any cleanup we need to be done here
  destroy() {
    // but this example is simple, no cleanup, we could
    // even leave this method out as it's optional
  }

  // if true, then this editor will appear in a popup
  isPopup() {
    // and we could leave this method out also, false is the default
    return false;
  }
}
