import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class PartialMatchFilter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: ''
        };

        this.onChange = this.onChange.bind(this);
    }

    isFilterActive() {
        return this.state.text != null && this.state.text !== '';
    }

    doesFilterPass(params) {
        const { api, colDef, column, columnApi, context, valueGetter } = this.props;
        const { node } = params;
        const value = valueGetter({
            api,
            colDef,
            column,
            columnApi,
            context,
            data: node.data,
            getValue: (field) => node.data[field],
            node,
        }).toString().toLowerCase();

        return this.state.text.toLowerCase()
            .split(' ')
            .every(filterWord => value.indexOf(filterWord) >= 0);
    }

    getModel() {
        if (!this.isFilterActive()) { return null; }

        return { value: this.state.text };
    }

    setModel(model) {
        this.state.text = model ? model.value : '';
    }

    afterGuiAttached(params) {
        this.focus();
    }

    focus() {
        window.setTimeout(() => {
            const container = ReactDOM.findDOMNode(this.refs.input);

            if (container) {
                container.focus();
            }
        });
    }

    componentMethod(message) {
        alert(`Alert from PartialMatchFilterComponent: ${message}`);
    }

    onChange(event) {
        const newValue = event.target.value;

        if (this.state.text !== newValue) {
            this.setState({
                text: newValue
            }, () => {
                this.props.filterChangedCallback();
            });

        }
    }

    render() {
        const style = {
            border: '2px solid #22ff22',
            borderRadius: '5px',
            backgroundColor: '#bbffbb',
            width: '200px',
            height: '50px'
        };

        return (
            <div style={style}>Filter: <input style={{ height: '20px' }} ref="input" value={this.state.text}
                onChange={this.onChange} className="form-control" /></div>
        );
    }
};
