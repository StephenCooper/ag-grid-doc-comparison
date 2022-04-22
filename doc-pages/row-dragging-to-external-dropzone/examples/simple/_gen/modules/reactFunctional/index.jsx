'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

var rowIdSequence = 100;

const addCheckboxListener = (params) => {
  var checkbox = document.querySelector('input[type=checkbox]');
  checkbox.addEventListener('change', function () {
    params.api.setSuppressMoveWhenRowDragging(checkbox.checked);
  });
};

const createRowData = () => {
  var data = [];
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
};

const createTile = (data) => {
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
};

const addDropZones = (params) => {
  var tileContainer = document.querySelector('.tile-container');
  var dropZone = {
    getContainer: function () {
      return tileContainer;
    },
    onDragStop: function (params) {
      var tile = createTile(params.node.data);
      tileContainer.appendChild(tile);
    },
  };
  params.api.addRowDropZone(dropZone);
};

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState(createRowData());
  const [columnDefs, setColumnDefs] = useState([
    { field: 'id', rowDrag: true },
    { field: 'color' },
    { field: 'value1' },
    { field: 'value2' },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      sortable: true,
      filter: true,
      resizable: true,
      flex: 1,
    };
  }, []);
  const rowClassRules = useMemo(() => {
    return {
      'red-row': 'data.color == "Red"',
      'green-row': 'data.color == "Green"',
      'blue-row': 'data.color == "Blue"',
    };
  }, []);

  const onGridReady = useCallback((params) => {
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
