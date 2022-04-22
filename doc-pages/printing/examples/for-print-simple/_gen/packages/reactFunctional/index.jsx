'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const GridExample = () => {
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '200px', width: '400px' }), []);
  const [rowData, setRowData] = useState(getData());
  const [columnDefs, setColumnDefs] = useState([
    { headerName: 'ID', valueGetter: 'node.rowIndex + 1', width: 70 },
    { field: 'model', width: 150 },
    { field: 'color' },
    { field: 'price', valueFormatter: '"$" + value.toLocaleString()' },
    { field: 'year' },
    { field: 'country' },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      width: 100,
    };
  }, []);

  const onBtPrinterFriendly = useCallback(() => {
    var eGridDiv = document.querySelector('#myGrid');
    eGridDiv.style.width = '';
    eGridDiv.style.height = '';
    gridRef.current.api.setDomLayout('print');
  }, []);

  const onBtNormal = useCallback(() => {
    var eGridDiv = document.querySelector('#myGrid');
    eGridDiv.style.width = '400px';
    eGridDiv.style.height = '200px';
    // Same as setting to 'normal' as it is the default
    gridRef.current.api.setDomLayout();
  }, []);

  return (
    <div style={containerStyle}>
      <button onClick={onBtPrinterFriendly}>Printer Friendly Layout</button>
      <button onClick={onBtNormal}>Normal Layout</button>

      <h3>Latin Text</h3>

      <p>
        Lorem ipsum dolor sit amet, ne cum repudiare abhorreant. Atqui molestiae
        neglegentur ad nam, mei amet eros ea, populo deleniti scaevola et pri.
        Pro no ubique explicari, his reque nulla consequuntur in. His soleat
        doctus constituam te, sed at alterum repudiandae. Suas ludus electram te
        ius.
      </p>

      <div id="myGrid" style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
        ></AgGridReact>
      </div>

      <h3>More Latin Text</h3>

      <p>
        Lorem ipsum dolor sit amet, ne cum repudiare abhorreant. Atqui molestiae
        neglegentur ad nam, mei amet eros ea, populo deleniti scaevola et pri.
        Pro no ubique explicari, his reque nulla consequuntur in. His soleat
        doctus constituam te, sed at alterum repudiandae. Suas ludus electram te
        ius.
      </p>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
