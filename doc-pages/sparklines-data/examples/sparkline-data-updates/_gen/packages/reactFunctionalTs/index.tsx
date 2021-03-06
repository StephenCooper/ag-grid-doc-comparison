'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { ColDef, ColGroupDef, Grid, GridOptions } from 'ag-grid-community';

var intervalId: any;

const GridExample = () => {
  const gridRef = useRef<AgGridReact>(null);
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState<any[]>(getData());
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { field: 'symbol', maxWidth: 120 },
    { field: 'name', minWidth: 250 },
    {
      field: 'change',
      cellRenderer: 'agSparklineCellRenderer',
    },
    {
      field: 'volume',
      type: 'numericColumn',
      maxWidth: 140,
    },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      minWidth: 100,
      resizable: true,
    };
  }, []);

  const start = useCallback(() => {
    if (intervalId) {
      return;
    }
    const updateData = () => {
      const itemsToUpdate: any[] = [];
      gridRef.current!.api.forEachNodeAfterFilterAndSort(function (rowNode) {
        const data = rowNode.data;
        const n = data.change.length;
        const v =
          Math.random() > 0.5 ? Number(Math.random()) : -Number(Math.random());
        data.change = [...data.change.slice(1, n), v];
        itemsToUpdate.push(data);
      });
      gridRef.current!.api.applyTransaction({ update: itemsToUpdate });
    };
    intervalId = setInterval(updateData, 300);
  }, [intervalId]);

  const stop = useCallback(() => {
    if (intervalId === undefined) {
      return;
    }
    clearInterval(intervalId);
    intervalId = undefined;
  }, []);

  return (
    <div style={containerStyle}>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: '4px' }}>
          <button onClick={start}>??? Start</button>
          <button onClick={stop}>??? Stop</button>
        </div>
        <div style={{ flexGrow: '1' }}>
          <div style={gridStyle} className="ag-theme-alpine">
            <AgGridReact
              ref={gridRef}
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              rowHeight={50}
            ></AgGridReact>
          </div>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
