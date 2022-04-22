import { Component } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

@Component({
  selector: 'my-app',
  template: `<button (click)="onBtPrinterFriendly()">
      Printer Friendly Layout
    </button>
    <button (click)="onBtNormal()">Normal Layout</button>

    <h3>Latin Text</h3>

    <p>
      Lorem ipsum dolor sit amet, ne cum repudiare abhorreant. Atqui molestiae
      neglegentur ad nam, mei amet eros ea, populo deleniti scaevola et pri. Pro
      no ubique explicari, his reque nulla consequuntur in. His soleat doctus
      constituam te, sed at alterum repudiandae. Suas ludus electram te ius.
    </p>

    <ag-grid-angular
      style="width: 400px; height: 200px;"
      id="myGrid"
      class="ag-theme-alpine"
      [columnDefs]="columnDefs"
      [rowData]="rowData"
      [defaultColDef]="defaultColDef"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>

    <h3>More Latin Text</h3>

    <p>
      Lorem ipsum dolor sit amet, ne cum repudiare abhorreant. Atqui molestiae
      neglegentur ad nam, mei amet eros ea, populo deleniti scaevola et pri. Pro
      no ubique explicari, his reque nulla consequuntur in. His soleat doctus
      constituam te, sed at alterum repudiandae. Suas ludus electram te ius.
    </p> `,
})
export class AppComponent {
  private gridApi!: GridApi;

  public columnDefs: ColDef[] = [
    { headerName: 'ID', valueGetter: 'node.rowIndex + 1', width: 70 },
    { field: 'model', width: 150 },
    { field: 'color' },
    { field: 'price', valueFormatter: '"$" + value.toLocaleString()' },
    { field: 'year' },
    { field: 'country' },
  ];
  public rowData: any[] | null = getData();
  public defaultColDef: ColDef = {
    width: 100,
  };

  onBtPrinterFriendly() {
    var eGridDiv = document.querySelector<HTMLElement>('#myGrid')! as any;
    eGridDiv.style.width = '';
    eGridDiv.style.height = '';
    this.gridApi.setDomLayout('print');
  }

  onBtNormal() {
    var eGridDiv = document.querySelector<HTMLElement>('#myGrid')! as any;
    eGridDiv.style.width = '400px';
    eGridDiv.style.height = '200px';
    // Same as setting to 'normal' as it is the default
    this.gridApi.setDomLayout();
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }
}
