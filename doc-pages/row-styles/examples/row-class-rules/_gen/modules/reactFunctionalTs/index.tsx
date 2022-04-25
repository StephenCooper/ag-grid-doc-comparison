'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import {
  ColDef,
  ColGroupDef,
  Grid,
  GridOptions,
  RowClassRules,
} from '@ag-grid-community/core';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

function randomInt() {
  return Math.floor(Math.random() * 10);
}

const GridExample = () => {
  const gridRef = useRef<AgGridReact>(null);
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState<any[]>(getData());
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { headerName: 'Employee', field: 'employee' },
    { headerName: 'Number Sick Days', field: 'sickDays', editable: true },
  ]);
  const rowClassRules = useMemo<RowClassRules>(() => {
    return {
      // row style function
      'sick-days-warning': (params) => {
        var numSickDays = params.data.sickDays;
        return numSickDays > 5 && numSickDays <= 7;
      },
      // row style expression
      'sick-days-breach': 'data.sickDays >= 8',
    };
  }, []);

  const setDataValue = useCallback(() => {
    gridRef.current!.api.forEachNode(function (rowNode) {
      rowNode.setDataValue('sickDays', randomInt());
    });
  }, []);

  const setData = useCallback(() => {
    gridRef.current!.api.forEachNode(function (rowNode) {
      var newData = {
        employee: rowNode.data.employee,
        sickDays: randomInt(),
      };
      rowNode.setData(newData);
    });
  }, []);

  const applyTransaction = useCallback(() => {
    var itemsToUpdate: any[] = [];
    gridRef.current!.api.forEachNode(function (rowNode) {
      var data = rowNode.data;
      data.sickDays = randomInt();
      itemsToUpdate.push(data);
    });
    gridRef.current!.api.applyTransaction({ update: itemsToUpdate });
  }, []);

  return (
    <div style={containerStyle}>
      <div className="example-wrapper">
        <div style={{ marginBottom: '5px' }}>
          <button onClick={setDataValue}>rowNode.setDataValue</button>
          <button onClick={setData}>rowNode.setData</button>
          <button onClick={applyTransaction}>api.applyTransaction</button>
        </div>

        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            rowClassRules={rowClassRules}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
