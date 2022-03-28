
'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import MoodEditor from './moodEditor.jsx';
import NumericCellEditor from './numericCellEditor.jsx';

const cellEditorSelector = (params) => {
    if (params.data.type === 'age') {
        return {
            component: NumericCellEditor,
        };
    }
    if (params.data.type === 'gender') {
        return {
            component: 'agRichSelectCellEditor',
            params: {
                values: ['Male', 'Female']
            },
            popup: true
        };
    }
    if (params.data.type === 'mood') {
        return {
            component: MoodEditor,
            popup: true,
            popupPosition: 'under'
        };
    }
    return undefined;
}



const GridExample = () => {
    
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({height: '100%', width: '100%'}), []);
    const [rowData, setRowData] = useState(getData());
    const [columnDefs, setColumnDefs] = useState([
    { field: 'type' },
    {
        field: 'value',
        editable: true,
        cellEditorSelector: cellEditorSelector
    }
]);
    const defaultColDef = useMemo(() => { return {
    flex: 1,
} }, []);



const onRowEditingStarted = useCallback((event) => {
    console.log('never called - not doing row editing');
}, [])

   const onRowEditingStopped = useCallback((event) => {
    console.log('never called - not doing row editing');
}, [])

   const onCellEditingStarted = useCallback((event) => {
    console.log('cellEditingStarted');
}, [])

   const onCellEditingStopped = useCallback((event) => {
    console.log('cellEditingStopped');
}, [])


    return  (
            <div style={containerStyle}>
                
        <div  style={gridStyle} className="ag-theme-alpine">             
            <AgGridReact
                
                rowData={rowData}
columnDefs={columnDefs}
defaultColDef={defaultColDef}
onRowEditingStarted={onRowEditingStarted}
onRowEditingStopped={onRowEditingStopped}
onCellEditingStarted={onCellEditingStarted}
onCellEditingStopped={onCellEditingStopped}
            >
            </AgGridReact>
        </div>
            </div>
        );

}

render(<GridExample></GridExample>, document.querySelector('#root'))
