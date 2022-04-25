import {
  ColDef,
  GetDataPath,
  GetRowIdFunc,
  GetRowIdParams,
  GridApi,
  GridReadyEvent,
  RowDragEndEvent,
  RowNode,
  ValueFormatterParams,
} from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { Component } from '@angular/core';
// Required feature modules are registered in app.module.ts
declare var FileCellRenderer: any;

@Component({
  selector: 'my-app',
  template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [rowData]="rowData"
    [treeData]="true"
    [animateRows]="true"
    [groupDefaultExpanded]="groupDefaultExpanded"
    [getDataPath]="getDataPath"
    [getRowId]="getRowId"
    [autoGroupColumnDef]="autoGroupColumnDef"
    (rowDragEnd)="onRowDragEnd($event)"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular>`,
})
export class AppComponent {
  private gridApi!: GridApi;

  public columnDefs: ColDef[] = [
    { field: 'dateModified' },
    {
      field: 'size',
      valueFormatter: valueFormatter,
    },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    resizable: true,
  };
  public rowData: any[] | null = getData();
  public groupDefaultExpanded = -1;
  public getDataPath: GetDataPath = (data: any) => {
    return data.filePath;
  };
  public getRowId: GetRowIdFunc = (params: GetRowIdParams) => {
    return params.data.id;
  };
  public autoGroupColumnDef: ColDef = {
    rowDrag: true,
    headerName: 'Files',
    minWidth: 300,
    cellRendererParams: {
      suppressCount: true,
      innerRenderer: FileCellRenderer,
    },
  };

  onRowDragEnd(event: RowDragEndEvent) {
    // this is the row the mouse is hovering over
    var overNode = event.overNode;
    if (!overNode) {
      return;
    }
    // folder to drop into is where we are going to move the file/folder to
    var folderToDropInto =
      overNode.data.type === 'folder'
        ? // if over a folder, we take the immediate row
          overNode
        : // if over a file, we take the parent row (which will be a folder)
          overNode.parent;
    // the data we want to move
    var movingData = event.node.data;
    // take new parent path from parent, if data is missing, means it's the root node,
    // which has no data.
    var newParentPath = folderToDropInto!.data
      ? folderToDropInto!.data.filePath
      : [];
    var needToChangeParent = !arePathsEqual(newParentPath, movingData.filePath);
    // check we are not moving a folder into a child folder
    var invalidMode = isSelectionParentOfTarget(event.node, folderToDropInto);
    if (invalidMode) {
      console.log('invalid move');
    }
    if (needToChangeParent && !invalidMode) {
      var updatedRows: any[] = [];
      moveToPath(newParentPath, event.node, updatedRows);
      this.gridApi.applyTransaction({
        update: updatedRows,
      });
      this.gridApi.clearFocusedCell();
    }
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }
}

var valueFormatter = function (params: ValueFormatterParams) {
  return params.value ? params.value + ' MB' : '';
};
// this updates the filePath locations in our data, we update the data
// before we send it to AG Grid
function moveToPath(
  newParentPath: string[],
  node: RowNode,
  allUpdatedNodes: any[]
) {
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
}
function isSelectionParentOfTarget(
  selectedNode: RowNode,
  targetNode: RowNode | null
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
}
function arePathsEqual(path1: string[], path2: string[]) {
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
}
