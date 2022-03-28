
import { Component } from '@angular/core';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { CellClassParams, ColDef, ColGroupDef, ColumnApi, GetDataPath, GetRowIdFunc, Grid, GridApi, GridOptions, GridReadyEvent, RefreshCellsParams, RowDragEndEvent, RowDragLeaveEvent, RowDragMoveEvent, RowNode, ValueFormatterParams } from 'ag-grid-community';
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
    (rowDragMove)="onRowDragMove($event)"
    (rowDragLeave)="onRowDragLeave($event)"
    (rowDragEnd)="onRowDragEnd($event)"
    (gridReady)="onGridReady($event)"
    ></ag-grid-angular>`
})

export class AppComponent {
    private gridApi!: GridApi;

    
    public columnDefs: ColDef[] = [
    {
        field: 'dateModified',
        cellClassRules: cellClassRules,
    },
    {
        field: 'size',
        valueFormatter: valueFormatter,
        cellClassRules: cellClassRules,
    },
];
public defaultColDef: ColDef = {
    flex: 1,
    resizable: true,
};
public rowData: any[] | null = getData();
public groupDefaultExpanded = -1;
public getDataPath: GetDataPath = function (data) {
    return data.filePath;
};
public getRowId: GetRowIdFunc = function (params) {
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
    cellClassRules: {
        'hover-over': function (params) {
            return params.node === potentialParent;
        },
    },
}


    onRowDragMove(event: RowDragMoveEvent) {
    setPotentialParentForNode(event.api, event.overNode);
}

onRowDragLeave(event: RowDragLeaveEvent) {
    // clear node to highlight
    setPotentialParentForNode(event.api, null);
}

onRowDragEnd(event: RowDragEndEvent) {
    if (!potentialParent) {
        return;
    }
    var movingData = event.node.data;
    // take new parent path from parent, if data is missing, means it's the root node,
    // which has no data.
    var newParentPath = potentialParent.data ? potentialParent.data.filePath : [];
    var needToChangeParent = !arePathsEqual(newParentPath, movingData.filePath);
    // check we are not moving a folder into a child folder
    var invalidMode = isSelectionParentOfTarget(event.node, potentialParent);
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
    // clear node to highlight
    setPotentialParentForNode(event.api, null);
}

onGridReady(params: GridReadyEvent) {
        this.gridApi = params.api;
    }
}



var valueFormatter = function (params: ValueFormatterParams) {
    return params.value ? params.value + ' MB' : '';
};
var cellClassRules = {
    'hover-over': function (params: CellClassParams) {
        return params.node === potentialParent;
    },
};
var potentialParent: any = null;
function moveToPath(newParentPath: string[], node: RowNode, allUpdatedNodes: any[]) {
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
function isSelectionParentOfTarget(selectedNode: RowNode, targetNode: any) {
    var children = selectedNode.childrenAfterGroup || [];
    for (var i = 0; i < children.length; i++) {
        if (targetNode && children[i].key === targetNode.key)
            return true;
        isSelectionParentOfTarget(children[i], targetNode);
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
function setPotentialParentForNode(api: GridApi, overNode: RowNode | undefined | null) {
    var newPotentialParent;
    if (overNode) {
        newPotentialParent =
            overNode.data.type === 'folder'
                ? // if over a folder, we take the immediate row
                    overNode
                : // if over a file, we take the parent row (which will be a folder)
                    overNode.parent;
    }
    else {
        newPotentialParent = null;
    }
    var alreadySelected = potentialParent === newPotentialParent;
    if (alreadySelected) {
        return;
    }
    // we refresh the previous selection (if it exists) to clear
    // the highlighted and then the new selection.
    var rowsToRefresh = [];
    if (potentialParent) {
        rowsToRefresh.push(potentialParent);
    }
    if (newPotentialParent) {
        rowsToRefresh.push(newPotentialParent);
    }
    potentialParent = newPotentialParent;
    refreshRows(api, rowsToRefresh);
}
function refreshRows(api: GridApi, rowsToRefresh: RowNode[]) {
    var params: RefreshCellsParams = {
        // refresh these rows only.
        rowNodes: rowsToRefresh,
        // because the grid does change detection, the refresh
        // will not happen because the underlying value has not
        // changed. to get around this, we force the refresh,
        // which skips change detection.
        force: true,
    };
    api.refreshCells(params);
}
