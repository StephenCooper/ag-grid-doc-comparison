import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ColDef, ExcelStyle, GridApi, GridReadyEvent } from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';

@Component({
  selector: 'my-app',
  template: `<div class="container">
    <div class="columns">
      <div>
        <button
          (click)="onBtExport()"
          style="font-weight: bold; margin-bottom: 5px;"
        >
          Export to Excel
        </button>
      </div>
    </div>
    <div class="grid-wrapper">
      <ag-grid-angular
        style="width: 100%; height: 100%;"
        class="ag-theme-alpine"
        [defaultColDef]="defaultColDef"
        [columnDefs]="columnDefs"
        [excelStyles]="excelStyles"
        [rowData]="rowData"
        (gridReady)="onGridReady($event)"
      ></ag-grid-angular>
    </div>
  </div>`,
})
export class AppComponent {
  private gridApi!: GridApi;

  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    minWidth: 100,
    flex: 1,
  };
  public columnDefs: ColDef[] = [
    { field: 'athlete', minWidth: 200 },
    { field: 'country', minWidth: 200 },
    { field: 'sport', minWidth: 150 },
    { field: 'gold', hide: true },
    { field: 'silver', hide: true },
    { field: 'bronze', hide: true },
    { field: 'total', hide: true },
  ];
  public excelStyles: ExcelStyle[] = [
    {
      id: 'coverHeading',
      font: {
        size: 26,
        bold: true,
      },
    },
    {
      id: 'coverText',
      font: {
        size: 14,
      },
    },
  ];
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onBtExport() {
    const spreadsheets = [];
    //set a filter condition ensuring no records are returned so only the header content is exported
    const filterInstance = this.gridApi.getFilterInstance('athlete')!;
    filterInstance.setModel({
      values: [],
    });
    this.gridApi.onFilterChanged();
    //export custom content for cover page
    spreadsheets.push(
      this.gridApi.getSheetDataForExcel({
        prependContent: [
          [
            {
              styleId: 'coverHeading',
              mergeAcross: 3,
              data: { value: 'AG Grid', type: 'String' },
            },
          ],
          [
            {
              styleId: 'coverHeading',
              mergeAcross: 3,
              data: { value: '', type: 'String' },
            },
          ],
          [
            {
              styleId: 'coverText',
              mergeAcross: 3,
              data: {
                value:
                  'Data shown lists Olympic medal winners for years 2000-2012',
                type: 'String',
              },
            },
          ],
          [
            {
              styleId: 'coverText',
              data: {
                value:
                  'This data includes a row for each participation record - athlete name, country, year, sport, count of gold, silver, bronze medals won during the sports event',
                type: 'String',
              },
            },
          ],
        ],
        processHeaderCallback: () => '',
        sheetName: 'cover',
      })!
    );
    //remove filter condition set above so all the grid data can be exported on a separate sheet
    filterInstance.setModel(null);
    this.gridApi.onFilterChanged();
    spreadsheets.push(this.gridApi.getSheetDataForExcel()!);
    this.gridApi.exportMultipleSheetsAsExcel({
      data: spreadsheets,
      fileName: 'ag-grid.xlsx',
    });
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;

    this.http
      .get<any[]>(
        'https://www.ag-grid.com/example-assets/small-olympic-winners.json'
      )
      .subscribe((data) =>
        params.api!.setRowData(data.filter((rec: any) => rec.country != null))
      );
  }
}
