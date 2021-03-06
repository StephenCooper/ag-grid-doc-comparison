import React, { Component } from 'react';

export default class SliderFloatingFilter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      maxValue: props.maxValue,
      currentValue: 0,
    };
  }

  valueChanged = (event) => {
    this.setState(
      {
        currentValue: event.target.value,
      },
      () => {
        let valueToUse =
          this.state.currentValue === '0' ? null : this.state.currentValue;
        this.props.parentFilterInstance(function (instance) {
          instance.onFloatingFilterChanged('greaterThan', valueToUse);
        });
      }
    );
  };

  onParentModelChanged(parentModel) {
    // note that the filter could be anything here, but our purposes we're assuming a greater than filter only,
    // so just read off the value and use that
    this.setState({
      currentValue: !parentModel ? 0 : parentModel.filter,
    });
  }

  render() {
    return (
      <input
        type="range"
        value={this.state.currentValue}
        min={0}
        max={this.state.maxValue}
        step={1}
        onChange={this.valueChanged}
      />
    );
  }
}
