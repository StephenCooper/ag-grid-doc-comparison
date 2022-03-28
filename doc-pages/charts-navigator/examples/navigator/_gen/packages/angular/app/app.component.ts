import { cloneDeep } from 'lodash';
import { Component } from '@angular/core';
import * as agCharts from 'ag-charts-community';
import { AgCartesianChartOptions } from 'ag-charts-community';

@Component({
    selector: 'my-app',
    template: `<div class="wrapper">
    <div class="toolPanel">
        <button (click)="toggleEnabled(true)">Show Navigator</button>
        <button (click)="toggleEnabled(false)">Hide Navigator</button>
    </div>
    <ag-charts-angular
    style="height: 100%"
    [options]="options"
    ></ag-charts-angular>
</div>`
})

export class AppComponent {
    private options: AgCartesianChartOptions;
    

    constructor() {
        this.options = {
    
    title: {
        text: "Try dragging the Navigator's handles to zoom in",
    },
    subtitle: {
        text: 'or the area between them to pan around',
    },
    data: [
        { label: 'Android', value: 56.9 },
        { label: 'iOS', value: 22.5 },
        { label: 'BlackBerry', value: 6.8 },
        { label: 'Symbian', value: 8.5 },
        { label: 'Bada', value: 2.6 },
        { label: 'Windows', value: 1.9 },
    ],
    series: [
        {
            type: 'column',
            xKey: 'label',
            yKey: 'value',
        },
    ],
    axes: [
        {
            type: 'number',
            position: 'left',
        },
        {
            type: 'category',
            position: 'bottom',
        },
    ],
    legend: {
        enabled: false,
    },
    navigator: {
        enabled: true,
    },
}
    }

    ngOnInit() {
        
    }

    toggleEnabled = (value: boolean) => {
const options = cloneDeep(this.options);

    options.navigator!.enabled = value;
    

this.options = options;
}
}


