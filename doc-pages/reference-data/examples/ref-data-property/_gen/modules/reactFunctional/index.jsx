'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine-dark.css';
import ColourCellRenderer from './colourCellRenderer.jsx';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { RichSelectModule } from '@ag-grid-enterprise/rich-select';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  RichSelectModule,
  SetFilterModule,
  MenuModule,
  ColumnsToolPanelModule,
]);

const carMappings = {
  tyt: 'Toyota',
  frd: 'Ford',
  prs: 'Porsche',
  nss: 'Nissan',
};

const colourMappings = {
  cb: 'Cadet Blue',
  bw: 'Burlywood',
  fg: 'Forest Green',
};

const extractValues = (mappings) => {
  return Object.keys(mappings);
};

const carBrands = extractValues(carMappings);

const colours = extractValues(colourMappings);

const currencyFormatter = (params) => {
  const value = Math.floor(params.value);
  if (isNaN(value)) {
    return '';
  }
  return '£' + value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

const numberValueSetter = (params) => {
  if (isNaN(parseFloat(params.newValue)) || !isFinite(params.newValue)) {
    return false; // don't set invalid numbers!
  }
  params.data.price = params.newValue;
  return true;
};

const removeSpaces = (str) => {
  return str ? str.replace(/\s/g, '') : str;
};

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState(getData());
  const [columnDefs, setColumnDefs] = useState([
    {
      field: 'make',
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: carBrands,
      },
      filter: 'agSetColumnFilter',
      refData: carMappings,
    },
    {
      field: 'exteriorColour',
      minWidth: 150,
      cellEditor: 'agRichSelectCellEditor',
      cellEditorPopup: true,
      cellEditorParams: {
        values: colours,
        cellRenderer: ColourCellRenderer,
      },
      filter: 'agSetColumnFilter',
      filterParams: {
        cellRenderer: ColourCellRenderer,
      },
      refData: colourMappings,
      cellRenderer: ColourCellRenderer,
    },
    {
      field: 'interiorColour',
      minWidth: 150,
      filter: 'agSetColumnFilter',
      filterParams: {
        cellRenderer: ColourCellRenderer,
      },
      refData: colourMappings,
      cellRenderer: ColourCellRenderer,
    },
    {
      headerName: 'Retail Price',
      field: 'price',
      minWidth: 140,
      colId: 'retailPrice',
      valueGetter: function (params) {
        return params.data.price;
      },
      valueFormatter: currencyFormatter,
      valueSetter: numberValueSetter,
    },
    {
      headerName: 'Retail Price (incl Taxes)',
      minWidth: 205,
      editable: false,
      valueGetter: function (params) {
        // example of chaining value getters
        return params.getValue('retailPrice') * 1.2;
      },
      valueFormatter: currencyFormatter,
    },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      filter: true,
      editable: true,
    };
  }, []);

  const onCellValueChanged = useCallback((params) => {
    // notice that the data always contains the keys rather than values after editing
    console.log('onCellValueChanged: ', params);
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine-dark">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onCellValueChanged={onCellValueChanged}
        ></AgGridReact>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
