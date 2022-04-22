'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import { FiltersToolPanelModule } from '@ag-grid-enterprise/filter-tool-panel';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  RowGroupingModule,
  MenuModule,
  ColumnsToolPanelModule,
  FiltersToolPanelModule,
  SetFilterModule,
]);

const GridExample = () => {
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    { field: 'country', rowGroup: true, hide: true },
    { field: 'year', rowGroup: true, hide: true },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { headerName: 'Gold*pi', field: 'goldPi', minWidth: 200 },
    { headerName: 'Silver*pi', field: 'silverPi', minWidth: 200 },
    { headerName: 'Bronze*pi', field: 'bronzePi', minWidth: 200 },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 150,
      filter: true,
      sortable: true,
    };
  }, []);
  const autoGroupColumnDef = useMemo(() => {
    return {
      headerName: 'Athlete',
      field: 'athlete',
      minWidth: 250,
    };
  }, []);

  const onGridReady = useCallback((params) => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => setRowData(data));
  }, []);

  const expandAll = useCallback(() => {
    gridRef.current.api.expandAll();
  }, []);

  const collapseAll = useCallback(() => {
    gridRef.current.api.collapseAll();
  }, []);

  const getGroupRowAgg = useCallback((params) => {
    const result = {
      gold: 0,
      silver: 0,
      bronze: 0,
      goldPi: 0,
      silverPi: 0,
      bronzePi: 0,
    };
    params.nodes.forEach((node) => {
      const data = node.group ? node.aggData : node.data;
      if (typeof data.gold === 'number') {
        result.gold += data.gold;
        result.goldPi += data.gold * Math.PI;
      }
      if (typeof data.silver === 'number') {
        result.silver += data.silver;
        result.silverPi += data.silver * Math.PI;
      }
      if (typeof data.bronze === 'number') {
        result.bronze += data.bronze;
        result.bronzePi += data.bronze * Math.PI;
      }
    });
    return result;
  }, []);

  return (
    <div style={containerStyle}>
      <div className="example-wrapper">
        <div style={{ marginBottom: '5px' }}>
          <button onClick={expandAll}>Expand All</button>
          <button onClick={collapseAll}>Collapse All</button>
        </div>

        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            autoGroupColumnDef={autoGroupColumnDef}
            sideBar={true}
            enableRangeSelection={true}
            getGroupRowAgg={getGroupRowAgg}
            onGridReady={onGridReady}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
