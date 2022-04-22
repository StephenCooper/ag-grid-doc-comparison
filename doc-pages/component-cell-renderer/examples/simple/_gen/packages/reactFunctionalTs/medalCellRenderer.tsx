import React from 'react';
import { ICellRendererParams } from 'ag-grid-community';
export default (props: ICellRendererParams) => (
  <span>{new Array(parseInt(props.value, 10)).fill('#').join('')}</span>
);
