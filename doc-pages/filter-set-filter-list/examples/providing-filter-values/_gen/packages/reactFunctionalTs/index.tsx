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
  FirstDataRenderedEvent,
  Grid,
  GridOptions,
  IFiltersToolPanel,
  SideBarDef,
} from 'ag-grid-community';

var listOfDays = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

var daysValuesNotProvidedFilterParams = {
  comparator: (a: string, b: string) => {
    var aIndex = listOfDays.indexOf(a);
    var bIndex = listOfDays.indexOf(b);
    if (aIndex === bIndex) return 0;
    return aIndex > bIndex ? 1 : -1;
  },
};

var daysValuesProvidedFilterParams = {
  values: listOfDays,
  suppressSorting: true, // use provided order
};

function getRowData() {
  var weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  var rows = [];
  for (var i = 0; i < 200; i++) {
    var index = Math.floor(Math.random() * 5);
    rows.push({ days: weekdays[index] });
  }
  return rows;
}

const GridExample = () => {
  const gridRef = useRef<AgGridReact>(null);
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState<any[]>(getRowData());
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    {
      headerName: 'Days (Values Not Provided)',
      field: 'days',
      filter: 'agSetColumnFilter',
      filterParams: daysValuesNotProvidedFilterParams,
    },
    {
      headerName: 'Days (Values Provided)',
      field: 'days',
      filter: 'agSetColumnFilter',
      filterParams: daysValuesProvidedFilterParams,
    },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      filter: true,
      resizable: true,
    };
  }, []);

  const onFirstDataRendered = useCallback((params: FirstDataRenderedEvent) => {
    ((gridRef.current!.api.getToolPanelInstance(
      'filters'
    ) as any) as IFiltersToolPanel).expandFilters();
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          sideBar={'filters'}
          onFirstDataRendered={onFirstDataRendered}
        ></AgGridReact>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
