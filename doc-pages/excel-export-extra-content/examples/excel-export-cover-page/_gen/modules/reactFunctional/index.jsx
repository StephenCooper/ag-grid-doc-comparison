'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { CsvExportModule } from '@ag-grid-community/csv-export';
import { ExcelExportModule } from '@ag-grid-enterprise/excel-export';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  CsvExportModule,
  ExcelExportModule,
  MenuModule,
  SetFilterModule,
]);

const GridExample = () => {
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState();
  const defaultColDef = useMemo(() => {
    return {
      sortable: true,
      filter: true,
      resizable: true,
      minWidth: 100,
      flex: 1,
    };
  }, []);
  const [columnDefs, setColumnDefs] = useState([
    { field: 'athlete', minWidth: 200 },
    { field: 'country', minWidth: 200 },
    { field: 'sport', minWidth: 150 },
    { field: 'gold', hide: true },
    { field: 'silver', hide: true },
    { field: 'bronze', hide: true },
    { field: 'total', hide: true },
  ]);
  const excelStyles = useMemo(() => {
    return [
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
  }, []);

  const onGridReady = useCallback((params) => {
    fetch('https://www.ag-grid.com/example-assets/small-olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => setRowData(data.filter((rec) => rec.country != null)));
  }, []);

  const onBtExport = useCallback(() => {
    const spreadsheets = [];
    //set a filter condition ensuring no records are returned so only the header content is exported
    const filterInstance = gridRef.current.api.getFilterInstance('athlete');
    filterInstance.setModel({
      values: [],
    });
    gridRef.current.api.onFilterChanged();
    //custom content for cover page
    spreadsheets.push(
      gridRef.current.api.getSheetDataForExcel({
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
      })
    );
    //remove filter condition set above so all the grid data can be exported on a separate sheet
    filterInstance.setModel(null);
    gridRef.current.api.onFilterChanged();
    spreadsheets.push(gridRef.current.api.getSheetDataForExcel());
    gridRef.current.api.exportMultipleSheetsAsExcel({
      data: spreadsheets,
      fileName: 'ag-grid.xlsx',
    });
  }, []);

  return (
    <div style={containerStyle}>
      <div className="container">
        <div className="columns">
          <div>
            <button
              onClick={onBtExport}
              style={{ fontWeight: 'bold', marginBottom: '5px' }}
            >
              Export to Excel
            </button>
          </div>
        </div>
        <div className="grid-wrapper">
          <div style={gridStyle} className="ag-theme-alpine">
            <AgGridReact
              ref={gridRef}
              rowData={rowData}
              defaultColDef={defaultColDef}
              columnDefs={columnDefs}
              excelStyles={excelStyles}
              onGridReady={onGridReady}
            ></AgGridReact>
          </div>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
