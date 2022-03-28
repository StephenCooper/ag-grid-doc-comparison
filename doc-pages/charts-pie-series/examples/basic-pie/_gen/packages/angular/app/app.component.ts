import { cloneDeep } from 'lodash';
import { Component } from '@angular/core';
import * as agCharts from 'ag-charts-community';
import { AgChartOptions } from 'ag-charts-community';

@Component({
    selector: 'my-app',
    template: `<ag-charts-angular
    style="height: 100%"
    [options]="options"
    ></ag-charts-angular>
`
})

export class AppComponent {
    private options: AgChartOptions;
    

    constructor() {
        this.options = {
    
    data: [
        { value: 56.9 },
        { value: 22.5 },
        { value: 6.8 },
        { value: 8.5 },
        { value: 2.6 },
        { value: 1.9 },
    ],
    series: [
        {
            type: 'pie',
            angleKey: 'value',
        },
    ],
}
    }

    ngOnInit() {
        
    }

    
}


