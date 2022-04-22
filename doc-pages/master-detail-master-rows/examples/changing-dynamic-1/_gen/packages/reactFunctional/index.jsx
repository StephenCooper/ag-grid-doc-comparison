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
  const isRowMaster = useCallback((dataItem) => {
    return dataItem ? dataItem.callRecords.length > 0 : false;
  }, []);
  const [columnDefs, setColumnDefs] = useState([
    // group cell renderer needed for expand / collapse icons
    { field: 'name', cellRenderer: 'agGroupCellRenderer' },
    { field: 'account' },
    { field: 'calls' },
    { field: 'minutes', valueFormatter: "x.toLocaleString() + 'm'" },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
    };
  }, []);
  const getRowId = useCallback((params) => {
    return params.data.account;
  }, []);
  const detailCellRendererParams = useMemo(() => {
    return {
      detailGridOptions: {
        columnDefs: [
          { field: 'callId' },
          { field: 'direction' },
          { field: 'number', minWidth: 150 },
          { field: 'duration', valueFormatter: "x.toLocaleString() + 's'" },
          { field: 'switchCode', minWidth: 150 },
        ],
        defaultColDef: {
          flex: 1,
        },
      },
      getDetailRowData: (params) => {
        params.successCallback(params.data.callRecords);
      },
    };
  }, []);

  const onGridReady = useCallback((params) => {
    fetch(
      'https://www.ag-grid.com/example-assets/master-detail-dynamic-data.json'
    )
      .then((resp) => resp.json())
      .then((data) => {
        setRowData(data);
      });
  }, []);

  const onFirstDataRendered = useCallback((params) => {
    // arbitrarily expand a row for presentational purposes
    setTimeout(function () {
      gridRef.current.api.getDisplayedRowAtIndex(1).setExpanded(true);
    }, 0);
  }, []);

  const onBtClearMilaCalls = useCallback(() => {
    var milaSmithRowNode = gridRef.current.api.getRowNode('177001');
    var milaSmithData = milaSmithRowNode.data;
    milaSmithData.callRecords = [];
    gridRef.current.api.applyTransaction({ update: [milaSmithData] });
  }, []);

  const onBtSetMilaCalls = useCallback(() => {
    var milaSmithRowNode = gridRef.current.api.getRowNode('177001');
    var milaSmithData = milaSmithRowNode.data;
    milaSmithData.callRecords = [
      {
        name: 'susan',
        callId: 579,
        duration: 23,
        switchCode: 'SW5',
        direction: 'Out',
        number: '(02) 47485405',
      },
      {
        name: 'susan',
        callId: 580,
        duration: 52,
        switchCode: 'SW3',
        direction: 'In',
        number: '(02) 32367069',
      },
    ];
    gridRef.current.api.applyTransaction({ update: [milaSmithData] });
  }, []);

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ paddingBottom: '4px' }}>
          <button onClick={onBtClearMilaCalls}>Clear Mila Calls</button>
          <button onClick={onBtSetMilaCalls}>Set Mila Calls</button>
        </div>

        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            masterDetail={true}
            isRowMaster={isRowMaster}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            getRowId={getRowId}
            detailCellRendererParams={detailCellRendererParams}
            onGridReady={onGridReady}
            onFirstDataRendered={onFirstDataRendered}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
