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
} from 'ag-grid-community';

function getNumber(id: string) {
  var el = document.querySelector(id) as any;
  if (!el || isNaN(el.value)) {
    return 0;
  }
  return parseFloat(el.value);
}

function getValue(id: string) {
  return (document.querySelector(id) as any).value;
}

function getSheetConfig() {
  return {
    pageSetup: {
      orientation: getValue('#pageOrientation'),
      pageSize: getValue('#pageSize'),
    },
    margins: {
      top: getNumber('#top'),
      right: getNumber('#right'),
      bottom: getNumber('#bottom'),
      left: getNumber('#left'),
      header: getNumber('#header'),
      footer: getNumber('#footer'),
    },
  };
}

const GridExample = () => {
  const gridRef = useRef<AgGridReact>(null);
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState<any[]>();
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { field: 'athlete', minWidth: 200 },
    { field: 'country', minWidth: 200 },
    { field: 'sport', minWidth: 150 },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      sortable: true,
      filter: true,
      resizable: true,
      minWidth: 100,
      flex: 1,
    };
  }, []);
  const popupParent = useMemo<HTMLElement>(() => {
    return document.body;
  }, []);

  const onGridReady = useCallback((params: GridReadyEvent) => {
    fetch('https://www.ag-grid.com/example-assets/small-olympic-winners.json')
      .then((resp) => resp.json())
      .then((data: any[]) =>
        setRowData(data.filter((rec: any) => rec.country != null))
      );
  }, []);

  const onBtExport = useCallback(() => {
    const { pageSetup, margins } = getSheetConfig();
    gridRef.current!.api.exportDataAsExcel({ pageSetup, margins });
  }, []);

  return (
    <div style={containerStyle}>
      <div className="container">
        <div className="columns">
          <div className="column">
            <label className="option" htmlFor="pageOrientation">
              Page Orientation =
              <select id="pageOrientation">
                <option value="Portrait">Portrait</option>
                <option value="Landscape">Landscape</option>
              </select>
            </label>
            <label className="option" htmlFor="pageSize">
              Page Size =
              <select id="pageSize">
                <option value="Letter">Letter</option>
                <option value="Letter Small">Letter Small</option>
                <option value="Tabloid">Tabloid</option>
                <option value="Ledger">Ledger</option>
                <option value="Legal">Legal</option>
                <option value="Statement">Statement</option>
                <option value="Executive">Executive</option>
                <option value="A3">A3</option>
                <option value="A4">A4</option>
                <option value="A4 Small">A4 Small</option>
                <option value="A5">A5</option>
                <option value="A6">A6</option>
                <option value="B4">B4</option>
                <option value="B5">B5</option>
                <option value="Folio">Folio</option>
                <option value="Envelope">Envelope</option>
                <option value="Envelope DL">Envelope DL</option>
                <option value="Envelope C5">Envelope C5</option>
                <option value="Envelope B5">Envelope B5</option>
                <option value="Envelope C3">Envelope C3</option>
                <option value="Envelope C4">Envelope C4</option>
                <option value="Envelope C6">Envelope C6</option>
                <option value="Envelope Monarch">Envelope Monarch</option>
                <option value="Japanese Postcard">Japanese Postcard</option>
                <option value="Japanese Double Postcard">
                  Japanese Double Postcard
                </option>
              </select>
            </label>
          </div>
          <div className="column margin-container">
            <div>Margins</div>
            <label htmlFor="top">
              Top = <input type="number" id="top" value="0.75" />
            </label>
            <label htmlFor="right">
              Right = <input type="number" id="right" value="0.7" />
            </label>
            <label htmlFor="bottom">
              Bottom = <input type="number" id="bottom" value="0.75" />
            </label>
            <label htmlFor="left">
              Left = <input type="number" id="left" value="0.7" />
            </label>
            <label htmlFor="header">
              Header = <input type="number" id="header" value="0.3" />
            </label>
            <label htmlFor="footer">
              Footer = <input type="number" id="footer" value="0.3" />
            </label>
          </div>
        </div>
        <div>
          <button
            onClick={onBtExport}
            style={{ margin: '5px 0px', fontWeight: 'bold' }}
          >
            Export to Excel
          </button>
        </div>
        <div className="grid-wrapper">
          <div style={gridStyle} className="ag-theme-alpine">
            <AgGridReact
              ref={gridRef}
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              popupParent={popupParent}
              onGridReady={onGridReady}
            ></AgGridReact>
          </div>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
