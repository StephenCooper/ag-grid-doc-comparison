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
  ExcelExportParams,
  ExcelHeaderFooterConfig,
  ExcelHeaderFooterContent,
  Grid,
  GridOptions,
  GridReadyEvent,
} from 'ag-grid-community';

const getValues = (type: string) => {
  const value = (document.querySelector(
    '#' + type + 'Value'
  ) as HTMLInputElement).value;
  if (value == null) {
    return;
  }
  const obj: ExcelHeaderFooterContent = {
    value: value,
  };
  obj.position = (document.querySelector(
    '#' + type + 'Position'
  ) as HTMLInputElement).value as 'Left' | 'Center' | 'Right';
  const fontName = (document.querySelector(
    '#' + type + 'FontName'
  ) as HTMLInputElement).value;
  const fontSize = (document.querySelector(
    '#' + type + 'FontSize'
  ) as HTMLInputElement).value;
  const fontWeight = (document.querySelector(
    '#' + type + 'FontWeight'
  ) as HTMLInputElement).value;
  const underline = (document.querySelector(
    '#' + type + 'Underline'
  ) as HTMLInputElement).checked;
  if (
    fontName !== 'Calibri' ||
    fontSize != '11' ||
    fontWeight !== 'Regular' ||
    underline
  ) {
    obj.font = {};
    if (fontName !== 'Calibri') {
      obj.font.fontName = fontName;
    }
    if (fontSize != '11') {
      obj.font.size = Number.parseInt(fontSize);
    }
    if (fontWeight !== 'Regular') {
      if (fontWeight.indexOf('Bold') !== -1) {
        obj.font.bold = true;
      }
      if (fontWeight.indexOf('Italic') !== -1) {
        obj.font.italic = true;
      }
    }
    if (underline) {
      obj.font.underline = 'Single';
    }
  }
  return obj;
};

const getParams: () => ExcelExportParams | undefined = () => {
  const header = getValues('header');
  const footer = getValues('footer');
  if (!header && !footer) {
    return undefined;
  }
  const obj: ExcelExportParams = {
    headerFooterConfig: {
      all: {},
    },
  };
  if (header) {
    obj.headerFooterConfig!.all!.header = [header];
  }
  if (footer) {
    obj.headerFooterConfig!.all!.footer = [footer];
  }
  return obj;
};

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
    gridRef.current!.api.exportDataAsExcel(getParams());
  }, []);

  return (
    <div style={containerStyle}>
      <div className="container">
        <div className="columns">
          <div className="column">
            <span>Header</span>
            <label>
              Position
              <select id="headerPosition">
                <option>Left</option>
                <option>Center</option>
                <option>Right</option>
              </select>
            </label>
            <label>
              Font
              <select id="headerFontName">
                <option>Calibri</option>
                <option>Arial</option>
              </select>
              <select id="headerFontSize">
                <option>11</option>
                <option>12</option>
                <option>13</option>
                <option>14</option>
                <option>16</option>
                <option>20</option>
              </select>
              <select id="headerFontWeight">
                <option>Regular</option>
                <option>Bold</option>
                <option>Italic</option>
                <option>Bold Italic</option>
              </select>
              <label className="option underline" htmlFor="headerUnderline">
                <input type="checkbox" id="headerUnderline" />
                <button style={{ textDecoration: 'underline' }}>U</button>
              </label>
            </label>
            <label className="option" htmlFor="headerValue">
              Value
              <input id="headerValue" />
            </label>
          </div>
          <div className="column">
            <span>Footer</span>
            <label>
              Position
              <select id="footerPosition">
                <option>Left</option>
                <option>Center</option>
                <option>Right</option>
              </select>
            </label>
            <label>
              Font
              <select id="footerFontName">
                <option>Calibri</option>
                <option>Arial</option>
              </select>
              <select id="footerFontSize">
                <option>11</option>
                <option>12</option>
                <option>13</option>
                <option>14</option>
                <option>16</option>
                <option>20</option>
              </select>
              <select id="footerFontWeight">
                <option>Regular</option>
                <option>Bold</option>
                <option>Italic</option>
                <option>Bold Italic</option>
              </select>
              <label className="option underline" htmlFor="footerUnderline">
                <input type="checkbox" id="footerUnderline" />
                <button style={{ textDecoration: 'underline' }}>U</button>
              </label>
            </label>
            <label className="option" htmlFor="footerValue">
              Value
              <input id="footerValue" />
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
