'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    { field: 'country', rowGroup: true, hide: true },
    { field: 'year' },
    { field: 'sport', rowGroup: true, hide: true },
    { field: 'athlete', minWidth: 200 },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' },
    { field: 'age' },
    { field: 'date', minWidth: 140 },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 100,
      resizable: true,
      sortable: true,
    };
  }, []);
  const autoGroupColumnDef = useMemo(() => {
    return {
      minWidth: 200,
    };
  }, []);
  const initialGroupOrderComparator = useCallback(function (params) {
    const a = params.nodeA.key || '';
    const b = params.nodeB.key || '';
    return a < b ? -1 : a > b ? 1 : 0;
  }, []);

  const onGridReady = useCallback((params) => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => setRowData(data));
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          autoGroupColumnDef={autoGroupColumnDef}
          groupDisplayType={'groupRows'}
          initialGroupOrderComparator={initialGroupOrderComparator}
          animateRows={true}
          onGridReady={onGridReady}
        ></AgGridReact>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
