[[only-vue]]
|
|Below is a simple example of an a status bar component:
|
|```js
|const MyStatusBarComponent = {
|    template: `<input style="padding: 5px; margin: 5px" type="button" v-on:click="onClick" value="Click Me For Selected Row Count"/>`,
|    methods: {
|        onClick() {
|            alert('Selected Row Count: ' + this.params.api.getSelectedRows().length)
|        }
|    }
|}
|```
 