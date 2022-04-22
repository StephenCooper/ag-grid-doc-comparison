import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import 'ag-grid-enterprise';
import { AgGridVue } from 'ag-grid-vue';
import Vue from 'vue';

const VueExample = {
  template: `
        <div style="height: 100%">
            <div class="example-wrapper">
                <div class="example-header">
                    <div>
                        <label>
                            <input type="checkbox" id="pivot-mode" v-on:click="pivotMode()">
                            Group &amp; Pivot
                        </label>
                    </div>
                
                    <div style="margin-top: 6px;">
                        <button v-on:click="updateOneRecord()">Set One Value</button>
                        <button v-on:click="updateUsingTransaction()">Update Points</button>
                        <button v-on:click="addNewGroupUsingTransaction()">Add New Group</button>
                        <button v-on:click="addNewCourse()">Add Physics Row</button>
                        <button v-on:click="removePhysics()">Remove All Physics</button>
                        <button v-on:click="moveCourse()">Move Course</button>
                    </div>
                </div>
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine-dark"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :rowData="rowData"
                :pivotMode="true"
                :groupDefaultExpanded="groupDefaultExpanded"
                :animateRows="true"
                :getRowId="getRowId"></ag-grid-vue>
            </div>
        </div>
    `,
  components: {
    'ag-grid-vue': AgGridVue,
  },
  data: function () {
    return {
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
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        minWidth: 150,
        sortable: true,
        resizable: true,
        cellRenderer: 'agAnimateShowChangeCellRenderer',
      },
      rowData: null,
      groupDefaultExpanded: null,
      getRowId: null,
    };
  },
  created() {
    this.rowData = getRowData();
    this.groupDefaultExpanded = 1;
    this.getRowId = (params) => {
      return params.data.student;
    };
  },
  methods: {
    pivotMode() {
      var pivotModeOn = document.getElementById('pivot-mode').checked;
      this.gridColumnApi.setPivotMode(pivotModeOn);
      this.gridColumnApi.applyColumnState({
        state: [
          { colId: 'yearGroup', rowGroup: pivotModeOn },
          { colId: 'course', pivot: pivotModeOn },
          { colId: 'ageRange', pivot: pivotModeOn },
        ],
      });
    },
    updateOneRecord() {
      var rowNodeToUpdate = pickExistingRowNodeAtRandom(this.gridApi);
      if (!rowNodeToUpdate) return;
      var randomValue = createNewRandomScore(rowNodeToUpdate.data);
      console.log(
        'updating points to ' + randomValue + ' on ',
        rowNodeToUpdate.data
      );
      rowNodeToUpdate.setDataValue('points', randomValue);
    },
    updateUsingTransaction() {
      var itemToUpdate = pickExistingRowItemAtRandom(this.gridApi);
      if (!itemToUpdate) {
        return;
      }
      console.log('updating - before', itemToUpdate);
      itemToUpdate.points = createNewRandomScore(itemToUpdate);
      var transaction = {
        update: [itemToUpdate],
      };
      console.log('updating - after', itemToUpdate);
      this.gridApi.applyTransaction(transaction);
    },
    addNewGroupUsingTransaction() {
      var item1 = createRow();
      var item2 = createRow();
      item1.yearGroup = 'Year 5';
      item2.yearGroup = 'Year 5';
      var transaction = {
        add: [item1, item2],
      };
      console.log('add - ', item1);
      console.log('add - ', item2);
      this.gridApi.applyTransaction(transaction);
    },
    addNewCourse() {
      var item1 = createRow();
      item1.course = 'Physics';
      var transaction = {
        add: [item1],
      };
      console.log('add - ', item1);
      this.gridApi.applyTransaction(transaction);
    },
    removePhysics() {
      var allPhysics = [];
      this.gridApi.forEachLeafNode(function (rowNode) {
        if (rowNode.data.course === 'Physics') {
          allPhysics.push(rowNode.data);
        }
      });
      var transaction = {
        remove: allPhysics,
      };
      console.log('removing ' + allPhysics.length + ' physics items.');
      this.gridApi.applyTransaction(transaction);
    },
    moveCourse() {
      var item = pickExistingRowItemAtRandom(this.gridApi);
      if (!item) {
        return;
      }
      item.course = item.course === 'History' ? 'Science' : 'History';
      var transaction = {
        update: [item],
      };
      console.log('moving ' + item);
      this.gridApi.applyTransaction(transaction);
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      document.getElementById('pivot-mode').checked = true;
    },
  },
};

window.ageRangeValueGetter = function ageRangeValueGetter(params) {
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
};

window.random = function random() {
  seed = ((seed || 1) * 16807) % 2147483647;
  return seed;
};

window.getRowData = function getRowData() {
  var rowData = [];
  for (var i = 1; i <= 100; i++) {
    var row = createRow();
    rowData.push(row);
  }
  return rowData;
};

window.createRow = function createRow() {
  studentId = studentId ? studentId : 10023;
  var randomNumber = random();
  return {
    student: studentId++,
    points: (randomNumber % 60) + 40,
    course: ['Science', 'History'][randomNumber % 3 === 0 ? 0 : 1],
    yearGroup: 'Year ' + ((randomNumber % 4) + 1),
    age: (randomNumber % 25) + 15, // 15 to 40
  };
};

window.createNewRandomScore = function createNewRandomScore(data) {
  var randomValue = createRandomNumber();
  // make sure random number is not actually the same number again
  while (randomValue === data.points) {
    randomValue = createRandomNumber();
  }
  return randomValue;
};

window.createRandomNumber = function createRandomNumber() {
  return Math.floor(Math.random() * 100);
};

window.pickExistingRowNodeAtRandom = function pickExistingRowNodeAtRandom(
  gridApi
) {
  var allItems = [];
  gridApi.forEachLeafNode(function (rowNode) {
    allItems.push(rowNode);
  });
  if (allItems.length === 0) {
    return;
  }
  var result = allItems[Math.floor(Math.random() * allItems.length)];
  return result;
};

window.pickExistingRowItemAtRandom = function pickExistingRowItemAtRandom(
  gridApi
) {
  var rowNode = pickExistingRowNodeAtRandom(gridApi);
  return rowNode ? rowNode.data : null;
};

// pretty basic, but deterministic (so same numbers each time we run), random number generator
var seed;

var studentId;

new Vue({
  el: '#app',
  components: {
    'my-component': VueExample,
  },
});
