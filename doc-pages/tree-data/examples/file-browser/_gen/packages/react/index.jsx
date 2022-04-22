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
      ],
      defaultColDef: {
        flex: 1,
        filter: true,
        sortable: true,
        resizable: true,
      },
      autoGroupColumnDef: {
        headerName: 'Files',
        minWidth: 330,
        cellRendererParams: {
          checkbox: true,
          suppressCount: true,
          innerRenderer: getFileCellRenderer(),
        },
      },
      rowData: getData(),
      groupDefaultExpanded: -1,
      getDataPath: (data) => {
        return data.filePath;
      },
      getRowId: (params) => {
        return params.data.id;
      },
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };

  addNewGroup = () => {
    var newGroupData = [
      {
        id: getNextId(),
        filePath: ['Music', 'wav', 'hit_' + new Date().getTime() + '.wav'],
        dateModified: 'Aug 23 2017 11:52:00 PM',
        size: 58.9,
      },
    ];
    this.gridApi.applyTransaction({ add: newGroupData });
  };

  removeSelected = () => {
    var selectedNode = this.gridApi.getSelectedNodes()[0]; // single selection
    if (!selectedNode) {
      console.warn('No nodes selected!');
      return;
    }
    this.gridApi.applyTransaction({ remove: getRowsToRemove(selectedNode) });
  };

  moveSelectedNodeToTarget = (targetRowId) => {
    var selectedNode = this.gridApi.getSelectedNodes()[0]; // single selection
    if (!selectedNode) {
      console.warn('No nodes selected!');
      return;
    }
    var targetNode = this.gridApi.getRowNode(targetRowId);
    var invalidMove =
      selectedNode.key === targetNode.key ||
      isSelectionParentOfTarget(selectedNode, targetNode);
    if (invalidMove) {
      console.warn('Invalid selection - must not be parent or same as target!');
      return;
    }
    var rowsToUpdate = getRowsToUpdate(selectedNode, targetNode.data.filePath);
    this.gridApi.applyTransaction({ update: rowsToUpdate });
  };

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div className="example-wrapper">
          <div style={{ marginBottom: '5px' }}>
            <button onClick={() => this.addNewGroup()}>Add New Group</button>
            <button onClick={() => this.moveSelectedNodeToTarget('9')}>
              Move Selected to 'stuff'
            </button>
            <button onClick={() => this.removeSelected()}>
              Remove Selected
            </button>
          </div>
          <div
            style={{
              height: '100%',
              width: '100%',
            }}
            className="ag-theme-alpine"
          >
            <AgGridReact
              columnDefs={this.state.columnDefs}
              defaultColDef={this.state.defaultColDef}
              autoGroupColumnDef={this.state.autoGroupColumnDef}
              rowData={this.state.rowData}
              treeData={true}
              animateRows={true}
              groupDefaultExpanded={this.state.groupDefaultExpanded}
              getDataPath={this.state.getDataPath}
              getRowId={this.state.getRowId}
              onGridReady={this.onGridReady}
            />
          </div>
        </div>
      </div>
    );
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
  class FileCellRenderer {
    init(params) {
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
function getRowsToRemove(node) {
  var res = [];
  const children = node.childrenAfterGroup || [];
  for (var i = 0; i < children.length; i++) {
    res = res.concat(getRowsToRemove(children[i]));
  }
  // ignore nodes that have no data, i.e. 'filler groups'
  return node.data ? res.concat([node.data]) : res;
}
function isSelectionParentOfTarget(selectedNode, targetNode) {
  var children = selectedNode.childrenAfterGroup || [];
  for (var i = 0; i < children.length; i++) {
    if (targetNode && children[i].key === targetNode.key) return true;
    isSelectionParentOfTarget(children[i], targetNode);
  }
  return false;
}
function getRowsToUpdate(node, parentPath) {
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
}
function getFileIcon(name) {
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
function endsWith(str, match) {
  var len;
  if (str == null || !str.length || match == null || !match.length) {
    return false;
  }
  len = str.length;
  return str.substring(len - match.length, len) === match;
}

render(<GridExample></GridExample>, document.querySelector('#root'));
