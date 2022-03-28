
'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import DragSourceRenderer from './dragSourceRenderer.jsx';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule])





const GridExample = () => {
    
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({height: '100%', width: '100%'}), []);
    const [rowData, setRowData] = useState(getData());
    const rowClassRules = useMemo(() => { return {
    'red-row': 'data.color == "Red"',
    'green-row': 'data.color == "Green"',
    'blue-row': 'data.color == "Blue"',
} }, []);
    const defaultColDef = useMemo(() => { return {
    width: 80,
    sortable: true,
    filter: true,
    resizable: true,
} }, []);
    const [columnDefs, setColumnDefs] = useState([
    { cellRenderer: DragSourceRenderer, minWidth: 100 },
    { field: 'id' },
    { field: 'color' },
    { field: 'value1' },
    { field: 'value2' },
]);



const onDragOver = useCallback((event) => {
    var types = event.dataTransfer.types;
    var dragSupported = types.length;
    if (dragSupported) {
        event.dataTransfer.dropEffect = 'move';
    }
    event.preventDefault();
}, [])

   const onDrop = useCallback((event) => {
    event.preventDefault();
    var textData = event.dataTransfer.getData('text/plain');
    var eJsonRow = document.createElement('div');
    eJsonRow.classList.add('json-row');
    eJsonRow.innerText = textData;
    var eJsonDisplay = document.querySelector('#eJsonDisplay');
    eJsonDisplay.appendChild(eJsonRow);
}, [])


    return  (
            <div style={containerStyle}>
                <div className="outer">
    <div className="grid-col">
        
        <div  style={gridStyle} className="ag-theme-alpine">             
            <AgGridReact
                
                rowData={rowData}
rowClassRules={rowClassRules}
defaultColDef={defaultColDef}
rowDragManaged={true}
columnDefs={columnDefs}
animateRows={true}
            >
            </AgGridReact>
        </div>
    </div>

    <div className="drop-col" onDragOver={() => onDragOver(event)} onDrop={() => onDrop(event)}>
        <span id="eDropTarget" className="drop-target">
            ==&gt; Drop to here
        </span>
        <div id="eJsonDisplay" className="json-display">
        </div>
    </div>

</div>

            </div>
        );

}

render(<GridExample></GridExample>, document.querySelector('#root'))
