import React from 'react';
import { ICellRendererParams } from 'ag-grid-community';

export default (props: ICellRendererParams) => (
  <span
    style={{
      borderLeft: '10px solid ' + props.value,
      paddingLeft: '5px',
    }}
  >
    {props.value}
  </span>
);
