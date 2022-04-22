import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import React, { useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import {
  ColDef,
  ColGroupDef,
  FirstDataRenderedEvent,
  GridOptions,
  GridReadyEvent,
} from 'ag-grid-community';

const topOptions: GridOptions = {
  alignedGrids: [],
  defaultColDef: {
    editable: true,
    sortable: true,
    resizable: true,
    filter: true,
    flex: 1,
    minWidth: 100,
  },
};
const bottomOptions: GridOptions = {
  alignedGrids: [],
  defaultColDef: {
    editable: true,
    sortable: true,
    resizable: true,
    filter: true,
    flex: 1,
    minWidth: 100,
  },
};

topOptions.alignedGrids!.push(bottomOptions);
bottomOptions.alignedGrids!.push(topOptions);

const GridExample = () => {
  const topGridRef = useRef<AgGridReact>(null);

  const [columnDefs, setColumnDefs] = useState<(ColDef | ColGroupDef)[]>([
    { field: 'athlete' },
    { field: 'age' },
    { field: 'country' },
    { field: 'year' },
    { field: 'date' },
    { field: 'sport' },
    {
      headerName: 'Medals',
      children: [
        {
          columnGroupShow: 'closed',
          field: 'total',
          valueGetter: 'data.gold + data.silver + data.bronze',
          width: 200,
        },
        { columnGroupShow: 'open', field: 'gold', width: 100 },
        { columnGroupShow: 'open', field: 'silver', width: 100 },
        { columnGroupShow: 'open', field: 'bronze', width: 100 },
      ],
    },
  ]);

  const [rowData, setRowData] = useState([]);

  function onGridReady(params: GridReadyEvent) {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => setRowData(data));
  }

  function onFirstDataRendered(params: FirstDataRenderedEvent) {
    params.api.sizeColumnsToFit();
  }

  function onCbAthlete(event: any) {
    // we only need to update one grid, as the other is a slave
    topGridRef.current!.columnApi.setColumnVisible(
      'athlete',
      event.target.checked
    );
  }

  function onCbAge(event: any) {
    // we only need to update one grid, as the other is a slave
    topGridRef.current!.columnApi.setColumnVisible('age', event.target.checked);
  }

  function onCbCountry(event: any) {
    // we only need to update one grid, as the other is a slave
    topGridRef.current!.columnApi.setColumnVisible(
      'country',
      event.target.checked
    );
  }

  return (
    <div className="container">
      <div className="header">
        <label>
          <input
            type="checkbox"
            defaultChecked={true}
            onChange={(event) => onCbAthlete(event)}
          />
          Athlete
        </label>
        <label>
          <input
            type="checkbox"
            defaultChecked={true}
            onChange={(event) => onCbAge(event)}
          />
          Age
        </label>
        <label>
          <input
            type="checkbox"
            defaultChecked={true}
            onChange={(event) => onCbCountry(event)}
          />
          Country
        </label>
      </div>

      <div className="grid ag-theme-alpine">
        <AgGridReact
          ref={topGridRef}
          rowData={rowData}
          gridOptions={topOptions}
          columnDefs={columnDefs}
          onGridReady={(params) => onGridReady(params)}
          onFirstDataRendered={(params) => onFirstDataRendered(params)}
        />
      </div>

      <div className="grid ag-theme-alpine">
        <AgGridReact
          rowData={rowData}
          gridOptions={bottomOptions}
          columnDefs={columnDefs}
        />
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
