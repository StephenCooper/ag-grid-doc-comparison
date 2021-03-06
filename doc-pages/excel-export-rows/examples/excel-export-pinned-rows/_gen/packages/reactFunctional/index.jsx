'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const getBoolean = (id) => {
  return !!document.querySelector('#' + id).checked;
};

const getParams = () => {
  return {
    skipPinnedTop: getBoolean('skipPinnedTop'),
    skipPinnedBottom: getBoolean('skipPinnedBottom'),
  };
};

const GridExample = () => {
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: 'Top Level Column Group',
      children: [
        {
          headerName: 'Group A',
          children: [
            { field: 'athlete', minWidth: 200 },
            { field: 'country', minWidth: 200 },
            { headerName: 'Group', valueGetter: 'data.country.charAt(0)' },
          ],
        },
        {
          headerName: 'Group B',
          children: [
            { field: 'date', minWidth: 150 },
            { field: 'sport', minWidth: 150 },
            { field: 'gold' },
            { field: 'silver' },
            { field: 'bronze' },
            { field: 'total' },
          ],
        },
      ],
    },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      sortable: true,
      filter: true,
      resizable: true,
      minWidth: 100,
      flex: 1,
    };
  }, []);
  const popupParent = useMemo(() => {
    return document.body;
  }, []);
  const pinnedTopRowData = useMemo(() => {
    return [
      {
        athlete: 'Floating <Top> Athlete',
        country: 'Floating <Top> Country',
        date: '01/08/2020',
        sport: 'Track & Field',
        gold: 22,
        silver: '003',
        bronze: 44,
        total: 55,
      },
    ];
  }, []);
  const pinnedBottomRowData = useMemo(() => {
    return [
      {
        athlete: 'Floating <Bottom> Athlete',
        country: 'Floating <Bottom> Country',
        date: '01/08/2030',
        sport: 'Track & Field',
        gold: 222,
        silver: '005',
        bronze: 244,
        total: 255,
      },
    ];
  }, []);

  const onGridReady = useCallback((params) => {
    fetch('https://www.ag-grid.com/example-assets/small-olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => setRowData(data.filter((rec) => rec.country != null)));
  }, []);

  const onBtExport = useCallback(() => {
    gridRef.current.api.exportDataAsExcel(getParams());
  }, []);

  return (
    <div style={containerStyle}>
      <div className="container">
        <div className="columns">
          <div className="column">
            <label htmlFor="skipPinnedTop">
              <input id="skipPinnedTop" type="checkbox" />
              Skip Pinned Top Rows
            </label>
          </div>
          <div className="column">
            <label htmlFor="skipPinnedBottom">
              <input id="skipPinnedBottom" type="checkbox" />
              Skip Pinned Bottom Rows
            </label>
          </div>
          <div>
            <button
              onClick={onBtExport}
              style={{ margin: '5px 0px', fontWeight: 'bold' }}
            >
              Export to Excel
            </button>
          </div>
        </div>
        <div className="grid-wrapper">
          <div style={gridStyle} className="ag-theme-alpine">
            <AgGridReact
              ref={gridRef}
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              popupParent={popupParent}
              pinnedTopRowData={pinnedTopRowData}
              pinnedBottomRowData={pinnedBottomRowData}
              onGridReady={onGridReady}
            ></AgGridReact>
          </div>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
