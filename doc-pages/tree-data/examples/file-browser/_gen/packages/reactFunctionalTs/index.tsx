'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import {
  ColDef,
  ColGroupDef,
  GetDataPath,
  GetRowIdFunc,
  GetRowIdParams,
  Grid,
  GridOptions,
  ICellRendererComp,
  ICellRendererParams,
  RowNode,
} from 'ag-grid-community';

declare var window: any;

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

const GridExample = () => {
  const gridRef = useRef<AgGridReact>(null);
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState<any[]>(getData());
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    {
      field: 'dateModified',
      minWidth: 250,
      comparator: (d1, d2) => {
        return new Date(d1).getTime() < new Date(d2).getTime() ? -1 : 1;
      },
    },
    {
      field: 'size',
      aggFunc: 'sum',
      valueFormatter: (params) => {
        return params.value
          ? Math.round(params.value * 10) / 10 + ' MB'
          : '0 MB';
      },
    },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      filter: true,
      sortable: true,
      resizable: true,
    };
  }, []);
  const autoGroupColumnDef = useMemo<ColDef>(() => {
    return {
      headerName: 'Files',
      minWidth: 330,
      cellRendererParams: {
        checkbox: true,
        suppressCount: true,
        innerRenderer: getFileCellRenderer(),
      },
    };
  }, []);
  const getDataPath = useCallback((data: any) => {
    return data.filePath;
  }, []);
  const getRowId = useCallback((params: GetRowIdParams) => {
    return params.data.id;
  }, []);

  const addNewGroup = useCallback(() => {
    var newGroupData = [
      {
        id: getNextId(),
        filePath: ['Music', 'wav', 'hit_' + new Date().getTime() + '.wav'],
        dateModified: 'Aug 23 2017 11:52:00 PM',
        size: 58.9,
      },
    ];
    gridRef.current!.api.applyTransaction({ add: newGroupData });
  }, []);

  const removeSelected = useCallback(() => {
    var selectedNode = gridRef.current!.api.getSelectedNodes()[0]; // single selection
    if (!selectedNode) {
      console.warn('No nodes selected!');
      return;
    }
    gridRef.current!.api.applyTransaction({
      remove: getRowsToRemove(selectedNode),
    });
  }, []);

  const moveSelectedNodeToTarget = useCallback((targetRowId: string) => {
    var selectedNode = gridRef.current!.api.getSelectedNodes()[0]; // single selection
    if (!selectedNode) {
      console.warn('No nodes selected!');
      return;
    }
    var targetNode = gridRef.current!.api.getRowNode(targetRowId)!;
    var invalidMove =
      selectedNode.key === targetNode.key ||
      isSelectionParentOfTarget(selectedNode, targetNode);
    if (invalidMove) {
      console.warn('Invalid selection - must not be parent or same as target!');
      return;
    }
    var rowsToUpdate = getRowsToUpdate(selectedNode, targetNode.data.filePath);
    gridRef.current!.api.applyTransaction({ update: rowsToUpdate });
  }, []);

  return (
    <div style={containerStyle}>
      <div className="example-wrapper">
        <div style={{ marginBottom: '5px' }}>
          <button onClick={addNewGroup}>Add New Group</button>
          <button onClick={() => moveSelectedNodeToTarget('9')}>
            Move Selected to 'stuff'
          </button>
          <button onClick={removeSelected}>Remove Selected</button>
        </div>

        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            autoGroupColumnDef={autoGroupColumnDef}
            treeData={true}
            animateRows={true}
            groupDefaultExpanded={-1}
            getDataPath={getDataPath}
            getRowId={getRowId}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
