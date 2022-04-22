'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

var defaultFilterParams = { readOnly: true };

const GridExample = () => {
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    { field: 'athlete', filter: true, filterParams: defaultFilterParams },
    {
      field: 'age',
      filter: 'agNumberColumnFilter',
      filterParams: defaultFilterParams,
    },
    {
      field: 'country',
      filter: 'agSetColumnFilter',
      filterParams: defaultFilterParams,
    },
    {
      field: 'year',
      maxWidth: 120,
      filter: 'agNumberColumnFilter',
      filterParams: defaultFilterParams,
    },
    {
      field: 'date',
      minWidth: 215,
      filter: 'agDateColumnFilter',
      filterParams: {
        readOnly: true,
        comparator: dateComparator,
      },
      suppressMenu: true,
    },
    {
      field: 'sport',
      suppressMenu: true,
      filter: 'agMultiColumnFilter',
      filterParams: {
        filters: [
          { filter: 'agTextColumnFilter', filterParams: { readOnly: true } },
          { filter: 'agSetColumnFilter', filterParams: { readOnly: true } },
        ],
        readOnly: true,
      },
    },
    { field: 'gold', filterParams: defaultFilterParams },
    { field: 'silver', filterParams: defaultFilterParams },
    { field: 'bronze', filterParams: defaultFilterParams },
    { field: 'total', filter: false },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 150,
      filter: true,
      sortable: true,
      floatingFilter: true,
    };
  }, []);

  const onGridReady = useCallback((params) => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => setRowData(data));
  }, []);

  const irelandAndUk = useCallback(() => {
    var countryFilterComponent = gridRef.current.api.getFilterInstance(
      'country'
    );
    countryFilterComponent.setModel({ values: ['Ireland', 'Great Britain'] });
    gridRef.current.api.onFilterChanged();
  }, []);

  const clearCountryFilter = useCallback(() => {
    var countryFilterComponent = gridRef.current.api.getFilterInstance(
      'country'
    );
    countryFilterComponent.setModel(null);
    gridRef.current.api.onFilterChanged();
  }, []);

  const destroyCountryFilter = useCallback(() => {
    gridRef.current.api.destroyFilter('country');
  }, []);

  const endingStan = useCallback(() => {
    var countryFilterComponent = gridRef.current.api.getFilterInstance(
      'country'
    );
    var countriesEndingWithStan = countryFilterComponent
      .getValues()
      .filter(function (value) {
        return value.indexOf('stan') === value.length - 4;
      });
    countryFilterComponent.setModel({ values: countriesEndingWithStan });
    gridRef.current.api.onFilterChanged();
  }, []);

  const printCountryModel = useCallback(() => {
    var countryFilterComponent = gridRef.current.api.getFilterInstance(
      'country'
    );
    var model = countryFilterComponent.getModel();
    if (model) {
      console.log('Country model is: ' + JSON.stringify(model));
    } else {
      console.log('Country model filter is not active');
    }
  }, []);

  const sportStartsWithS = useCallback(() => {
    var sportsFilterComponent = gridRef.current.api.getFilterInstance('sport');
    sportsFilterComponent.setModel({
      filterModels: [
        {
          type: 'startsWith',
          filter: 's',
        },
      ],
    });
    gridRef.current.api.onFilterChanged();
  }, []);

  const sportEndsWithG = useCallback(() => {
    var sportsFilterComponent = gridRef.current.api.getFilterInstance('sport');
    sportsFilterComponent.setModel({
      filterModels: [
        {
          type: 'endsWith',
          filter: 'g',
        },
      ],
    });
    gridRef.current.api.onFilterChanged();
  }, []);

  const sportsCombined = useCallback(() => {
    var sportsFilterComponent = gridRef.current.api.getFilterInstance('sport');
    sportsFilterComponent.setModel({
      filterModels: [
        {
          condition2: {
            type: 'endsWith',
            filter: 'g',
          },
          operator: 'AND',
          condition1: {
            type: 'startsWith',
            filter: 's',
          },
        },
      ],
    });
    gridRef.current.api.onFilterChanged();
  }, []);

  const ageBelow25 = useCallback(() => {
    var ageFilterComponent = gridRef.current.api.getFilterInstance('age');
    ageFilterComponent.setModel({
      type: 'lessThan',
      filter: 25,
      filterTo: null,
    });
    gridRef.current.api.onFilterChanged();
  }, []);

  const ageAbove30 = useCallback(() => {
    var ageFilterComponent = gridRef.current.api.getFilterInstance('age');
    ageFilterComponent.setModel({
      type: 'greaterThan',
      filter: 30,
      filterTo: null,
    });
    gridRef.current.api.onFilterChanged();
  }, []);

  const ageBelow25OrAbove30 = useCallback(() => {
    var ageFilterComponent = gridRef.current.api.getFilterInstance('age');
    ageFilterComponent.setModel({
      condition1: {
        type: 'greaterThan',
        filter: 30,
        filterTo: null,
      },
      operator: 'OR',
      condition2: {
        type: 'lessThan',
        filter: 25,
        filterTo: null,
      },
    });
    gridRef.current.api.onFilterChanged();
  }, []);

  const ageBetween25And30 = useCallback(() => {
    var ageFilterComponent = gridRef.current.api.getFilterInstance('age');
    ageFilterComponent.setModel({
      type: 'inRange',
      filter: 25,
      filterTo: 30,
    });
    gridRef.current.api.onFilterChanged();
  }, []);

  const clearAgeFilter = useCallback(() => {
    var ageFilterComponent = gridRef.current.api.getFilterInstance('age');
    ageFilterComponent.setModel(null);
    gridRef.current.api.onFilterChanged();
  }, []);

  const after2010 = useCallback(() => {
    var dateFilterComponent = gridRef.current.api.getFilterInstance('date');
    dateFilterComponent.setModel({
      type: 'greaterThan',
      dateFrom: '2010-01-01',
      dateTo: null,
    });
    gridRef.current.api.onFilterChanged();
  }, []);

  const before2012 = useCallback(() => {
    var dateFilterComponent = gridRef.current.api.getFilterInstance('date');
    dateFilterComponent.setModel({
      type: 'lessThan',
      dateFrom: '2012-01-01',
      dateTo: null,
    });
    gridRef.current.api.onFilterChanged();
  }, []);

  const dateCombined = useCallback(() => {
    var dateFilterComponent = gridRef.current.api.getFilterInstance('date');
    dateFilterComponent.setModel({
      condition1: {
        type: 'lessThan',
        dateFrom: '2012-01-01',
        dateTo: null,
      },
      operator: 'OR',
      condition2: {
        type: 'greaterThan',
        dateFrom: '2010-01-01',
        dateTo: null,
      },
    });
    gridRef.current.api.onFilterChanged();
  }, []);

  const clearDateFilter = useCallback(() => {
    var dateFilterComponent = gridRef.current.api.getFilterInstance('date');
    dateFilterComponent.setModel(null);
    gridRef.current.api.onFilterChanged();
  }, []);

  const clearSportFilter = useCallback(() => {
    var dateFilterComponent = gridRef.current.api.getFilterInstance('sport');
    dateFilterComponent.setModel(null);
    gridRef.current.api.onFilterChanged();
  }, []);

  return (
    <div style={containerStyle}>
      <div className="example-wrapper">
        <div className="example-header">
          <span className="button-group">
            <button onClick={irelandAndUk}>Ireland &amp; UK</button>
            <button onClick={endingStan}>Countries Ending 'stan'</button>
            <button onClick={printCountryModel}>Print Country</button>
            <button onClick={clearCountryFilter}>Clear Country</button>
            <button onClick={destroyCountryFilter}>Destroy Country</button>
          </span>
          <span className="button-group">
            <button onClick={ageBelow25}>Age Below 25</button>
            <button onClick={ageAbove30}>Age Above 30</button>
            <button onClick={ageBelow25OrAbove30}>
              Age Below 25 or Above 30
            </button>
            <button onClick={ageBetween25And30}>Age Between 25 and 30</button>
            <button onClick={clearAgeFilter}>Clear Age Filter</button>
          </span>
          <span className="button-group">
            <button onClick={after2010}>Date after 01/01/2010</button>
            <button onClick={before2012}>Date before 01/01/2012</button>
            <button onClick={dateCombined}>Date combined</button>
            <button onClick={clearDateFilter}>Clear Date Filter</button>
          </span>
          <span className="button-group">
            <button onClick={sportStartsWithS}>Sport starts with S</button>
            <button onClick={sportEndsWithG}>Sport ends with G</button>
            <button onClick={sportsCombined}>
              Sport starts with S and ends with G
            </button>
            <button onClick={clearSportFilter}>Clear Sport Filter</button>
          </span>
        </div>

        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            onGridReady={onGridReady}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
