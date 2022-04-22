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
  Column,
  ColumnMovedEvent,
  ColumnPinnedEvent,
  ColumnPivotChangedEvent,
  ColumnResizedEvent,
  ColumnRowGroupChangedEvent,
  ColumnValueChangedEvent,
  ColumnVisibleEvent,
  Grid,
  GridOptions,
  GridReadyEvent,
  SortChangedEvent,
} from 'ag-grid-community';

const GridExample = () => {
  const gridRef = useRef<AgGridReact>(null);
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState<any[]>();
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { field: 'athlete' },
    { field: 'age' },
    { field: 'country' },
    { field: 'sport' },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      sortable: true,
      resizable: true,
      width: 150,
      enableRowGroup: true,
      enablePivot: true,
      enableValue: true,
    };
  }, []);

  const onGridReady = useCallback((params: GridReadyEvent) => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data: any[]) => setRowData(data));
  }, []);

  const onSortChanged = useCallback((e: SortChangedEvent) => {
    console.log('Event Sort Changed', e);
  }, []);

  const onColumnResized = useCallback((e: ColumnResizedEvent) => {
    console.log('Event Column Resized', e);
  }, []);

  const onColumnVisible = useCallback((e: ColumnVisibleEvent) => {
    console.log('Event Column Visible', e);
  }, []);

  const onColumnPivotChanged = useCallback((e: ColumnPivotChangedEvent) => {
    console.log('Event Pivot Changed', e);
  }, []);

  const onColumnRowGroupChanged = useCallback(
    (e: ColumnRowGroupChangedEvent) => {
      console.log('Event Row Group Changed', e);
    },
    []
  );

  const onColumnValueChanged = useCallback((e: ColumnValueChangedEvent) => {
    console.log('Event Value Changed', e);
  }, []);

  const onColumnMoved = useCallback((e: ColumnMovedEvent) => {
    console.log('Event Column Moved', e);
  }, []);

  const onColumnPinned = useCallback((e: ColumnPinnedEvent) => {
    console.log('Event Column Pinned', e);
  }, []);

  const onBtSortOn = useCallback(() => {
    gridRef.current!.columnApi.applyColumnState({
      state: [
        { colId: 'age', sort: 'desc' },
        { colId: 'athlete', sort: 'asc' },
      ],
    });
  }, []);

  const onBtSortOff = useCallback(() => {
    gridRef.current!.columnApi.applyColumnState({
      defaultState: { sort: null },
    });
  }, []);

  const onBtWidthNarrow = useCallback(() => {
    gridRef.current!.columnApi.applyColumnState({
      state: [
        { colId: 'age', width: 100 },
        { colId: 'athlete', width: 100 },
      ],
    });
  }, []);

  const onBtWidthNormal = useCallback(() => {
    gridRef.current!.columnApi.applyColumnState({
      state: [
        { colId: 'age', width: 200 },
        { colId: 'athlete', width: 200 },
      ],
    });
  }, []);

  const onBtHide = useCallback(() => {
    gridRef.current!.columnApi.applyColumnState({
      state: [
        { colId: 'age', hide: true },
        { colId: 'athlete', hide: true },
      ],
    });
  }, []);

  const onBtShow = useCallback(() => {
    gridRef.current!.columnApi.applyColumnState({
      defaultState: { hide: false },
    });
  }, []);

  const onBtPivotOn = useCallback(() => {
    gridRef.current!.columnApi.setPivotMode(true);
    gridRef.current!.columnApi.applyColumnState({
      state: [{ colId: 'country', pivot: true }],
    });
  }, []);

  const onBtPivotOff = useCallback(() => {
    gridRef.current!.columnApi.setPivotMode(false);
    gridRef.current!.columnApi.applyColumnState({
      defaultState: { pivot: false },
    });
  }, []);

  const onBtRowGroupOn = useCallback(() => {
    gridRef.current!.columnApi.applyColumnState({
      state: [{ colId: 'sport', rowGroup: true }],
    });
  }, []);

  const onBtRowGroupOff = useCallback(() => {
    gridRef.current!.columnApi.applyColumnState({
      defaultState: { rowGroup: false },
    });
  }, []);

  const onBtAggFuncOn = useCallback(() => {
    gridRef.current!.columnApi.applyColumnState({
      state: [
        { colId: 'gold', aggFunc: 'sum' },
        { colId: 'silver', aggFunc: 'sum' },
        { colId: 'bronze', aggFunc: 'sum' },
      ],
    });
  }, []);

  const onBtAggFuncOff = useCallback(() => {
    gridRef.current!.columnApi.applyColumnState({
      defaultState: { aggFunc: null },
    });
  }, []);

  const onBtNormalOrder = useCallback(() => {
    gridRef.current!.columnApi.applyColumnState({
      state: [
        { colId: 'athlete' },
        { colId: 'age' },
        { colId: 'country' },
        { colId: 'sport' },
        { colId: 'gold' },
        { colId: 'silver' },
        { colId: 'bronze' },
      ],
      applyOrder: true,
    });
  }, []);

  const onBtReverseOrder = useCallback(() => {
    gridRef.current!.columnApi.applyColumnState({
      state: [
        { colId: 'athlete' },
        { colId: 'age' },
        { colId: 'country' },
        { colId: 'sport' },
        { colId: 'bronze' },
        { colId: 'silver' },
        { colId: 'gold' },
      ],
      applyOrder: true,
    });
  }, []);

  const onBtPinnedOn = useCallback(() => {
    gridRef.current!.columnApi.applyColumnState({
      state: [
        { colId: 'athlete', pinned: 'left' },
        { colId: 'age', pinned: 'right' },
      ],
    });
  }, []);

  const onBtPinnedOff = useCallback(() => {
    gridRef.current!.columnApi.applyColumnState({
      defaultState: { pinned: null },
    });
  }, []);

  return (
    <div style={containerStyle}>
      <div className="test-container">
        <div className="test-header">
          <div className="test-button-row">
            <div className="test-button-group">
              <button onClick={onBtSortOn}>Sort On</button>
              <br />
              <button onClick={onBtSortOff}>Sort Off</button>
            </div>
            <div className="test-button-group">
              <button onClick={onBtWidthNarrow}>Width Narrow</button>
              <br />
              <button onClick={onBtWidthNormal}>Width Normal</button>
            </div>
            <div className="test-button-group">
              <button onClick={onBtHide}>Hide Cols</button>
              <br />
              <button onClick={onBtShow}>Show Cols</button>
            </div>
            <div className="test-button-group">
              <button onClick={onBtReverseOrder}>Reverse Medal Order</button>
              <br />
              <button onClick={onBtNormalOrder}>Normal Medal Order</button>
            </div>
            <div className="test-button-group">
              <button onClick={onBtRowGroupOn}>Row Group On</button>
              <br />
              <button onClick={onBtRowGroupOff}>Row Group Off</button>
            </div>
            <div className="test-button-group">
              <button onClick={onBtAggFuncOn}>Agg Func On</button>
              <br />
              <button onClick={onBtAggFuncOff}>Agg Func Off</button>
            </div>
            <div className="test-button-group">
              <button onClick={onBtPivotOn}>Pivot On</button>
              <br />
              <button onClick={onBtPivotOff}>Pivot Off</button>
            </div>
            <div className="test-button-group">
              <button onClick={onBtPinnedOn}>Pinned On</button>
              <br />
              <button onClick={onBtPinnedOff}>Pinned Off</button>
            </div>
          </div>
        </div>

        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            onGridReady={onGridReady}
            onSortChanged={onSortChanged}
            onColumnResized={onColumnResized}
            onColumnVisible={onColumnVisible}
            onColumnPivotChanged={onColumnPivotChanged}
            onColumnRowGroupChanged={onColumnRowGroupChanged}
            onColumnValueChanged={onColumnValueChanged}
            onColumnMoved={onColumnMoved}
            onColumnPinned={onColumnPinned}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
