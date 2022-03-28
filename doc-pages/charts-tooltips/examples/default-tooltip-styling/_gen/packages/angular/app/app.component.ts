import { cloneDeep } from 'lodash';
import { Component } from '@angular/core';
import * as agCharts from 'ag-charts-community';
import { AgChartOptions } from 'ag-charts-community';

@Component({
    selector: 'my-app',
    template: `<ag-charts-angular
    style="height: 100%"
    [options]="options"
    ></ag-charts-angular>`
})

export class AppComponent {
    private options: AgChartOptions;
    

    constructor() {
        this.options = {
    
    data: [
        {
            month: 'Jun',
            sweaters: 50,
        },
        {
            month: 'Jul',
            sweaters: 70,
        },
        {
            month: 'Aug',
            sweaters: 60,
        },
    ],
    series: [
        {
            type: 'column',
            xKey: 'month',
            yKey: 'sweaters',
            yName: 'Sweaters Made',
        },
    ],
    tooltip: {
        class: 'my-tooltip',
    },
}
    }

    ngOnInit() {
        
    }

    
}


