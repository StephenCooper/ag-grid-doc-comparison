import React from 'react';
import { ICellRendererParams } from 'ag-grid-community';

export default (props: ICellRendererParams) => (
  <span
    style={{
      backgroundColor: props.node.group ? 'coral' : 'lightgreen',
      padding: 2,
    }}
  >
    {props.value}
  </span>
);
