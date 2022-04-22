'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import {
  ColDef,
  ColGroupDef,
  Grid,
  GridOptions,
  GridReadyEvent,
  RowClassRules,
  RowDropZoneParams,
} from 'ag-grid-community';

var rowIdSequence = 100;

function addCheckboxListener(params: GridReadyEvent) {
  var checkbox = document.querySelector('input[type=checkbox]')! as any;
  checkbox.addEventListener('change', function () {
    params.api.setSuppressMoveWhenRowDragging(checkbox.checked);
  });
}

function createRowData() {
  var data: any[] = [];
  [
    'Red',
    'Green',
    'Blue',
    'Red',
    'Green',
    'Blue',
    'Red',
    'Green',
    'Blue',
  ].forEach(function (color) {
    var newDataItem = {
      id: rowIdSequence++,
      color: color,
      value1: Math.floor(Math.random() * 100),
      value2: Math.floor(Math.random() * 100),
    };
    data.push(newDataItem);
  });
  return data;
}

function createTile(data: any) {
  var el = document.createElement('div');
  el.classList.add('tile');
  el.classList.add(data.color.toLowerCase());
  el.innerHTML =
    '<div class="id">' +
    data.id +
    '</div>' +
    '<div class="value">' +
    data.value1 +
    '</div>' +
    '<div class="value">' +
    data.value2 +
    '</div>';
  return el;
}

function addDropZones(params: GridReadyEvent) {
  var tileContainer = document.querySelector('.tile-container') as any;
  var dropZone: RowDropZoneParams = {
    getContainer: () => {
      return tileContainer as any;
    },
    onDragStop: (params) => {
      var tile = createTile(params.node.data);
      tileContainer.appendChild(tile);
    },
  };
  params.api.addRowDropZone(dropZone);
}

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState<any[]>(createRowData());
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { field: 'id', rowDrag: true },
    { field: 'color' },
    { field: 'value1' },
    { field: 'value2' },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      sortable: true,
      filter: true,
      resizable: true,
      flex: 1,
    };
  }, []);
  const rowClassRules = useMemo<RowClassRules>(() => {
    return {
      'red-row': 'data.color == "Red"',
      'green-row': 'data.color == "Green"',
      'blue-row': 'data.color == "Blue"',
    };
  }, []);

  const onGridReady = useCallback((params: GridReadyEvent) => {
    addDropZones(params);
    addCheckboxListener(params);
  }, []);

  return (
    <div style={containerStyle}>
      <div className="example-wrapper">
        <div className="toolbar">
          <label>
            <input type="checkbox" /> Enable suppressMoveWhenRowDragging
          </label>
        </div>
        <div className="drop-containers">
          <div className="grid-wrapper">
            <div style={gridStyle} className="ag-theme-alpine">
              <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                rowClassRules={rowClassRules}
                rowDragManaged={true}
                animateRows={true}
                onGridReady={onGridReady}
              ></AgGridReact>
            </div>
          </div>
          <div className="drop-col">
            <span id="eDropTarget" className="drop-target">
              ==&gt; Drop to here
            </span>
            <div className="tile-container"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
