import React from 'react';
import { ICellRendererParams } from 'ag-grid-community';

export default (props: ICellRendererParams) => (
  <React.Fragment>
    <img
      alt={props.data.country}
      src={
        props.context.base64flags[
          props.context.countryCodes[props.data.country]
        ]
      }
    />
  </React.Fragment>
);
