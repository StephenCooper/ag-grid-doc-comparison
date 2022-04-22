'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import {
  ColDef,
  ColGroupDef,
  Grid,
  GridOptions,
  GridReadyEvent,
  IFiltersToolPanel,
  SideBarDef,
} from 'ag-grid-community';

var filterParams = {
  comparator: function (filterLocalDateAtMidnight: Date, cellValue: string) {
    var dateAsString = cellValue;
    if (dateAsString == null) return -1;
    var dateParts = dateAsString.split('/');
    var cellDate = new Date(
      Number(dateParts[2]),
      Number(dateParts[1]) - 1,
      Number(dateParts[0])
    );
    if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
      return 0;
    }
    if (cellDate < filterLocalDateAtMidnight) {
      return -1;
    }
    if (cellDate > filterLocalDateAtMidnight) {
      return 1;
    }
  },
  // browserDatePicker: true,
};

var savedFilterModel: any = null;

const GridExample = () => {
  const gridRef = useRef<AgGridReact>(null);
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState<any[]>();
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { field: 'athlete', filter: 'agTextColumnFilter' },
    { field: 'age', filter: 'agNumberColumnFilter', maxWidth: 100 },
    { field: 'country' },
    { field: 'year', maxWidth: 100 },
    {
      field: 'date',
      filter: 'agDateColumnFilter',
      filterParams: filterParams,
    },
    { field: 'sport' },
    { field: 'gold', filter: 'agNumberColumnFilter' },
    { field: 'silver', filter: 'agNumberColumnFilter' },
    { field: 'bronze', filter: 'agNumberColumnFilter' },
    { field: 'total', filter: 'agNumberColumnFilter' },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      minWidth: 150,
      filter: true,
      sortable: true,
    };
  }, []);

  const onGridReady = useCallback((params: GridReadyEvent) => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data: any[]) => setRowData(data));

    ((params.api.getToolPanelInstance(
      'filters'
    ) as any) as IFiltersToolPanel).expandFilters();
  }, []);

  const clearFilters = useCallback(() => {
    gridRef.current!.api.setFilterModel(null);
  }, []);

  const saveFilterModel = useCallback(() => {
    savedFilterModel = gridRef.current!.api.getFilterModel();
    var keys = Object.keys(savedFilterModel);
    var savedFilters: string = keys.length > 0 ? keys.join(', ') : '(none)';
    (document.querySelector('#savedFilters') as any).innerHTML = savedFilters;
  }, []);

  const restoreFilterModel = useCallback(() => {
    gridRef.current!.api.setFilterModel(savedFilterModel);
  }, []);

  const restoreFromHardCoded = useCallback(() => {
    var hardcodedFilter = {
      country: {
        type: 'set',
        values: ['Ireland', 'United States'],
      },
      age: { type: 'lessThan', filter: '30' },
      athlete: { type: 'startsWith', filter: 'Mich' },
      date: { type: 'lessThan', dateFrom: '2010-01-01' },
    };
    gridRef.current!.api.setFilterModel(hardcodedFilter);
  }, []);

  const destroyFilter = useCallback(() => {
    gridRef.current!.api.destroyFilter('athlete');
  }, []);

  return (
    <div style={containerStyle}>
      <div className="example-wrapper">
        <div>
          <div className="button-group">
            <button onClick={saveFilterModel}>Save Filter Model</button>
            <button onClick={restoreFilterModel}>
              Restore Saved Filter Model
            </button>
            <button
              onClick={restoreFromHardCoded}
              title="Name = 'Mich%', Country = ['Ireland', 'United States'], Age < 30, Date < 01/01/2010"
            >
              Set Custom Filter Model
            </button>
            <button onClick={clearFilters}>Reset Filters</button>
            <button onClick={destroyFilter}>Destroy Filter</button>
          </div>
        </div>
        <div>
          <div className="button-group">
            Saved Filters: <span id="savedFilters">(none)</span>
          </div>
        </div>

        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            sideBar={'filters'}
            onGridReady={onGridReady}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
