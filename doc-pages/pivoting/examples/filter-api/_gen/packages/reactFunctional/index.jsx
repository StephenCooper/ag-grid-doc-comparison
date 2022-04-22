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
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    { field: 'country', rowGroup: true, enableRowGroup: true },
    { field: 'year', pivot: true, enablePivot: true },
    { field: 'date' },
    { field: 'sport' },
    { field: 'gold', aggFunc: 'sum' },
    { field: 'silver', aggFunc: 'sum' },
    { field: 'bronze', aggFunc: 'sum' },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 150,
      filter: true,
      floatingFilter: true,
      sortable: true,
      resizable: true,
    };
  }, []);
  const processSecondaryColDef = useCallback((colDef) => {
    colDef.filter = 'agNumberColumnFilter';
    colDef.floatingFilter = true;
  }, []);

  const onGridReady = useCallback((params) => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => setRowData(data));
  }, []);

  const clearFilter = useCallback(() => {
    gridRef.current.api.setFilterModel(null);
  }, []);

  const filterUsRussiaAustralia = useCallback(() => {
    gridRef.current.api.setFilterModel({
      ...gridRef.current.api.getFilterModel(),
      country: {
        type: 'set',
        values: ['United States', 'Russia', 'Australia'],
      },
    });
  }, []);

  const filterCanadaNorwayChinaZimbabweNetherlands = useCallback(() => {
    gridRef.current.api.setFilterModel({
      ...gridRef.current.api.getFilterModel(),
      country: {
        type: 'set',
        values: ['Canada', 'Norway', 'China', 'Zimbabwe', 'Netherlands'],
      },
    });
  }, []);

  const filter20042006 = useCallback(() => {
    gridRef.current.api.setFilterModel({
      ...gridRef.current.api.getFilterModel(),
      year: {
        type: 'set',
        values: ['2004', '2006'],
      },
    });
  }, []);

  const filter200820102012 = useCallback(() => {
    gridRef.current.api.setFilterModel({
      ...gridRef.current.api.getFilterModel(),
      year: {
        type: 'set',
        values: ['2008', '2010', '2012'],
      },
    });
  }, []);

  const filterClearYears = useCallback(() => {
    gridRef.current.api.setFilterModel({
      ...gridRef.current.api.getFilterModel(),
      year: undefined,
    });
  }, []);

  const filterSwimmingHockey = useCallback(() => {
    gridRef.current.api.setFilterModel({
      ...gridRef.current.api.getFilterModel(),
      sport: {
        type: 'set',
        values: ['Swimming', 'Hockey'],
      },
    });
  }, []);

  const filterHockeyIceHockey = useCallback(() => {
    gridRef.current.api.setFilterModel({
      ...gridRef.current.api.getFilterModel(),
      sport: {
        type: 'set',
        values: ['Hockey', 'Ice Hockey'],
      },
    });
  }, []);

  const filterEveryYearGold = useCallback(() => {
    const goldPivotCols = gridRef.current.columnApi
      .getSecondaryColumns()
      .filter((col) => col.getColDef().pivotValueColumn.getColId() === 'gold');
    if (goldPivotCols) {
      const newOpts = goldPivotCols.reduce((acc, col) => {
        acc[col.getId()] = {
          filter: 0,
          filterType: 'number',
          type: 'greaterThan',
        };
        return acc;
      }, gridRef.current.api.getFilterModel() || {});
      gridRef.current.api.setFilterModel(newOpts);
    }
  }, []);

  const filter2000Silver = useCallback(() => {
    const targetCol = gridRef.current.columnApi.getSecondaryPivotColumn(
      ['2000'],
      'silver'
    );
    if (targetCol) {
      gridRef.current.api.setFilterModel({
        ...gridRef.current.api.getFilterModel(),
        [targetCol.getId()]: {
          filterType: 'number',
          type: 'notBlank',
        },
      });
    }
  }, []);

  return (
    <div style={containerStyle}>
      <div
        className="test-container"
        style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      >
        <div className="test-header">
          <div style={{ marginBottom: '10px' }}>
            <button onClick={clearFilter}>Clear Filters</button>
          </div>
          <div>Primary Column Filters</div>
          <div style={{ marginBottom: '10px' }}>
            <div style={{ marginBottom: '5px' }}>
              <button onClick={filterUsRussiaAustralia}>
                Country: US, Russia &amp; Australia
              </button>
              <button onClick={filterCanadaNorwayChinaZimbabweNetherlands}>
                Country: Canada, Norway, China, Zimbabwe &amp; Netherlands
              </button>
            </div>
            <div style={{ marginBottom: '5px' }}>
              <button onClick={filter20042006}>Year: 2004 &amp; 2006</button>
              <button onClick={filter200820102012}>
                Year: 2008, 2010 &amp; 2012
              </button>
              <button onClick={filterClearYears}>Year: Clear filter</button>
            </div>
            <div>
              <button onClick={filterSwimmingHockey}>
                Sport: Swimming &amp; Hockey
              </button>
              <button onClick={filterHockeyIceHockey}>
                Sport: Hockey &amp; Ice Hockey
              </button>
            </div>
          </div>
          <div>Secondary Column Filters</div>
          <div style={{ marginBottom: '10px' }}>
            <div style={{ marginBottom: '5px' }}>
              <button onClick={filterEveryYearGold}>All gold: &gt; 0</button>
              <button onClick={filter2000Silver}>
                Year 2000, Silver: Not blank
              </button>
            </div>
          </div>
        </div>

        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            processSecondaryColDef={processSecondaryColDef}
            pivotMode={true}
            sideBar={'filters'}
            onGridReady={onGridReady}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
