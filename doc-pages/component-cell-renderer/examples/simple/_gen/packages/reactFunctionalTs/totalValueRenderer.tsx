import React from 'react';
import { ICellRendererParams } from 'ag-grid-community';

export default (props: ICellRendererParams) => {
  const cellValue = props.valueFormatted ? props.valueFormatted : props.value;

  const buttonClicked = () => {
    alert(`${cellValue} medals won!`);
  };

  return (
    <span>
      <span>{cellValue}</span>&nbsp;
      <button onClick={() => buttonClicked()}>Push For Total</button>
    </span>
  );
};
