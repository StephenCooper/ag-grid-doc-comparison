
'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

class GridExample extends Component {
    constructor(props) {
        super(props);

        this.state = {
            columnDefs: [
    {
        field: 'dateModified',
        cellClassRules: cellClassRules,
    },
    {
        field: 'size',
        valueFormatter: valueFormatter,
        cellClassRules: cellClassRules,
    },
],
    defaultColDef: {
    flex: 1,
    resizable: true,
},
    rowData: getData(),
    groupDefaultExpanded: -1,
    getDataPath: function (data) {
    return data.filePath;
},
    getRowId: function (params) {
    return params.data.id;
},
    autoGroupColumnDef: {
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
        };

        
    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        
    }

onRowDragMove = (event) => {
    setPotentialParentForNode(event.api, event.overNode);
}

   onRowDragLeave = (event) => {
    // clear node to highlight
    setPotentialParentForNode(event.api, null);
}

   onRowDragEnd = (event) => {
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
        var updatedRows = [];
        moveToPath(newParentPath, event.node, updatedRows);
        this.gridApi.applyTransaction({
            update: updatedRows,
        });
        this.gridApi.clearFocusedCell();
    }
    // clear node to highlight
    setPotentialParentForNode(event.api, null);
}

    render() {
        return (
            <div style={{ width: '100%', height: '100%' }}>
                <div
                
                style={{
                    height: '100%',
                    width: '100%'}}
                    className="ag-theme-alpine">
            <AgGridReact
                columnDefs={this.state.columnDefs}
defaultColDef={this.state.defaultColDef}
rowData={this.state.rowData}
treeData={true}
animateRows={true}
groupDefaultExpanded={this.state.groupDefaultExpanded}
getDataPath={this.state.getDataPath}
getRowId={this.state.getRowId}
autoGroupColumnDef={this.state.autoGroupColumnDef}
onGridReady={this.onGridReady}
onRowDragMove={this.onRowDragMove.bind(this)}
onRowDragLeave={this.onRowDragLeave.bind(this)}
onRowDragEnd={this.onRowDragEnd.bind(this)}
            />
            </div>
            </div>
        );
    }
}

var valueFormatter = function (params) {
    return params.value ? params.value + ' MB' : '';
};
var cellClassRules = {
    'hover-over': function (params) {
        return params.node === potentialParent;
    },
};
var potentialParent = null;
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
}
function isSelectionParentOfTarget(selectedNode, targetNode) {
    var children = selectedNode.childrenAfterGroup || [];
    for (var i = 0; i < children.length; i++) {
        if (targetNode && children[i].key === targetNode.key)
            return true;
        isSelectionParentOfTarget(children[i], targetNode);
    }
    return false;
}
function arePathsEqual(path1, path2) {
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
function setPotentialParentForNode(api, overNode) {
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
function refreshRows(api, rowsToRefresh) {
    var params = {
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

render(
    <GridExample></GridExample>,
    document.querySelector('#root')
)
