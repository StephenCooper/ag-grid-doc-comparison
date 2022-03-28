import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import { ColDef, ColGroupDef, GetRowIdFunc, Grid, GridApi, GridOptions, GridReadyEvent, RowNode, ValueGetterParams } from 'ag-grid-community';

interface Student {
  student: number;
  yearGroup: string;
  age: number;
  course: string;
  points: number;
}

const gridOptions: GridOptions = {
  columnDefs: [
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
  ],
  defaultColDef: {
    flex: 1,
    minWidth: 150,
    sortable: true,
    resizable: true,
    cellRenderer: 'agAnimateShowChangeCellRenderer',
  },
  rowData: getRowData(),
  pivotMode: true,
  groupDefaultExpanded: 1,
  // enableCellChangeFlash: true,
  animateRows: true,
  getRowId: function (params) {
    return params.data.student
  },
  onGridReady: function (params: GridReadyEvent) {
    (document.getElementById('pivot-mode') as HTMLInputElement).checked = true
  },
}

function ageRangeValueGetter(params: ValueGetterParams) {
  var age = params.getValue('age')
  if (age === undefined) {
    return null
  }
  if (age < 20) {
    return '< 20'
  } else if (age > 30) {
    return '> 30'
  } else {
    return '20 to 30'
  }
}

// pretty basic, but deterministic (so same numbers each time we run), random number generator
var seed: number;
function random() {
  seed = ((seed || 1) * 16807) % 2147483647
  return seed
}

function getRowData() {
  var rowData = []
  for (var i = 1; i <= 100; i++) {
    var row = createRow()
    rowData.push(row)
  }
  return rowData
}

var studentId: number;
function createRow() {
  studentId = studentId ? studentId : 10023;
  var randomNumber = random()
  return {
    student: studentId++,
    points: (randomNumber % 60) + 40,
    course: ['Science', 'History'][randomNumber % 3 === 0 ? 0 : 1],
    yearGroup: 'Year ' + ((randomNumber % 4) + 1), // 'Year 1' to 'Year 4'
    age: (randomNumber % 25) + 15, // 15 to 40
  };
}

function pivotMode() {
  var pivotModeOn = (document.getElementById('pivot-mode') as HTMLInputElement).checked

  gridOptions.columnApi!.setPivotMode(pivotModeOn)

  gridOptions.columnApi!.applyColumnState({
    state: [
      { colId: 'yearGroup', rowGroup: pivotModeOn },
      { colId: 'course', pivot: pivotModeOn },
      { colId: 'ageRange', pivot: pivotModeOn },
    ],
  })
}

function updateOneRecord() {
  var rowNodeToUpdate = pickExistingRowNodeAtRandom(gridOptions.api!)
  if (!rowNodeToUpdate) return;

  var randomValue = createNewRandomScore(rowNodeToUpdate.data)
  console.log(
    'updating points to ' + randomValue + ' on ',
    rowNodeToUpdate.data
  )
  rowNodeToUpdate.setDataValue('points', randomValue)
}

function createNewRandomScore(data: Student) {
  var randomValue = createRandomNumber()
  // make sure random number is not actually the same number again
  while (randomValue === data.points) {
    randomValue = createRandomNumber()
  }
  return randomValue
}

function createRandomNumber() {
  return Math.floor(Math.random() * 100)
}

function pickExistingRowNodeAtRandom(gridApi: GridApi) {
  var allItems: RowNode[] = []
  gridApi.forEachLeafNode(function (rowNode) {
    allItems.push(rowNode)
  })

  if (allItems.length === 0) {
    return
  }
  var result = allItems[Math.floor(Math.random() * allItems.length)]

  return result
}

function pickExistingRowItemAtRandom(gridApi: GridApi): Student | null {
  var rowNode = pickExistingRowNodeAtRandom(gridApi)
  return rowNode ? rowNode.data : null
}

function updateUsingTransaction() {
  var itemToUpdate = pickExistingRowItemAtRandom(gridOptions.api!)
  if (!itemToUpdate) {
    return
  }

  console.log('updating - before', itemToUpdate)
  itemToUpdate.points = createNewRandomScore(itemToUpdate)
  var transaction = {
    update: [itemToUpdate],
  }
  console.log('updating - after', itemToUpdate)
  gridOptions.api!.applyTransaction(transaction)
}

function addNewGroupUsingTransaction() {
  var item1 = createRow()
  var item2 = createRow()
  item1.yearGroup = 'Year 5'
  item2.yearGroup = 'Year 5'
  var transaction = {
    add: [item1, item2],
  }
  console.log('add - ', item1)
  console.log('add - ', item2)
  gridOptions.api!.applyTransaction(transaction)
}

function addNewCourse() {
  var item1 = createRow()
  item1.course = 'Physics'
  var transaction = {
    add: [item1],
  }
  console.log('add - ', item1)
  gridOptions.api!.applyTransaction(transaction)
}

function removePhysics() {
  var allPhysics: any = []
  gridOptions.api!.forEachLeafNode(function (rowNode) {
    if (rowNode.data.course === 'Physics') {
      allPhysics.push(rowNode.data)
    }
  })
  var transaction = {
    remove: allPhysics,
  }
  console.log('removing ' + allPhysics.length + ' physics items.')
  gridOptions.api!.applyTransaction(transaction)
}

function moveCourse() {
  var item = pickExistingRowItemAtRandom(gridOptions.api!)
  if (!item) {
    return
  }
  item.course = item.course === 'History' ? 'Science' : 'History'
  var transaction = {
    update: [item],
  }
  console.log('moving ' + item)
  gridOptions.api!.applyTransaction(transaction)
}

// setup the grid after the page has finished loading
  var gridDiv = document.querySelector<HTMLElement>('#myGrid')!
  new Grid(gridDiv, gridOptions)
 

if (typeof window !== 'undefined') {
// Attach external event handlers to window so they can be called from index.html
 (<any>window).pivotMode = pivotMode;
 (<any>window).updateOneRecord = updateOneRecord;
 (<any>window).updateUsingTransaction = updateUsingTransaction;
 (<any>window).addNewGroupUsingTransaction = addNewGroupUsingTransaction;
 (<any>window).addNewCourse = addNewCourse;
 (<any>window).removePhysics = removePhysics;
 (<any>window).moveCourse = moveCourse;
}