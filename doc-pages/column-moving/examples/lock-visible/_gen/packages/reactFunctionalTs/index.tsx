'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import {
  ColDef,
  ColGroupDef,
  Grid,
  GridOptions,
  GridReadyEvent,
  SideBarDef,
} from 'ag-grid-community';

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState<any[]>();
  const [columnDefs, setColumnDefs] = useState<(ColDef | ColGroupDef)[]>([
    {
      headerName: 'Athlete',
      children: [
        { field: 'athlete', width: 150 },
        { field: 'age', lockVisible: true, cellClass: 'locked-visible' },
        { field: 'country', width: 150 },
        { field: 'year' },
        { field: 'date' },
        { field: 'sport' },
      ],
    },
    {
      headerName: 'Medals',
      children: [
        { field: 'gold', lockVisible: true, cellClass: 'locked-visible' },
        { field: 'silver', lockVisible: true, cellClass: 'locked-visible' },
        { field: 'bronze', lockVisible: true, cellClass: 'locked-visible' },
        {
          field: 'total',
          lockVisible: true,
          cellClass: 'locked-visible',
          hide: true,
        },
      ],
    },
  ]);
  const sideBar = useMemo<
    SideBarDef | string | string[] | boolean | null
  >(() => {
    return {
      toolPanels: [
        {
          id: 'columns',
          labelDefault: 'Columns',
          labelKey: 'columns',
          iconKey: 'columns',
          toolPanel: 'agColumnsToolPanel',
          toolPanelParams: {
            suppressRowGroups: true,
            suppressValues: true,
            suppressPivots: true,
            suppressPivotMode: true,
          },
        },
      ],
    };
  }, []);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      width: 100,
    };
  }, []);

  const onGridReady = useCallback((params: GridReadyEvent) => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data: any[]) => setRowData(data));
  }, []);

  return (
    <div style={containerStyle}>
      <div className="example-wrapper">
        <div className="legend-bar">
          <span className="legend-box locked-visible"></span> Locked Visible
          Column
        </div>

        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            sideBar={sideBar}
            defaultColDef={defaultColDef}
            onGridReady={onGridReady}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
