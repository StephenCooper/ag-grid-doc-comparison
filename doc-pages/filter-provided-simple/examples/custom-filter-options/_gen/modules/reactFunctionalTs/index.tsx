'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import {
  ColDef,
  ColGroupDef,
  GetLocaleTextParams,
  Grid,
  GridOptions,
  GridReadyEvent,
  IFilterOptionDef,
} from '@ag-grid-community/core';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

declare var window: any;

var filterParams = {
  filterOptions: [
    'empty',
    {
      displayKey: 'evenNumbers',
      displayName: 'Even Numbers',
      predicate: (_, cellValue) => cellValue != null && cellValue % 2 === 0,
      numberOfInputs: 0,
    },
    {
      displayKey: 'oddNumbers',
      displayName: 'Odd Numbers',
      predicate: (_, cellValue) => cellValue != null && cellValue % 2 !== 0,
      numberOfInputs: 0,
    },
    {
      displayKey: 'blanks',
      displayName: 'Blanks',
      predicate: (_, cellValue) => cellValue == null,
      numberOfInputs: 0,
    },
    {
      displayKey: 'age5YearsAgo',
      displayName: 'Age 5 Years Ago',
      predicate: ([fv1]: any[], cellValue) =>
        cellValue == null || cellValue - 5 === fv1,
      numberOfInputs: 1,
    },
    {
      displayKey: 'betweenExclusive',
      displayName: 'Between (Exclusive)',
      predicate: ([fv1, fv2], cellValue) =>
        cellValue == null || (fv1 < cellValue && fv2 > cellValue),
      numberOfInputs: 2,
    },
  ] as IFilterOptionDef[],
  suppressAndOrCondition: true,
};

var containsFilterParams = {
  filterOptions: [
    'contains',
    {
      displayKey: 'startsA',
      displayName: 'Starts With "A"',
      predicate: (_, cellValue) =>
        cellValue != null && cellValue.indexOf('A') === 0,
      numberOfInputs: 0,
    },
    {
      displayKey: 'startsN',
      displayName: 'Starts With "N"',
      predicate: (_, cellValue) =>
        cellValue != null && cellValue.indexOf('N') === 0,
      numberOfInputs: 0,
    },
    {
      displayKey: 'regexp',
      displayName: 'Regular Expression',
      predicate: ([fv1]: any[], cellValue) =>
        cellValue == null || new RegExp(fv1, 'gi').test(cellValue),
      numberOfInputs: 1,
    },
    {
      displayKey: 'betweenExclusive',
      displayName: 'Between (Exclusive)',
      predicate: ([fv1, fv2]: any[], cellValue) =>
        cellValue == null || (fv1 < cellValue && fv2 > cellValue),
      numberOfInputs: 2,
    },
  ] as IFilterOptionDef[],
};

var equalsFilterParams = {
  filterOptions: [
    'equals',
    {
      displayKey: 'equalsWithNulls',
      displayName: 'Equals (with Nulls)',
      predicate: ([filterValue]: any[], cellValue) => {
        if (cellValue == null) return true;
        var parts = cellValue.split('/');
        var cellDate = new Date(
          Number(parts[2]),
          Number(parts[1] - 1),
          Number(parts[0])
        );
        return cellDate.getTime() === filterValue.getTime();
      },
    },
    {
      displayKey: 'leapYear',
      displayName: 'Leap Year',
      predicate: (_, cellValue) => {
        if (cellValue == null) return true;
        const year = Number(cellValue.split('/')[2]);
        return year % 4 === 0 && year % 200 !== 0;
      },
      numberOfInputs: 0,
    },
    {
      displayKey: 'betweenExclusive',
      displayName: 'Between (Exclusive)',
      predicate: ([fv1, fv2]: any[], cellValue) => {
        if (cellValue == null) return true;
        var parts = cellValue.split('/');
        var cellDate = new Date(
          Number(parts[2]),
          Number(parts[1] - 1),
          Number(parts[0])
        );
        return (
          cellDate.getTime() > fv1.getTime() &&
          cellDate.getTime() < fv2.getTime()
        );
      },
      numberOfInputs: 2,
    },
  ] as IFilterOptionDef[],
  comparator: (filterLocalDateAtMidnight: Date, cellValue: string) => {
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
  browserDatePicker: true,
};

var notEqualsFilterParams = {
  filterOptions: [
    'notEqual',
    {
      displayKey: 'notEqualNoNulls',
      displayName: 'Not Equals without Nulls',
      predicate: ([filterValue], cellValue) => {
        if (cellValue == null) return false;
        return cellValue.toLowerCase() !== filterValue.toLowerCase();
      },
    },
  ] as IFilterOptionDef[],
};

const GridExample = () => {
  const gridRef = useRef<AgGridReact>(null);
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState<any[]>();
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    {
      field: 'athlete',
      filterParams: containsFilterParams,
    },
    {
      field: 'age',
      minWidth: 120,
      filter: 'agNumberColumnFilter',
      filterParams: filterParams,
    },
    {
      field: 'date',
      filter: 'agDateColumnFilter',
      filterParams: equalsFilterParams,
    },
    {
      field: 'country',
      filterParams: notEqualsFilterParams,
    },
    { field: 'gold', filter: 'agNumberColumnFilter' },
    { field: 'silver', filter: 'agNumberColumnFilter' },
    { field: 'bronze', filter: 'agNumberColumnFilter' },
    { field: 'total', filter: false },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      minWidth: 150,
      sortable: true,
      filter: true,
    };
  }, []);
  const getLocaleText = useCallback((params: GetLocaleTextParams) => {
    if (params.key === 'notEqualNoNulls') {
      return '* Not Equals (No Nulls) *';
    }
    return params.defaultValue;
  }, []);

  const onGridReady = useCallback((params: GridReadyEvent) => {
    fetch('https://www.ag-grid.com/example-assets/small-olympic-winners.json')
      .then((resp) => resp.json())
      .then((data: any[]) => {
        setRowData(data);
      });
  }, []);

  const printState = useCallback(() => {
    var filterState = gridRef.current!.api.getFilterModel();
    console.log('filterState: ', filterState);
  }, []);

  const saveState = useCallback(() => {
    window.filterState = gridRef.current!.api.getFilterModel();
    console.log('filter state saved');
  }, []);

  const restoreState = useCallback(() => {
    gridRef.current!.api.setFilterModel(window.filterState);
    console.log('filter state restored');
  }, []);

  const resetState = useCallback(() => {
    gridRef.current!.api.setFilterModel(null);
    console.log('column state reset');
  }, []);

  return (
    <div style={containerStyle}>
      <div className="example-wrapper">
        <div style={{ marginBottom: '5px' }}>
          <button onClick={printState}>Print State</button>
          <button onClick={saveState}>Save State</button>
          <button onClick={restoreState}>Restore State</button>
          <button onClick={resetState}>Reset State</button>
        </div>

        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            getLocaleText={getLocaleText}
            onGridReady={onGridReady}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
