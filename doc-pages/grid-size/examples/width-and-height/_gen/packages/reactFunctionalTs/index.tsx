'use strict';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import React, { useEffect, useMemo, useState } from 'react';
import { render } from 'react-dom';

const GridExample = () => {
  const [gridApi, setGridApi] = useState<GridApi | null>(null);
  const [rowData, setRowData] = useState(null);
  const columnDefs = useMemo<ColDef[]>(
    () => [
      { field: 'athlete', width: 150 },
      { field: 'age', width: 90 },
      { field: 'country', width: 150 },
      { field: 'year', width: 90 },
      { field: 'date', width: 150 },
      { field: 'sport', width: 150 },
      { field: 'gold', width: 100 },
      { field: 'silver', width: 100 },
      { field: 'bronze', width: 100 },
      { field: 'total', width: 100 },
    ],
    []
  );
  const [style, setStyle] = useState({
    height: '100%',
    width: '100%',
  });

  useEffect(() => {
    if (gridApi) {
      gridApi!.sizeColumnsToFit();
    }
  }, [rowData]);

  const onGridReady = (params: GridReadyEvent) => {
    setGridApi(params.api);

    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => {
        setRowData(data);
      });
  };

  const fillLarge = () => {
    setWidthAndHeight('100%', '100%');
  };

  const fillMedium = () => {
    setWidthAndHeight('60%', '60%');
  };

  const fillExact = () => {
    setWidthAndHeight('400px', '400px');
  };

  const setWidthAndHeight = (width: string, height: string) => {
    setStyle({
      width,
      height,
    });
  };

  return (
    <div style={{ height: '100%' }}>
      <div style={{ marginBottom: '5px' }}>
        <button onClick={() => fillLarge()}>Fill 100%</button>
        <button onClick={() => fillMedium()}>Fill 60%</button>
        <button onClick={() => fillExact()}>Exactly 400 x 400 pixels</button>
      </div>
      <div style={{ height: 'calc(100% - 25px)' }} className="ag-theme-alpine">
        <div style={style}>
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            onGridReady={onGridReady}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
