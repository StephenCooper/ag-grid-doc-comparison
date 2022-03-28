
'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, RowGroupingModule])

class GridExample extends Component {
    constructor(props) {
        super(props);

        this.state = {
            columnDefs: [
    { field: 'dateModified' },
    {
        field: 'size',
        valueFormatter: valueFormatter,
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
}
        };

        
    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        
    }

onRowDragEnd = (event) => {
    // this is the row the mouse is hovering over
    var overNode = event.overNode;
    if (!overNode) {
        return;
    }
    // folder to drop into is where we are going to move the file/folder to
    var folderToDropInto = overNode.data.type === 'folder'
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
    var needToChangeParent = !arePathsEqual(newParentPath, movingData.filePath);
    // check we are not moving a folder into a child folder
    var invalidMode = isSelectionParentOfTarget(event.node, folderToDropInto);
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
// this updates the filePath locations in our data, we update the data
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
}
function isSelectionParentOfTarget(selectedNode, targetNode) {
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

render(
    <GridExample></GridExample>,
    document.querySelector('#root')
)
