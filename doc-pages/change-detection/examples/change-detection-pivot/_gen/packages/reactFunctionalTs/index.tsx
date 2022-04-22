'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import {
  ColDef,
  ColGroupDef,
  GetRowIdFunc,
  GetRowIdParams,
  Grid,
  GridApi,
  GridOptions,
  GridReadyEvent,
  RowNode,
  ValueGetterParams,
} from 'ag-grid-community';

interface Student {
  student: number;
  yearGroup: string;
  age: number;
  course: string;
  points: number;
}

function ageRangeValueGetter(params: ValueGetterParams) {
  var age = params.getValue('age');
  if (age === undefined) {
    return null;
  }
  if (age < 20) {
    return '< 20';
  } else if (age > 30) {
    return '> 30';
  } else {
    return '20 to 30';
  }
}

// pretty basic, but deterministic (so same numbers each time we run), random number generator
var seed: number;

function random() {
  seed = ((seed || 1) * 16807) % 2147483647;
  return seed;
}

function getRowData() {
  var rowData = [];
  for (var i = 1; i <= 100; i++) {
    var row = createRow();
    rowData.push(row);
  }
  return rowData;
}

var studentId: number;

function createRow() {
  studentId = studentId ? studentId : 10023;
  var randomNumber = random();
  return {
    student: studentId++,
    points: (randomNumber % 60) + 40,
    course: ['Science', 'History'][randomNumber % 3 === 0 ? 0 : 1],
    yearGroup: 'Year ' + ((randomNumber % 4) + 1),
    age: (randomNumber % 25) + 15, // 15 to 40
  };
}

function createNewRandomScore(data: Student) {
  var randomValue = createRandomNumber();
  // make sure random number is not actually the same number again
  while (randomValue === data.points) {
    randomValue = createRandomNumber();
  }
  return randomValue;
}

function createRandomNumber() {
  return Math.floor(Math.random() * 100);
}

function pickExistingRowNodeAtRandom(gridApi: GridApi) {
  var allItems: RowNode[] = [];
  gridApi.forEachLeafNode(function (rowNode) {
    allItems.push(rowNode);
  });
  if (allItems.length === 0) {
    return;
  }
  var result = allItems[Math.floor(Math.random() * allItems.length)];
  return result;
}

const pickExistingRowItemAtRandom: (gridApi: GridApi) => Student | null = (
  gridApi: GridApi
) => {
  var rowNode = pickExistingRowNodeAtRandom(gridApi);
  return rowNode ? rowNode.data : null;
};

const GridExample = () => {
  const gridRef = useRef<AgGridReact>(null);
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState<any[]>(getRowData());
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { headerName: 'Student ID', field: 'student' },
    { headerName: 'Year Group', field: 'yearGroup', rowGroup: true },
    { headerName: 'Age', field: 'age' },
    { headerName: 'Course', field: 'course', pivot: true },
    {
      headerName: 'Age Range',
      valueGetter: ageRangeValueGetter,
      pivot: true,
    },
    { headerName: 'Points', field: 'points', aggFunc: 'sum' },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      minWidth: 150,
      sortable: true,
      resizable: true,
      cellRenderer: 'agAnimateShowChangeCellRenderer',
    };
  }, []);
  const getRowId = useCallback((params: GetRowIdParams) => {
    return params.data.student;
  }, []);

  const onGridReady = useCallback((params: GridReadyEvent) => {
    (document.getElementById('pivot-mode') as HTMLInputElement).checked = true;
  }, []);

  const pivotMode = useCallback(() => {
    var pivotModeOn = (document.getElementById(
      'pivot-mode'
    ) as HTMLInputElement).checked;
    gridRef.current!.columnApi.setPivotMode(pivotModeOn);
    gridRef.current!.columnApi.applyColumnState({
      state: [
        { colId: 'yearGroup', rowGroup: pivotModeOn },
        { colId: 'course', pivot: pivotModeOn },
        { colId: 'ageRange', pivot: pivotModeOn },
      ],
    });
  }, []);

  const updateOneRecord = useCallback(() => {
    var rowNodeToUpdate = pickExistingRowNodeAtRandom(gridRef.current!.api!);
    if (!rowNodeToUpdate) return;
    var randomValue = createNewRandomScore(rowNodeToUpdate.data);
    console.log(
      'updating points to ' + randomValue + ' on ',
      rowNodeToUpdate.data
    );
    rowNodeToUpdate.setDataValue('points', randomValue);
  }, []);

  const updateUsingTransaction = useCallback(() => {
    var itemToUpdate = pickExistingRowItemAtRandom(gridRef.current!.api!);
    if (!itemToUpdate) {
      return;
    }
    console.log('updating - before', itemToUpdate);
    itemToUpdate.points = createNewRandomScore(itemToUpdate);
    var transaction = {
      update: [itemToUpdate],
    };
    console.log('updating - after', itemToUpdate);
    gridRef.current!.api.applyTransaction(transaction);
  }, []);

  const addNewGroupUsingTransaction = useCallback(() => {
    var item1 = createRow();
    var item2 = createRow();
    item1.yearGroup = 'Year 5';
    item2.yearGroup = 'Year 5';
    var transaction = {
      add: [item1, item2],
    };
    console.log('add - ', item1);
    console.log('add - ', item2);
    gridRef.current!.api.applyTransaction(transaction);
  }, []);

  const addNewCourse = useCallback(() => {
    var item1 = createRow();
    item1.course = 'Physics';
    var transaction = {
      add: [item1],
    };
    console.log('add - ', item1);
    gridRef.current!.api.applyTransaction(transaction);
  }, []);

  const removePhysics = useCallback(() => {
    var allPhysics: any = [];
    gridRef.current!.api.forEachLeafNode(function (rowNode) {
      if (rowNode.data.course === 'Physics') {
        allPhysics.push(rowNode.data);
      }
    });
    var transaction = {
      remove: allPhysics,
    };
    console.log('removing ' + allPhysics.length + ' physics items.');
    gridRef.current!.api.applyTransaction(transaction);
  }, []);

  const moveCourse = useCallback(() => {
    var item = pickExistingRowItemAtRandom(gridRef.current!.api!);
    if (!item) {
      return;
    }
    item.course = item.course === 'History' ? 'Science' : 'History';
    var transaction = {
      update: [item],
    };
    console.log('moving ' + item);
    gridRef.current!.api.applyTransaction(transaction);
  }, []);

  return (
    <div style={containerStyle}>
      <div className="example-wrapper">
        <div className="example-header">
          <div>
            <label>
              <input type="checkbox" id="pivot-mode" onClick={pivotMode} />
              Group &amp; Pivot
            </label>
          </div>

          <div style={{ marginTop: '6px' }}>
            <button onClick={updateOneRecord}>Set One Value</button>
            <button onClick={updateUsingTransaction}>Update Points</button>
            <button onClick={addNewGroupUsingTransaction}>Add New Group</button>
            <button onClick={addNewCourse}>Add Physics Row</button>
            <button onClick={removePhysics}>Remove All Physics</button>
            <button onClick={moveCourse}>Move Course</button>
          </div>
        </div>

        <div style={gridStyle} className="ag-theme-alpine-dark">
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            pivotMode={true}
            groupDefaultExpanded={1}
            animateRows={true}
            getRowId={getRowId}
            onGridReady={onGridReady}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
