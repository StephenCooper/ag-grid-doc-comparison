
'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, RowGroupingModule])

var valueFormatter = function (params) {
    return params.value ? params.value + ' MB' : '';
};

// this updates the filePath locations in our data, we update the data
// before we send it to AG Grid
const moveToPath = (newParentPath, node, allUpdatedNodes) => {
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

const isSelectionParentOfTarget = (selectedNode, targetNode) => {
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

const arePathsEqual = (path1, path2) => {
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



const GridExample = () => {
    const gridRef = useRef();
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({height: '100%', width: '100%'}), []);
    const [rowData, setRowData] = useState(getData());
    const [columnDefs, setColumnDefs] = useState([
    { field: 'dateModified' },
    {
        field: 'size',
        valueFormatter: valueFormatter,
    },
]);
    const defaultColDef = useMemo(() => { return {
    flex: 1,
    resizable: true,
} }, []);
    const getDataPath = useCallback(function (data) {
    return data.filePath;
}, []);
    const getRowId = useCallback(function (params) {
    return params.data.id;
}, []);
    const autoGroupColumnDef = useMemo(() => { return {
    rowDrag: true,
    headerName: 'Files',
    minWidth: 300,
    cellRendererParams: {
        suppressCount: true,
        innerRenderer: FileCellRenderer,
    },
} }, []);



const onRowDragEnd = useCallback((event) => {
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
        gridRef.current.api.applyTransaction({
            update: updatedRows,
        });
        gridRef.current.api.clearFocusedCell();
    }
}, [])


    return  (
            <div style={containerStyle}>
                
        <div  style={gridStyle} className="ag-theme-alpine">             
            <AgGridReact
                ref={gridRef}
                rowData={rowData}
columnDefs={columnDefs}
defaultColDef={defaultColDef}
treeData={true}
animateRows={true}
groupDefaultExpanded={-1}
getDataPath={getDataPath}
getRowId={getRowId}
autoGroupColumnDef={autoGroupColumnDef}
onRowDragEnd={onRowDragEnd}
            >
            </AgGridReact>
        </div>
            </div>
        );

}

render(<GridExample></GridExample>, document.querySelector('#root'))
