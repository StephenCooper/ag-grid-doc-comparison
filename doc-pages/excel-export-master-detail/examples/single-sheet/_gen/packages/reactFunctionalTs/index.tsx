'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import {
  ColDef,
  ColGroupDef,
  CsvCell,
  CsvExportParams,
  ExcelCell,
  ExcelExportParams,
  ExcelStyle,
  GetDetailRowDataParams,
  Grid,
  GridOptions,
  GridReadyEvent,
  IDetailCellRendererParams,
  ProcessRowGroupForExportParams,
} from 'ag-grid-community';

var getCells = (params: ProcessRowGroupForExportParams) => {
  const cells: ExcelCell[][] = [
    [
      cell(''),
      cell('Call Id', 'header'),
      cell('Direction', 'header'),
      cell('Number', 'header'),
      cell('Duration', 'header'),
      cell('Switch Code', 'header'),
    ],
  ].concat(
    params.node.data.callRecords.map(function (record: any) {
      return [
        cell(''),
        cell(record.callId, 'body'),
        cell(record.direction, 'body'),
        cell(record.number, 'body'),
        cell(record.duration, 'body'),
        cell(record.switchCode, 'body'),
      ];
    }),
    [[]]
  );
  return cells;
};

const cell: (text: string, styleId?: string) => ExcelCell = (
  text: string,
  styleId?: string
) => {
  return {
    styleId: styleId,
    data: {
      type: /^\d+$/.test(text) ? 'Number' : 'String',
      value: String(text),
    },
  };
};

const GridExample = () => {
  const gridRef = useRef<AgGridReact>(null);
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState<any[]>();
  const defaultCsvExportParams = useMemo<CsvExportParams>(() => {
    return {
      getCustomContentBelowRow: (params) => getCells(params) as CsvCell[][],
    };
  }, []);
  const defaultExcelExportParams = useMemo<ExcelExportParams>(() => {
    return {
      getCustomContentBelowRow: (params) => getCells(params),
      columnWidth: 120,
    };
  }, []);
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    // group cell renderer needed for expand / collapse icons
    { field: 'name', cellRenderer: 'agGroupCellRenderer' },
    { field: 'account' },
    { field: 'calls' },
    { field: 'minutes', valueFormatter: "x.toLocaleString() + 'm'" },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
    };
  }, []);
  const detailCellRendererParams = useMemo<any>(() => {
    return {
      detailGridOptions: {
        columnDefs: [
          { field: 'callId' },
          { field: 'direction' },
          { field: 'number', minWidth: 150 },
          { field: 'duration', valueFormatter: "x.toLocaleString() + 's'" },
          { field: 'switchCode', minWidth: 150 },
        ],
        defaultColDef: {
          flex: 1,
        },
      },
      getDetailRowData: (params) => {
        params.successCallback(params.data.callRecords);
      },
    } as IDetailCellRendererParams;
  }, []);
  const excelStyles = useMemo<ExcelStyle[]>(() => {
    return [
      {
        id: 'header',
        interior: {
          color: '#aaaaaa',
          pattern: 'Solid',
        },
      },
      {
        id: 'body',
        interior: {
          color: '#dddddd',
          pattern: 'Solid',
        },
      },
    ];
  }, []);

  const onGridReady = useCallback((params: GridReadyEvent) => {
    fetch('https://www.ag-grid.com/example-assets/master-detail-data.json')
      .then((resp) => resp.json())
      .then((data: any[]) => {
        setRowData(data);
      });
  }, []);

  const onBtExport = useCallback(() => {
    gridRef.current!.api.exportDataAsExcel();
  }, []);

  return (
    <div style={containerStyle}>
      <div className="container">
        <div>
          <button
            onClick={onBtExport}
            style={{ marginBottom: '5px', fontWeight: 'bold' }}
          >
            Export to Excel
          </button>
        </div>
        <div className="grid-wrapper">
          <div style={gridStyle} className="ag-theme-alpine">
            <AgGridReact
              ref={gridRef}
              rowData={rowData}
              defaultCsvExportParams={defaultCsvExportParams}
              defaultExcelExportParams={defaultExcelExportParams}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              masterDetail={true}
              detailCellRendererParams={detailCellRendererParams}
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
