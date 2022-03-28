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
}
    },
    mounted() {
        
    },
    methods: {
        
    }
}

window.renderer = function renderer(params) {
    return {
        title: params.xValue,
        content: params.yValue.toFixed(0),
    };
}

createApp(ChartExample).mount("#app");
