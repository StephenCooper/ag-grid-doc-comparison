'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const getPinnedTopData = () => {
  return [
    {
      firstName: '##',
      lastName: '##',
      gender: '##',
      address: '##',
      mood: '##',
      country: '##',
    },
  ];
};

const getPinnedBottomData = () => {
  return [
    {
      firstName: '##',
      lastName: '##',
      gender: '##',
      address: '##',
      mood: '##',
      country: '##',
    },
  ];
};

const GridExample = () => {
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState(getData());
  const [columnDefs, setColumnDefs] = useState([
    { field: 'firstName' },
    { field: 'lastName' },
    { field: 'gender' },
    { field: 'age' },
    { field: 'mood' },
    { field: 'country' },
    { field: 'address', minWidth: 550 },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 110,
      editable: true,
      resizable: true,
    };
  }, []);
  const pinnedTopRowData = useMemo(() => {
    return getPinnedTopData();
  }, []);
  const pinnedBottomRowData = useMemo(() => {
    return getPinnedBottomData();
  }, []);

  const onRowEditingStarted = useCallback((event) => {
    console.log('never called - not doing row editing');
  }, []);

  const onRowEditingStopped = useCallback((event) => {
    console.log('never called - not doing row editing');
  }, []);

  const onCellEditingStarted = useCallback((event) => {
    console.log('cellEditingStarted');
  }, []);

  const onCellEditingStopped = useCallback((event) => {
    console.log('cellEditingStopped');
  }, []);

  const onBtStopEditing = useCallback(() => {
    gridRef.current.api.stopEditing();
  }, []);

  const onBtStartEditing = useCallback((key, char, pinned) => {
    gridRef.current.api.setFocusedCell(0, 'lastName', pinned);
    gridRef.current.api.startEditingCell({
      rowIndex: 0,
      colKey: 'lastName',
      // set to 'top', 'bottom' or undefined
      rowPinned: pinned,
      key: key,
      charPress: char,
    });
  }, []);

  const onBtNextCell = useCallback(() => {
    gridRef.current.api.tabToNextCell();
  }, []);

  const onBtPreviousCell = useCallback(() => {
    gridRef.current.api.tabToPreviousCell();
  }, []);

  const onBtWhich = useCallback(() => {
    var cellDefs = gridRef.current.api.getEditingCells();
    if (cellDefs.length > 0) {
      var cellDef = cellDefs[0];
      console.log(
        'editing cell is: row = ' +
          cellDef.rowIndex +
          ', col = ' +
          cellDef.column.getId() +
          ', floating = ' +
          cellDef.rowPinned
      );
    } else {
      console.log('no cells are editing');
    }
  }, []);

  return (
    <div style={containerStyle}>
      <div className="example-wrapper">
        <div
          style={{
            marginBottom: '5px',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <button onClick={() => onBtStartEditing(undefined)}>
              edit (0)
            </button>
            <button onClick={() => onBtStartEditing('Delete')}>
              edit (0, Delete)
            </button>
            <button onClick={() => onBtStartEditing(undefined, 'T')}>
              edit (0, 'T')
            </button>
            <button
              onClick={() => onBtStartEditing(undefined, undefined, 'top')}
            >
              edit (0, Top)
            </button>
            <button
              onClick={() => onBtStartEditing(undefined, undefined, 'bottom')}
            >
              edit (0, Bottom)
            </button>
          </div>
          <div>
            <button onClick={onBtStopEditing}>stop ()</button>
            <button onClick={onBtNextCell}>next ()</button>
            <button onClick={onBtPreviousCell}>previous ()</button>
          </div>
          <div>
            <button onClick={onBtWhich}>which ()</button>
          </div>
        </div>
        <div className="grid-wrapper">
          <div style={gridStyle} className="ag-theme-alpine">
            <AgGridReact
              ref={gridRef}
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              pinnedTopRowData={pinnedTopRowData}
              pinnedBottomRowData={pinnedBottomRowData}
              onRowEditingStarted={onRowEditingStarted}
              onRowEditingStopped={onRowEditingStopped}
              onCellEditingStarted={onCellEditingStarted}
              onCellEditingStopped={onCellEditingStopped}
            ></AgGridReact>
          </div>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
