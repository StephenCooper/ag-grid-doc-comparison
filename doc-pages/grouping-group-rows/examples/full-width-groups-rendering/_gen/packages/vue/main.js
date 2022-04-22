import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { AgGridVue } from 'ag-grid-vue';
import Vue from 'vue';
import GroupRowInnerRenderer from './groupRowInnerRendererVue.js';

const VueExample = {
  template: `
        <div style="height: 100%">
            <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :columnTypes="columnTypes"
                :groupDisplayType="groupDisplayType"
                :groupRowRendererParams="groupRowRendererParams"
                :rowData="rowData"></ag-grid-vue>
        </div>
    `,
  components: {
    'ag-grid-vue': AgGridVue,
    GroupRowInnerRenderer,
  },
  data: function () {
    return {
      columnDefs: [
        { field: 'athlete', minWidth: 200 },
        { field: 'country', rowGroup: true, hide: true },
        { field: 'age' },
        { field: 'gold', type: 'number' },
        { field: 'silver', type: 'number' },
        { field: 'bronze', type: 'number' },
        { field: 'year', filter: true },
        { field: 'date' },
        { field: 'sport', minWidth: 200 },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        minWidth: 150,
        resizable: true,
      },
      columnTypes: null,
      groupDisplayType: null,
      groupRowRendererParams: null,
      rowData: null,
    };
  },
  created() {
    this.columnTypes = {
      number: {
        editable: true,
        // editing works with strings, need to change string to number
        valueParser: (params) => {
          return parseInt(params.newValue);
        },
        aggFunc: 'sum',
      },
    };
    this.groupDisplayType = 'groupRows';
    this.groupRowRendererParams = {
      innerRenderer: 'GroupRowInnerRenderer',
      suppressCount: true,
      flagCodes: {
        Andorra: 'ad',
        'United Arab Emirates': 'ae',
        Afghanistan: 'af',
        'Antigua and Barbuda': 'ag',
        Anguilla: 'ai',
        Albania: 'al',
        Armenia: 'am',
        Angola: 'ao',
        Antarctica: 'aq',
        Argentina: 'ar',
        'American Samoa': 'as',
        Austria: 'at',
        Australia: 'au',
        Aruba: 'aw',
        'Åland Islands': 'ax',
        Azerbaijan: 'az',
        'Bosnia and Herzegovina': 'ba',
        Barbados: 'bb',
        Bangladesh: 'bd',
        Belgium: 'be',
        'Burkina Faso': 'bf',
        Bulgaria: 'bg',
        Bahrain: 'bh',
        Burundi: 'bi',
        Benin: 'bj',
        'Saint Barthélemy': 'bl',
        Bermuda: 'bm',
        Brunei: 'bn',
        Bolivia: 'bo',
        'Caribbean Netherlands': 'bq',
        Brazil: 'br',
        Bahamas: 'bs',
        Bhutan: 'bt',
        'Bouvet Island': 'bv',
        Botswana: 'bw',
        Belarus: 'by',
        Belize: 'bz',
        Canada: 'ca',
        'Cocos (Keeling) Islands': 'cc',
        'DR Congo': 'cd',
        'Central African Republic': 'cf',
        'Republic of the Congo': 'cg',
        Switzerland: 'ch',
        "Côte d'Ivoire (Ivory Coast)": 'ci',
        'Cook Islands': 'ck',
        Chile: 'cl',
        Cameroon: 'cm',
        China: 'cn',
        Colombia: 'co',
        'Costa Rica': 'cr',
        Cuba: 'cu',
        'Cape Verde': 'cv',
        Curaçao: 'cw',
        'Christmas Island': 'cx',
        Cyprus: 'cy',
        'Czech Republic': 'cz',
        Germany: 'de',
        Djibouti: 'dj',
        Denmark: 'dk',
        Dominica: 'dm',
        'Dominican Republic': 'do',
        Algeria: 'dz',
        Ecuador: 'ec',
        Estonia: 'ee',
        Egypt: 'eg',
        'Western Sahara': 'eh',
        Eritrea: 'er',
        Spain: 'es',
        Ethiopia: 'et',
        Finland: 'fi',
        Fiji: 'fj',
        'Falkland Islands': 'fk',
        Micronesia: 'fm',
        'Faroe Islands': 'fo',
        France: 'fr',
        Gabon: 'ga',
        'Great Britain': 'gb',
        Grenada: 'gd',
        Georgia: 'ge',
        'French Guiana': 'gf',
        Guernsey: 'gg',
        Ghana: 'gh',
        Gibraltar: 'gi',
        Greenland: 'gl',
        Gambia: 'gm',
        Guinea: 'gn',
        Guadeloupe: 'gp',
        'Equatorial Guinea': 'gq',
        Greece: 'gr',
        'South Georgia': 'gs',
        Guatemala: 'gt',
        Guam: 'gu',
        'Guinea-Bissau': 'gw',
        Guyana: 'gy',
        'Hong Kong': 'hk',
        'Heard Island and McDonald Islands': 'hm',
        Honduras: 'hn',
        Croatia: 'hr',
        Haiti: 'ht',
        Hungary: 'hu',
        Indonesia: 'id',
        Ireland: 'ie',
        Israel: 'il',
        'Isle of Man': 'im',
        India: 'in',
        'British Indian Ocean Territory': 'io',
        Iraq: 'iq',
        Iran: 'ir',
        Iceland: 'is',
        Italy: 'it',
        Jersey: 'je',
        Jamaica: 'jm',
        Jordan: 'jo',
        Japan: 'jp',
        Kenya: 'ke',
        Kyrgyzstan: 'kg',
        Cambodia: 'kh',
        Kiribati: 'ki',
        Comoros: 'km',
        'Saint Kitts and Nevis': 'kn',
        'North Korea': 'kp',
        'South Korea': 'kr',
        Kuwait: 'kw',
        'Cayman Islands': 'ky',
        Kazakhstan: 'kz',
        Laos: 'la',
        Lebanon: 'lb',
        'Saint Lucia': 'lc',
        Liechtenstein: 'li',
        'Sri Lanka': 'lk',
        Liberia: 'lr',
        Lesotho: 'ls',
        Lithuania: 'lt',
        Luxembourg: 'lu',
        Latvia: 'lv',
        Libya: 'ly',
        Morocco: 'ma',
        Monaco: 'mc',
        Moldova: 'md',
        Montenegro: 'me',
        'Saint Martin': 'mf',
        Madagascar: 'mg',
        'Marshall Islands': 'mh',
        Macedonia: 'mk',
        Mali: 'ml',
        Myanmar: 'mm',
        Mongolia: 'mn',
        Macau: 'mo',
        'Northern Mariana Islands': 'mp',
        Martinique: 'mq',
        Mauritania: 'mr',
        Montserrat: 'ms',
        Malta: 'mt',
        Mauritius: 'mu',
        Maldives: 'mv',
        Malawi: 'mw',
        Mexico: 'mx',
        Malaysia: 'my',
        Mozambique: 'mz',
        Namibia: 'na',
        'New Caledonia': 'nc',
        Niger: 'ne',
        'Norfolk Island': 'nf',
        Nigeria: 'ng',
        Nicaragua: 'ni',
        Netherlands: 'nl',
        Norway: 'no',
        Nepal: 'np',
        Nauru: 'nr',
        Niue: 'nu',
        'New Zealand': 'nz',
        Oman: 'om',
        Panama: 'pa',
        Peru: 'pe',
        'French Polynesia': 'pf',
        'Papua New Guinea': 'pg',
        Philippines: 'ph',
        Pakistan: 'pk',
        Poland: 'pl',
        'Saint Pierre and Miquelon': 'pm',
        'Pitcairn Islands': 'pn',
        'Puerto Rico': 'pr',
        Palestine: 'ps',
        Portugal: 'pt',
        Palau: 'pw',
        Paraguay: 'py',
        Qatar: 'qa',
        Réunion: 're',
        Romania: 'ro',
        Serbia: 'rs',
        Russia: 'ru',
        Rwanda: 'rw',
        'Saudi Arabia': 'sa',
        'Solomon Islands': 'sb',
        Seychelles: 'sc',
        Sudan: 'sd',
        Sweden: 'se',
        Singapore: 'sg',
        'Saint Helena, Ascension and Tristan da Cunha': 'sh',
        Slovenia: 'si',
        'Svalbard and Jan Mayen': 'sj',
        Slovakia: 'sk',
        'Sierra Leone': 'sl',
        'San Marino': 'sm',
        Senegal: 'sn',
        Somalia: 'so',
        Suriname: 'sr',
        'South Sudan': 'ss',
        'São Tomé and Príncipe': 'st',
        'El Salvador': 'sv',
        'Sint Maarten': 'sx',
        Syria: 'sy',
        'Eswatini (Swaziland)': 'sz',
        'Turks and Caicos Islands': 'tc',
        Chad: 'td',
        'French Southern and Antarctic Lands': 'tf',
        Togo: 'tg',
        Thailand: 'th',
        Tajikistan: 'tj',
        Tokelau: 'tk',
        'Timor-Leste': 'tl',
        Turkmenistan: 'tm',
        Tunisia: 'tn',
        Tonga: 'to',
        Turkey: 'tr',
        'Trinidad and Tobago': 'tt',
        Tuvalu: 'tv',
        'Chinese Taipei': 'tw',
        Taiwan: 'tw',
        Tanzania: 'tz',
        Ukraine: 'ua',
        Uganda: 'ug',
        'United States Minor Outlying Islands': 'um',
        'United States': 'us',
        Uruguay: 'uy',
        Uzbekistan: 'uz',
        'Vatican City (Holy See)': 'va',
        'Saint Vincent and the Grenadines': 'vc',
        Venezuela: 've',
        'British Virgin Islands': 'vg',
        'United States Virgin Islands': 'vi',
        Vietnam: 'vn',
        Vanuatu: 'vu',
        'Wallis and Futuna': 'wf',
        Samoa: 'ws',
        Kosovo: 'xk',
        Yemen: 'ye',
        Mayotte: 'yt',
        'South Africa': 'za',
        Zambia: 'zm',
        Zimbabwe: 'zw',
      },
    };
  },
  methods: {
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      const updateData = (data) => params.api.setRowData(data);

      fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
        .then((resp) => resp.json())
        .then((data) => updateData(data));
    },
  },
};

new Vue({
  el: '#app',
  components: {
    'my-component': VueExample,
  },
});
