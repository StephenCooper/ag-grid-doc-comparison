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
  RowClassRules,
} from 'ag-grid-community';

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState<any[]>(getData());
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { valueGetter: "'Drag'", dndSource: true },
    { field: 'id' },
    { field: 'color' },
    { field: 'value1' },
    { field: 'value2' },
  ]);
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

  const onDragOver = useCallback((event: any) => {
    var dragSupported = event.dataTransfer.length;
    if (dragSupported) {
      event.dataTransfer.dropEffect = 'move';
    }
    event.preventDefault();
  }, []);

  const onDrop = useCallback((event: any) => {
    var jsonData = event.dataTransfer.getData('application/json');
    var eJsonRow = document.createElement('div');
    eJsonRow.classList.add('json-row');
    eJsonRow.innerText = jsonData;
    var eJsonDisplay = document.querySelector('#eJsonDisplay')!;
    eJsonDisplay.appendChild(eJsonRow);
    event.preventDefault();
  }, []);

  return (
    <div style={containerStyle}>
      <div className="outer">
        <div className="grid-col">
          <div style={gridStyle} className="ag-theme-alpine">
            <AgGridReact
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              rowClassRules={rowClassRules}
              rowDragManaged={true}
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
