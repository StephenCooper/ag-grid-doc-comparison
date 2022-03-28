
function tooltipRenderer(params) {
  const { yValue, xValue } = params;
  return {
    content: `${xValue}: ${yValue}%`
  };
};

const WOMEN = {
  type: "column",
  xKey: "year",
  yKey: "women",
  yName: "Women",
  grouped: true,
  strokeWidth: 0,
  tooltip: {
    renderer: tooltipRenderer
  },
};

const MEN = {
  type: "column",
  xKey: "year",
  yKey: "men",
  yName: "Men",
  grouped: true,
  strokeWidth: 0,
  tooltip: {
    renderer: tooltipRenderer
  },
};

const PORTIONS = {
  type: "line",
  xKey: "year",
  yKey: "portions",
  yName: "Portions",
  strokeWidth: 3,
  marker: {
      enabled: false,
  },
  tooltip: {
    renderer: tooltipRenderer
  },
};

const COLUMN_AND_LINE = [
  { ...WOMEN, type: 'column' },
  { ...MEN, type: 'column' },
  { ...PORTIONS, type: 'line' },
];

const AREA_AND_COLUMN = [
  { ...PORTIONS, type: 'area' },
  { ...WOMEN, type: 'column' },
  { ...MEN, type: 'column' },
];

const options = {
  container: document.querySelector("#myChart") ,
  autoSize: true,
  data: getData(),
  theme: {
    palette: {
      fills: ["#7cecb3", "#7cb5ec", "#ecb37c", "#ec7cb5", "#7c7dec"],
      strokes: ["#7cecb3", "#7cb5ec", "#ecb37c", "#ec7cb5", "#7c7dec"]
    },
  },
  title: {
    text: "Fruit & Vegetable Consumption",
    fontSize: 15,
  },
  series: COLUMN_AND_LINE,
  axes: [
    {
      type: "category",
      position: "bottom",
      gridStyle: [{
        strokeWidth: 0
      }],
    },
    {
      // primary y axis
      type: "number",
      position: "left",
      keys: ["women", "men", "children", "adults"],
      title: {
          enabled: true,
          text: "Adults Who Eat 5 A Day (%)",
      },
    },
    {
      // secondary y axis
      type: "number",
      position: "right",
      keys: ["portions"],
      title: {
          enabled: true,
          text: "Portions Consumed (Per Day)",
      },
    }
  ] ,
  legend: {
    position: "bottom",
    item: {
      marker: {
        strokeWidth: 0,
      },
    },
  },
};

var chart = agCharts.AgChart.create(options);

function columnLine() {
  console.log("Column & Line", COLUMN_AND_LINE);
  options.series = COLUMN_AND_LINE;
  agCharts.AgChart.update(chart, options);
}

function areaColumn() {
  console.log("Column & Area", AREA_AND_COLUMN);
  options.series = AREA_AND_COLUMN;
  agCharts.AgChart.update(chart, options);
}