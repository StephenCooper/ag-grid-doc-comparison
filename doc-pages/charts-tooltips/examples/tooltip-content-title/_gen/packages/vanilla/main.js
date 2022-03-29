function renderer(params) {
  return {
    title: params.xValue,
    content: params.yValue.toFixed(0),
  };
}

const options = {
  container: document.getElementById("myChart"),
  data: [
    {
      month: "Dec",
      sweaters: 50,
      hats: 40,
    },
    {
      month: "Jan",
      sweaters: 70,
      hats: 50,
    },
    {
      month: "Feb",
      sweaters: 60,
      hats: 30,
    },
  ],
  series: [
    {
      type: "column",
      xKey: "month",
      tooltip: { renderer: renderer },
      yKey: "sweaters",
      yName: "Sweaters made",
      stacked: true,
    },
    {
      type: "column",
      xKey: "month",
      tooltip: { renderer: renderer },
      yKey: "hats",
      yName: "Hats made",
      stacked: true,
    },
  ],
};

var chart = agCharts.AgChart.create(options);
