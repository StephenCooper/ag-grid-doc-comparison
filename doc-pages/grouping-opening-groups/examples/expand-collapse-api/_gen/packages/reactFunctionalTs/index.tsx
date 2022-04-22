'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { ColDef, ColGroupDef, Grid, GridOptions } from 'ag-grid-community';

const GridExample = () => {
  const gridRef = useRef<AgGridReact>(null);
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState<any[]>(getData());
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { field: 'country', rowGroup: true, hide: true },
    { field: 'year', rowGroup: true, hide: true },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      minWidth: 150,
      resizable: true,
    };
  }, []);

  const expandAll = useCallback(() => {
    gridRef.current!.api.expandAll();
  }, []);

  const collapseAll = useCallback(() => {
    gridRef.current!.api.collapseAll();
  }, []);

  const expandCountries = useCallback(() => {
    gridRef.current!.api.forEachNode((node) => {
      if (node.level === 0) {
        node.setExpanded(true);
      }
    });
  }, []);

  const expand2000 = useCallback(() => {
    gridRef.current!.api.forEachNode((node) => {
      if (node.key === '2000') {
        node.parent!.setExpanded(true); // ensure parent 'country' group is also expanded
        node.setExpanded(true);
      }
    });
  }, []);

  return (
    <div style={containerStyle}>
      <div className="example-wrapper">
        <div style={{ marginBottom: '5px' }}>
          <button onClick={expandAll}>Expand All</button>
          <button onClick={collapseAll}>Collapse All</button>
          <button onClick={expandCountries}>Expand Countries</button>
          <button onClick={expand2000}>Expand Year '2000'</button>
        </div>

        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
