import { createApp } from 'vue';
import { cloneDeep } from 'lodash';
import * as agCharts from 'ag-charts-community';
import { AgChartsVue } from 'ag-charts-vue3';

const ChartExample = {
    template: `
        <div class="wrapper">
                <div id="toolPanel">
                    <div class="slider">
                        <label for="sliderInput"><strong>Label font size:&nbsp;</strong></label>
                        <span id="fontSizeSliderValue">12</span>
                        <input type="range" id="sliderInput" min="8" max="30" value="12" step="1" v-on:input="updateFontSize($event)" v-on:change="updateFontSize($event)">
                    </div>
                </div>
                <ag-charts-vue
                :options="options"></ag-charts-vue>
            </div>
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
    title: {
        text: 'Weight vs Height (by gender)',
    },
    subtitle: {
        text: 'with name labels',
    },
    series: [
        {
            type: 'scatter',
            title: 'Male',
            data: maleHeightWeight,
            xKey: 'height',
            xName: 'Height',
            yKey: 'weight',
            yName: 'Weight',
            sizeKey: 'age',
            sizeName: 'Age',
            labelKey: 'name',
            marker: {
                shape: 'square',
                size: 6,
                maxSize: 30,
                fill: 'rgba(227,111,106,0.71)',
                stroke: '#9f4e4a',
            },
            label: {
                enabled: true,
            },
        },
        {
            type: 'scatter',
            title: 'Female',
            data: femaleHeightWeight,
            xKey: 'height',
            xName: 'Height',
            yKey: 'weight',
            yName: 'Weight',
            sizeKey: 'age',
            sizeName: 'Age',
            labelKey: 'name',
            marker: {
                size: 6,
                maxSize: 30,
                fill: 'rgba(123,145,222,0.71)',
                stroke: '#56659b',
            },
            label: {
                enabled: true,
            },
        },
    ],
    axes: [
        {
            type: 'number',
            position: 'bottom',
            title: {
                text: 'Height',
            },
            label: {
                rotation: 45,
                formatter: (params) => {
                    return params.value + 'cm';
                },
            },
        },
        {
            type: 'number',
            position: 'left',
            title: {
                text: 'Weight',
            },
            label: {
                formatter: function (params) {
                    return params.value + 'kg';
                },
            },
        },
    ],
}
    },
    mounted() {
        
    },
    methods: {
        updateFontSize(event) {
const options = cloneDeep(this.options);

    var value = +event.target.value;
    options.series[0].label.fontSize = value;
    options.series[1].label.fontSize = value;
    
    document.getElementById('fontSizeSliderValue').innerHTML = String(value);

this.options = options;
},
    }
}



createApp(ChartExample).mount("#app");
