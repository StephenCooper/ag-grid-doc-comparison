import { Component } from '@angular/core';
import {
  AgAreaSeriesOptions,
  AgChartLegendPosition,
  AgChartOptions,
} from 'ag-charts-community';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'my-app',
  template: `<div class="wrapper">
    <div id="toolPanel">
      <button (click)="reverseSeries()">Reverse Series</button>
      <span class="spacer"></span>
      <button (click)="swapTitles()">Swap Titles</button>
      <span class="spacer"></span>
      <button (click)="rotateLegend()">Rotate Legend</button>
      <span class="spacer"></span>
    </div>
    <ag-charts-angular
      style="height: 100%"
      [options]="options"
    ></ag-charts-angular>
  </div> `,
})
export class AppComponent {
  private options: AgChartOptions;

  constructor() {
    this.options = {
      title: {
        text: 'Browser Usage Statistics',
      },
      subtitle: {
        text: '2009-2019',
      },
      data: getData(),
      series,
      legend,
    };
  }

  ngOnInit() {}

  reverseSeries = () => {
    const options = cloneDeep(this.options);

    // Mutate options.
    options.series = series.reverse();
    // Apply changes.

    this.options = options;
  };

  swapTitles = () => {
    const options = cloneDeep(this.options);

    // Mutate options.
    const oldTitle = options.title;
    options.title = options.subtitle;
    options.subtitle = oldTitle;
    // Apply changes.

    this.options = options;
  };

  rotateLegend = () => {
    const options = cloneDeep(this.options);

    // Mutate legend.
    const currentIdx = positions.indexOf(legend.position || 'top');
    legend.position = positions[(currentIdx + 1) % positions.length];
    // Apply changes.
    options.legend = legend;

    this.options = options;
  };
}

function buildSeries(name: string): AgAreaSeriesOptions {
  return {
    type: 'area',
    xKey: 'year',
    yKey: name.toLowerCase(),
    yName: name,
    fillOpacity: 0.5,
  };
}
const series = [
  buildSeries('IE'),
  buildSeries('Chrome'),
  buildSeries('Firefox'),
  buildSeries('Safari'),
];
const positions: AgChartLegendPosition[] = ['left', 'top', 'right', 'bottom'];
const legend = {
  position: positions[1],
};
