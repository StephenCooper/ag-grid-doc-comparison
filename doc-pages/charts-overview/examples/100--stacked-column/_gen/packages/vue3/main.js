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
    
    autoSize: true,
    data: getData(),
    theme: {
        palette: {
            fills: ["#f1c40f", "#e67e22", "#2ecc71", "#3498db", "#9b59b6", "#34495e"],
            strokes: [
                "#f39c12",
                "#d35400",
                "#27ae60",
                "#2980b9",
                "#8e44ad",
                "#2c3e50",
            ],
        },
        overrides: {
            column: {
                series: {
                    strokeWidth: 0,
                    highlightStyle: {
                        series: {
                            dimOpacity: 0.3,
                        },
                    },
                },
            },
        },
    },
    title: {
        text: "Ethnic Diversity of School Pupils (2019)",
        fontSize: 18,
    },
    subtitle: {
        text: "Source: Department for Education",
    },
    series: [
        {
            type: "column",
            xKey: "type",
            yKey: "white",
            yName: "White",
            normalizedTo: 100,
            stacked: true,
        },
        {
            type: "column",
            xKey: "type",
            yKey: "mixed",
            yName: "Mixed",
            normalizedTo: 100,
            stacked: true,
        },
        {
            type: "column",
            xKey: "type",
            yKey: "asian",
            yName: "Asian",
            normalizedTo: 100,
            stacked: true,
        },
        {
            type: "column",
            xKey: "type",
            yKey: "black",
            yName: "Black",
            normalizedTo: 100,
            stacked: true,
        },
        {
            type: "column",
            xKey: "type",
            yKey: "chinese",
            yName: "Chinese",
            normalizedTo: 100,
            stacked: true,
        },
        {
            type: "column",
            xKey: "type",
            yKey: "other",
            yName: "Other",
            normalizedTo: 100,
            stacked: true,
        },
    ],
    axes: [
        {
            type: "category",
            position: "bottom",
        },
        {
            type: "number",
            position: "left",
            label: {
                format: "#{.0f}%",
            },
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
