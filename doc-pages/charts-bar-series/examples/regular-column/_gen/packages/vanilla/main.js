
const options = {
  container: document.getElementById('myChart'),
  title: {
    text: "Apple's revenue by product category",
  },
  subtitle: {
    text: 'in billion U.S. dollars',
  },
  data: getData(),
  series: [
    {
      type: 'column',
      xKey: 'quarter',
      yKey: 'iphone',
    },
  ],
}

agCharts.AgChart.create(options)
