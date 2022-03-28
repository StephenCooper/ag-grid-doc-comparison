import { cloneDeep } from 'lodash';
import { Component } from '@angular/core';
import * as agCharts from 'ag-charts-community';
import { AgChartOptions } from 'ag-charts-community';

@Component({
    selector: 'my-app',
    template: `<div class="wrapper">
    <div id="toolPanel">
        <button (click)="startUpdates()">Start Updates</button>
    </div>
    <ag-charts-angular
    style="height: 100%"
    [options]="options"
    ></ag-charts-angular>
</div>
`
})

export class AppComponent {
    private options: AgChartOptions;
    

    constructor() {
        this.options = {
    
    autoSize: true,
    data: getData(),
    series: [
        {
            xKey: 'time',
            yKey: 'voltage',
        },
    ],
    axes: [
        {
            type: 'time',
            position: 'bottom',
            tick: {
                count: agCharts.time.second.every(5),
            },
            label: {
                format: '%H:%M:%S',
            },
        },
        {
            type: 'number',
            position: 'left',
            label: {
                format: '#{.2f}V',
            },
        },
    ],
    title: {
        text: 'Core Voltage',
    },
    legend: {
        enabled: false,
    },
}
    }

    ngOnInit() {
        
    }

    update = () => {
const options = cloneDeep(this.options);

    options.data = getData();
    

this.options = options;
}

startUpdates = () => {
    if (updating) {
        return;
    }
    updating = true;
    //@ts-ignore
    this.update();
    //@ts-ignore
    setInterval(this.update, 500);
}
}

var lastTime = new Date('07 Jan 2020 13:25:00 GMT').getTime()
var data: {
    time: Date;
    voltage: number;
}[] = []
function getData() {
    data.shift();
    while (data.length < 20) {
        data.push({
            time: new Date((lastTime += 1000)),
            voltage: 1.1 + Math.random() / 2,
        });
    }
    return data;
}
var updating = false
