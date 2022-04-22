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
  const [rowData, setRowData] = useState<any[]>([
    {
      a1: 'level 1 - 111',
      b1: 'level 1 - 222',
      children: [
        {
          a2: 'level 2 - 333',
          b2: 'level 2 - 444',
          children: [
            { a3: 'level 3 - 5551', b3: 'level 3 - 6661' },
            { a3: 'level 3 - 5552', b3: 'level 3 - 6662' },
            { a3: 'level 3 - 5553', b3: 'level 3 - 6663' },
            { a3: 'level 3 - 5554', b3: 'level 3 - 6664' },
            { a3: 'level 3 - 5555', b3: 'level 3 - 6665' },
            { a3: 'level 3 - 5556', b3: 'level 3 - 6666' },
          ],
        },
      ],
    },
    {
      a1: 'level 1 - 111',
      b1: 'level 1 - 222',
      children: [
        {
          a2: 'level 2 - 333',
          b2: 'level 2 - 444',
          children: [
            { a3: 'level 3 - 5551', b3: 'level 3 - 6661' },
            { a3: 'level 3 - 5552', b3: 'level 3 - 6662' },
            { a3: 'level 3 - 5553', b3: 'level 3 - 6663' },
            { a3: 'level 3 - 5554', b3: 'level 3 - 6664' },
            { a3: 'level 3 - 5555', b3: 'level 3 - 6665' },
            { a3: 'level 3 - 5556', b3: 'level 3 - 6666' },
          ],
        },
      ],
    },
  ]);
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { field: 'a1', cellRenderer: 'agGroupCellRenderer' },
    { field: 'b1' },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
    };
  }, []);
  const detailCellRendererParams = useMemo<any>(() => {
    return {
      // level 2 grid options
      detailGridOptions: {
        columnDefs: [
          { field: 'a2', cellRenderer: 'agGroupCellRenderer' },
          { field: 'b2' },
        ],
        defaultColDef: {
          flex: 1,
        },
        groupDefaultExpanded: 1,
        masterDetail: true,
        detailRowHeight: 240,
        detailCellRendererParams: {
          // level 3 grid options
          detailGridOptions: {
            columnDefs: [
              { field: 'a3', cellRenderer: 'agGroupCellRenderer' },
              { field: 'b3' },
            ],
            defaultColDef: {
              flex: 1,
            },
          },
          getDetailRowData: function (params) {
            params.successCallback(params.data.children);
          },
        } as IDetailCellRendererParams,
      },
      getDetailRowData: function (params) {
        params.successCallback(params.data.children);
      },
    } as IDetailCellRendererParams;
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          groupDefaultExpanded={1}
          masterDetail={true}
          detailCellRendererParams={detailCellRendererParams}
        ></AgGridReact>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
