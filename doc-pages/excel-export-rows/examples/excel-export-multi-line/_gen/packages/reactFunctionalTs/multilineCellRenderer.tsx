import React from 'react';
import { ICellRendererParams } from 'ag-grid-community';

export default (props: ICellRendererParams) => (
  <div
    dangerouslySetInnerHTML={{ __html: props.value.replace('\n', '<br/>') }}
  ></div>
);
