'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

class NodeIdRenderer {
  init(params) {
    this.eGui = document.createElement('div');
    this.eGui.innerHTML = params.node.id + 1;
  }

  getGui() {
    return this.eGui;
  }

  refresh(params) {
    return false;
  }
}

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    // this row just shows the row index, doesn't use any data from the row
    {
      headerName: '#',
      cellRenderer: NodeIdRenderer,
      checkboxSelection: true,
      headerCheckboxSelection: true,
    },
    {
      field: 'athlete',
      filterParams: { buttons: ['clear', 'reset', 'apply'] },
    },
    {
      field: 'age',
      filterParams: { buttons: ['apply', 'cancel'] },
      enablePivot: true,
    },
    { field: 'country', enableRowGroup: true },
    { field: 'year', filter: 'agNumberColumnFilter' },
    { field: 'date' },
    {
      field: 'sport',
      filter: 'agMultiColumnFilter',
      filterParams: {
        filters: [
          {
            filter: 'agTextColumnFilter',
            display: 'accordion',
          },
          {
            filter: 'agSetColumnFilter',
            display: 'accordion',
          },
        ],
      },
    },
    { field: 'gold', enableValue: true },
    { field: 'silver', enableValue: true },
    { field: 'bronze', enableValue: true },
    { field: 'total', enableValue: true },
  ]);
  const localeText = useMemo(() => {
    return AG_GRID_LOCALE_ZZZ;
  }, []);
  const defaultColDef = useMemo(() => {
    return {
      editable: true,
      sortable: true,
      flex: 1,
      minWidth: 100,
      filter: true,
      resizable: true,
    };
  }, []);
  const statusBar = useMemo(() => {
    return {
      statusPanels: [
        { statusPanel: 'agTotalAndFilteredRowCountComponent', align: 'left' },
        { statusPanel: 'agAggregationComponent' },
      ],
    };
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
          localeText={localeText}
          defaultColDef={defaultColDef}
          sideBar={true}
          statusBar={statusBar}
          rowGroupPanelShow={'always'}
          pagination={true}
          paginationPageSize={500}
          enableRangeSelection={true}
          enableCharts={true}
          onGridReady={onGridReady}
        ></AgGridReact>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
