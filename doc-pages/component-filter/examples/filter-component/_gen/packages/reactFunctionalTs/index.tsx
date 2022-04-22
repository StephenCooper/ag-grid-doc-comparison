'use strict';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, ColGroupDef, GridReadyEvent } from 'ag-grid-community';
import PartialMatchFilter from './partialMatchFilter';

const GridExample = () => {
  const gridRef = useRef<AgGridReact>(null);
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState<any[]>(getData());
  const [columnDefs, setColumnDefs] = useState<(ColDef | ColGroupDef)[] | null>(
    [
      { field: 'row' },
      {
        field: 'name',
        filter: PartialMatchFilter,
        menuTabs: ['filterMenuTab'],
      },
    ]
  );
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      editable: true,
      sortable: true,
      flex: 1,
      minWidth: 100,
      filter: true,
      resizable: true,
    };
  }, []);

  const onGridReady = useCallback((params: GridReadyEvent) => {
    gridRef.current!.api.sizeColumnsToFit();
  }, []);

  const onClicked = useCallback(() => {
    gridRef.current!.api.getFilterInstance('name', function (instance: any) {
      instance?.componentMethod('Hello World!');
    });
  }, []);

  return (
    <div style={containerStyle}>
      <div className="example-wrapper">
        <button
          style={{ marginBottom: '5px' }}
          onClick={onClicked}
          className="btn btn-primary"
        >
          Invoke Filter Instance Method
        </button>

        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            onGridReady={onGridReady}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
