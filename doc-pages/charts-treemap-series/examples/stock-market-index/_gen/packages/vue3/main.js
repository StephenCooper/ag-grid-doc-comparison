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
    type: 'hierarchy',
    
    data,
    series: [
        {
            type: 'treemap',
            labelKey: 'name',
            sizeKey: 'size',
            colorKey: 'color',
            tooltip: {
                renderer: params => {
                    return {
                        content: `<b>Change</b>: ${params.datum.colorValue.toFixed(2)}%`,
                    };
                },
            },
        },
    ],
    title: {
        text: 'S&P 500 index stocks categorized by sectors and industries.',
    },
    subtitle: {
        text: 'Area represents market cap. Color represents change from the day before.',
    },
}
    },
    mounted() {
        
    },
    methods: {
        
    }
}



createApp(ChartExample).mount("#app");
