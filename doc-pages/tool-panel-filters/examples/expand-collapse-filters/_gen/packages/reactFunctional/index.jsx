'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const GridExample = () => {
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    {
      groupId: 'athleteGroupId',
      headerName: 'Athlete',
      children: [
        {
          headerName: 'Name',
          field: 'athlete',
          minWidth: 200,
          filter: 'agTextColumnFilter',
        },
        { field: 'age' },
        {
          groupId: 'competitionGroupId',
          headerName: 'Competition',
          children: [{ field: 'year' }, { field: 'date', minWidth: 180 }],
        },
        { field: 'country', minWidth: 200 },
      ],
    },
    { colId: 'sport', field: 'sport', minWidth: 200 },
    {
      headerName: 'Medals',
      children: [
        { field: 'gold' },
        { field: 'silver' },
        { field: 'bronze' },
        { field: 'total' },
      ],
    },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 100,
      filter: true,
      resizable: true,
    };
  }, []);

  const onGridReady = useCallback((params) => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => setRowData(data));
  }, []);

  const collapseAll = useCallback(() => {
    gridRef.current.api.getToolPanelInstance('filters').collapseFilters();
  }, []);

  const expandYearAndSport = useCallback(() => {
    gridRef.current.api
      .getToolPanelInstance('filters')
      .expandFilters(['year', 'sport']);
  }, []);

  const collapseYear = useCallback(() => {
    gridRef.current.api
      .getToolPanelInstance('filters')
      .collapseFilters(['year']);
  }, []);

  const expandAll = useCallback(() => {
    gridRef.current.api.getToolPanelInstance('filters').expandFilters();
  }, []);

  return (
    <div style={containerStyle}>
      <div className="example-wrapper">
        <div>
          <span className="button-group">
            <button onClick={expandYearAndSport}>
              Expand Year &amp; Sport
            </button>
            <button onClick={collapseYear}>Collapse Year</button>
            <button onClick={expandAll}>Expand All</button>
            <button onClick={collapseAll}>Collapse All</button>
          </span>
        </div>

        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            sideBar={'filters'}
            onGridReady={onGridReady}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
