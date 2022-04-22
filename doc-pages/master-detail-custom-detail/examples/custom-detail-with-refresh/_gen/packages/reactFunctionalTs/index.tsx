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
} from 'ag-grid-community';
import DetailCellRenderer from './detailCellRenderer';

let allRowData: any[];

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
  const detailCellRenderer = useMemo<any>(() => {
    return DetailCellRenderer;
  }, []);

  const onGridReady = useCallback((params: GridReadyEvent) => {
    fetch('https://www.ag-grid.com/example-assets/master-detail-data.json')
      .then((resp) => resp.json())
      .then((data: any[]) => {
        allRowData = data;
        setRowData(allRowData);
      });
  }, []);

  const onFirstDataRendered = useCallback((params: FirstDataRenderedEvent) => {
    // arbitrarily expand a row for presentational purposes
    setTimeout(function () {
      gridRef.current!.api.getDisplayedRowAtIndex(0)!.setExpanded(true);
    }, 0);
    setInterval(function () {
      if (!allRowData) {
        return;
      }
      const data = allRowData[0];
      const newCallRecords: any[] = [];
      data.callRecords.forEach(function (record: any, index: number) {
        newCallRecords.push({
          name: record.name,
          callId: record.callId,
          duration: record.duration + (index % 2),
          switchCode: record.switchCode,
          direction: record.direction,
          number: record.number,
        });
      });
      data.callRecords = newCallRecords;
      data.calls++;
      const tran = {
        update: [data],
      };
      gridRef.current!.api.applyTransaction(tran);
    }, 2000);
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          enableCellChangeFlash={true}
          masterDetail={true}
          detailCellRenderer={detailCellRenderer}
          detailRowHeight={70}
          groupDefaultExpanded={1}
          onGridReady={onGridReady}
          onFirstDataRendered={onFirstDataRendered}
        ></AgGridReact>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
