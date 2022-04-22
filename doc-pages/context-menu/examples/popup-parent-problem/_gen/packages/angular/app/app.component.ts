import { Component } from '@angular/core';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';

@Component({
  selector: 'my-app',
  template: `<ag-grid-angular
      style="width: 100%; height: 100px;"
      class="ag-theme-alpine"
      [rowData]="rowData"
      [columnDefs]="columnDefs"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>

    <div style="padding: 10px;">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc posuere
      lobortis est, sit amet molestie justo mattis et. Suspendisse congue
      condimentum tristique. Cras et purus vehicula, rhoncus ante sit amet,
      tempus nulla. Morbi vitae turpis id diam tincidunt luctus aliquet non
      ante. Ut elementum odio risus, eu condimentum lectus varius vitae.
      Praesent faucibus id ex commodo mattis. Duis egestas nibh ut libero
      accumsan blandit. Nunc mollis elit non sem tempor, sit amet posuere velit
      commodo. Cras convallis sem mattis, scelerisque turpis sed, scelerisque
      arcu. Mauris ac nunc purus. Aenean sit amet dapibus augue.
    </div>

    <div style="padding: 10px;">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc posuere
      lobortis est, sit amet molestie justo mattis et. Suspendisse congue
      condimentum tristique. Cras et purus vehicula, rhoncus ante sit amet,
      tempus nulla. Morbi vitae turpis id diam tincidunt luctus aliquet non
      ante. Ut elementum odio risus, eu condimentum lectus varius vitae.
      Praesent faucibus id ex commodo mattis. Duis egestas nibh ut libero
      accumsan blandit. Nunc mollis elit non sem tempor, sit amet posuere velit
      commodo. Cras convallis sem mattis, scelerisque turpis sed, scelerisque
      arcu. Mauris ac nunc purus. Aenean sit amet dapibus augue.
    </div>`,
})
export class AppComponent {
  public rowData: any[] | null = [
    { a: 1, b: 1, c: 1, d: 1, e: 1 },
    { a: 2, b: 2, c: 2, d: 2, e: 2 },
  ];
  public columnDefs: ColDef[] = [
    { field: 'a' },
    { field: 'b' },
    { field: 'c' },
    { field: 'd' },
    { field: 'e' },
  ];

  onGridReady(params: GridReadyEvent) {}
}
