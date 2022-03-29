const options = {
  container: document.getElementById("myChart"),
  title: {
    text: "Browser Wars",
  },
  subtitle: {
    text: "2009-2019",
  },
  data: getData(),
  series: [
    {
      type: "area",
      xKey: "year",
      yKey: "ie",
      yName: "IE",
      normalizedTo: 100,
      stacked: true,
    },
    {
      type: "area",
      xKey: "year",
      yKey: "firefox",
      yName: "Firefox",
      normalizedTo: 100,
      stacked: true,
    },
    {
      type: "area",
      xKey: "year",
      yKey: "safari",
      yName: "Safari",
      normalizedTo: 100,
      stacked: true,
    },
    {
      type: "area",
      xKey: "year",
      yKey: "chrome",
      yName: "Chrome",
      normalizedTo: 100,
      stacked: true,
    },
  ],
};

agCharts.AgChart.create(options);
