"use strict";

import React, { useCallback, useMemo, useRef, useState } from "react";
import { render } from "react-dom";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { GridChartsModule } from "@ag-grid-enterprise/charts";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  MenuModule,
  GridChartsModule,
]);

var chartId;

const GridExample = () => {
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState(getData());
  const [columnDefs, setColumnDefs] = useState([
    { field: "country", chartDataType: "category" },
    { field: "sugar", chartDataType: "series" },
    { field: "fat", chartDataType: "series" },
    { field: "weight", chartDataType: "series" },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      editable: true,
      sortable: true,
      flex: 1,
      minWidth: 100,
      filter: true,
      resizable: true,
    };
  }, []);
  const popupParent = useMemo(() => {
    return document.body;
  }, []);
  const chartThemeOverrides = useMemo(() => {
    return {
      cartesian: {
        axes: {
          category: {
            label: {
              rotation: 335,
            },
          },
        },
      },
    };
  }, []);

  const onFirstDataRendered = useCallback((params) => {
    const createRangeChartParams = {
      cellRange: {
        columns: ["country", "sugar", "fat", "weight"],
      },
      chartType: "groupedColumn",
      chartContainer: document.querySelector("#myChart"),
    };
    gridRef.current.api.createRangeChart(createRangeChartParams);
  }, []);

  const onChartCreated = useCallback((event) => {
    chartId = event.chartId;
  }, []);

  const downloadChartImage = useCallback(
    (fileFormat) => {
      if (!chartId) {
        return;
      }
      const params = { fileFormat, chartId };
      const imageDataURL = gridRef.current.api.getChartImageDataURL(params);
      if (imageDataURL) {
        const a = document.createElement("a");
        a.href = imageDataURL;
        a.download = "image";
        a.style.display = "none";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    },
    [chartId]
  );

  const openChartImage = useCallback(
    (fileFormat) => {
      if (!chartId) {
        return;
      }
      const params = { fileFormat, chartId };
      const imageDataURL = gridRef.current.api.getChartImageDataURL(params);
      if (imageDataURL) {
        const image = new Image();
        image.src = imageDataURL;
        const w = window.open("");
        w.document.write(image.outerHTML);
        w.document.close();
      }
    },
    [chartId, Image]
  );

  return (
    <div style={containerStyle}>
      <div className="wrapper">
        <div id="buttons">
          <button onClick={() => downloadChartImage("image/png")}>
            Download chart PNG
          </button>
          <button onClick={() => downloadChartImage("image/jpeg")}>
            Download chart JPEG
          </button>
          <button onClick={() => openChartImage("image/png")}>Open PNG</button>
          <button onClick={() => openChartImage("image/jpeg")}>
            Open JPEG
          </button>
        </div>

        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            enableRangeSelection={true}
            popupParent={popupParent}
            enableCharts={true}
            chartThemeOverrides={chartThemeOverrides}
            onFirstDataRendered={onFirstDataRendered}
            onChartCreated={onChartCreated}
          ></AgGridReact>
        </div>
        <div id="myChart" className="ag-theme-alpine my-chart"></div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector("#root"));
