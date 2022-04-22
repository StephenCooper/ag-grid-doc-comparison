import {
  ColDef,
  GetDataPath,
  GetRowIdFunc,
  GetRowIdParams,
  GridApi,
  GridReadyEvent,
  ICellRendererComp,
  ICellRendererParams,
  RowNode,
} from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { Component } from '@angular/core';
// Required feature modules are registered in app.module.ts
declare var window: any;

@Component({
  selector: 'my-app',
  template: `<div class="example-wrapper">
    <div style="margin-bottom: 5px;">
      <button (click)="addNewGroup()">Add New Group</button>
      <button (click)="moveSelectedNodeToTarget('9')">
        Move Selected to 'stuff'
      </button>
      <button (click)="removeSelected()">Remove Selected</button>
    </div>
    <ag-grid-angular
      style="width: 100%; height: 100%;"
      class="ag-theme-alpine"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [autoGroupColumnDef]="autoGroupColumnDef"
      [rowData]="rowData"
      [treeData]="true"
      [animateRows]="true"
      [groupDefaultExpanded]="groupDefaultExpanded"
      [getDataPath]="getDataPath"
      [getRowId]="getRowId"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  </div>`,
})
export class AppComponent {
  private gridApi!: GridApi;

  public columnDefs: ColDef[] = [
    {
      field: 'dateModified',
      minWidth: 250,
      comparator: function (d1, d2) {
        return new Date(d1).getTime() < new Date(d2).getTime() ? -1 : 1;
      },
    },
    {
      field: 'size',
      aggFunc: 'sum',
      valueFormatter: function (params) {
        return params.value
          ? Math.round(params.value * 10) / 10 + ' MB'
          : '0 MB';
      },
    },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    filter: true,
    sortable: true,
    resizable: true,
  };
  public autoGroupColumnDef: ColDef = {
    headerName: 'Files',
    minWidth: 330,
    cellRendererParams: {
      checkbox: true,
      suppressCount: true,
      innerRenderer: getFileCellRenderer(),
    },
  };
  public rowData: any[] | null = getData();
  public groupDefaultExpanded = -1;
  public getDataPath: GetDataPath = function (data: any) {
    return data.filePath;
  };
  public getRowId: GetRowIdFunc = function (params: GetRowIdParams) {
    return params.data.id;
  };

  addNewGroup() {
    var newGroupData = [
      {
        id: getNextId(),
        filePath: ['Music', 'wav', 'hit_' + new Date().getTime() + '.wav'],
        dateModified: 'Aug 23 2017 11:52:00 PM',
        size: 58.9,
      },
    ];
    this.gridApi.applyTransaction({ add: newGroupData });
  }

  removeSelected() {
    var selectedNode = this.gridApi.getSelectedNodes()[0]; // single selection
    if (!selectedNode) {
      console.warn('No nodes selected!');
      return;
    }
    this.gridApi.applyTransaction({ remove: getRowsToRemove(selectedNode) });
  }

  moveSelectedNodeToTarget(targetRowId: string) {
    var selectedNode = this.gridApi.getSelectedNodes()[0]; // single selection
    if (!selectedNode) {
      console.warn('No nodes selected!');
      return;
    }
    var targetNode = this.gridApi.getRowNode(targetRowId)!;
    var invalidMove =
      selectedNode.key === targetNode.key ||
      isSelectionParentOfTarget(selectedNode, targetNode);
    if (invalidMove) {
      console.warn('Invalid selection - must not be parent or same as target!');
      return;
    }
    var rowsToUpdate = getRowsToUpdate(selectedNode, targetNode.data.filePath);
    this.gridApi.applyTransaction({ update: rowsToUpdate });
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }
}

function getNextId() {
  if (!window.nextId) {
    window.nextId = 15;
  } else {
    window.nextId++;
  }
  return window.nextId;
}
function getFileCellRenderer() {
  class FileCellRenderer implements ICellRendererComp {
    eGui: any;
    init(params: ICellRendererParams) {
      var tempDiv = document.createElement('div');
      var value = params.value;
      var icon = getFileIcon(params.value);
      tempDiv.innerHTML = icon
        ? '<span><i class="' +
          icon +
          '"></i>' +
          '<span class="filename"></span>' +
          value +
          '</span>'
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
}
function getRowsToRemove(node: RowNode) {
  var res: any[] = [];
  const children = node.childrenAfterGroup || [];
  for (var i = 0; i < children.length; i++) {
    res = res.concat(getRowsToRemove(children[i]));
  }
  // ignore nodes that have no data, i.e. 'filler groups'
  return node.data ? res.concat([node.data]) : res;
}
function isSelectionParentOfTarget(selectedNode: RowNode, targetNode: RowNode) {
  var children = selectedNode.childrenAfterGroup || [];
  for (var i = 0; i < children.length; i++) {
    if (targetNode && children[i].key === targetNode.key) return true;
    isSelectionParentOfTarget(children[i], targetNode);
  }
  return false;
}
function getRowsToUpdate(node: RowNode, parentPath: string[]) {
  var res: any[] = [];
  var newPath = parentPath.concat([node.key!]);
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
}
function getFileIcon(name: string) {
  return endsWith(name, '.mp3') || endsWith(name, '.wav')
    ? 'far fa-file-audio'
    : endsWith(name, '.xls')
    ? 'far fa-file-excel'
    : endsWith(name, '.txt')
    ? 'far fa-file'
    : endsWith(name, '.pdf')
    ? 'far fa-file-pdf'
    : 'far fa-folder';
}
function endsWith(str: string | null, match: string | null) {
  var len;
  if (str == null || !str.length || match == null || !match.length) {
    return false;
  }
  len = str.length;
  return str.substring(len - match.length, len) === match;
}
