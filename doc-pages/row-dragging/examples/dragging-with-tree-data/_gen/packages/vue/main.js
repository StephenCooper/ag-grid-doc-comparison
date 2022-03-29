import Vue from "vue";
import { AgGridVue } from "ag-grid-vue";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const VueExample = {
  template: `
        <div style="height: 100%">
            <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :rowData="rowData"
                :treeData="true"
                :animateRows="true"
                :groupDefaultExpanded="groupDefaultExpanded"
                :getDataPath="getDataPath"
                :getRowId="getRowId"
                :autoGroupColumnDef="autoGroupColumnDef"
                @row-drag-end="onRowDragEnd"></ag-grid-vue>
        </div>
    `,
  components: {
    "ag-grid-vue": AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        { field: "dateModified" },
        { field: "size", valueFormatter: valueFormatter },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        resizable: true,
      },
      rowData: null,
      groupDefaultExpanded: null,
      getDataPath: null,
      getRowId: null,
      autoGroupColumnDef: null,
    };
  },
  created() {
    this.rowData = getData();
    this.groupDefaultExpanded = -1;
    this.getDataPath = (data) => {
      return data.filePath;
    };
    this.getRowId = (params) => {
      return params.data.id;
    };
    this.autoGroupColumnDef = {
      rowDrag: true,
      headerName: "Files",
      minWidth: 300,
      cellRendererParams: {
        suppressCount: true,
        innerRenderer: FileCellRenderer,
      },
    };
  },
  methods: {
    onRowDragEnd(event) {
      // this is the row the mouse is hovering over
      var overNode = event.overNode;
      if (!overNode) {
        return;
      }
      // folder to drop into is where we are going to move the file/folder to
      var folderToDropInto =
        overNode.data.type === "folder"
          ? // if over a folder, we take the immediate row
            overNode
          : // if over a file, we take the parent row (which will be a folder)
            overNode.parent;
      // the data we want to move
      var movingData = event.node.data;
      // take new parent path from parent, if data is missing, means it's the root node,
      // which has no data.
      var newParentPath = folderToDropInto.data
        ? folderToDropInto.data.filePath
        : [];
      var needToChangeParent = !arePathsEqual(
        newParentPath,
        movingData.filePath
      );
      // check we are not moving a folder into a child folder
      var invalidMode = isSelectionParentOfTarget(event.node, folderToDropInto);
      if (invalidMode) {
        console.log("invalid move");
      }
      if (needToChangeParent && !invalidMode) {
        var updatedRows = [];
        moveToPath(newParentPath, event.node, updatedRows);
        this.gridApi.applyTransaction({
          update: updatedRows,
        });
        this.gridApi.clearFocusedCell();
      }
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    },
  },
};

window.moveToPath = // this updates the filePath locations in our data, we update the data
  // before we send it to AG Grid
  function moveToPath(newParentPath, node, allUpdatedNodes) {
    // last part of the file path is the file name
    var oldPath = node.data.filePath;
    var fileName = oldPath[oldPath.length - 1];
    var newChildPath = newParentPath.slice();
    newChildPath.push(fileName);
    node.data.filePath = newChildPath;
    allUpdatedNodes.push(node.data);
    if (node.childrenAfterGroup) {
      node.childrenAfterGroup.forEach(function (childNode) {
        moveToPath(newChildPath, childNode, allUpdatedNodes);
      });
    }
  };

window.isSelectionParentOfTarget = function isSelectionParentOfTarget(
  selectedNode,
  targetNode
) {
  let children = [...(selectedNode.childrenAfterGroup || [])];
  if (!targetNode) {
    return false;
  }
  while (children.length) {
    const node = children.shift();
    if (!node) {
      continue;
    }
    if (node.key === targetNode.key) {
      return true;
    }
    if (node.childrenAfterGroup && node.childrenAfterGroup.length) {
      children.push(...node.childrenAfterGroup);
    }
  }
  return false;
};

window.arePathsEqual = function arePathsEqual(path1, path2) {
  if (path1.length !== path2.length) {
    return false;
  }
  var equal = true;
  path1.forEach(function (item, index) {
    if (path2[index] !== item) {
      equal = false;
    }
  });
  return equal;
};

var valueFormatter = function (params) {
  return params.value ? params.value + " MB" : "";
};

new Vue({
  el: "#app",
  components: {
    "my-component": VueExample,
  },
});
