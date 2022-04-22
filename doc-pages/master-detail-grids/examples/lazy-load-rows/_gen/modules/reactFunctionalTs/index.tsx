'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import {
  ColDef,
  ColGroupDef,
  Grid,
  GridOptions,
  GridReadyEvent,
  IDetailCellRendererParams,
} from '@ag-grid-community/core';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { MasterDetailModule } from '@ag-grid-enterprise/master-detail';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  MasterDetailModule,
  MenuModule,
  ColumnsToolPanelModule,
]);

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState<any[]>();
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
          { field: 'direction', minWidth: 150 },
          { field: 'number' },
          { field: 'duration', valueFormatter: "x.toLocaleString() + 's'" },
          { field: 'switchCode', minWidth: 150 },
        ],
        defaultColDef: {
          flex: 1,
        },
      },
      getDetailRowData: function (params) {
        // simulate delayed supply of data to the detail pane
        setTimeout(function () {
          params.successCallback(params.data.callRecords);
        }, 1000);
      },
    } as IDetailCellRendererParams;
  }, []);

  const onGridReady = useCallback((params: GridReadyEvent) => {
    fetch('https://www.ag-grid.com/example-assets/master-detail-data.json')
      .then((resp) => resp.json())
      .then((data: any[]) => {
        setRowData(data);
      });
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          masterDetail={true}
          detailCellRendererParams={detailCellRendererParams}
          onGridReady={onGridReady}
        ></AgGridReact>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
