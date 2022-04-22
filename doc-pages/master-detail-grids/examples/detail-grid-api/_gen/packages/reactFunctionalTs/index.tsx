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
  FirstDataRenderedEvent,
  GetRowIdFunc,
  GetRowIdParams,
  Grid,
  GridOptions,
  GridReadyEvent,
  IDetailCellRendererParams,
} from 'ag-grid-community';

const GridExample = () => {
  const gridRef = useRef<AgGridReact>(null);
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
          editable: true,
          resizable: true,
        },
      },
      getDetailRowData: function (params) {
        params.successCallback(params.data.callRecords);
      },
    } as IDetailCellRendererParams;
  }, []);
  const getRowId = useCallback(function (params: GetRowIdParams) {
    // use 'account' as the row ID
    return params.data.account;
  }, []);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      editable: true,
      resizable: true,
    };
  }, []);

  const onGridReady = useCallback((params: GridReadyEvent) => {
    fetch('https://www.ag-grid.com/example-assets/master-detail-data.json')
      .then((resp) => resp.json())
      .then((data: any[]) => {
        setRowData(data);
      });
  }, []);

  const onFirstDataRendered = useCallback((params: FirstDataRenderedEvent) => {
    // expand the first two rows
    setTimeout(function () {
      gridRef.current!.api.forEachNode(function (node) {
        node.setExpanded(true);
      });
    }, 0);
  }, []);

  const flashMilaSmithOnly = useCallback(() => {
    // flash Mila Smith - we know her account is 177001 and we use the account for the row ID
    var detailGrid = gridRef.current!.api.getDetailGridInfo('detail_177001');
    if (detailGrid) {
      detailGrid.api!.flashCells();
    }
  }, []);

  const flashAll = useCallback(() => {
    gridRef.current!.api.forEachDetailGridInfo(function (detailGridApi) {
      detailGridApi.api!.flashCells();
    });
  }, []);

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ paddingBottom: '4px' }}>
          <button onClick={flashMilaSmithOnly}>Flash Mila Smith</button>
          <button onClick={flashAll}>Flash All</button>
        </div>

        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            masterDetail={true}
            detailRowHeight={200}
            detailCellRendererParams={detailCellRendererParams}
            getRowId={getRowId}
            defaultColDef={defaultColDef}
            onGridReady={onGridReady}
            onFirstDataRendered={onFirstDataRendered}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
