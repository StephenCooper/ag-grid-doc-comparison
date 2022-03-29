import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { AgGridVue } from "@ag-grid-community/vue";
import { RowGroupingModule } from "@ag-grid-enterprise/row-grouping";
import Vue from "vue";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, RowGroupingModule]);

const VueExample = {
  template: `
        <div style="height: 100%">
            <div class="example-wrapper">
                <div style="margin-bottom: 5px;">
                    <button v-on:click="addNewGroup()">Add New Group</button>
                    <button v-on:click="moveSelectedNodeToTarget(9)">Move Selected to 'stuff'</button>
                    <button v-on:click="removeSelected()">Remove Selected</button>
                </div>
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :autoGroupColumnDef="autoGroupColumnDef"
                :rowData="rowData"
                :treeData="true"
                :animateRows="true"
                :groupDefaultExpanded="groupDefaultExpanded"
                :getDataPath="getDataPath"
                :getRowId="getRowId"></ag-grid-vue>
            </div>
        </div>
    `,
  components: {
    "ag-grid-vue": AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        {
          field: "dateModified",
          minWidth: 250,
          comparator: (d1, d2) => {
            return new Date(d1).getTime() < new Date(d2).getTime() ? -1 : 1;
          },
        },
        {
          field: "size",
          aggFunc: "sum",
          valueFormatter: (params) => {
            return params.value
              ? Math.round(params.value * 10) / 10 + " MB"
              : "0 MB";
          },
        },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        filter: true,
        sortable: true,
        resizable: true,
      },
      autoGroupColumnDef: null,
      rowData: null,
      groupDefaultExpanded: null,
      getDataPath: null,
      getRowId: null,
    };
  },
  created() {
    this.autoGroupColumnDef = {
      headerName: "Files",
      minWidth: 330,
      cellRendererParams: {
        checkbox: true,
        suppressCount: true,
        innerRenderer: getFileCellRenderer(),
      },
    };
    this.rowData = getData();
    this.groupDefaultExpanded = -1;
    this.getDataPath = (data) => {
      return data.filePath;
    };
    this.getRowId = (params) => {
      return params.data.id;
    };
  },
  methods: {
    addNewGroup() {
      var newGroupData = [
        {
          id: getNextId(),
          filePath: ["Music", "wav", "hit_" + new Date().getTime() + ".wav"],
          dateModified: "Aug 23 2017 11:52:00 PM",
          size: 58.9,
        },
      ];
      this.gridApi.applyTransaction({ add: newGroupData });
    },
    removeSelected() {
      var selectedNode = this.gridApi.getSelectedNodes()[0]; // single selection
      if (!selectedNode) {
        console.warn("No nodes selected!");
        return;
      }
      this.gridApi.applyTransaction({ remove: getRowsToRemove(selectedNode) });
    },
    moveSelectedNodeToTarget(targetRowId) {
      var selectedNode = this.gridApi.getSelectedNodes()[0]; // single selection
      if (!selectedNode) {
        console.warn("No nodes selected!");
        return;
      }
      var targetNode = this.gridApi.getRowNode(targetRowId);
      var invalidMove =
        selectedNode.key === targetNode.key ||
        isSelectionParentOfTarget(selectedNode, targetNode);
      if (invalidMove) {
        console.warn(
          "Invalid selection - must not be parent or same as target!"
        );
        return;
      }
      var rowsToUpdate = getRowsToUpdate(
        selectedNode,
        targetNode.data.filePath
      );
      this.gridApi.applyTransaction({ update: rowsToUpdate });
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    },
  },
};

window.getNextId = function getNextId() {
  if (!window.nextId) {
    window.nextId = 15;
  } else {
    window.nextId++;
  }
  return window.nextId;
};

window.getFileCellRenderer = function getFileCellRenderer() {
  class FileCellRenderer {
    init(params) {
      var tempDiv = document.createElement("div");
      var value = params.value;
      var icon = getFileIcon(params.value);
      tempDiv.innerHTML = icon
        ? '<span><i class="' +
          icon +
          '"></i>' +
          '<span class="filename"></span>' +
          value +
          "</span>"
        : value;
      this.eGui = tempDiv.firstChild;
    }
    getGui() {
      return this.eGui;
    }
    refresh() {
      return false;
    }
  }
  return FileCellRenderer;
};

window.getRowsToRemove = function getRowsToRemove(node) {
  var res = [];
  const children = node.childrenAfterGroup || [];
  for (var i = 0; i < children.length; i++) {
    res = res.concat(getRowsToRemove(children[i]));
  }
  // ignore nodes that have no data, i.e. 'filler groups'
  return node.data ? res.concat([node.data]) : res;
};

window.isSelectionParentOfTarget = function isSelectionParentOfTarget(
  selectedNode,
  targetNode
) {
  var children = selectedNode.childrenAfterGroup || [];
  for (var i = 0; i < children.length; i++) {
    if (targetNode && children[i].key === targetNode.key) return true;
    isSelectionParentOfTarget(children[i], targetNode);
  }
  return false;
};

window.getRowsToUpdate = function getRowsToUpdate(node, parentPath) {
  var res = [];
  var newPath = parentPath.concat([node.key]);
  if (node.data) {
    // groups without data, i.e. 'filler groups' don't need path updated
    node.data.filePath = newPath;
  }
  var children = node.childrenAfterGroup || [];
  for (var i = 0; i < children.length; i++) {
    var updatedChildRowData = getRowsToUpdate(children[i], newPath);
    res = res.concat(updatedChildRowData);
  }
  // ignore nodes that have no data, i.e. 'filler groups'
  return node.data ? res.concat([node.data]) : res;
};

window.getFileIcon = function getFileIcon(name) {
  return endsWith(name, ".mp3") || endsWith(name, ".wav")
    ? "far fa-file-audio"
    : endsWith(name, ".xls")
    ? "far fa-file-excel"
    : endsWith(name, ".txt")
    ? "far fa-file"
    : endsWith(name, ".pdf")
    ? "far fa-file-pdf"
    : "far fa-folder";
};

window.endsWith = function endsWith(str, match) {
  var len;
  if (str == null || !str.length || match == null || !match.length) {
    return false;
  }
  len = str.length;
  return str.substring(len - match.length, len) === match;
};

new Vue({
  el: "#app",
  components: {
    "my-component": VueExample,
  },
});
