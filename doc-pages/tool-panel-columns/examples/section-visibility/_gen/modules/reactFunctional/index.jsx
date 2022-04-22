'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  MenuModule,
  ColumnsToolPanelModule,
]);

const GridExample = () => {
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    { headerName: 'Name', field: 'athlete', minWidth: 200 },
    { field: 'age', enableRowGroup: true },
    { field: 'country', minWidth: 200 },
    { field: 'year' },
    { field: 'date', suppressColumnsToolPanel: true, minWidth: 180 },
    { field: 'sport', minWidth: 200 },
    { field: 'gold', aggFunc: 'sum' },
    { field: 'silver', aggFunc: 'sum' },
    { field: 'bronze', aggFunc: 'sum' },
    { field: 'total', aggFunc: 'sum' },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 100,
      sortable: true,
      enablePivot: true,
    };
  }, []);
  const sideBar = useMemo(() => {
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
            suppressColumnFilter: true,
            suppressColumnSelectAll: true,
            suppressColumnExpandAll: true,
          },
        },
      ],
      defaultToolPanel: 'columns',
    };
  }, []);

  const onGridReady = useCallback((params) => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => setRowData(data));
  }, []);

  const showPivotModeSection = useCallback(() => {
    var columnToolPanel = gridRef.current.api.getToolPanelInstance('columns');
    columnToolPanel.setPivotModeSectionVisible(true);
  }, []);

  const showRowGroupsSection = useCallback(() => {
    var columnToolPanel = gridRef.current.api.getToolPanelInstance('columns');
    columnToolPanel.setRowGroupsSectionVisible(true);
  }, []);

  const showValuesSection = useCallback(() => {
    var columnToolPanel = gridRef.current.api.getToolPanelInstance('columns');
    columnToolPanel.setValuesSectionVisible(true);
  }, []);

  const showPivotSection = useCallback(() => {
    var columnToolPanel = gridRef.current.api.getToolPanelInstance('columns');
    columnToolPanel.setPivotSectionVisible(true);
  }, []);

  return (
    <div style={containerStyle}>
      <div className="example-wrapper">
        <div>
          <span className="button-group">
            <button onClick={showPivotModeSection}>
              Show Pivot Mode Section
            </button>
            <button onClick={showRowGroupsSection}>
              Show Row Groups Section
            </button>
            <button onClick={showValuesSection}>Show Values Section</button>
            <button onClick={showPivotSection}>Show Pivot Section</button>
          </span>
        </div>

        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            sideBar={sideBar}
            onGridReady={onGridReady}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
