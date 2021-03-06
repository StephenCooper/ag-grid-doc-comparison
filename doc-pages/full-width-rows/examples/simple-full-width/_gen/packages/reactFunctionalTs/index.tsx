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
  ICellRendererComp,
  ICellRendererParams,
  IsFullWidthRowParams,
  RowHeightParams,
} from 'ag-grid-community';
import FullWidthCellRenderer from './fullWidthCellRenderer';

function isFullWidth(data: any) {
  // return true when country is Peru, France or Italy
  return ['Peru', 'France', 'Italy'].indexOf(data.name) >= 0;
}

class CountryCellRenderer implements ICellRendererComp {
  eGui!: HTMLElement;

  init(params: ICellRendererParams) {
    const flag = `<img border="0" width="15" height="10" src="https://www.ag-grid.com/example-assets/flags/${params.data.code}.png">`;

    const eTemp = document.createElement('div');
    eTemp.innerHTML = `<span style="cursor: default;">${flag} ${params.value}</span>`;
    this.eGui = eTemp.firstElementChild as HTMLElement;
  }

  getGui() {
    return this.eGui;
  }

  refresh(params: ICellRendererParams): boolean {
    return false;
  }
}

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState<any[]>(getData());
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { field: 'name', cellRenderer: CountryCellRenderer },
    { field: 'continent' },
    { field: 'language' },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      sortable: true,
      resizable: true,
      filter: true,
    };
  }, []);
  const getRowHeight = useCallback((params: RowHeightParams) => {
    // return 100px height for full width rows
    if (isFullWidth(params.data)) {
      return 100;
    }
  }, []);
  const isFullWidthRow = useCallback((params: IsFullWidthRowParams) => {
    return isFullWidth(params.rowNode.data);
  }, []);
  const fullWidthCellRenderer = useMemo<any>(() => {
    return FullWidthCellRenderer;
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          getRowHeight={getRowHeight}
          isFullWidthRow={isFullWidthRow}
          fullWidthCellRenderer={fullWidthCellRenderer}
        ></AgGridReact>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
