
'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';





const GridExample = () => {
    const gridRef = useRef();
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({height: '100%', width: '100%'}), []);
    const [rowData, setRowData] = useState();
    const [columnDefs, setColumnDefs] = useState([
    {
        groupId: 'athleteGroupId',
        headerName: 'Athlete',
        children: [
            {
                headerName: 'Name',
                field: 'athlete',
                minWidth: 200,
                filter: 'agTextColumnFilter',
            },
            {
                groupId: 'competitionGroupId',
                headerName: 'Competition',
                children: [{ field: 'year' }, { field: 'date', minWidth: 180 }],
            },
        ],
    },
    {
        groupId: 'medalsGroupId',
        headerName: 'Medals',
        children: [
            { field: 'gold' },
            { field: 'silver' },
            { field: 'bronze' },
            { field: 'total' },
        ],
    },
]);
    const defaultColDef = useMemo(() => { return {
    flex: 1,
    minWidth: 100,
    // allow every column to be aggregated
    enableValue: true,
    // allow every column to be grouped
    enableRowGroup: true,
    // allow every column to be pivoted
    enablePivot: true,
    filter: true,
    sortable: true,
    resizable: true,
} }, []);


            const onGridReady = useCallback((params) => {
                
                fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
                .then(resp => resp.json())
                .then(data => setRowData(data));

    var columnToolPanel = (params.api.getToolPanelInstance('columns'));
    columnToolPanel.collapseColumnGroups();

            }, []);

const expandAllGroups = useCallback(() => {
    var columnToolPanel = (gridRef.current.api.getToolPanelInstance('columns'));
    columnToolPanel.expandColumnGroups();
}, [])

   const collapseAllGroups = useCallback(() => {
    var columnToolPanel = (gridRef.current.api.getToolPanelInstance('columns'));
    columnToolPanel.collapseColumnGroups();
}, [])

   const expandAthleteAndCompetitionGroups = useCallback(() => {
    var columnToolPanel = (gridRef.current.api.getToolPanelInstance('columns'));
    columnToolPanel.expandColumnGroups(['athleteGroupId', 'competitionGroupId']);
}, [])

   const collapseCompetitionGroups = useCallback(() => {
    var columnToolPanel = (gridRef.current.api.getToolPanelInstance('columns'));
    columnToolPanel.collapseColumnGroups(['competitionGroupId']);
}, [])


    return  (
            <div style={containerStyle}>
                <div className="example-wrapper">
    <div>
        <span className="button-group">
            <button onClick={expandAllGroups}>Expand All</button>
            <button onClick={collapseAllGroups}>Collapse All</button>
            <button onClick={expandAthleteAndCompetitionGroups}>Expand Athlete &amp; Competition</button>
            <button onClick={collapseCompetitionGroups}>Collapse Competition</button>
        </span>
    </div>
    
        <div  style={gridStyle} className="ag-theme-alpine">             
            <AgGridReact
                ref={gridRef}
                rowData={rowData}
columnDefs={columnDefs}
defaultColDef={defaultColDef}
sideBar={'columns'}
onGridReady={onGridReady}
            >
            </AgGridReact>
        </div>
</div>

            </div>
        );

}

render(<GridExample></GridExample>, document.querySelector('#root'))
