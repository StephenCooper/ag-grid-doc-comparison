import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import React, { useMemo, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
'use strict';



const SquareRenderer = props => {
    const valueSquared = (value) => {
        return value * value;
    };

    return <span>{valueSquared(props.value)}</span>;
};

const CubeRenderer = props => {
    const valueCubed = (value) => {
        return value * value * value;
    };

    return <span>{valueCubed(props.value)}</span>;
};

const ParamsRenderer = props => {
    return <span>Field: {props.colDef.field}, Value: {props.value}</span>;
};

const CurrencyRenderer = props => {
    const value = useMemo(() => props.value, [props.value]);

    const formatValueToCurrency = (currency, value) => {
        return `${currency}${value.toFixed(2)}`;
    };

    return <span>{formatValueToCurrency('EUR', value)}</span>;
};

const ChildMessageRenderer = props => {
    const invokeParentMethod = () => {
        props.context.methodFromParent(`Row: ${props.node.rowIndex}, Col: ${props.colDef.field}`);
    };

    return <span><button style={{ height: 20, lineHeight: 0.5 }} onClick={invokeParentMethod} className="btn btn-info">Invoke Parent</button></span>;
};

const createRowData = () => {
    const rowData = [];
    for (let i = 0; i < 15; i++) {
        rowData.push({
            row: "Row " + i,
            value: i,
            currency: i + Number(Math.random().toFixed(2))
        });
    }
    return rowData;
};

const GridExample = () => {
    const [rowData, setRowData] = useState(createRowData());
    const columnDefs = useMemo(() => [
        {
            headerName: "Row",
            field: "row",
            width: 150
        },
        {
            headerName: "Square",
            field: "value",
            cellRenderer: SquareRenderer,
            editable: true,
            colId: "square",
            width: 150
        },
        {
            headerName: "Cube",
            field: "value",
            cellRenderer: CubeRenderer,
            colId: "cube",
            width: 150
        },
        {
            headerName: "Row Params",
            field: "row",
            cellRenderer: ParamsRenderer,
            colId: "params",
            width: 150
        },
        {
            headerName: "Currency (Pipe)",
            field: "currency",
            cellRenderer: CurrencyRenderer,
            colId: "currency",
            width: 120
        },
        {
            headerName: "Child/Parent",
            field: "value",
            cellRenderer: ChildMessageRenderer,
            colId: "params",
            editable: false,
            minWidth: 150
        }
    ]);

    const refreshEvenRowsCurrencyData = () => {
        const newRowData = [];
        for (const data of rowData) {
            let newData = { ...data };
            if (newData.value % 2 === 0) {
                newData.currency = newData.value + Number(Math.random().toFixed(2));
            }
            newRowData.push(newData);
        }
        setRowData(newRowData);
    };

    const methodFromParent = cell => {
        alert('Parent Component Method from ' + cell + '!');
    };

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <div className="example-wrapper">
                <button onClick={() => refreshEvenRowsCurrencyData()} style={{ "marginBottom": "10px" }}
                    className="btn btn-primary">
                    Refresh Even Row Currency Data
                </button>
                <div
                    id="myGrid"
                    style={{
                        height: '100%',
                        width: '100%'
                    }}
                    className="ag-theme-alpine">
                    <AgGridReact
                        rowData={rowData}
                        columnDefs={columnDefs}
                        getRowId={params => params.data.row}
                        context={{
                            methodFromParent
                        }}
                        defaultColDef={{
                            editable: true,
                            sortable: true,
                            flex: 1,
                            minWidth: 100,
                            filter: true,
                            resizable: true
                        }}>
                    </AgGridReact>
                </div>
            </div>
        </div>
    );
};

render(
    <GridExample />,
    document.querySelector('#root')
);
