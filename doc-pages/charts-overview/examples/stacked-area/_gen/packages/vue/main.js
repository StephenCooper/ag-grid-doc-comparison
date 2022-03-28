import Vue from 'vue';
import { cloneDeep } from 'lodash';
import * as agCharts from 'ag-charts-community';
import { AgChartsVue } from 'ag-charts-vue';

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
            fills: ["#5BC0EB", "#FDE74C", "#9BC53D", "#E55934", "#FA7921", "#fa3081"],
            strokes: [
                "#4086a4",
                "#b1a235",
                "#6c8a2b",
                "#a03e24",
                "#af5517",
                "#af225a",
            ],
        },
        overrides: {
            area: {
                series: {
                    marker: { enabled: true },
                    highlightStyle: {
                        series: {
                            dimOpacity: 0.2
                        }
                    }
                }
            }
        },
    },
    title: {
        text: "Total Visitors to Science Museums (2019)",
        fontSize: 18,
    },
    subtitle: {
        text: "Source: Department for Digital, Culture, Media & Sport",
    },
    series: [
        { type: "area", xKey: "date", stacked: true, yKey: "Science Museum" },
        {
            type: "area",
            xKey: "date",
            stacked: true,
            yKey: "National Media Museum",
        },
        {
            type: "area",
            xKey: "date",
            stacked: true,
            yKey: "National Railway Museum",
        },
        { type: "area", xKey: "date", stacked: true, yKey: "Locomotion" },
        {
            type: "area",
            xKey: "date",
            yKey: "Museum of Science and Industry, Manchester",
            stacked: true,
        },
        {
            type: "area",
            xKey: "date",
            yKey: "National Coal Mining Museum for England",
            stacked: true,
        },
    ],
    axes: [
        {
            type: "time",
            position: "bottom",
            label: {
                format: "%b",
            },
        },
        {
            type: "number",
            position: "left",
            title: {
                enabled: true,
                text: "Total visitors",
            },
            label: {
                formatter: (params) => {
                    return params.value / 1000 + "k";
                },
            },
        },
    ],
    legend: {
        position: "bottom",
    },
}
    },
    mounted() {
        
    },
    methods: {
        
    }
}



new Vue({
    el: '#app',
    components: {
        'my-component': ChartExample
    }
});