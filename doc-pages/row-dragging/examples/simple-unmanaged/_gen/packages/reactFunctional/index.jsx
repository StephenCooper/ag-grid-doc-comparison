'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

var immutableStore = getData();

var sortActive = false;

var filterActive = false;

const GridExample = () => {
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    { field: 'athlete', rowDrag: true },
    { field: 'country' },
    { field: 'year', width: 100 },
    { field: 'date' },
    { field: 'sport' },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      width: 170,
      sortable: true,
      filter: true,
    };
  }, []);

  const onGridReady = useCallback((params) => {
    // add id to each item, needed for immutable store to work
    immutableStore.forEach(function (data, index) {
      data.id = index;
    });
    setRowData(immutableStore);
  }, []);

  // listen for change on sort changed
  const onSortChanged = useCallback(() => {
    var colState = gridRef.current.columnApi.getColumnState() || [];
    sortActive = colState.some((c) => c.sort);
    // suppress row drag if either sort or filter is active
    var suppressRowDrag = sortActive || filterActive;
    console.log(
      'sortActive = ' +
        sortActive +
        ', filterActive = ' +
        filterActive +
        ', allowRowDrag = ' +
        suppressRowDrag
    );
    gridRef.current.api.setSuppressRowDrag(suppressRowDrag);
  }, [filterActive]);

  // listen for changes on filter changed
  const onFilterChanged = useCallback(() => {
    filterActive = gridRef.current.api.isAnyFilterPresent();
    // suppress row drag if either sort or filter is active
    var suppressRowDrag = sortActive || filterActive;
    console.log(
      'sortActive = ' +
        sortActive +
        ', filterActive = ' +
        filterActive +
        ', allowRowDrag = ' +
        suppressRowDrag
    );
    gridRef.current.api.setSuppressRowDrag(suppressRowDrag);
  }, [filterActive]);

  const onRowDragMove = useCallback(
    (event) => {
      var movingNode = event.node;
      var overNode = event.overNode;
      var rowNeedsToMove = movingNode !== overNode;
      if (rowNeedsToMove) {
        // the list of rows we have is data, not row nodes, so extract the data
        var movingData = movingNode.data;
        var overData = overNode.data;
        var fromIndex = immutableStore.indexOf(movingData);
        var toIndex = immutableStore.indexOf(overData);
        var newStore = immutableStore.slice();
        moveInArray(newStore, fromIndex, toIndex);
        immutableStore = newStore;
        setRowData(newStore);
        gridRef.current.api.clearFocusedCell();
      }
      function moveInArray(arr, fromIndex, toIndex) {
        var element = arr[fromIndex];
        arr.splice(fromIndex, 1);
        arr.splice(toIndex, 0, element);
      }
    },
    [immutableStore]
  );

  const getRowId = useCallback((params) => {
    return params.data.id;
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          animateRows={true}
          getRowId={getRowId}
          onGridReady={onGridReady}
          onSortChanged={onSortChanged}
          onFilterChanged={onFilterChanged}
          onRowDragMove={onRowDragMove}
        ></AgGridReact>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
