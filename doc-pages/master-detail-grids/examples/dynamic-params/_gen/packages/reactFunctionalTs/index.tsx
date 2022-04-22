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
  Grid,
  GridOptions,
  GridReadyEvent,
  ICellRendererParams,
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
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
    };
  }, []);
  const detailCellRendererParams = useMemo<any>(() => {
    return (params: ICellRendererParams) => {
      var res = {} as IDetailCellRendererParams;
      // we use the same getDetailRowData for both options
      res.getDetailRowData = function (params) {
        params.successCallback(params.data.callRecords);
      };
      var nameMatch =
        params.data.name === 'Mila Smith' ||
        params.data.name === 'Harper Johnson';
      if (nameMatch) {
        // grid options for columns {callId, number}
        res.detailGridOptions = {
          columnDefs: [{ field: 'callId' }, { field: 'number' }],
          defaultColDef: {
            flex: 1,
          },
        };
      } else {
        // grid options for columns {callId, direction, duration, switchCode}
        res.detailGridOptions = {
          columnDefs: [
            { field: 'callId' },
            { field: 'direction' },
            { field: 'duration', valueFormatter: "x.toLocaleString() + 's'" },
            { field: 'switchCode' },
          ],
          defaultColDef: {
            flex: 1,
          },
        };
      }
      return res;
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
    // arbitrarily expand a row for presentational purposes
    setTimeout(function () {
      var node1 = gridRef.current!.api.getDisplayedRowAtIndex(1)!;
      var node2 = gridRef.current!.api.getDisplayedRowAtIndex(2)!;
      node1.setExpanded(true);
      node2.setExpanded(true);
    }, 0);
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          masterDetail={true}
          detailRowHeight={195}
          detailCellRendererParams={detailCellRendererParams}
          onGridReady={onGridReady}
          onFirstDataRendered={onFirstDataRendered}
        ></AgGridReact>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
