[[only-react]]
|
|## Registering Custom Components
|
|There are two ways to register custom components:
|
|- Direct reference.
|- By name.
|
|### 1. By Direct Reference
|
|When registering a React Component by reference you simply pass the Component to the place you want it used (i.e. Cell Renderer, Filter etc).
|
|In this example we're specifying that we want our React `CubeComponent` as a Cell Renderer in the `Cube` column:
|
|```jsx
|//...other imports
|import CubeComponent from './CubeComponent';
|
|const GridExample = () => {
|   // other properties & methods
|   
|    const [columnDefs] = useState( [{field: 'value', cellRenderer: CubeComponent}] );
|
|    return (
|         <AgGridReact
|            columnDefs={columnDefs}
|            ...other properties            
|         />
|    );
|};
|```
|
|The advantage of referencing Components directly is cleaner code, without the extra level of indirection added when referencing by name.
|
|### 2. By Name
|
|When registering a React component by name you need to first register the component within the grid `components` property,
|then reference the component by name where you want it used (i.e. as a Cell Renderer, Filter etc).
|
|In this example we've registered our React `CubeComponent` and given it a name of `cubeComponent` (this can be any name you choose).
|We then specify that we want the previously registered `cubeComponent` to be used as a Cell Renderer in the `Cube` column:
|
|```jsx
|//...other imports
|import CubeComponent from './CubeComponent';
|
|const GridExample = () => {
|   // other properties & methods
|   
|   const [components] = useState({
|       cubeComponent: CubeComponent    
|   });
|
|   const [columnDefs] = useState( [{field: 'value', cellRenderer: 'cubeComponent'}] );
|
|   return (
|         <AgGridReact
|            components={components}
|            columnDefs={columnDefs}
|            ...other properties            
|         />
|   );
|};
|```
|
|The advantage of referencing components by name is definitions (eg Column Definitions) can be composed of simple types (ie JSON), which is useful should you wish to persist Column Definitions.
|
|[[note]]
||A React Component in this context can be any valid React Component - A Class Based Component, a Hook or even an inline
||Functional Component. 
||The same rules apply regardless of the type of component used.
