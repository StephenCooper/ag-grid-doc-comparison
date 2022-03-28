import { createApp } from 'vue';
import { cloneDeep } from 'lodash';
import * as agCharts from 'ag-charts-community';
import { AgChartsVue } from 'ag-charts-vue3';

const ChartExample = {
    template: `
        <ag-charts-vue
                :options="options"></ag-charts-vue>
    `,
    components: {
        'ag-charts-vue': AgChartsVue
    },
    data: function() {
        return {
            options: null
        }
    },
    created() {
        this.options = {
    
    title: {
        text: 'Race results',
    },
    data: getData(),
    series: [
        {
            type: 'histogram',
            aggregation: 'mean',
            xKey: 'age',
            xName: 'Participant Age',
            yKey: 'time',
            yName: 'Race time',
        },
    ],
    legend: {
        enabled: false,
    },
    axes: [
        {
            type: 'number',
            position: 'bottom',
            title: { text: 'Age band (years)' },
        },
        {
            type: 'number',
            position: 'left',
            title: { text: 'Mean race time (seconds)' },
        },
    ],
}
    },
    mounted() {
        
    },
    methods: {
        
    }
}



createApp(ChartExample).mount("#app");
