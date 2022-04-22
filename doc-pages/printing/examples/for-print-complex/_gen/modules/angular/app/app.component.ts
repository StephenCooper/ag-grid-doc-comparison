import {
  ColDef,
  FirstDataRenderedEvent,
  GridApi,
  GridReadyEvent,
  RowGroupingDisplayType,
} from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { Component } from '@angular/core';
// Required feature modules are registered in app.module.ts

@Component({
  selector: 'my-app',
  template: `
    <button (click)="onBtPrint()">Print</button>

    <h3>Latin Text</h3>

    <p>
      Lorem ipsum dolor sit amet, ne cum repudiare abhorreant. Atqui molestiae
      neglegentur ad nam, mei amet eros ea, populo deleniti scaevola et pri. Pro
      no ubique explicari, his reque nulla consequuntur in. His soleat doctus
      constituam te, sed at alterum repudiandae. Suas ludus electram te ius.
    </p>

    <ag-grid-angular
      style="width: 700px; height: 200px;"
      id="myGrid"
      class="ag-theme-alpine"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [rowData]="rowData"
      [animateRows]="true"
      [groupDisplayType]="groupDisplayType"
      (firstDataRendered)="onFirstDataRendered($event)"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>

    <h3>More Latin Text</h3>

    <p>
      Lorem ipsum dolor sit amet, ne cum repudiare abhorreant. Atqui molestiae
      neglegentur ad nam, mei amet eros ea, populo deleniti scaevola et pri. Pro
      no ubique explicari, his reque nulla consequuntur in. His soleat doctus
      constituam te, sed at alterum repudiandae. Suas ludus electram te ius.
    </p>
  `,
})
export class AppComponent {
  private gridApi!: GridApi;

  public columnDefs: ColDef[] = [
    { field: 'group', rowGroup: true, hide: true },
    { field: 'id', pinned: 'left', width: 70 },
    { field: 'model', width: 180 },
    { field: 'color', width: 100 },
    {
      field: 'price',
      valueFormatter: "'$' + value.toLocaleString()",
      width: 100,
    },
    { field: 'year', width: 100 },
    { field: 'country', width: 120 },
  ];
  public defaultColDef: ColDef = {
    sortable: true,
  };
  public rowData: any[] | null = getData();
  public groupDisplayType: RowGroupingDisplayType = 'groupRows';

  onFirstDataRendered(params: FirstDataRenderedEvent) {
    params.api.expandAll();
  }

  onBtPrint() {
    const api = this.gridApi!;
    setPrinterFriendly(api);
    setTimeout(function () {
      print();
      setNormal(api);
    }, 2000);
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }
}

function setPrinterFriendly(api: GridApi) {
  const eGridDiv = document.querySelector<HTMLElement>('#myGrid')! as any;
  eGridDiv.style.height = '';
  api.setDomLayout('print');
}
function setNormal(api: GridApi) {
  const eGridDiv = document.querySelector<HTMLElement>('#myGrid')! as any;
  eGridDiv.style.width = '700px';
  eGridDiv.style.height = '200px';
  api.setDomLayout();
}
