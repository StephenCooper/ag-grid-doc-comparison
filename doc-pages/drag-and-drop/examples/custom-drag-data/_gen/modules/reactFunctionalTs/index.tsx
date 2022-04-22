'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import {
  ColDef,
  ColGroupDef,
  DndSourceOnRowDragParams,
  Grid,
  GridOptions,
  RowClassRules,
} from '@ag-grid-community/core';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

function onRowDrag(params: DndSourceOnRowDragParams) {
  // create the data that we want to drag
  var rowNode = params.rowNode;
  var e = params.dragEvent;
  var jsonObject = {
    grid: 'GRID_001',
    operation: 'Drag on Column',
    rowId: rowNode.data.id,
    selected: rowNode.isSelected(),
  };
  var jsonData = JSON.stringify(jsonObject);
  e.dataTransfer!.setData('application/json', jsonData);
  e.dataTransfer!.setData('text/plain', jsonData);
}

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState<any[]>(getData());
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      width: 80,
      sortable: true,
      filter: true,
      resizable: true,
    };
  }, []);
  const rowClassRules = useMemo<RowClassRules>(() => {
    return {
      'red-row': 'data.color == "Red"',
      'green-row': 'data.color == "Green"',
      'blue-row': 'data.color == "Blue"',
    };
  }, []);
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    {
      valueGetter: "'Drag'",
      dndSource: true,
      dndSourceOnRowDrag: onRowDrag,
      checkboxSelection: true,
    },
    { field: 'id' },
    { field: 'color' },
    { field: 'value1' },
    { field: 'value2' },
  ]);

  const onDragOver = useCallback((event: any) => {
    var dragSupported = event.dataTransfer.types.length;
    if (dragSupported) {
      event.dataTransfer.dropEffect = 'move';
    }
    event.preventDefault();
  }, []);

  const onDrop = useCallback((event: any) => {
    event.preventDefault();
    var jsonData = event.dataTransfer.getData('application/json');
    var eJsonRow = document.createElement('div');
    eJsonRow.classList.add('json-row');
    eJsonRow.innerText = jsonData;
    var eJsonDisplay = document.querySelector('#eJsonDisplay')!;
    eJsonDisplay.appendChild(eJsonRow);
  }, []);

  return (
    <div style={containerStyle}>
      <div className="outer">
        <div className="grid-col">
          <div style={gridStyle} className="ag-theme-alpine">
            <AgGridReact
              rowData={rowData}
              defaultColDef={defaultColDef}
              rowSelection={'multiple'}
              suppressRowClickSelection={true}
              rowClassRules={rowClassRules}
              rowDragManaged={true}
              columnDefs={columnDefs}
              animateRows={true}
            ></AgGridReact>
          </div>
        </div>

        <div
          className="drop-col"
          onDragOver={() => onDragOver(event)}
          onDrop={() => onDrop(event)}
        >
          <span id="eDropTarget" className="drop-target">
            ==&gt; Drop to here
          </span>
          <div id="eJsonDisplay" className="json-display"></div>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
